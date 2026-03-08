import { useState, useEffect } from 'react';

const MESSAGES = [
  { icon: '📡', text: 'Connecting to city data...'      },
  { icon: '🗺️', text: 'Analyzing road network...'       },
  { icon: '🚧', text: 'Checking road closures...'       },
  { icon: '🏕️', text: 'Locating nearest shelters...'    },
  { icon: '🚒', text: 'Finding emergency stations...'   },
  { icon: '🤖', text: 'AI calculating safest route...'  },
  { icon: '📊', text: 'Scoring route safety...'         },
  { icon: '✅', text: 'Finalizing your evacuation plan...' },
];

export default function LoadingMessage() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex(i => (i + 1) % MESSAGES.length);
        setVisible(true);
      }, 300);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const msg = MESSAGES[index];

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '6px',
    }}>
      {/* Step counter */}
      <div style={{
        display: 'flex',
        gap: '5px',
        marginBottom: '4px',
      }}>
        {MESSAGES.map((_, i) => (
          <div key={i} style={{
            width: i === index ? 16 : 5,
            height: 5,
            borderRadius: '999px',
            background: i === index
              ? '#22c55e'
              : i < index
              ? 'rgba(34,197,94,0.35)'
              : 'rgba(255,255,255,0.12)',
            transition: 'all 0.3s ease',
          }} />
        ))}
      </div>

      {/* Message */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        opacity: visible ? 1 : 0,
        transform: visible
          ? 'translateY(0)'
          : 'translateY(6px)',
        transition: 'all 0.3s ease',
        minHeight: '28px',
      }}>
        <span style={{
          fontSize: '1.1rem',
          lineHeight: 1,
        }}>
          {msg.icon}
        </span>
        <span style={{
          color: 'rgba(255,255,255,0.65)',
          fontSize: '0.85rem',
          fontWeight: 600,
          fontFamily: 'var(--font-sans)',
          letterSpacing: '0.01em',
          whiteSpace: 'nowrap',
        }}>
          {msg.text}
        </span>
      </div>
    </div>
  );
}
