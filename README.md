# Boussole

Plateforme de préparation aux examens **TCF Canada** et **TEF Canada** (immigration économique). Diagnostic de niveau, entraînement par compétence, correction IA de l'écrit et de l'oral, suivi de la progression vers le seuil NCLC visé.

## État du projet

**V1 — front-end complet, services mockés.** Le parcours critique (inscription → onboarding → diagnostic → dashboard → bibliothèque d'exercices → correction IA écrit/oral → paywall → paiement) est entièrement navigable avec des données réalistes mais simulées. Aucun backend réel n'est branché : pas d'authentification, pas de base de données, pas de paiement ni de correction IA réels.

Chaque service mocké vit dans `src/lib/services/` derrière une fonction async avec une signature déjà prête pour une vraie API (Supabase, Stripe, LanguageTool, Whisper/Deepgram) :

| Fichier | Rôle réel à brancher plus tard |
|---|---|
| `auth-service.ts` | Authentification (Supabase Auth) |
| `diagnostic-service.ts` | Estimation du score CECRL/NCLC |
| `writing-service.ts` | Correction grammaticale (LanguageTool) |
| `speaking-service.ts` | Transcription + analyse orale (Whisper/Deepgram) |
| `payment-service.ts` | Paiement (Stripe pour carte, CinetPay/Flutterwave pour mobile money) |

La seule brique réellement fonctionnelle est l'enregistrement audio (`src/hooks/useMediaRecorder.ts`, vraie API navigateur `MediaRecorder`).

## Stack

Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4 (tokens CSS-first, voir `src/styles/tokens/`), icônes [`@tabler/icons-react`](https://tabler.io/icons).

## Démarrer

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

## Structure

```
src/
  app/            routes App Router (une page par écran)
  components/     primitives UI réutilisables (ui/, qcm/, audio/, nclc/, navigation/, layout/)
  hooks/          logique réutilisable (timer, lecteur audio, enregistreur micro)
  state/          contexte React (onboarding, progression utilisateur) — pas de backend en V1
  lib/
    types/        types de domaine
    data/         données statiques typées (questions, tarifs, barèmes NCLC)
    services/     couche mock → API réelle plus tard
    scoring.ts     conversions/scoring pures
```

Design de référence dans `pr-paration-examen-tcf-tef/` (export Claude Design) — prototype HTML/JS et système de tokens, à consulter mais pas à modifier.

## Roadmap (après cette V1)

1. Authentification et base de données réelles (Supabase)
2. Paiement réel (Stripe + un processeur mobile money local)
3. Correction IA réelle (LanguageTool, Whisper/Deepgram)
4. Contenu complet (30 questions de diagnostic, catalogue d'exercices étendu, simulations complètes TCF/TEF)
