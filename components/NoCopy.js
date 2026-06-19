"use client";

import { useEffect } from "react";

// Memblokir klik-kanan, copy, cut, seleksi teks, drag gambar,
// dan shortcut keyboard umum (Ctrl+C/X/A/S/U/P, F12) di seluruh halaman.
export default function NoCopy() {
  useEffect(() => {
    const block = (e) => {
      e.preventDefault();
      return false;
    };
    const blockKeys = (e) => {
      const k = (e.key || "").toLowerCase();
      if (
        (e.ctrlKey || e.metaKey) &&
        (k === "c" ||
          k === "x" ||
          k === "a" ||
          k === "s" ||
          k === "u" ||
          k === "p")
      ) {
        e.preventDefault();
      }
      if (k === "f12") {
        e.preventDefault();
      }
    };
    document.addEventListener("contextmenu", block);
    document.addEventListener("copy", block);
    document.addEventListener("cut", block);
    document.addEventListener("selectstart", block);
    document.addEventListener("dragstart", block);
    document.addEventListener("keydown", blockKeys);
    return () => {
      document.removeEventListener("contextmenu", block);
      document.removeEventListener("copy", block);
      document.removeEventListener("cut", block);
      document.removeEventListener("selectstart", block);
      document.removeEventListener("dragstart", block);
      document.removeEventListener("keydown", blockKeys);
    };
  }, []);
  return null;
}
