import { useCallback, useState } from "react";
import Countdown from "./Countdown";
import RedThread from "./RedThread";

const scenes = [
  { at: 0, text: "A veces el destino solo necesita un hilo para unir dos historias." },
  { at: 3600, text: "Dos caminos distintos, un mismo destino." },
  { at: 7000, text: "Y se convierten en una sola historia." },
];

export default function WeddingIntro() {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [isFinal, setIsFinal] = useState(false);

  const handleProgress = useCallback((elapsed) => {
    const nextScene = scenes.findLastIndex((scene) => elapsed >= scene.at);
    setSceneIndex(nextScene);
    if (elapsed >= 8500) setIsFinal(true);
  }, []);

  const classes = ["wedding-intro", isFinal && "is-final"]
    .filter(Boolean)
    .join(" ");

  return (
    <main className={classes}>
      <div className="soft-light soft-light-one" />
      <div className="soft-light soft-light-two" />
      <div className="floral floral-top" />
      <div className="floral floral-bottom" />
      <RedThread onProgress={handleProgress} />

      <section className={`opening-copy ${isFinal ? "is-hidden" : ""}`} aria-live="polite">
        <p key={sceneIndex}>{scenes[sceneIndex].text}</p>
      </section>

      <section className="main-content">
        <p className="main-phrase">
          Dicen que un hilo rojo une a quienes están destinados a encontrarse.
        </p>
        <h1>Brian <span>&</span> Luisa</h1>
        <div className="divider"><span /><strong>♥</strong><span /></div>
        <p className="date">10 · 10 · 2026</p>
        <Countdown />
        <div className="scroll-indicator" aria-hidden="true"><span /><span /></div>
        <a className="enter-button" href="#invitacion">
          Nuestra invitación <span>♡</span>
        </a>
        <p className="footer-text">Prepárate para ser parte de nuestro mejor día.</p>
      </section>
    </main>
  );
}
