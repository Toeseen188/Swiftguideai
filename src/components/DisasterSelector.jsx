import React from 'react';

const OPTIONS = [
  { id: 'flood', label: 'Flood', icon: '🌊' },
  { id: 'fire', label: 'Fire', icon: '🔥' },
  { id: 'earthquake', label: 'Earthquake', icon: '🌍' },
  { id: 'chemical', label: 'Chemical', icon: '☣️' }
];

function DisasterSelector({ selected, onSelect }) {
  return (
    <div className="space-y-2">
      <label className="block text-xs font-semibold text-slate-700 tracking-wide">
        What is happening around you?
      </label>
      <div className="grid grid-cols-2 gap-2">
        {OPTIONS.map((opt) => {
          const isActive = selected === opt.id;
          const colorClasses =
            opt.id === 'flood'
              ? 'border-sky-200 bg-sky-50'
              : opt.id === 'fire'
              ? 'border-danger/30 bg-red-50'
              : opt.id === 'earthquake'
              ? 'border-slate-300 bg-slate-50'
              : 'border-warning/40 bg-amber-50';

          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onSelect(opt.id)}
              className={`h-14 rounded-xl text-left px-3 flex items-center gap-2 text-xs font-semibold border transition shadow-sm ${
                isActive
                  ? 'border-primary bg-primary text-white shadow-md'
                  : `${colorClasses} text-slate-800`
              }`}
            >
              <span className="text-lg">{opt.icon}</span>
              <span>{opt.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default DisasterSelector;

