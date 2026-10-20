import { useEffect, useRef } from 'react';

// A single auto-dismissing toast notification.
// Props:
//   message  – text to display (falsy = hidden)
//   onDone   – called when the toast finishes so the parent can clear the message
export default function Toast({ message, onDone }) {
  const timerRef = useRef(null);

  useEffect(() => {
    if (!message) return;
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      onDone();
    }, 2800);
    return () => clearTimeout(timerRef.current);
  }, [message, onDone]);

  if (!message) return null;

  return (
    <div className="toast" role="status" aria-live="polite">
      <span className="toast-icon" aria-hidden="true">✓</span>
      {message}
    </div>
  );
}
