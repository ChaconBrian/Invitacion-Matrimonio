import { useEffect, useRef, useState } from "react";

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "0:00";
  const minutes = Math.floor(seconds / 60);
  return `${minutes}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;
}

export default function SpotifyPlayer() {
  const audioRef = useRef(null);
  const [isPaused, setIsPaused] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;

    const startMusic = () => {
      audio.currentTime = 0;
      setPosition(0);
      audio.play().catch(() => setIsPaused(true));
    };

    const updateProgress = () => {
      setPosition(audio.currentTime);
      setDuration(audio.duration || 0);
      setIsPaused(audio.paused);
    };

    const resetBeforeLeaving = () => {
      audio.pause();
      audio.currentTime = 0;
    };

    window.addEventListener("start-wedding-music", startMusic);
    window.addEventListener("beforeunload", resetBeforeLeaving);
    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", updateProgress);
    audio.addEventListener("play", updateProgress);
    audio.addEventListener("pause", updateProgress);
    audio.addEventListener("ended", updateProgress);

    return () => {
      window.removeEventListener("start-wedding-music", startMusic);
      window.removeEventListener("beforeunload", resetBeforeLeaving);
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", updateProgress);
      audio.removeEventListener("play", updateProgress);
      audio.removeEventListener("pause", updateProgress);
      audio.removeEventListener("ended", updateProgress);
    };
  }, []);

  const togglePlayback = () => {
    const audio = audioRef.current;
    if (audio.paused) audio.play();
    else audio.pause();
  };

  const restart = () => {
    audioRef.current.currentTime = 0;
    audioRef.current.play();
  };

  const seek = (event) => {
    const nextPosition = Number(event.target.value);
    audioRef.current.currentTime = nextPosition;
    setPosition(nextPosition);
  };

  const toggleMute = () => {
    const nextMuted = !audioRef.current.muted;
    audioRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  return (
    <section className="music-section" aria-label="Canción de nuestra historia">
      <p className="eyebrow">Del esposo para la esposa</p>
      <h2>Para ti, Luisa</h2>
      <p className="music-dedication">Elegí esta canción para dedicártela y celebrar la historia que hoy nos trae hasta aquí. — Brian</p>

      <div className="music-control">
        <div className="music-track-copy">
          <strong>La Boda</strong>
          <span>Camilo</span>
        </div>
        <input
          type="range"
          min="0"
          max={duration || 1}
          value={Math.min(position, duration || 1)}
          onChange={seek}
          aria-label="Posición de la canción"
        />
        <div className="music-times"><span>{formatTime(position)}</span><span>{formatTime(duration)}</span></div>
        <div className="music-actions">
          <button type="button" onClick={restart} aria-label="Reiniciar canción">↶</button>
          <button type="button" className="music-play" onClick={togglePlayback} aria-label={isPaused ? "Reproducir" : "Pausar"}>
            {isPaused ? "▶" : "Ⅱ"}
          </button>
          <button type="button" onClick={toggleMute} aria-label={isMuted ? "Activar sonido" : "Silenciar"}>
            {isMuted ? "×" : "♪"}
          </button>
        </div>
      </div>
      <p className="music-instruction">Puedes pausarla o volver a escucharla cuando quieras</p>
      <audio ref={audioRef} src="/audio/la-boda-camilo.mp3" preload="metadata" />
    </section>
  );
}
