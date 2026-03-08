export default function StatsBar({
  shelters, stations, sirens, blockedRoads
}) {
  const stats = [
    {
      icon: '🏕️',
      value: shelters?.length || 0,
      label: 'Shelters',
      color: '#22c55e',
    },
    {
      icon: '🚒',
      value: stations?.length || 0,
      label: 'Stations',
      color: '#0ea5e9',
    },
    {
      icon: '🚨',
      value: sirens?.length || 0,
      label: 'Sirens',
      color: '#f97316',
    },
    {
      icon: '🚧',
      value: blockedRoads?.length || 0,
      label: 'Closures',
      color: '#dc2626',
    },
  ];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      background: '#0f172a',
      borderTop: '1px solid rgba(255,255,255,0.04)',
      borderBottom: '1px solid rgba(255,255,255,0.04)',
      flexShrink: 0,
    }}>
      {stats.map((s, i) => (
        <div key={i} style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '10px 4px',
          gap: '2px',
          borderRight: i < 3
            ? '1px solid rgba(255,255,255,0.06)'
            : 'none',
          position: 'relative',
        }}>
          {/* Top accent line */}
          <div style={{
            position: 'absolute',
            top: 0, left: '20%',
            width: '60%', height: '2px',
            background: s.value > 0
              ? s.color : 'transparent',
            borderRadius: '0 0 2px 2px',
            transition: 'all 0.3s',
          }} />

          <span style={{
            fontSize: '1rem',
            lineHeight: 1,
          }}>
            {s.icon}
          </span>

          <span style={{
            color: s.value > 0 ? s.color : '#475569',
            fontWeight: 900,
            fontSize: '1.15rem',
            lineHeight: 1,
            fontFamily: 'var(--font-sans)',
            letterSpacing: '-0.02em',
            transition: 'color 0.3s',
          }}>
            {s.value}
          </span>

          <span style={{
            color: 'rgba(255,255,255,0.35)',
            fontSize: '0.58rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.07em',
            lineHeight: 1,
          }}>
            {s.label}
          </span>
        </div>
      ))}
    </div>
  );
}
