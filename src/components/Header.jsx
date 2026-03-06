import React from 'react';

function Header() {
  return (
    <header className="w-full border-b border-slate-200 bg-white/80 backdrop-blur sticky top-0 z-20">
      <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-primary flex items-center justify-center text-white font-black text-lg">
            S
          </div>
          <div>
            <h1 className="text-sm font-extrabold tracking-tight text-primary leading-tight">
              SwiftGuide
            </h1>
            <p className="text-[11px] text-slate-500 leading-tight">
              Your AI guide out of danger
            </p>
          </div>
        </div>
        <span className="text-[11px] text-slate-400">
          Emergency-ready · Mobile-first
        </span>
      </div>
    </header>
  );
}

export default Header;

