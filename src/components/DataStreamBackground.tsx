import { useEffect, useState } from "react";

const TRACK_TITLES = [
  "Desde el río hasta el mar",
  "Asesinos",
  "ACAB",
  "Mártir",
  "Sueño de selva",
  "Concejo Robótikkko",
  "Lux Atómica",
];

const SYMBOLS = '⌘⌬⟁⌖⊗⊕⊙⟐⟡∆∇∑∏∫∴∵≋≠≈∞±÷×';

function toSymbols(text: string): string {
  return Array.from(text)
    .map((char) =>
      char === ' ' ? ' ' : SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]
    )
    .join('');
}

const STREAM_COUNT = 48;

type Stream = {
  id: number;
  title: string;
  binary: string;
  left: string;
  top: string;
  duration: string;
  delay: string;
  direction: number;
  depth: number;
};

function createStreams(): Stream[] {
  return Array.from({ length: STREAM_COUNT }, (_, i) => {
    const title = TRACK_TITLES[i % TRACK_TITLES.length];

    return {
      id: i,
      title,
      binary: toSymbols(title),
      left: `${(i * 37 + 7) % 96}%`,
      top: `${(i * 29 + 11) % 100}%`,
      duration: `${18 + (i % 7) * 4}s`,
      delay: `-${(i * 3) % 23}s`,
      direction: i % 3,
      depth: (i * 7 + Math.floor(i / 3)) % 4,
    };
  });
}

export default function DataStreamBackground() {
  const [decoded, setDecoded] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    const schedule = (id: number, delay: number) => {
      const timer = setTimeout(() => {
        setDecoded((current) => ({
          ...current,
          [id]: !current[id],
        }));

        schedule(id, 1800 + Math.random() * 2600);
      }, delay);

      timers.push(timer);
    };

    for (let i = 0; i < STREAM_COUNT; i++) {
      schedule(i, 1000 + Math.random() * 5000);
    }

    return () => timers.forEach(clearTimeout);
  }, []);

  const streams = createStreams();

  return (
    <div className="data-stream-background" aria-hidden="true">
      {streams.map((stream) => {
        const isDecoded = decoded[stream.id] ?? false;

        return (
          <span
            key={stream.id}
            className={[
              "data-stream",
              `direction-${stream.direction}`,
              `depth-${stream.depth}`,
              isDecoded ? "is-decoded" : "is-binary",
            ].join(" ")}
            style={{
              left: stream.left,
              top: stream.top,
              animationDuration: stream.duration,
              animationDelay: stream.delay,
              animationPlayState: "running",
            }}
          >
            <span
              className="stream-text"
              data-text={isDecoded ? stream.title : stream.binary}
            >
              {isDecoded ? stream.title : stream.binary}
            </span>
          </span>
        );
      })}
    </div>
  );
}
