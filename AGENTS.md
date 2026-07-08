<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Boussole — contexte projet

Plateforme de préparation TCF Canada / TEF Canada. Voir `README.md` pour la stack et l'état d'avancement (V1 front-end, services mockés).

## Règles pour ce projet

- **Ne pas re-designer.** Le design (`pr-paration-examen-tcf-tef/`, export Claude Design) est validé. Toute nouvelle fonctionnalité doit rester fidèle aux tokens dans `src/styles/tokens/` et aux patterns déjà en place dans `src/components/`.
- **Réutiliser avant de créer.** Avant d'ajouter un composant, vérifier `src/components/ui/` (Card, PrimaryButton, SecondaryButton, Chip, SegmentedTabs, IconBadge, ProgressBar, CriteriaScoreBars, ScoreVsThreshold) et les hooks (`useCountdown`, `useAudioPlayer`, `useMediaRecorder`).
- **Mock d'abord, API ensuite.** Toute nouvelle intégration externe (paiement, IA, backend) doit d'abord passer par une fonction async dans `src/lib/services/` avec une signature réaliste, avant tout branchement réel — voir le tableau du README.
- **Utilisateur non expert.** Code lisible, fichiers courts, noms explicites. Éviter l'abstraction prématurée ; factoriser seulement ce qui se répète réellement (3+ usages).
- **Vérification.** Pas de suite de tests. Après toute modification : `npm run lint` et `npm run build`, puis `npm run dev` et parcourir manuellement l'écran concerné.
