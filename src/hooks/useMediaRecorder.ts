"use client";

import { useCallback, useRef, useState } from "react";

type RecorderStatus = "idle" | "recording" | "stopped" | "error";

/**
 * The one piece of the oral-expression flow that isn't mocked: real
 * microphone capture via the browser's MediaRecorder API. What happens to
 * the resulting audio (transcription, scoring) is still mocked elsewhere.
 */
export function useMediaRecorder() {
  const [status, setStatus] = useState<RecorderStatus>("idle");
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);

  const start = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      chunksRef.current = [];

      const recorder = new MediaRecorder(stream);
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) chunksRef.current.push(event.data);
      };
      mediaRecorderRef.current = recorder;
      recorder.start();
      setStatus("recording");
    } catch {
      setStatus("error");
    }
  }, []);

  const stop = useCallback(() => {
    mediaRecorderRef.current?.stop();
    streamRef.current?.getTracks().forEach((track) => track.stop());
    setStatus("stopped");
  }, []);

  const reset = useCallback(() => {
    chunksRef.current = [];
    setStatus("idle");
  }, []);

  return { status, start, stop, reset };
}
