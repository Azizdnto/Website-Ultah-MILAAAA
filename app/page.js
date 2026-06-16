"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Balloons from "@/components/Balloons";
import Celebration from "@/components/Celebration";
import SpreadText from "@/components/SpreadText";

// GANTI nama di bawah ini dengan nama orang yang berulang tahun.
const NAMA = "Sayang";

const boxInit = { opacity: 0, y: 30 };
const boxShow = { opacity: 1, y: 0 };
const boxTrans = { duration: 0.8, ease: "easeOut" };

const iconInit = { scale: 0 };
const iconShow = { scale: 1 };
const iconTrans = { delay: 0.3, type: "spring", stiffness: 200 };

const photoInit = { opacity: 0, scale: 0.8 };
const photoShow = { opacity: 1, scale: 1 };
const photoTrans = { duration: 0.7, ease: "easeOut" };

const btnHover = { scale: 1.06 };
const btnTap = { scale: 0.95 };

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-20 text-center">
      <Celebration />
      <Balloons />

      <motion.div
        initial={boxInit}
        animate={boxShow}
        transition={boxTrans}
        className="relative z-10 flex flex-col items-center"
      >
        <motion.span
          initial={iconInit}
          animate={iconShow}
          transition={iconTrans}
          className="mb-6 text-7xl"
        >
          🎂
        </motion.span>

        <p className="font-display text-3xl text-rose sm:text-4xl">
          <SpreadText text="Selamat Ulang Tahun" />
        </p>

        <h1 className="text-shadow-soft mt-2 bg-gradient-to-r from-rose via-pink-500 to-grape bg-clip-text text-6xl font-bold text-transparent sm:text-8xl">
          <SpreadText text={NAMA} />
        </h1>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <motion.img
          initial={photoInit}
          animate={photoShow}
          transition={photoTrans}
          src="/photos/birthday.jpg"
          alt="Foto ulang tahun"
          className="mt-8 aspect-[4/3] w-full max-w-md rounded-3xl object-cover shadow-xl shadow-rose/10"
        />

        <p className="mt-6 max-w-md text-base leading-relaxed text-slate-600 sm:text-lg">
          <SpreadText text="Hari ini spesial karena kamu lahir ke dunia. Aku menyiapkan sebuah kejutan kecil berisi kenangan-kenangan indah kita. 💝" />
        </p>

        <motion.div whileHover={btnHover} whileTap={btnTap} className="mt-10">
          <Link
            href="/memories"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-rose to-grape px-9 py-4 text-lg font-semibold text-white shadow-lg shadow-rose/40 transition"
          >
            Lihat Memories 💖
          </Link>
        </motion.div>
      </motion.div>

      <p className="relative z-10 mt-16 text-sm text-slate-400">
        Dibuat dengan ❤️ khusus untukmu
      </p>
    </main>
  );
}
