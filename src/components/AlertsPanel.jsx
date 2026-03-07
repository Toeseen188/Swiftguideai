import React from 'react';

export default function AlertsPanel({ blockedRoads = [], disasterType, location }) {
  return (
    <div style={{ fontSize: '0.875rem', color: '#374151' }}>
      {disasterType && (
        <p>
          Incident: <strong>{disasterType}</strong> near <strong>{location}</strong>
        </p>
      )}

      {blockedRoads && blockedRoads.length > 0 ? (
        <div style={{ marginTop: '0.5rem' }}>
          <h3 style={{ fontWeight: 700, marginBottom: '0.25rem' }}>Road Alerts</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {blockedRoads.map((r, i) => (
              <li key={i} style={{ padding: '0.4rem 0', borderBottom: '1px solid #e5e7eb' }}>
                {r.description || r.road || 'Blocked road'}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No road alerts at this time.</p>
      )}
    </div>
  );
}
