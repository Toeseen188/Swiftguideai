const DISASTER_INFO = {
  flood: {
    icon: '🌊',
    color: '#0ea5e9',
    bg: '#f0f9ff',
    border: '#bae6fd',
    badge: '#0369a1',
    badgeBg: '#e0f2fe',
    tips: [
      'Move to higher ground immediately',
      'Avoid walking in moving water',
      'Do not drive through flooded roads',
      'Turn off utilities at main switches',
    ],
  },
  fire: {
    icon: '🔥',
    color: '#ea580c',
    bg: '#fff7ed',
    border: '#fed7aa',
    badge: '#c2410c',
    badgeBg: '#ffedd5',
    tips: [
      'Evacuate immediately — do not delay',
      'Close doors to slow fire spread',
      'Stay low to avoid smoke inhalation',
      'Meet at your designated rally point',
    ],
  },
  tornado: {
    icon: '🌪️',
    color: '#7c3aed',
    bg: '#fdf4ff',
    border: '#e9d5ff',
    badge: '#6d28d9',
    badgeBg: '#ede9fe',
    tips: [
      'Move to lowest floor or interior room',
      'Stay away from windows immediately',
      'Protect your head and neck',
      'Do not shelter under bridges or overpasses',
    ],
  },
  chemical: {
    icon: '☣️',
    color: '#7c3aed',
    bg: '#fdf4ff',
    border: '#e9d5ff',
    badge: '#6d28d9',
    badgeBg: '#ede9fe',
    tips: [
      'Move upwind from the hazard zone',
      'Cover nose and mouth immediately',
      'Remove and bag contaminated clothing',
      'Seek medical attention right away',
    ],
  },
};

const EMERGENCY_CONTACTS = [
  { label: 'Emergency',     number: '911',
    icon: '🚨', color: '#dc2626', bg: '#fef2f2',
    border: '#fecaca' },
  { label: 'Fire Dept.',    number: '334-241-2651',
    icon: '🚒', color: '#ea580c', bg: '#fff7ed',
    border: '#fed7aa' },
  { label: 'Police Dept.',  number: '334-241-2651',
    icon: '🚓', color: '#1d4ed8', bg: '#eff6ff',
    border: '#bfdbfe' },
  { label: 'Red Cross',     number: '1-800-733-2767',
    icon: '❤️', color: '#dc2626', bg: '#fef2f2',
    border: '#fecaca' },
  { label: 'FEMA Helpline', number: '1-800-621-3362',
    icon: '🏛️', color: '#0369a1', bg: '#f0f9ff',
    border: '#bae6fd' },
];

export default function AlertsPanel({
  blockedRoads, disasterType, location
}) {
  const info = DISASTER_INFO[disasterType]
    || DISASTER_INFO.flood;

  return (
    <div>
      {/* ── Active Alert Banner ── */}
      <div style={{
        background: info.bg,
        border: `1.5px solid ${info.border}`,
        borderLeft: `4px solid ${info.color}`,
        borderRadius: '14px',
        padding: '14px',
        marginBottom: '14px',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '10px',
        }}>
          <span style={{
            fontSize: '1.5rem', lineHeight: 1,
          }}>
            {info.icon}
          </span>
          <div>
            <div style={{
              fontSize: '0.62rem',
              fontWeight: 800,
              color: info.badge,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              fontFamily: 'var(--font-sans)',
            }}>
              Active Emergency
            </div>
            <div style={{
              fontSize: '0.95rem',
              fontWeight: 800,
              color: 'var(--gray-900)',
              fontFamily: 'var(--font-sans)',
              letterSpacing: '-0.01em',
              lineHeight: 1.2,
            }}>
              {disasterType
                ? disasterType.charAt(0).toUpperCase()
                  + disasterType.slice(1)
                : 'Emergency'} Alert
              {location && (
                <span style={{
                  fontWeight: 500,
                  color: 'var(--gray-500)',
                  fontSize: '0.82rem',
                }}>
                  {' '}· {location}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Safety tips */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
        }}>
          {info.tips.map((tip, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '8px',
            }}>
              <div style={{
                width: 18, height: 18,
                background: info.color,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                marginTop: '1px',
              }}>
                <span style={{
                  color: '#fff',
                  fontSize: '0.6rem',
                  fontWeight: 900,
                  fontFamily: 'var(--font-sans)',
                }}>
                  {i + 1}
                </span>
              </div>
              <p style={{
                margin: 0,
                fontSize: '0.82rem',
                color: 'var(--gray-700)',
                lineHeight: 1.5,
                fontWeight: 500,
                fontFamily: 'var(--font-sans)',
              }}>
                {tip}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Blocked Roads ── */}
      {blockedRoads?.length > 0 && (
        <div style={{ marginBottom: '14px' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '10px',
          }}>
            <h2 className="sr-section-title"
              style={{ margin: 0 }}>
              Road Closures
            </h2>
            <span style={{
              fontSize: '0.72rem',
              fontWeight: 700,
              color: '#dc2626',
              background: '#fef2f2',
              border: '1px solid #fecaca',
              padding: '3px 10px',
              borderRadius: '999px',
              fontFamily: 'var(--font-sans)',
            }}>
              {blockedRoads.length} blocked
            </span>
          </div>

          {blockedRoads.map((road, i) => (
            <div key={i} style={{
              background: '#fef2f2',
              border: '1.5px solid #fecaca',
              borderLeft: '4px solid #dc2626',
              borderRadius: '12px',
              padding: '11px 13px',
              marginBottom: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}>
              <span style={{
                fontSize: '1.1rem', lineHeight: 1,
                flexShrink: 0,
              }}>
                🚧
              </span>
              <div>
                <p style={{
                  margin: '0 0 2px',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  color: '#991b1b',
                  fontFamily: 'var(--font-sans)',
                  letterSpacing: '-0.01em',
                }}>
                  {road.road || road.name || 'Road Closed'}
                </p>
                {road.reason && (
                  <p style={{
                    margin: 0,
                    fontSize: '0.75rem',
                    color: '#b91c1c',
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 500,
                    opacity: 0.8,
                  }}>
                    {road.reason}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Emergency Contacts ── */}
      <div>
        <h2 className="sr-section-title"
          style={{ marginBottom: '12px' }}>
          Emergency Contacts
        </h2>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}>
          {EMERGENCY_CONTACTS.map((c, i) => (
            <a
              key={i}
              href={`tel:${c.number}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                background: '#ffffff',
                border: '1.5px solid var(--gray-200)',
                borderRadius: '12px',
                padding: '11px 14px',
                textDecoration: 'none',
                boxShadow: 'var(--shadow-sm)',
                transition: 'all 0.15s',
              }}>

              {/* Icon */}
              <div style={{
                width: 38, height: 38,
                background: c.bg,
                border: `1.5px solid ${c.border}`,
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.1rem',
                flexShrink: 0,
              }}>
                {c.icon}
              </div>

              {/* Label + number */}
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  color: 'var(--gray-900)',
                  fontFamily: 'var(--font-sans)',
                  letterSpacing: '-0.01em',
                }}>
                  {c.label}
                </div>
                <div style={{
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: c.color,
                  fontFamily: 'var(--font-sans)',
                  letterSpacing: '0.02em',
                }}>
                  {c.number}
                </div>
              </div>

              {/* Call arrow */}
              <div style={{
                background: c.color,
                color: '#fff',
                borderRadius: '8px',
                padding: '5px 10px',
                fontSize: '0.72rem',
                fontWeight: 700,
                fontFamily: 'var(--font-sans)',
                flexShrink: 0,
              }}>
                Call →
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
