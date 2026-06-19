"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { memories } from "@/data/memories";
import { TARGET } from "@/data/birthday";

const cardInit = { opacity: 0, x: 80, scale: 0.95 };
const cardShow = { opacity: 1, x: 0, scale: 1 };
const cardExit = { opacity: 0, x: -80, scale: 0.95 };
const cardTrans = { duration: 0.45, ease: "easeOut" };

const capInit = { opacity: 0, y: 18 };
const capShow = { opacity: 1, y: 0 };
const capTrans = { delay: 0.15, duration: 0.5 };

const navHover = { scale: 1.1 };
const navTap = { scale: 0.9 };

function dotClass(i, index) {
  return (
    "h-2.5 rounded-full transition-all " +
    (i === index ? "w-8 bg-rose" : "w-2.5 bg-rose/30")
  );
}

export default function MemoriesPage() {
  const [index, setIndex] = useState(0);
  const [auto, setAuto] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [allowed, setAllowed] = useState(false);
  const router = useRouter();
  const audioRef = useRef(null);
  const total = memories.length;
  const m = memories[index];

  const go = useCallback(
    (dir) => setIndex((i) => (i + dir + total) % total),
    [total]
  );

  // Pindah slide otomatis.
  useEffect(() => {
    if (!auto) return undefined;
    const t = setTimeout(() => setIndex((i) => (i + 1) % total), 4500);
    return () => clearTimeout(t);
  }, [index, auto, total]);

  // Kunci halaman: kalau belum waktunya, lempar balik ke halaman utama
  // (yang menampilkan hitung mundur). Mencegah pengunjung membuka /memories
  // langsung sebelum tanggal kejutan.
  useEffect(() => {
    if (Date.now() < TARGET.getTime()) {
      router.replace("/");
    } else {
      setAllowed(true);
    }
  }, [router]);

  // Coba putar lagu saat halaman dibuka (jika diizinkan browser).
  useEffect(() => {
    if (!allowed) return;
    const a = audioRef.current;
    if (!a) return;
    a.volume = 0.5;
    a.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  }, [allowed]);

  const toggleMusic = useCallback(() => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) {
      a.play().then(() => setPlaying(true)).catch(() => {});
    } else {
      a.pause();
      setPlaying(false);
    }
  }, []);

  // Selama pengecekan / saat belum waktunya, jangan tampilkan apa pun.
  if (!allowed) return null;

  return (
    <main className="relative mx-auto flex min-h-screen max-w-3xl flex-col px-6 py-12">
      <audio ref={audioRef} src="/music/memories.mp3" loop preload="auto" />

      <div className="mb-6 text-center">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-rose transition hover:gap-2"
        >
          ← Kembali
        </Link>
        <h1 className="font-display text-5xl text-rose sm:text-6xl">Memories</h1>
        <p className="mx-auto mt-2 max-w-md text-slate-600">
          Setiap kenangan punya ceritanya sendiri. Nikmati satu per satu, ya. 💕
        </p>
      </div>

      <div className="relative flex-1">
        <AnimatePresence mode="wait">
          <motion.figure
            key={index}
            initial={cardInit}
            animate={cardShow}
            exit={cardExit}
            transition={cardTrans}
            className="overflow-hidden rounded-[2rem] bg-white/70 shadow-xl shadow-rose/10 backdrop-blur"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={m.src} alt={m.title} className="h-full w-full object-cover" />
            </div>
            <motion.figcaption
              initial={capInit}
              animate={capShow}
              transition={capTrans}
              className="px-7 py-7 text-center"
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-grape">
                {m.date}
              </p>
              <h2 className="mt-2 text-2xl font-bold text-slate-800">{m.title}</h2>
              <p className="mx-auto mt-3 max-w-md font-display text-2xl leading-snug text-rose">
                {m.caption}
              </p>
            </motion.figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>

      <div className="mt-7 flex items-center justify-center gap-6">
        <motion.button
          whileHover={navHover}
          whileTap={navTap}
          onClick={() => go(-1)}
          aria-label="Sebelumnya"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-xl text-rose shadow-lg"
        >
          ←
        </motion.button>

        <button
          onClick={() => setAuto((a) => !a)}
          className="min-w-[64px] text-sm font-medium text-slate-500"
          aria-label="Putar atau jeda otomatis"
        >
          {auto ? "⏸ Jeda" : "▶ Putar"}
        </button>

        <motion.button
          whileHover={navHover}
          whileTap={navTap}
          onClick={() => go(1)}
          aria-label="Berikutnya"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-xl text-rose shadow-lg"
        >
          →
        </motion.button>
      </div>

      <div className="mt-6 flex items-center justify-center gap-2">
        {memories.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={"Ke foto " + (i + 1)}
            className={dotClass(i, index)}
          />
        ))}
      </div>

      <p className="mt-4 text-center text-sm text-slate-400">
        {index + 1} dari {total}
      </p>

      <button
        onClick={toggleMusic}
        aria-label="Putar atau jeda lagu"
        className="fixed bottom-5 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white/80 text-xl shadow-lg backdrop-blur transition hover:scale-105"
      >
        {playing ? "🔊" : "🔇"}
      </button>
    </main>
  );
}
