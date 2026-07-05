import { useEffect, useState } from "react";

const WEDDING_DATE = new Date("2026-10-10T00:00:00-05:00").getTime();

function getTimeLeft() {
  const difference = Math.max(WEDDING_DATE - Date.now(), 0);
  const totalSeconds = Math.floor(difference / 1000);

  return {
    days: String(Math.floor(totalSeconds / 86400)),
    hours: String(Math.floor((totalSeconds % 86400) / 3600)).padStart(2, "0"),
    minutes: String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0"),
    seconds: String(totalSeconds % 60).padStart(2, "0"),
  };
}

export function useCountdown() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  useEffect(() => {
    const timer = window.setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  return timeLeft;
}
