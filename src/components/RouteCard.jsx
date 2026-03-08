import React, { useState } from 'react';

const ROUTE_COLORS = ['#16a34a', '#d97706', '#dc2626'];
const ROUTE_BG     = ['#f0fdf4', '#fffbeb', '#fef2f2'];
const ROUTE_LABELS = ['Safest Route', 'Alternative', 'Last Resort'];

function RouteCard({ route, index, isSelected, onSelect }) {
  const [expanded, setExpanded] = useState(false);
  if (!route?.route_name) return null;

  const color = ROUTE_COLORS[index] || '#16a34a';
  const bg    = ROUTE_BG[index]     || '#f0fdf4';
  const label = ROUTE_LABELS[index] || 'Route';

  return (
    <div onClick={() => onSelect(index)}
      style={{
        borderRadius: '16px',
        border: '1px solid #e2e8f0',
        boxShadow: isSelected
          ? `0 4px 16px ${color}40`
          : '0 1px 3px rgba(0,0,0,0.08)',
        padding: 'clamp(12px, 3vw, 16px)',
        marginBottom: '16px',
        borderLeft: `4px solid ${color}`,
        cursor: 'pointer',
        transition: 'all 0.15s',
        background: isSelected ? bg : '#ffffff',
      }}>

      {/* Top row */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 8,
        gap: 8,
      }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <span style={{
            fontSize: '0.65rem',
            fontWeight: 700,
            color,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            display: 'block',
            marginBottom: 2,
          }}>
            {label}
          </span>
          <h3 style={{
            margin: 0,
            fontSize: 'var(--text-base)',
            fontWeight: 800,
            color: '#0f172a',
            lineHeight: 1.2,
          }}>
            {route.route_name}
          </h3>
        </div>
        <div style={{
          background: color,
          color: '#fff',
          borderRadius: '9999px',
          padding: '4px 10px',
          fontWeight: 900,
          fontSize: '0.875rem',
          whiteSpace: 'nowrap',
          flexShrink: 0,
        }}>
          {route.safety_score}/10
        </div>
      </div>

      {/* Meta row */}
      <div style={{
        display: 'flex',
        gap: '6px',
        marginBottom: '12px',
        flexWrap: 'wrap',
      }}>
        {[
          { icon: '⏱', val: `~${route.estimated_minutes || '?'} min` },
          { icon: '📍', val: `${route.distance_km || '?'} km`        },
          { icon: '🏕️', val: route.shelter?.name || 'Shelter'         },
        ].map((m, i) => (
          <span key={i} style={{
            fontSize: '0.875rem',
            color: '#64748b',
            display: 'flex',
            alignItems: 'center',
            gap: 3,
            fontWeight: 500,
          }}>
            {m.icon} {m.val}
          </span>
        ))}
      </div>

      {/* Description */}
      <p style={{
        margin: '0 0 12px',
        fontSize: '0.875rem',
        color: '#0f172a',
        lineHeight: 1.6,
      }}>
        {route.why_safe}
      </p>

      {/* Toggle steps */}
      <button
        onClick={e => { e.stopPropagation(); setExpanded(!expanded); }}
        style={{
          background: 'none', border: 'none',
          color, cursor: 'pointer',
          fontSize: '0.75rem',
          fontWeight: 700, padding: 0,
          display: 'flex', alignItems: 'center', gap: 4,
        }}>
        {expanded ? '▲ Hide steps' : '▼ Turn-by-turn directions'}
      </button>

      {expanded && (
        <ol style={{
          margin: '12px 0 0',
          paddingLeft: '24px',
        }}>
          {(route.steps || []).map((step, i) => (
            <li key={i} style={{
              fontSize: '0.875rem',
              color: '#64748b',
              marginBottom: 6,
              lineHeight: 1.5,
            }}>
              {step}
            </li>
          ))}
        </ol>
      )}

      {isSelected && (
        <div style={{
          marginTop: '12px',
          fontSize: '0.75rem',
          color: '#16a34a',
          fontWeight: 700,
          display: 'flex', alignItems: 'center', gap: 4,
        }}>
          ✅ Selected — highlighted on map
        </div>
      )}
    </div>
  );
}

export default RouteCard;

