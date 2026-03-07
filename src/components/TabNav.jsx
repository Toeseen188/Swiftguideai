import React from 'react';

export default function TabNav({ activeTab, setActiveTab }) {
  const TABS = [
    { id: 'routes',    icon: '🛣️',  label: 'Routes'    },
    { id: 'shelters',  icon: '🏕️',  label: 'Shelters'  },
    { id: 'resources', icon: '🚒',  label: 'Resources' },
    { id: 'alerts',    icon: '⚠️',  label: 'Alerts'    },
  ];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      background: '#ffffff',
      borderBottom: '1px solid #e2e8f0',
      position: 'sticky',
      top: 56,
      zIndex: 50,
      height: 56,
    }}>
      {TABS.map(tab => (
        <button key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
            background: 'none',
            border: 'none',
            borderBottom: `3px solid ${activeTab === tab.id
              ? '#16a34a' : 'transparent'}`,
            color: activeTab === tab.id
              ? '#16a34a' : '#64748b',
            fontWeight: activeTab === tab.id ? 700 : 500,
            cursor: 'pointer',
            fontSize: '0.75rem',
            transition: 'all 0.15s',
            padding: 0,
          }}>
          <span style={{ fontSize: '1rem' }}>{tab.icon}</span>
          {tab.label}
        </button>
      ))}
    </div>
  );
}
