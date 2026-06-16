"use client";

// Dekorasi balon & hati yang melayang di latar belakang.
const items = [
  { emoji: "🎈", left: "6%", delay: "0s", size: "text-5xl", anim: "animate-float" },
  { emoji: "🎈", left: "18%", delay: "1.2s", size: "text-3xl", anim: "animate-floatSlow" },
  { emoji: "💝", left: "30%", delay: "0.6s", size: "text-2xl", anim: "animate-float" },
  { emoji: "🎉", left: "44%", delay: "2s", size: "text-4xl", anim: "animate-floatSlow" },
  { emoji: "🎈", left: "58%", delay: "0.3s", size: "text-5xl", anim: "animate-float" },
  { emoji: "✨", left: "70%", delay: "1.6s", size: "text-3xl", anim: "animate-floatSlow" },
  { emoji: "💖", left: "82%", delay: "0.9s", size: "text-2xl", anim: "animate-float" },
  { emoji: "🎈", left: "92%", delay: "2.4s", size: "text-4xl", anim: "animate-floatSlow" },
];

function balloonStyle(it) {
  return { left: it.left, animationDelay: it.delay };
}

export default function Balloons() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {items.map((it, i) => (
        <span
          key={i}
          className={`absolute top-[10%] ${it.size} ${it.anim} select-none opacity-80`}
          style={balloonStyle(it)}
        >
          {it.emoji}
        </span>
      ))}
    </div>
  );
}
