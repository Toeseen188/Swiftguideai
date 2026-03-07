import React from 'react';

export default function StatsBar({ shelters, stations, sirens, blockedRoads }) {
  const stats = [
    { icon: '🏕️', value: shelters?.length || 0,    label: 'Shelters'  },
    { icon: '🚒', value: stations?.length || 0,    label: 'Stations'  },
    { icon: '🚨', value: sirens?.length || 0,      label: 'Sirens'    },
    { icon: '🚧', value: blockedRoads?.length || 0,label: 'Closures'  },
  ];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      background: '#0f172a',
    }}>
      {stats.map((s, i) => (
        <div key={i} style={{
          textAlign: 'center',
          padding: '10px 4px',
          borderRight: i < 3
            ? '1px solid rgba(255,255,255,0.07)' : 'none',
        }}>
          <div style={{ fontSize: '1rem', lineHeight: 1 }}>
            {s.icon}
          </div>
          <div style={{
            color: '#22c55e',
            fontWeight: 900,
            fontSize: '1.25rem',
            lineHeight: 1.2,
            marginTop: 2,
          }}>
            {s.value}
          </div>
          <div style={{
            color: 'rgba(255,255,255,0.4)',
            fontSize: '0.6rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            marginTop: 1,
          }}>
            {s.label}
          </div>
        </div>
      ))}
    </div>
  );
}
