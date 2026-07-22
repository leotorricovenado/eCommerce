import { useEffect, useState } from "react";

/** Cuenta regresiva simple; devuelve segundos restantes y mm:ss. */
export function useCountdown(fromSeconds: number) {
  const [seconds, setSeconds] = useState(fromSeconds);
  useEffect(() => {
    if (seconds <= 0) return;
    const t = setInterval(() => setSeconds((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, [seconds]);
  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");
  return { seconds, label: `${mm}:${ss}` };
}
