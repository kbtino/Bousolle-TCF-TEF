import { Card } from "@/components/ui/Card";

export function ReadingPassage({ text }: { text: string }) {
  return <Card className="p-3.5 text-body leading-normal text-ink-900">{text}</Card>;
}
