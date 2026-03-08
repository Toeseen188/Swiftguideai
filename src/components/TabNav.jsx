import React from 'react';

export default function TabNav({ activeTab, setActiveTab }) {
  const TABS = [
    { id: 'routes',    icon: '🛣️', label: 'Routes'    },
    { id: 'shelters',  icon: '🏕️', label: 'Shelters'  },
    { id: 'resources', icon: '🚒', label: 'Resources' },
    { id: 'alerts',    icon: '⚠️', label: 'Alerts'    },
  ];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      width: '100%',
      background: '#ffffff',
      borderBottom: '1px solid #e2e8f0',
      position: 'sticky',
      top: 56,
      zIndex: 50,
    }}>
      {TABS.map(tab => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          style={{
            height: '54px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2px',
            padding: 0,
            margin: 0,
            background: 'none',
            border: 'none',
            borderBottom: `3px solid ${activeTab === tab.id 
              ? '#16a34a' : 'transparent'}`,
            color: activeTab === tab.id 
              ? '#16a34a' : '#94a3b8',
            fontWeight: activeTab === tab.id ? 700 : 500,
            cursor: 'pointer',
            fontSize: '0.7rem',
            fontFamily: 'inherit',
            transition: 'all 0.15s',
            minWidth: 0,
            overflow: 'hidden',
          }}>
          <span style={{ 
            fontSize: '1rem', 
            lineHeight: 1,
            display: 'block',
          }}>
            {tab.icon}
          </span>
          <span style={{ 
            fontSize: '0.68rem',
            lineHeight: 1,
            whiteSpace: 'nowrap',
          }}>
            {tab.label}
          </span>
        </button>
      ))}
    </div>
  );
}
