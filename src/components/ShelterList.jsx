import React from 'react';

// simple list of shelters sorted by distance
export default function ShelterList({ shelters = [], userLat, userLng }) {
  const dist = (s) => {
    if (!userLat || !userLng || !s.lat || !s.lng) return null;
    const dLat = userLat - s.lat;
    const dLng = userLng - s.lng;
    return Math.sqrt(dLat * dLat + dLng * dLng).toFixed(2);
  };

  const sorted = [...shelters].sort((a, b) => (dist(a) || 0) - (dist(b) || 0));

  if (sorted.length === 0) {
    return <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>No shelters available</p>;
  }

  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.875rem' }}>
      {sorted.map((s, i) => (
        <li key={i} style={{
          padding: '0.75rem 0',
          borderBottom: '1px solid #e5e7eb',
          display: 'flex', justifyContent: 'space-between',
        }}>
          <span>{s.name || s.site_name || 'Unknown'}</span>
          {dist(s) && <span>{dist(s)}°</span>}
        </li>
      ))}
    </ul>
  );
}
