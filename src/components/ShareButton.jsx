import React, { useState } from 'react';

function ShareButton({ route }) {
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
${(route.steps || []).slice(0,4).map((s,i) => `${i+1}. ${s}`).join('\n')}

Stay safe. SwiftRoute.`;

    navigator.clipboard?.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  return (
    <div className="share-btn-wrapper" style={{
      position: 'fixed',
      bottom: 0, left: '50%',
      transform: 'translateX(-50%)',
      width: '100%',
      maxWidth: '480px',
      padding: '16px',
      background: 'rgba(240,244,248,0.95)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      borderTop: '1px solid #e2e8f0',
      zIndex: 200,
    }}>
      <button onClick={handleShare}
        style={{
          width: '100%',
          padding: '15px',
          background: copied
            ? '#16a34a'
            : 'linear-gradient(135deg, #0A3D2B, #22c55e)',
          color: '#fff',
          border: 'none',
          borderRadius: '10px',
          fontSize: '1rem',
          fontWeight: 800,
          cursor: 'pointer',
          transition: 'all 0.2s',
          letterSpacing: '0.01em',
          boxShadow: '0 4px 16px rgba(10,61,43,0.3)',
        }}>
        {copied ? '✅ Copied to clipboard!' : '📤 Share Route'}
      </button>
    </div>
  );
}

export default ShareButton;

