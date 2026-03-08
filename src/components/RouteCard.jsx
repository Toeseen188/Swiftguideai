import { useState } from 'react';

const ROUTE_CONFIG = [
  {
    label: 'Safest Route',
    borderColor: '#16a34a',
    bgColor: '#f0fdf4',
    badgeBg: '#dcfce7',
    badgeColor: '#15803d',
    accentBg: 'rgba(22,163,74,0.08)',
  },
  {
    label: 'Alternative',
    borderColor: '#d97706',
    bgColor: '#fffbeb',
    badgeBg: '#fef3c7',
    badgeColor: '#b45309',
    accentBg: 'rgba(217,119,6,0.08)',
  },
  {
    label: 'Last Resort',
    borderColor: '#dc2626',
    bgColor: '#fef2f2',
    badgeBg: '#fee2e2',
    badgeColor: '#b91c1c',
    accentBg: 'rgba(220,38,38,0.08)',
  },
];

export default function RouteCard({
  route, index, isSelected, onSelect
}) {
  const [expanded, setExpanded] = useState(false);

  if (!route?.route_name) return null;

  const cfg = ROUTE_CONFIG[index] || ROUTE_CONFIG[0];
  const safeScore   = Number(route.safety_score)    || 5;
  const safeMinutes = Number(route.estimated_minutes)|| 0;
  const safeKm      = Number(route.distance_km)     || 0;
  const safeSteps   = Array.isArray(route.steps)
    ? route.steps : [];
  const shelterName = route.shelter?.name
    || 'Nearest Shelter';

  const scoreColor = safeScore >= 8
    ? '#16a34a' : safeScore >= 5
    ? '#d97706' : '#dc2626';

  return (
    <div
      onClick={() => onSelect(index)}
      style={{
        background: isSelected
          ? cfg.bgColor : '#ffffff',
        borderRadius: '14px',
        border: `1.5px solid ${isSelected
          ? cfg.borderColor : 'var(--gray-200)'}`,
        borderLeft: `4px solid ${cfg.borderColor}`,
        padding: '14px',
        marginBottom: '10px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        boxShadow: isSelected
          ? `0 4px 20px ${cfg.borderColor}20`
          : 'var(--shadow-sm)',
        position: 'relative',
        overflow: 'hidden',
      }}>

      {/* Selected background glow */}
      {isSelected && (
        <div style={{
          position: 'absolute',
          top: 0, right: 0,
          width: '40%', height: '100%',
          background: `linear-gradient(to left,
            ${cfg.accentBg}, transparent)`,
          pointerEvents: 'none',
        }} />
      )}

      {/* ── Header row ── */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '8px',
        gap: '8px',
      }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Route label */}
          <span style={{
            display: 'inline-block',
            fontSize: '0.62rem',
            fontWeight: 800,
            color: cfg.borderColor,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: '3px',
            background: cfg.badgeBg,
            padding: '2px 8px',
            borderRadius: '999px',
          }}>
            {cfg.label}
          </span>

          {/* Route name */}
          <h3 style={{
            margin: 0,
            fontSize: '0.95rem',
            fontWeight: 800,
            color: 'var(--gray-900)',
            lineHeight: 1.2,
            letterSpacing: '-0.01em',
            fontFamily: 'var(--font-sans)',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>
            {route.route_name}
          </h3>
        </div>

        {/* Safety score badge */}
        <div style={{
          background: scoreColor,
          color: '#fff',
          borderRadius: '10px',
          padding: '6px 10px',
          textAlign: 'center',
          flexShrink: 0,
          minWidth: '48px',
        }}>
          <div style={{
            fontWeight: 900,
            fontSize: '1rem',
            lineHeight: 1,
            fontFamily: 'var(--font-sans)',
          }}>
            {safeScore}
          </div>
          <div style={{
            fontSize: '0.55rem',
            fontWeight: 700,
            opacity: 0.85,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
          }}>
            /10
          </div>
        </div>
      </div>

      {/* ── Meta pills ── */}
      <div style={{
        display: 'flex',
        gap: '6px',
        flexWrap: 'wrap',
        marginBottom: '10px',
      }}>
        {[
          { icon: '⏱', text: `~${safeMinutes} min`  },
          { icon: '📍', text: `${safeKm} km`         },
          { icon: '🏕️', text: shelterName             },
        ].map((m, i) => (
          <span key={i} style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '3px',
            background: 'var(--gray-100)',
            border: '1px solid var(--gray-200)',
            borderRadius: '999px',
            padding: '3px 9px',
            fontSize: '0.72rem',
            color: 'var(--gray-600)',
            fontWeight: 600,
            fontFamily: 'var(--font-sans)',
            maxWidth: i === 2 ? '140px' : 'none',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}>
            <span style={{ fontSize: '0.8rem' }}>
              {m.icon}
            </span>
            {m.text}
          </span>
        ))}
      </div>

      {/* ── Why safe ── */}
      <p style={{
        margin: '0 0 10px',
        fontSize: '0.82rem',
        color: 'var(--gray-600)',
        lineHeight: 1.55,
        fontFamily: 'var(--font-sans)',
      }}>
        {route.why_safe}
      </p>

      {/* ── Divider ── */}
      <div className="sr-divider"
        style={{ margin: '10px 0' }} />

      {/* ── Bottom row ── */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>

        {/* Toggle steps */}
        <button
          onClick={e => {
            e.stopPropagation();
            setExpanded(!expanded);
          }}
          style={{
            background: 'none',
            border: 'none',
            color: cfg.borderColor,
            cursor: 'pointer',
            fontSize: '0.75rem',
            fontWeight: 700,
            fontFamily: 'var(--font-sans)',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            letterSpacing: '0.01em',
          }}>
          <span style={{
            fontSize: '0.65rem',
            transition: 'transform 0.2s',
            display: 'inline-block',
            transform: expanded
              ? 'rotate(180deg)' : 'rotate(0)',
          }}>▼</span>
          {expanded
            ? 'Hide directions'
            : 'Turn-by-turn'}
        </button>

        {/* Selected indicator */}
        {isSelected ? (
          <span style={{
            fontSize: '0.72rem',
            color: '#16a34a',
            fontWeight: 700,
            fontFamily: 'var(--font-sans)',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}>
            ✅ On map
          </span>
        ) : (
          <span style={{
            fontSize: '0.72rem',
            color: 'var(--gray-400)',
            fontWeight: 500,
            fontFamily: 'var(--font-sans)',
          }}>
            Tap to select
          </span>
        )}
      </div>

      {/* ── Steps ── */}
      {expanded && (
        <div style={{
          marginTop: '12px',
          background: cfg.bgColor,
          borderRadius: '10px',
          padding: '12px',
          border: `1px solid ${cfg.borderColor}30`,
        }}>
          <div style={{
            fontSize: '0.68rem',
            fontWeight: 800,
            color: cfg.borderColor,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: '8px',
            fontFamily: 'var(--font-sans)',
          }}>
            Turn-by-turn directions
          </div>
          <ol style={{
            paddingLeft: '18px',
            margin: 0,
          }}>
            {safeSteps.map((step, i) => (
              <li key={i} style={{
                fontSize: '0.8rem',
                color: 'var(--gray-700)',
                marginBottom: '6px',
                lineHeight: 1.5,
                fontFamily: 'var(--font-sans)',
                fontWeight: 500,
              }}>
                {step}
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

