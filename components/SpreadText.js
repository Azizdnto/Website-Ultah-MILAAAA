"use client";

import { useRef, useState, useCallback } from "react";

// Jangkauan pengaruh kursor (px) dan seberapa renggang huruf terdekat.
const RADIUS = 60;
const STRENGTH = 7;

function charStyle(m) {
  return {
    marginLeft: m,
    marginRight: m,
    transition: "margin 0.16s ease-out",
  };
}

// Teks yang hurufnya merenggang hanya di sekitar posisi kursor/sentuhan.
export default function SpreadText({ text, className }) {
  const chars = Array.from(text);
  const spansRef = useRef([]);
  const [offsets, setOffsets] = useState(() => chars.map(() => 0));

  const handleMove = useCallback((e) => {
    const mx = e.clientX;
    const my = e.clientY;
    const next = spansRef.current.map((el) => {
      if (!el) return 0;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = cx - mx;
      const dy = cy - my;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > RADIUS) return 0;
      return (1 - dist / RADIUS) * STRENGTH;
    });
    setOffsets(next);
  }, []);

  const handleLeave = useCallback(() => {
    setOffsets(spansRef.current.map(() => 0));
  }, []);

  const setRef = (i) => (el) => {
    spansRef.current[i] = el;
  };

  return (
    <span
      className={className}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      {chars.map((ch, i) =>
        ch === " " ? (
          <span key={i}> </span>
        ) : (
          <span key={i} ref={setRef(i)} style={charStyle(offsets[i])}>
            {ch}
          </span>
        ),
      )}
    </span>
  );
}
