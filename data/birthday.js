// ===== SATU-SATUNYA TEMPAT MENGATUR TANGGAL KEJUTAN DIBUKA =====
// Format: new Date(tahun, bulan, tanggal, jam, menit, detik)
// CATATAN: bulan dimulai dari 0 -> 0 = Januari, 11 = Desember.
// Contoh di bawah ini = 2 Desember 2026, jam 00:00.
export const TARGET = new Date(2026, 0, 2, 0, 0, 0);

// true kalau waktu sekarang sudah melewati TARGET (kejutan boleh dibuka).
export function isUnlocked() {
  return Date.now() >= TARGET.getTime();
}
