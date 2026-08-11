'use client';

import React, { useState } from 'react';
import { Sprout, Sparkles, Cpu, ShieldCheck } from 'lucide-react';

export const ThreeDLogo: React.FC = () => {
  const [transformStyle, setTransformStyle] = useState('rotateX(0deg) rotateY(0deg)');

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = (-y / rect.height) * 30;
    const rotateY = (x / rect.width) * 30;
    setTransformStyle(`rotateX(${rotateX.toFixed(1)}deg) rotateY(${rotateY.toFixed(1)}deg)`);
  };

  const handleMouseLeave = () => {
    setTransformStyle('rotateX(0deg) rotateY(0deg)');
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="perspective-1000 cursor-pointer inline-block group my-4"
    >
      <div
        style={{
          transform: transformStyle,
          transformStyle: 'preserve-3d',
          transition: 'transform 0.15s ease-out',
        }}
        className="relative w-28 h-28 sm:w-36 sm:h-36 mx-auto rounded-3xl bg-gradient-to-br from-emerald-400 via-forest-600 to-teal-900 p-1 shadow-2xl shadow-emerald-500/30 flex items-center justify-center border border-emerald-300/40"
      >
        {/* Outer 3D Orbital Glow Ring */}
        <div
          style={{ transform: 'translateZ(25px)' }}
          className="absolute inset-0 rounded-3xl bg-emerald-500/20 blur-xl group-hover:blur-2xl transition duration-500 animate-pulse"
        />

        {/* 3D Glassmorphic Core */}
        <div
          style={{ transform: 'translateZ(40px)' }}
          className="w-full h-full rounded-2xl bg-forest-950/80 backdrop-blur-md border border-emerald-400/50 flex flex-col items-center justify-center p-3 shadow-inner text-center relative overflow-hidden"
        >
          {/* Animated Background Rays */}
          <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 via-teal-400/20 to-transparent opacity-60 animate-spin-slow pointer-events-none" />

          {/* Central 3D Floating Sprout */}
          <div
            style={{ transform: 'translateZ(60px)' }}
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr from-emerald-400 to-teal-300 flex items-center justify-center shadow-lg shadow-emerald-950/80 mb-1 group-hover:scale-110 transition duration-300"
          >
            <Sprout className="w-8 h-8 sm:w-10 sm:h-10 text-forest-950 animate-bounce" />
          </div>

          <div
            style={{ transform: 'translateZ(50px)' }}
            className="flex items-center space-x-1 text-[10px] font-black uppercase tracking-wider text-emerald-300 bg-forest-900/90 px-2 py-0.5 rounded-full border border-emerald-500/40 shadow"
          >
            <Sparkles className="w-3 h-3 text-emerald-400" />
            <span>AI AGRI CORE 3D</span>
          </div>
        </div>
      </div>
    </div>
  );
};
