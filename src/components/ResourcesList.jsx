import React from 'react';

export default function ResourcesList({ stations = [], pharmacies = [], userLat, userLng }) {
  const renderSection = (title, items) => {
    if (!items || items.length === 0) return null;
    return (
      <div style={{ marginBottom: '1rem' }}>
        <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#111827', marginBottom: '0.5rem' }}>{title}</h3>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {items.map((it, idx) => (
            <li key={idx} style={{
              padding: '0.6rem 0', borderBottom: '1px solid #e5e7eb',
              display: 'flex', justifyContent: 'space-between',
            }}>
              <span>{it.name || it.site_name || 'Unknown'}</span>
              {/* maybe show distance calculation later */}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div style={{ fontSize: '0.875rem', color: '#374151' }}>
      {renderSection('Emergency Stations', stations)}
      {renderSection('Pharmacies', pharmacies)}
      {!(stations && stations.length) && !(pharmacies && pharmacies.length) && (
        <p style={{ color: '#6b7280' }}>No resources available</p>
      )}
    </div>
  );
}
