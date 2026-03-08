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

const TYPE_CONFIG = {
  fire_station: {
    icon: '🚒',
    label: 'Fire Station',
    bg: '#fff7ed',
    border: '#fed7aa',
    badge: '#ea580c',
    badgeBg: '#ffedd5',
  },
  police_station: {
    icon: '🚓',
    label: 'Police Station',
    bg: '#eff6ff',
    border: '#bfdbfe',
    badge: '#1d4ed8',
    badgeBg: '#dbeafe',
  },
  pharmacy: {
    icon: '💊',
    label: 'Pharmacy',
    bg: '#fdf4ff',
    border: '#e9d5ff',
    badge: '#7c3aed',
    badgeBg: '#ede9fe',
  },
};

function ResourceCard({ item, index, userLat, userLng, type }) {
  const cfg = TYPE_CONFIG[type] || TYPE_CONFIG.pharmacy;
  const dist = (userLat && userLng && item.lat && item.lng)
    ? distanceKm(userLat, userLng, item.lat, item.lng)
    : null;
  const isClose = dist && parseFloat(dist) < 2;

  return (
    <div style={{
      background: '#ffffff',
      borderRadius: '14px',
      border: '1.5px solid var(--gray-200)',
      borderLeft: `4px solid ${cfg.badge}`,
      padding: '13px 14px',
      marginBottom: '8px',
      boxShadow: 'var(--shadow-sm)',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
    }}>

      {/* Icon circle */}
      <div style={{
        width: 40, height: 40,
        background: cfg.bg,
        border: `1.5px solid ${cfg.border}`,
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.2rem',
        flexShrink: 0,
      }}>
        {cfg.icon}
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          marginBottom: '3px',
          flexWrap: 'wrap',
        }}>
          <span style={{
            fontSize: '0.6rem',
            fontWeight: 800,
            color: cfg.badge,
            background: cfg.badgeBg,
            padding: '2px 7px',
            borderRadius: '999px',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            fontFamily: 'var(--font-sans)',
          }}>
            {cfg.label}
          </span>
          {isClose && (
            <span style={{
              fontSize: '0.6rem',
              fontWeight: 700,
              color: '#a16207',
              background: '#fef9c3',
              padding: '2px 7px',
              borderRadius: '999px',
              fontFamily: 'var(--font-sans)',
            }}>
              ⚡ Nearby
            </span>
          )}
        </div>

        <h4 style={{
          margin: '0 0 2px',
          fontSize: '0.85rem',
          fontWeight: 800,
          color: 'var(--gray-900)',
          fontFamily: 'var(--font-sans)',
          letterSpacing: '-0.01em',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}>
          {item.name}
        </h4>

        {item.address && (
          <p style={{
            margin: 0,
            fontSize: '0.75rem',
            color: 'var(--gray-500)',
            fontFamily: 'var(--font-sans)',
            fontWeight: 500,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>
            📍 {item.address}
          </p>
        )}
      </div>

      {/* Distance */}
      {dist && (
        <div style={{
          textAlign: 'center',
          flexShrink: 0,
          background: isClose ? '#f0fdf4' : 'var(--gray-50)',
          border: `1px solid ${isClose ? '#86efac' : 'var(--gray-200)'}`,
          borderRadius: '10px',
          padding: '5px 9px',
          minWidth: '48px',
        }}>
          <div style={{
            fontWeight: 900,
            fontSize: '0.9rem',
            color: isClose ? '#16a34a' : 'var(--gray-700)',
            lineHeight: 1,
            fontFamily: 'var(--font-sans)',
            letterSpacing: '-0.02em',
          }}>
            {dist}
          </div>
          <div style={{
            fontSize: '0.58rem',
            color: 'var(--gray-400)',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
          }}>
            km
          </div>
        </div>
      )}
    </div>
  );
}

export default function ResourcesList({
  stations, pharmacies, userLat, userLng
}) {
  const hasStations  = stations?.length  > 0;
  const hasPharmacies = pharmacies?.length > 0;

  if (!hasStations && !hasPharmacies) return (
    <div style={{
      textAlign: 'center',
      padding: '48px 24px',
    }}>
      <div style={{ fontSize: '2.5rem',
                    marginBottom: '12px' }}>
        🚒
      </div>
      <p style={{
        fontSize: '0.875rem',
        fontWeight: 600,
        color: 'var(--gray-400)',
        fontFamily: 'var(--font-sans)',
      }}>
        No resource data available
      </p>
    </div>
  );

  const allStations = [
    ...(stations || []).map(s => ({
      ...s,
      _type: s.type || 'fire_station',
    })),
  ].sort((a, b) =>
    distanceKm(userLat, userLng, a.lat, a.lng) -
    distanceKm(userLat, userLng, b.lat, b.lng)
  );

  const allPharmacies = [...(pharmacies || [])].sort((a, b) =>
    distanceKm(userLat, userLng, a.lat, a.lng) -
    distanceKm(userLat, userLng, b.lat, b.lng)
  );

  return (
    <div>
      {/* Emergency Stations */}
      {hasStations && (
        <div style={{ marginBottom: '20px' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '12px',
          }}>
            <h2 className="sr-section-title"
              style={{ margin: 0 }}>
              Emergency Stations
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
              {allStations.length} nearby
            </span>
          </div>
          {allStations.map((s, i) => (
            <ResourceCard
              key={i}
              item={s}
              index={i}
              type={s._type}
              userLat={userLat}
              userLng={userLng}
            />
          ))}
        </div>
      )}

      {/* Pharmacies */}
      {hasPharmacies && (
        <div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '12px',
          }}>
            <h2 className="sr-section-title"
              style={{ margin: 0 }}>
              Pharmacies
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
              {allPharmacies.length} nearby
            </span>
          </div>
          {allPharmacies.map((p, i) => (
            <ResourceCard
              key={i}
              item={p}
              index={i}
              type="pharmacy"
              userLat={userLat}
              userLng={userLng}
            />
          ))}
        </div>
      )}
    </div>
  );
}
