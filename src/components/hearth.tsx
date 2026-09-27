import { useEffect, useRef, useState } from "react";
import { Flame } from "lucide-react";

export function Hearth({ onLabel, offLabel }: { onLabel: string; offLabel: string }) {
  const [on, setOn] = useState(false);
  const stopRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (sessionStorage.getItem("monks-fire") === "off") return;
    const arm = () => {
      setOn(true);
      window.removeEventListener("pointerdown", arm);
    };
    window.addEventListener("pointerdown", arm, { once: true });
    return () => window.removeEventListener("pointerdown", arm);
  }, []);

  useEffect(() => {
    if (!on) {
      stopRef.current?.();
      stopRef.current = null;
      return;
    }
    const ctx = new AudioContext();
    const length = ctx.sampleRate * 3;
    const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < length; i++) {
      const pop = Math.random() < 0.0015 ? (Math.random() * 2 - 1) : 0;
      data[i] = pop * 0.9 + (Math.random() * 2 - 1) * 0.04;
    }
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 780;
    const gain = ctx.createGain();
    gain.gain.value = 0.22;
    source.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    void ctx.resume();
    source.start();
    stopRef.current = () => {
      source.stop();
      void ctx.close();
    };
    return () => {
      stopRef.current?.();
      stopRef.current = null;
    };
  }, [on]);

  return (
    <button
      type="button"
      aria-pressed={on}
      aria-label={on ? onLabel : offLabel}
      className="fixed bottom-20 left-4 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full border border-caramel bg-paper-deep text-caramel"
      onClick={() => {
        const next = !on;
        setOn(next);
        sessionStorage.setItem("monks-fire", next ? "on" : "off");
      }}
    >
      <Flame className="h-5 w-5" aria-hidden />
    </button>
  );
}
