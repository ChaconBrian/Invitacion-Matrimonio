import { useCountdown } from "../hooks/useCountdown";

const labels = {
  days: "Días",
  hours: "Horas",
  minutes: "Minutos",
  seconds: "Segundos",
};

export default function Countdown() {
  const timeLeft = useCountdown();

  return (
    <section className="countdown" aria-label="Cuenta regresiva para la boda">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit}>
          <strong>{value}</strong>
          <span>{labels[unit]}</span>
        </div>
      ))}
    </section>
  );
}
