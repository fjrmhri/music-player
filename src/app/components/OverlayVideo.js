import { useRef, useEffect } from "react";

export default function OverlayVideo({ src, show, muted = true, opacity = 1, playbackRate = 1 }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  useEffect(() => {
    if (show && videoRef.current) {
      videoRef.current.play();
    } else if (videoRef.current) {
      videoRef.current.pause();
    }
  }, [show]);

  return show ? (
    <video
      ref={videoRef}
      src={src}
      className="absolute inset-0 w-full h-full object-cover pointer-events-none z-10"
      autoPlay
      loop
      muted={muted}
      playsInline
      style={{ background: "transparent", opacity:0.5 }}
    />
  ) : null;
}