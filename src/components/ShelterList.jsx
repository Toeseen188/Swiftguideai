function distanceKm(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) ** 2;
  return (R * 2 * Math.atan2(
    Math.sqrt(a), Math.sqrt(1 - a)
  )).toFixed(1);
}

export default function ShelterList({
  shelters, userLat, userLng
}) {
  if (!shelters?.length) return (
    <div style={{
      textAlign: 'center',
      padding: '48px 24px',
      color: 'var(--gray-400)',
    }}>
      <div style={{ fontSize: '2.5rem',
                    marginBottom: '12px' }}>
        🏕️
      </div>
      <p style={{
        fontSize: '0.875rem',
        fontWeight: 600,
        fontFamily: 'var(--font-sans)',
        color: 'var(--gray-400)',
      }}>
        No shelter data available
      </p>
    </div>
  );

  const sorted = [...shelters].sort((a, b) =>
    distanceKm(userLat, userLng, a.lat, a.lng) -
    distanceKm(userLat, userLng, b.lat, b.lng)
  );

  return (
    <div>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '14px',
      }}>
        <h2 className="sr-section-title"
          style={{ margin: 0 }}>
          Emergency Shelters
        </h2>
        <span style={{
          fontSize: '0.72rem',
          color: 'var(--gray-400)',
          fontWeight: 600,
          background: 'var(--gray-200)',
          padding: '3px 10px',
          borderRadius: '999px',
          fontFamily: 'var(--font-sans)',
        }}>
          {sorted.length} nearby
        </span>
      </div>

      {/* Shelter cards */}
      {sorted.map((s, i) => {
        const dist = distanceKm(
          userLat, userLng, s.lat, s.lng
        );
        const pct = s.capacity
          ? Math.round(
              (s.available / s.capacity) * 100
            )
          : null;
        const isClose = parseFloat(dist) < 3;
        const capColor = pct > 50
          ? '#16a34a' : pct > 20
          ? '#d97706' : '#dc2626';

        return (
          <div key={i} style={{
            background: '#ffffff',
            borderRadius: '14px',
            border: '1.5px solid var(--gray-200)',
            padding: '14px',
            marginBottom: '10px',
            boxShadow: 'var(--shadow-sm)',
            transition: 'box-shadow 0.2s',
          }}>

            {/* Top row */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: '8px',
              gap: '8px',
            }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                {/* Badges row */}
                <div style={{
                  display: 'flex',
                  gap: '5px',
                  marginBottom: '5px',
                  flexWrap: 'wrap',
                }}>
                  <span style={{
                    fontSize: '0.62rem',
                    fontWeight: 800,
                    background: '#f0fdf4',
                    color: '#15803d',
                    padding: '2px 8px',
                    borderRadius: '999px',
                    fontFamily: 'var(--font-sans)',
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                  }}>
                    #{i + 1} Closest
                  </span>

                  {s.source && (
                    <span style={{
                      fontSize: '0.62rem',
                      fontWeight: 700,
                      background: '#eff6ff',
                      color: '#1d4ed8',
                      padding: '2px 8px',
                      borderRadius: '999px',
                      fontFamily: 'var(--font-sans)',
                      letterSpacing: '0.04em',
                    }}>
                      🔵 Live
                    </span>
                  )}

                  {isClose && (
                    <span style={{
                      fontSize: '0.62rem',
                      fontWeight: 700,
                      background: '#fef9c3',
                      color: '#a16207',
                      padding: '2px 8px',
                      borderRadius: '999px',
                      fontFamily: 'var(--font-sans)',
                    }}>
                      ⚡ Nearby
                    </span>
                  )}
                </div>

                {/* Name */}
                <h3 style={{
                  margin: '0 0 3px',
                  fontSize: '0.9rem',
                  fontWeight: 800,
                  color: 'var(--gray-900)',
                  lineHeight: 1.2,
                  fontFamily: 'var(--font-sans)',
                  letterSpacing: '-0.01em',
                }}>
                  {s.name}
                </h3>

                {/* Address */}
                <p style={{
                  margin: 0,
                  fontSize: '0.78rem',
                  color: 'var(--gray-500)',
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 500,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '3px',
                }}>
                  <span>📍</span> {s.address}
                </p>
              </div>

              {/* Distance */}
              <div style={{
                textAlign: 'center',
                flexShrink: 0,
                background: isClose
                  ? '#f0fdf4' : 'var(--gray-50)',
                border: `1px solid ${isClose
                  ? '#86efac' : 'var(--gray-200)'}`,
                borderRadius: '10px',
                padding: '6px 10px',
                minWidth: '56px',
              }}>
                <div style={{
                  fontWeight: 900,
                  fontSize: '1rem',
                  color: isClose
                    ? '#16a34a' : 'var(--gray-700)',
                  lineHeight: 1,
                  fontFamily: 'var(--font-sans)',
                  letterSpacing: '-0.02em',
                }}>
                  {dist}
                </div>
                <div style={{
                  fontSize: '0.6rem',
                  color: 'var(--gray-400)',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                }}>
                  km
                </div>
              </div>
            </div>

            {/* Capacity bar */}
            {pct !== null && (
              <div style={{ marginTop: '10px' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '5px',
                }}>
                  <span style={{
                    fontSize: '0.72rem',
                    color: 'var(--gray-500)',
                    fontWeight: 600,
                    fontFamily: 'var(--font-sans)',
                  }}>
                    Capacity available
                  </span>
                  <span style={{
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    color: capColor,
                    fontFamily: 'var(--font-sans)',
                  }}>
                    {s.available}/{s.capacity}
                    ({pct}%)
                  </span>
                </div>

                {/* Progress bar track */}
                <div style={{
                  background: 'var(--gray-200)',
                  borderRadius: '999px',
                  height: '6px',
                  overflow: 'hidden',
                }}>
                  <div style={{
                    background: capColor,
                    borderRadius: '999px',
                    height: '100%',
                    width: `${Math.min(pct, 100)}%`,
                    transition: 'width 0.6s ease',
                  }} />
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
