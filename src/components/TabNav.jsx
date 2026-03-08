export default function TabNav({
  activeTab, setActiveTab
}) {
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
      height: 'var(--tabnav-height)',
      background: '#ffffff',
      borderBottom: '1px solid var(--gray-200)',
      position: 'sticky',
      top: 'var(--header-height)',
      zIndex: 50,
      flexShrink: 0,
    }}>
      {TABS.map((tab, i) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '3px',
              background: isActive
                ? 'var(--brand-50)' : '#ffffff',
              border: 'none',
              borderBottom: `2.5px solid ${isActive
                ? 'var(--brand-500)' : 'transparent'}`,
              borderRight: i < 3
                ? '1px solid var(--gray-100)' : 'none',
              color: isActive
                ? 'var(--brand-600)' : 'var(--gray-400)',
              fontFamily: 'var(--font-sans)',
              fontWeight: isActive ? 700 : 500,
              cursor: 'pointer',
              fontSize: 'var(--text-xs)',
              transition: 'all 0.15s ease',
              padding: 0,
              margin: 0,
              minWidth: 0,
              position: 'relative',
            }}>

            {/* Active top indicator */}
            {isActive && (
              <div style={{
                position: 'absolute',
                top: 0, left: '25%',
                width: '50%', height: '2px',
                background: 'var(--brand-400)',
                borderRadius: '0 0 3px 3px',
              }} />
            )}

            <span style={{
              fontSize: '1rem',
              lineHeight: 1,
              filter: isActive ? 'none' : 'grayscale(40%)',
              transition: 'filter 0.15s',
            }}>
              {tab.icon}
            </span>

            <span style={{
              fontSize: '0.68rem',
              fontWeight: isActive ? 700 : 500,
              lineHeight: 1,
              whiteSpace: 'nowrap',
              letterSpacing: isActive ? '0.01em' : '0',
            }}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
