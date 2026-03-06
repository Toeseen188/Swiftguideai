import React from 'react';

function ErrorBanner({ message, onRetry }) {
  const showRetry =
    typeof onRetry === 'function' &&
    (message?.toLowerCase().includes('try again') ||
      message?.toLowerCase().includes('longer than usual'));

  return (
    <div className="rounded-xl border border-danger/30 bg-red-50 px-3 py-2 text-xs text-danger flex items-start justify-between gap-2">
      <div>
        <p className="font-semibold">Something is not right.</p>
        <p className="mt-0.5">{message}</p>
      </div>
      {showRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="shrink-0 h-8 px-3 rounded-full bg-danger text-white text-[11px] font-semibold focus:outline-none focus:ring-2 focus:ring-danger/60"
        >
          Retry
        </button>
      )}
    </div>
  );
}

export default ErrorBanner;

