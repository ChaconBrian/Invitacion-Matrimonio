import { useCallback, useState } from "react";
import Countdown from "./Countdown";
import RedThread from "./RedThread";

const scenes = [
  { at: 0, text: "A veces el destino encuentra la manera de unir dos historias." },
  { at: 2100, text: "Dos caminos distintos, un mismo destino." },
  { at: 4100, text: "Y desde entonces, elegimos caminar juntos." },
];

export default function WeddingIntro() {
  const [hasStarted, setHasStarted] = useState(false);
  const [sceneIndex, setSceneIndex] = useState(0);
  const [isFinal, setIsFinal] = useState(false);

  const handleProgress = useCallback((elapsed) => {
    const nextScene = scenes.findLastIndex((scene) => elapsed >= scene.at);
    setSceneIndex(nextScene);
    if (elapsed >= 5500) setIsFinal(true);
  }, []);

  const classes = ["wedding-intro", isFinal && "is-final"]
    .filter(Boolean)
    .join(" ");

  const startExperience = () => {
    window.dispatchEvent(new CustomEvent("start-wedding-music"));
    setHasStarted(true);
  };

  return (
    <main className={classes}>
      <div className="soft-light soft-light-one" />
      <div className="soft-light soft-light-two" />
      <div className="floral floral-top" />
      <div className="floral floral-bottom" />
      {hasStarted && <RedThread onProgress={handleProgress} />}

      {!hasStarted && (
        <div className="start-experience">
          <span className="start-monogram">B <i>&</i> L</span>
          <p>Tenemos una historia para contarte</p>
          <button type="button" onClick={startExperience}>
            <span aria-hidden="true">♪</span>
            Toca para comenzar
          </button>
          <small>Activa el sonido para vivir la experiencia</small>
        </div>
      )}

      <section className={`opening-copy ${!hasStarted || isFinal ? "is-hidden" : ""}`} aria-live="polite">
        <p key={sceneIndex}>{scenes[sceneIndex].text}</p>
      </section>

      <section className="main-content">
        <p className="main-phrase">
          Dos caminos, dos historias y un destino que decidió unirnos.
        </p>
        <h1>Brian <span>&</span> Luisa</h1>
        <div className="divider"><span /><strong>♥</strong><span /></div>
        <p className="date">10 · 10 · 2026</p>
        <Countdown />
        <div className="scroll-indicator" aria-hidden="true"><span /><span /></div>
        <a className="enter-button" href="#invitacion">
          Nuestra invitación <span>♡</span>
        </a>
      </section>
    </main>
  );
}
