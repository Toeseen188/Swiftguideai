import React, { useState } from 'react';

function safetyBadgeColor(score) {
  if (score >= 8) return 'bg-emerald-100 text-emerald-800';
  if (score >= 5) return 'bg-amber-100 text-amber-800';
  return 'bg-red-100 text-red-800';
}

function RouteCard({ route, index, isSelected, onSelect }) {
  const [expanded, setExpanded] = useState(false);

  const safeScore = Number(route.safety_score ?? route.safetyScore ?? 0);

  return (
    <article
      className={`rounded-2xl border px-3 py-3 bg-white shadow-sm transition ${
        isSelected
          ? 'border-primary shadow-md shadow-emerald-900/10'
          : 'border-slate-200'
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-xs font-extrabold text-slate-900 tracking-tight">
            Route {index + 1}:{' '}
            <span className="font-semibold">
              {route.route_name || route.name || 'Suggested route'}
            </span>
          </h3>
          <p className="text-[11px] text-slate-500 mt-1">
            {route.why_safe}
          </p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span
            className={`text-[10px] px-2 py-[3px] rounded-full font-semibold ${safetyBadgeColor(
              safeScore
            )}`}
          >
            Safety {safeScore}/10
          </span>
          <p className="text-[11px] text-slate-500">
            ~{route.estimated_minutes} min · {route.distance_km} km
          </p>
        </div>
      </div>

      <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500">
        <span>Avoiding: {route.avoid_reason}</span>
        <span className="truncate max-w-[45%] text-right">
          Shelter: {route.shelter?.name}
        </span>
      </div>

      <div className="mt-2 border-t border-slate-100 pt-2">
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="text-[11px] text-primary font-semibold flex items-center gap-1 focus:outline-none"
        >
          <span>{expanded ? 'Hide steps' : 'Show steps'}</span>
          <span>{expanded ? '▴' : '▾'}</span>
        </button>
        {expanded && Array.isArray(route.steps) && (
          <ol className="mt-1 space-y-1 text-[11px] text-slate-700">
            {route.steps.slice(0, 6).map((step, i) => (
              <li key={i} className="flex gap-2">
                <span className="mt-[2px] h-4 w-4 rounded-full bg-slate-100 text-[10px] flex items-center justify-center text-slate-600">
                  {i + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        )}
      </div>

      <button
        type="button"
        onClick={onSelect}
        className={`mt-3 w-full h-11 rounded-xl text-xs font-semibold flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-1 ${
          isSelected
            ? 'bg-primary text-white focus:ring-primary'
            : 'bg-emerald-50 text-primary border border-emerald-200 focus:ring-emerald-400'
        }`}
      >
        {isSelected ? 'Selected route' : 'Select this route'}
      </button>
    </article>
  );
}

export default RouteCard;

