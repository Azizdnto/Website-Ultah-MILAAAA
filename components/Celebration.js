"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SpreadText from "@/components/SpreadText";
import { TARGET } from "@/data/birthday";

// Confetti mandiri berbasis canvas (tanpa library tambahan).
function launchConfetti() {
  if (typeof window === "undefined") return;
  const canvas = document.createElement("canvas");
  Object.assign(canvas.style, {
    position: "fixed",
    inset: "0",
    width: "100%",
    height: "100%",
    pointerEvents: "none",
    zIndex: "70",
  });
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");
  const colors = ["#ff6f91", "#7c5cff", "#ffd166", "#06d6a0", "#ff9a9e", "#fbc2eb", "#ffffff"];
  const pieces = [];
  for (let i = 0; i < 180; i++) {
    pieces.push({
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * canvas.height * 0.6,
      r: 6 + Math.random() * 8,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: -2.5 + Math.random() * 5,
      vy: 2 + Math.random() * 4.5,
      rot: Math.random() * Math.PI,
      vrot: -0.25 + Math.random() * 0.5,
    });
  }
  let frame = 0;
  function tick() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const p of pieces) {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.05;
      p.rot += p.vrot;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.r / 2, -p.r / 2, p.r, p.r * 0.6);
      ctx.restore();
    }
    frame += 1;
    if (frame < 280) {
      requestAnimationFrame(tick);
    } else {
      canvas.remove();
    }
  }
  tick();
}

const overlayExit = { opacity: 0 };
const fadeTrans = { duration: 0.6 };
const cakeInit = { scale: 0, rotate: -30 };
const cakeAnim = { scale: 1, rotate: 0 };
const cakeTrans = { type: "spring", stiffness: 160, delay: 0.1 };
const hintInit = { opacity: 0, y: 20 };
const hintAnim = { opacity: 1, y: 0 };
const hintTrans = { delay: 0.35 };
const btnTrans = { delay: 0.55 };
const btnHover = { scale: 1.07 };
const btnTap = { scale: 0.94 };

const countdownInit = { opacity: 0, y: 16 };
const countdownAnim = { opacity: 1, y: 0 };
const countdownTrans = { delay: 0.5 };

// Efek "tanah ditekan": cekungan/riak yang membesar lalu memudar.
const rippleInit = { scale: 0.3, opacity: 0.7 };
const rippleAnim = { scale: 1.5, opacity: 0 };
const rippleTrans = { duration: 0.6, ease: "easeOut" };

function dentStyle(x, y) {
  return {
    position: "fixed",
    left: x,
    top: y,
    width: 130,
    height: 130,
    marginLeft: -65,
    marginTop: -65,
    borderRadius: "9999px",
    pointerEvents: "none",
    zIndex: -1,
    background:
      "radial-gradient(circle, rgba(0,0,0,0.30) 0%, rgba(0,0,0,0.14) 36%, rgba(255,255,255,0.18) 60%, rgba(255,255,255,0) 72%)",
  };
}

// Cekungan lembut yang mengikuti jari/kursor selama berada di layar.
function followStyle(x, y) {
  return {
    position: "fixed",
    left: x,
    top: y,
    width: 120,
    height: 120,
    marginLeft: -60,
    marginTop: -60,
    borderRadius: "9999px",
    pointerEvents: "none",
    zIndex: -1,
    background:
      "radial-gradient(circle, rgba(0,0,0,0.22) 0%, rgba(0,0,0,0.10) 40%, rgba(255,255,255,0.14) 62%, rgba(255,255,255,0) 74%)",
  };
}

