import React, { useState, useEffect } from 'react';

const MESSAGES = [
  'Contacting city database',
  'Scanning nearby shelters',
  'Analyzing road conditions',
  'Plotting safest path with AI',
  'Gathering real-time alerts',
];

export default function LoadingMessage() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const handle = setInterval(() => {
      setIdx((i) => (i + 1) % MESSAGES.length);
    }, 2000);

    return () => clearInterval(handle);
  }, []);

  return (
    <p style={{ fontSize: '1rem', fontWeight: 500 }}>{MESSAGES[idx]}</p>
  );
}
