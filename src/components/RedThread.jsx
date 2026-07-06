import { useEffect, useRef } from "react";

const THREAD_DURATION = 7000;

function easeInOutCubic(value) {
  return value < 0.5
    ? 4 * value ** 3
    : 1 - Math.pow(-2 * value + 2, 3) / 2;
}

export default function RedThread({ onProgress }) {
  const leftPathRef = useRef(null);
  const rightPathRef = useRef(null);
  const leftHeadRef = useRef(null);
  const rightHeadRef = useRef(null);
  const centerGlowRef = useRef(null);

  useEffect(() => {
    const paths = [leftPathRef.current, rightPathRef.current];
    const heads = [leftHeadRef.current, rightHeadRef.current];
    const lengths = paths.map((path) => path.getTotalLength());
    let animationFrame;
    let animationStart;

    paths.forEach((path, index) => {
      path.style.strokeDasharray = lengths[index];
      path.style.strokeDashoffset = lengths[index];
    });

    const animate = (timestamp) => {
      animationStart ??= timestamp;
      const elapsed = timestamp - animationStart;
      const rawProgress = Math.min(elapsed / THREAD_DURATION, 1);
      const progress = easeInOutCubic(rawProgress);

      paths.forEach((path, index) => {
        const currentLength = lengths[index] * progress;
        const point = path.getPointAtLength(currentLength);
        path.style.strokeDashoffset = lengths[index] - currentLength;
        heads[index].style.opacity = "1";
        heads[index].setAttribute("cx", point.x);
        heads[index].setAttribute("cy", point.y);
      });

      onProgress(elapsed);

      if (rawProgress >= 0.97) {
        centerGlowRef.current.classList.add("is-active");
      }

      if (rawProgress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        heads.forEach((head) => (head.style.opacity = "0"));
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [onProgress]);

  return (
    <div className="thread-svg-container" aria-hidden="true">
      <svg className="thread-svg" viewBox="0 0 390 844" preserveAspectRatio="xMidYMid slice">
        <defs>
          <filter id="threadGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="7" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        <path ref={leftPathRef} className="thread-path" d="M 195 250 C 178 208, 112 206, 98 263 C 82 330, 142 373, 195 413" />
        <path ref={rightPathRef} className="thread-path" d="M 195 250 C 212 208, 278 206, 292 263 C 308 330, 248 373, 195 413" />
        <circle ref={leftHeadRef} className="thread-head" r="5" cx="195" cy="250" />
        <circle ref={rightHeadRef} className="thread-head" r="5" cx="195" cy="250" />
        <circle ref={centerGlowRef} className="center-glow" r="7" cx="195" cy="413" />
        <circle className="spark spark-1" cx="58" cy="150" r="1.4" />
        <circle className="spark spark-2" cx="320" cy="190" r="1.3" />
        <circle className="spark spark-3" cx="85" cy="620" r="1.3" />
        <circle className="spark spark-4" cx="315" cy="610" r="1.5" />
        <circle className="spark spark-5" cx="210" cy="210" r="1.2" />
      </svg>
    </div>
  );
}
