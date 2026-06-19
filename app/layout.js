import { Poppins, Playfair_Display } from "next/font/google";
import "./globals.css";
import NoCopy from "@/components/NoCopy";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

export const metadata = {
  title: "Selamat Ulang Tahun 🎂",
  description: "Sebuah kejutan kecil penuh kenangan untukmu.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={`${poppins.variable} ${playfair.variable} font-sans`}>
        <NoCopy />
        {children}
      </body>
    </html>
  );
}
