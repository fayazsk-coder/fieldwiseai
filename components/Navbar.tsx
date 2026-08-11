'use client';

import React from 'react';
import { Sprout, Globe, Sparkles, ShieldAlert } from 'lucide-react';
import { Language } from '@/lib/types';
import { TRANSLATION_LABELS } from '@/lib/translations';

interface NavbarProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  hasApiKey: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ currentLang, onLanguageChange, hasApiKey }) => {
  const t = TRANSLATION_LABELS[currentLang];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-forest-950/80 border-b border-forest-800/60 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo & Tagline */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-forest-600 flex items-center justify-center shadow-lg shadow-emerald-950/50">
            <Sprout className="w-6 h-6 text-forest-950" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-xl text-white tracking-tight">
                FieldWise <span className="text-emerald-400">AI</span>
              </span>
              <span className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                Enterprise Grade
              </span>
            </div>
            <p className="text-xs text-emerald-400/80 font-medium hidden sm:block">
              {t.heroTagline}
            </p>
          </div>
        </div>

        {/* Right side controls */}
        <div className="flex items-center space-x-3">
          
          {/* API Key Settings Button */}
          <button
            onClick={() => {
              const currentKey = localStorage.getItem('user_gemini_key') || '';
              const key = prompt('Enter your Gemini API Key for Vercel deployment (or leave blank to use server environment key):', currentKey);
              if (key !== null) {
                if (key.trim()) {
                  localStorage.setItem('user_gemini_key', key.trim());
                  alert('Gemini API key saved in browser storage! 🔑');
                } else {
                  localStorage.removeItem('user_gemini_key');
                  alert('Custom API key removed. Using server environment key.');
                }
              }
            }}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 hover:border-emerald-400 text-xs font-bold transition cursor-pointer shadow"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>🔑 API Key Settings</span>
          </button>

          {/* Farmer Language Selector */}
          <div className="flex items-center space-x-2 bg-forest-900/90 border border-forest-700/60 rounded-lg px-2.5 py-1.5 shadow-sm hover:border-emerald-500/50 transition">
            <Globe className="w-4 h-4 text-emerald-400" />
            <span className="text-xs text-slate-300 font-medium hidden sm:inline">{t.languageLabel}:</span>
            <select
              value={currentLang}
              onChange={(e) => onLanguageChange(e.target.value as Language)}
              className="bg-transparent text-xs font-semibold text-emerald-300 focus:outline-none cursor-pointer"
            >
              <option value="en" className="bg-forest-950 text-white">English 🇬🇧</option>
              <option value="te" className="bg-forest-950 text-white">తెలుగు (Telugu) 🇮🇳</option>
              <option value="hi" className="bg-forest-950 text-white">हिंदी (Hindi) 🇮🇳</option>
              <option value="mr" className="bg-forest-950 text-white">मराठी (Marathi) 🇮🇳</option>
              <option value="kn" className="bg-forest-950 text-white">ಕನ್ನಡ (Kannada) 🇮🇳</option>
              <option value="ta" className="bg-forest-950 text-white">தமிழ் (Tamil) 🇮🇳</option>
            </select>
          </div>

        </div>

      </div>
    </header>
  );
};
