"use client";

import { useRouter } from "next/navigation";
import { IconBrandGoogle, IconChecklist, IconCompass, IconFlagPin, IconSparkles } from "@tabler/icons-react";
import { MobileScreen } from "@/components/layout/MobileScreen";
import { IconBadge } from "@/components/ui/IconBadge";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { signUp } from "@/lib/services/auth-service";

const valueProps = [
  { icon: IconChecklist, text: "Formats officiels respectés — timing et épreuves réels" },
  { icon: IconSparkles, text: "Correction IA de l'écrit et de l'oral, critère par critère" },
  { icon: IconFlagPin, text: "Seuils NCLC toujours visibles — vous savez où vous en êtes" },
];

export default function InscriptionPage() {
  const router = useRouter();

  async function handleContinue(email: string) {
    await signUp(email);
    router.push("/onboarding/objectif");
  }

  return (
    <MobileScreen>
      <div className="flex flex-1 flex-col px-6 pb-5 pt-9">
        <div className="flex flex-col items-center gap-2.5">
          <IconBadge icon={IconCompass} size={52} variant="gradient" />
          <div className="text-h2 font-bold tracking-heading text-ink-900">Boussole</div>
          <div className="-mt-1.5 text-caption text-ink-600">
            Préparation TCF Canada · TEF Canada
          </div>
        </div>

        <h1 className="my-6 text-center text-h1 font-semibold leading-snug tracking-heading text-pretty text-ink-900">
          Atteignez le niveau que votre dossier IRCC exige.
        </h1>

        <ul className="mb-5 mt-4 flex flex-col gap-2.5">
          {valueProps.map(({ icon: Icon, text }) => (
            <li key={text} className="flex items-center gap-2.5 text-caption text-ink-900">
              <Icon size={15} className="w-[18px] flex-none text-primary" />
              {text}
            </li>
          ))}
        </ul>

        <form
          className="flex flex-col gap-2.5"
          onSubmit={(event) => {
            event.preventDefault();
            const email = new FormData(event.currentTarget).get("email");
            void handleContinue(typeof email === "string" ? email : "");
          }}
        >
          <input
            type="email"
            name="email"
            required
            placeholder="Adresse e-mail"
            className="h-[46px] rounded-md border border-border bg-surface px-3.5 text-body text-ink-900 outline-none"
          />
          <PrimaryButton type="submit">Créer mon compte</PrimaryButton>
        </form>

        <div className="my-3.5 flex items-center gap-2.5">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs text-ink-400">ou</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <SecondaryButton onClick={() => void handleContinue("")}>
          <IconBrandGoogle size={16} />
          Continuer avec Google
        </SecondaryButton>

        <div className="mt-auto pt-4 text-center text-[10px] leading-normal text-ink-400">
          Déjà inscrit ?{" "}
          <a href="#" className="font-semibold text-primary">
            Se connecter
          </a>
          <br />© Boussole · Accès gratuit sans carte bancaire
        </div>
      </div>
    </MobileScreen>
  );
}
