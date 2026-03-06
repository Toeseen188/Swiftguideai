import React, { useEffect, useState } from 'react';

const MESSAGES = [
  'Analyzing road conditions...',
  'Checking disaster zones...',
  'Calculating safest paths...',
  'Almost ready...'
];

function LoadingScreen({ onCancel }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-[60vh] gap-6 animate-fade-in-up">
      <div className="relative">
        <div className="h-16 w-16 rounded-full border-4 border-emerald-200 border-t-primary animate-spin" />
        <div className="absolute inset-2 rounded-full bg-emerald-50 opacity-60 animate-pulse" />
      </div>
      <div className="text-center space-y-2 px-4">
        <p className="text-sm font-semibold text-slate-800">
          Stay calm. We are finding your safest way out.
        </p>
        <p className="text-xs text-slate-500">{MESSAGES[index]}</p>
      </div>
      <button
        type="button"
        onClick={onCancel}
        className="mt-4 h-10 px-4 rounded-full border border-slate-300 text-xs text-slate-600 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300"
      >
        Cancel and edit details
      </button>
    </div>
  );
}

export default LoadingScreen;

