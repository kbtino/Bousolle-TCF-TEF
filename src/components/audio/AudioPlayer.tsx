import clsx from "clsx";
import { IconPlayerPauseFilled, IconPlayerPlayFilled } from "@tabler/icons-react";
import { Card } from "@/components/ui/Card";
import { pressable } from "@/lib/ui";
import { formatMinutesSeconds } from "@/lib/format";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { WAVEFORM_BAR_HEIGHTS } from "@/lib/audio-waveform";

type AudioPlayerProps = { durationSeconds: number };

export function AudioPlayer({ durationSeconds }: AudioPlayerProps) {
  const { position, isPlaying, toggle } = useAudioPlayer(durationSeconds);
  const barsLit = Math.round((position / durationSeconds) * WAVEFORM_BAR_HEIGHTS.length);

  return (
    <Card className="flex items-center gap-3 p-3.5">
      <button
        type="button"
        onClick={toggle}
        aria-label={isPlaying ? "Mettre en pause" : "Écouter"}
        className={clsx(
          "flex h-10 w-10 flex-none items-center justify-center rounded-full bg-primary text-white hover:bg-primary-hover",
          pressable,
        )}
      >
        {isPlaying ? <IconPlayerPauseFilled size={17} /> : <IconPlayerPlayFilled size={17} />}
      </button>
      <div className="flex h-8 flex-1 items-center gap-0.5">
        {WAVEFORM_BAR_HEIGHTS.map((height, i) => (
          <div
            key={i}
            className={clsx("flex-1 rounded-sm", i < barsLit ? "bg-primary" : "bg-[#d1d5db]")}
            style={{ height }}
          />
        ))}
      </div>
      <span className="flex-none font-mono text-[10.5px] text-ink-600">
        {formatMinutesSeconds(position)} / {formatMinutesSeconds(durationSeconds)}
      </span>
    </Card>
  );
}
