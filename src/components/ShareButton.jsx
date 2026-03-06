import React, { useState } from 'react';

function ShareButton({ route, coords }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const text = [
      `I'm evacuating via ${route.route_name || 'the safest route'}.`,
      `Estimated arrival at shelter: ~${route.estimated_minutes} minutes.`,
      `Shelter: ${route.shelter?.name || ''} ${route.shelter?.address ? `(${route.shelter.address})` : ''}`.trim(),
      coords
        ? `Track: https://maps.google.com/?q=${coords.lat.toFixed(
            5
          )},${coords.lng.toFixed(5)}`
        : ''
    ]
      .filter(Boolean)
      .join('\n');

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy route', err);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="mt-1 w-full h-11 rounded-xl bg-accent text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-md shadow-emerald-500/30 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-accent"
    >
      <span>Share My Route</span>
      <span className="text-sm">🔗</span>
      {copied && <span className="text-[11px] text-emerald-50">Copied</span>}
    </button>
  );
}

export default ShareButton;

