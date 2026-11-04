import { useCallback, useEffect, useState } from 'react';

function RealTimeClock() {
  const [time, setTime] = useState(new Date());
  const [isRunning, setIsRunning] = useState(true);
  const [format24Hour, setFormat24Hour] = useState(false);

  const formatTime = useCallback(
    (date) => {
      const options = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: !format24Hour,
      };

      return date.toLocaleTimeString('en-US', options);
    },
    [format24Hour],
  );

  useEffect(() => {
    if (!isRunning) return undefined;

    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    document.title = `Clock - ${formatTime(time)}`;

    return () => {
      document.title = 'React App';
    };
  }, [time, formatTime]);

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="clock-container">
      <div className="date">{formatDate(time)}</div>
      <div className="time">{formatTime(time)}</div>

      <div className="controls">
        <button type="button" onClick={() => setIsRunning((previous) => !previous)}>
          {isRunning ? 'Pause' : 'Resume'}
        </button>
        <label>
          <input
            type="checkbox"
            checked={format24Hour}
            onChange={(e) => setFormat24Hour(e.target.checked)}
          />
          24-Hour format
        </label>
      </div>

      <div className="status">Clock is {isRunning ? 'running' : 'paused'}</div>
    </div>
  );
}

export default RealTimeClock;