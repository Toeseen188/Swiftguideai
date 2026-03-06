import React from 'react';

function LocationInput({ value, onChange, onUseMyLocation, gpsDenied }) {
  return (
    <div className="space-y-2">
      <label className="block text-xs font-semibold text-slate-700 tracking-wide">
        Where are you right now?
      </label>
      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="e.g. Lagos Island, near City Hall"
          className="flex-1 h-12 rounded-xl border border-slate-200 px-3 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-white"
        />
        <button
          type="button"
          onClick={onUseMyLocation}
          className="h-12 px-3 rounded-xl border border-primary/70 text-primary text-xs font-semibold flex flex-col items-center justify-center min-w-[3.75rem] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 bg-emerald-50"
        >
          <span className="text-base">📍</span>
          <span>My GPS</span>
        </button>
      </div>
      {gpsDenied && (
        <p className="text-[11px] text-danger mt-1">
          GPS permission denied. Enter your location manually above.
        </p>
      )}
    </div>
  );
}

export default LocationInput;

