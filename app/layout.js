import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./Navbar";
import { AuthProvider } from "./context";
import Particles from './Particles';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "User vault",
  description: "User account manager in sql database",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <body className={`${geistSans.variable} ${geistMono.variable} antialiased relative`}>
      {/* ✅ Gradient Background — VERY bottom */}
      <div className="fixed inset-0 -z-20 bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />

      {/* ✅ Particles — on top of gradient */}
      <div className="fixed inset-0 -z-10">
        <Particles
          particleColors={['#90D5FF', '#90D5FF']}
          particleCount={1000}
          particleSpread={20}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={false}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>

      <AuthProvider>
        <Navbar />
        {children}
      </AuthProvider>
    </body>
    </html>
  );
}
