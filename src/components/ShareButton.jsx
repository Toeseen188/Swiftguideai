import { useState } from 'react';

export default function ShareButton({ route }) {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (!route) return;
    const text =
`🛣️ SwiftGuide AI Emergency Evacuation
━━━━━━━━━━━━━━━━━━
Route: ${route.route_name}
Safety score: ${route.safety_score}/10
Est. time: ~${route.estimated_minutes} mins
Destination: ${route.shelter?.name}
Directions:
${(route.steps || []).slice(0, 4).map((s, i) => `${i + 1}. ${s}`).join('\n')}
Stay safe. SwiftGuide AI.`;
    navigator.clipboard?.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  return (
    <div style={{
      position: 'sticky',
      bottom: 0,
      left: 0,
      right: 0,
      width: '100%',
      padding: '12px 16px 20px',
      background: 'rgba(248,250,252,0.97)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderTop: '1px solid var(--gray-200)',
      zIndex: 200,
      marginTop: 'auto',
      flexShrink: 0,
    }}>
      <button
        onClick={handleShare}
        style={{
          width: '100%',
          padding: '14px',
          background: copied
            ? '#16a34a'
            : 'linear-gradient(135deg, #0A3D2B, #22c55e)',
          color: '#fff',
          border: 'none',
          borderRadius: '10px',
          fontSize: '0.95rem',
          fontWeight: 800,
          cursor: 'pointer',
          transition: 'all 0.2s',
          letterSpacing: '0.01em',
          boxShadow: '0 4px 16px rgba(10,61,43,0.3)',
          fontFamily: 'var(--font-sans)',
        }}>
        {copied ? '✅ Copied to clipboard!' : '📤 Share Route'}
      </button>
    </div>
  );
}
