import { useRef, useEffect, useState } from "react";

const sceneVariants = [
  "day.mp4",
  "night.mp4",
  "day-rain.mp4",
  "night-rain.mp4",
];

export default function OverlayVideo({
  wallpaper,
  show,
  sceneIdx,
  setSceneIdx,
  muted = true,
  opacity = 0.5,
  brightness = 1,
}) {
  const videoRef = useRef(null);
  const [fadeIn, setFadeIn] = useState(false);

  const sceneName = wallpaper
    ? wallpaper.split("/").pop().split(".")[0]
    : "default";
  const src = `/scenes/${sceneName}/${sceneVariants[sceneIdx]}`;

  useEffect(() => {
    if (!videoRef.current) return;
    if (show) {
      videoRef.current.play().catch(() => {});
      setFadeIn(true);
    } else {
      videoRef.current.pause();
      setFadeIn(false);
    }
  }, [show, src]);

  if (!show) return null;

  return (
    <div
      className={`absolute inset-0 w-full h-full z-10 transition-opacity duration-1000 ${
        fadeIn ? "opacity-100" : "opacity-0"
      }`}
    >
      <video
        ref={videoRef}
        key={src}
        src={src}
        className="w-full h-full object-cover"
        autoPlay
        loop
        muted={muted}
        playsInline
        style={{
          background: "transparent",
          opacity,
          filter: `brightness(${brightness})`,
        }}
        onLoadedData={() => setFadeIn(true)}
      />
    </div>
  );
}

export { sceneVariants };