export default function Celebration() {
  const [opened, setOpened] = useState(false);
  const [playing, setPlaying] = useState(false);
  const openingRef = useRef(null);
  const greetingRef = useRef(null);
  const [now, setNow] = useState(null);
  const [ripples, setRipples] = useState([]);
  const [cursor, setCursor] = useState({ x: 0, y: 0, active: false });
  const rippleIdRef = useRef(0);
  const lastTrailRef = useRef({ x: -999, y: -999 });

  const spawnRipple = useCallback((x, y) => {
    const id = rippleIdRef.current;
    rippleIdRef.current += 1;
    setRipples((prev) => [...prev, { id, x, y }]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 650);
  }, []);

  const handlePress = useCallback(
    (e) => {
      spawnRipple(e.clientX, e.clientY);
    },
    [spawnRipple],
  );

  const handleMove = useCallback(
    (e) => {
      const x = e.clientX;
      const y = e.clientY;
      setCursor({ x, y, active: true });
      const last = lastTrailRef.current;
      const dx = x - last.x;
      const dy = y - last.y;
      if (dx * dx + dy * dy > 900) {
        last.x = x;
        last.y = y;
        spawnRipple(x, y);
      }
    },
    [spawnRipple],
  );

  const handleLeave = useCallback(() => {
    setCursor((c) => ({ ...c, active: false }));
  }, []);

  // Perbarui waktu tiap detik untuk hitung mundur.
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  // Coba putar lagu sejak layar pembuka muncul. Browser biasanya memblokir
  // suara sebelum ada interaksi, jadi lagu juga akan dimulai pada sentuhan/klik
  // pertama di mana pun (sekali saja).
  useEffect(() => {
    const a = openingRef.current;
    if (!a) return undefined;
    a.volume = 0.6;

    const start = () => {
      a.play().catch(() => {});
    };

    start();

    const onFirst = () => {
      start();
      window.removeEventListener("pointerdown", onFirst);
      window.removeEventListener("keydown", onFirst);
    };
    window.addEventListener("pointerdown", onFirst);
    window.addEventListener("keydown", onFirst);

    return () => {
      window.removeEventListener("pointerdown", onFirst);
      window.removeEventListener("keydown", onFirst);
    };
  }, []);

  const handleOpen = useCallback(() => {
    if (Date.now() < TARGET.getTime()) return;
    setOpened(true);
    launchConfetti();
    setTimeout(launchConfetti, 500);

    const opening = openingRef.current;
    if (opening) {
      opening.pause();
      opening.currentTime = 0;
    }

    const greeting = greetingRef.current;
    if (greeting) {
      greeting.volume = 0.6;
      greeting.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  }, []);

  const toggleMusic = useCallback(() => {
    const a = greetingRef.current;
    if (!a) return;
    if (a.paused) {
      a.play().then(() => setPlaying(true)).catch(() => {});
    } else {
      a.pause();
      setPlaying(false);
    }
  }, []);

  const diff = now === null ? 0 : Math.max(0, TARGET.getTime() - now);
  const locked = now === null ? true : diff > 0;
  const totalSec = Math.floor(diff / 1000);
  const days = Math.floor(totalSec / 86400);
  const hours = Math.floor((totalSec % 86400) / 3600);
  const minutes = Math.floor((totalSec % 3600) / 60);
  const seconds = totalSec % 60;
  const pad = (n) => String(n).padStart(2, "0");
  const countdownParts = [
    { label: "Hari", value: pad(days) },
    { label: "Jam", value: pad(hours) },
    { label: "Menit", value: pad(minutes) },
    { label: "Detik", value: pad(seconds) },
  ];

  return (
    <>
      <audio ref={openingRef} src="/music/opening.mp3" loop preload="auto" />
      <audio ref={greetingRef} src="/music/greeting.mp3" loop preload="auto" />

      <AnimatePresence>
        {!opened && (
          <motion.div
            exit={overlayExit}
            transition={fadeTrans}
            onPointerDown={handlePress}
            onPointerMove={handleMove}
            onPointerLeave={handleLeave}
            className="fixed inset-0 z-[60] flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-rose via-pink-500 to-grape px-6 text-center"
          >
            {cursor.active && <span style={followStyle(cursor.x, cursor.y)} />}

            {ripples.map((r) => (
              <motion.span
                key={r.id}
                initial={rippleInit}
                animate={rippleAnim}
                transition={rippleTrans}
                style={dentStyle(r.x, r.y)}
              />
            ))}

            <motion.div initial={cakeInit} animate={cakeAnim} transition={cakeTrans} className="text-8xl">
              🎁
            </motion.div>
            <motion.p
              initial={hintInit}
              animate={hintAnim}
              transition={hintTrans}
              className="mt-8 font-display text-4xl text-white sm:text-5xl"
            >
              <SpreadText text="Ada kejutan untukmu..." />
            </motion.p>
            <motion.div
              initial={countdownInit}
              animate={countdownAnim}
              transition={countdownTrans}
              className="mt-8 flex gap-3 sm:gap-4"
            >
              {countdownParts.map((p) => (
                <div
                  key={p.label}
                  className="flex min-w-[64px] flex-col items-center rounded-2xl bg-white/15 px-3 py-3 backdrop-blur"
                >
                  <span className="text-3xl font-bold text-white sm:text-4xl">{p.value}</span>
                  <span className="mt-1 text-xs uppercase tracking-widest text-white/80">{p.label}</span>
                </div>
              ))}
            </motion.div>

            {locked ? (
              <p className="mt-8 rounded-full bg-white/20 px-8 py-4 text-base font-semibold text-white">
                🔒 Terbuka pada 2 Desember
              </p>
            ) : (
              <motion.button
                initial={hintInit}
                animate={hintAnim}
                transition={btnTrans}
                whileHover={btnHover}
                whileTap={btnTap}
                onClick={handleOpen}
                className="mt-8 rounded-full bg-white px-10 py-4 text-lg font-semibold text-rose shadow-xl"
              >
                Buka Kejutan 🎉
              </motion.button>
            )}

            <p className="mt-6 text-sm text-white/80">
              <SpreadText
                text={
                  locked
                    ? "Sabar ya, kejutannya menunggu hari spesialmu 💝"
                    : "Ketuk untuk memulai perayaan & musik 🎶"
                }
              />
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {opened && (
        <button
          onClick={toggleMusic}
          aria-label="Putar atau jeda musik"
          className="fixed bottom-5 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white/80 text-xl shadow-lg backdrop-blur transition hover:scale-105"
        >
          {playing ? "🔊" : "🔇"}
        </button>
      )}
    </>
  );
}
