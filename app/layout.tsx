import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'FieldWise AI | Crop Intelligence & Climate Advisory',
  description: 'From field signals to smarter decisions. AI-powered crop vision & weather intelligence for climate-resilient farming.',
  keywords: ['agricultural AI', 'crop disease detection', 'climate advisory', 'farmer decision support', 'FieldWise AI'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-forest-950 text-slate-100 min-h-screen flex flex-col antialiased selection:bg-emerald-500 selection:text-forest-950">
        {children}
      </body>
    </html>
  );
}
