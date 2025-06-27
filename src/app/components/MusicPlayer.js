import { useRef, useState } from "react";

const songs = [
  {
    title: "mood",
    artist: "lofi",
    src: "/songs/mood.mp3",
    cover: "/wallpapers/wallpaper.png",
  },
];

export default function MusicPlayer({
  wallpapers,
  wallpaperIdx,
  setWallpaperIdx,
  setVolume,
  volume,
  overlaySpeed,
  setOverlaySpeed,
  brightness,
  setBrightness,
}) {
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);

  const play = () => {
    setPlaying(true);
    audioRef.current.play();
  };

  const pause = () => {
    setPlaying(false);
    audioRef.current.pause();
  };

  const next = () => {
    const nextIdx = (current + 1) % songs.length;
    setCurrent(nextIdx);
    setPlaying(true);
    setTimeout(() => audioRef.current.play(), 100);
  };

  const prev = () => {
    const prevIdx = (current - 1 + songs.length) % songs.length;
    setCurrent(prevIdx);
    setPlaying(true);
    setTimeout(() => audioRef.current.play(), 100);
  };

  const nextWallpaper = () => {
    setWallpaperIdx((idx) => (idx + 1) % wallpapers.length);
  };

  const handleVolume = (e) => {
    const v = Number(e.target.value);
    setVolume(v);
    if (audioRef.current) audioRef.current.volume = v;
  };

  const handleOverlaySpeed = () => {
    const speeds = [1, 1.5, 2];
    const idx = speeds.indexOf(overlaySpeed);
    setOverlaySpeed(speeds[(idx + 1) % speeds.length]);
  };

  const handleBrightness = (e) => {
    setBrightness(Number(e.target.value));
  };

  return (
    <div className="fixed left-1/2 -translate-x-1/2 bottom-8 bg-black/80 text-white rounded-xl px-6 py-4 flex items-center gap-4 shadow-lg min-w-[320px] z-20">
      <audio
        ref={audioRef}
        src={songs[current].src}
        onEnded={next}
        onPause={() => setPlaying(false)}
        onPlay={() => setPlaying(true)}
        autoPlay={playing}
        volume={volume}
      />

      {}
      <div className="flex flex-col mr-4">
        <span className="font-semibold">{songs[current].title}</span>
        <span className="text-xs text-gray-300">{songs[current].artist}</span>
      </div>

      {}
      <button className="p-2 hover:bg-white/10 rounded-full" onClick={prev} aria-label="Previous">
        <svg width="24" height="24" fill="none">
          <path d="M15 18V6M6 12l9-6v12l-9-6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <button
        className="p-2 hover:bg-white/10 rounded-full"
        onClick={playing ? pause : play}
        aria-label={playing ? "Pause" : "Play"}
      >
        {playing ? (
          <svg width="24" height="24" fill="none">
            <rect x="6" y="6" width="4" height="12" rx="1" fill="currentColor" />
            <rect x="14" y="6" width="4" height="12" rx="1" fill="currentColor" />
          </svg>
        ) : (
          <svg width="24" height="24" fill="none">
            <path d="M8 5v14l11-7L8 5z" fill="currentColor" />
          </svg>
        )}
      </button>

      <button className="p-2 hover:bg-white/10 rounded-full" onClick={next} aria-label="Next">
        <svg width="24" height="24" fill="none">
          <path d="M9 18V6m9 6l-9 6V6l9 6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {}
      <button
        className="p-2 hover:bg-white/10 rounded-full"
        onClick={nextWallpaper}
        aria-label="Ganti Wallpaper"
        title="Ganti Wallpaper"
      >
        <svg width="24" height="24" fill="none">
          <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
          <circle cx="8.5" cy="12.5" r="1.5" fill="currentColor" />
          <path d="M21 19l-5.5-7-4.5 6-3-4-4 5" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        </svg>
      </button>

      {}
      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={volume}
        onChange={handleVolume}
        className="mx-2 accent-white"
        style={{ width: 80 }}
        aria-label="Volume"
      />

      {}
      <button
        className="p-2 hover:bg-white/10 rounded-full flex items-center"
        onClick={handleOverlaySpeed}
        aria-label="Kecepatan Overlay"
        title="Kecepatan Overlay"
      >
        <svg width="24" height="24" fill="none">
          <path d="M12 21a9 9 0 1 1 9-9" stroke="currentColor" strokeWidth="2" />
          <path d="M12 12v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" />
        </svg>
        <span className="ml-1 text-xs">{overlaySpeed}x</span>
      </button>

      {}
      <div className="flex items-center gap-2 ml-2">
        <button
          className="p-2 hover:bg-white/10 rounded-full"
          tabIndex={-1}
          aria-label="Brightness"
          title="Brightness"
          disabled
        >
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" />
            <path
              d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
        <input
          type="range"
          min={0.5}
          max={1.5}
          step={0.01}
          value={brightness}
          onChange={handleBrightness}
          className="accent-white"
          style={{ width: 70 }}
          aria-label="Brightness"
        />
      </div>
    </div>
  );
}
