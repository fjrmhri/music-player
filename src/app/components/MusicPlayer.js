import { useRef, useState, useEffect } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Image as ImageIcon,
  Sun,
  Monitor,
  Cloud,
  Moon,
  CloudRain,
} from "lucide-react";

import { sceneVariants } from "./OverlayVideo";

export default function MusicPlayer({
  volume,
  setVolume,
  changeWallpaper,
  brightness,
  setBrightness,
  showOverlay,
  setShowOverlay,
  sceneIdx,
  setSceneIdx,
}) {
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  const play = () => {
    setPlaying(true);
    audioRef.current?.play();
  };
  const pause = () => {
    setPlaying(false);
    audioRef.current?.pause();
  };
  const next = () => {
    const nextIdx = (current + 1) % songs.length;
    setCurrent(nextIdx);
    setPlaying(true);
    setTimeout(() => audioRef.current?.play(), 100);
  };
  const prev = () => {
    const prevIdx = (current - 1 + songs.length) % songs.length;
    setCurrent(prevIdx);
    setPlaying(true);
    setTimeout(() => audioRef.current?.play(), 100);
  };

  const overlayLabel = showOverlay
    ? `< ${sceneVariants[sceneIdx].replace(".mp4", "")} >`
    : "< biasa >";

  const toggleOverlay = () => {
    if (!showOverlay) {
      setShowOverlay(true);
      setSceneIdx(0);
    } else {
      setSceneIdx((i) => (i + 1) % sceneVariants.length);
    }
  };
  const sceneIcons = {
    default: <Monitor size={18} />,
    day: <Sun size={18} />,
    night: <Moon size={18} />,
    "day-rain": <CloudRain size={18} />,
    "night-rain": <Cloud size={18} />,
  };

  const trackCollections = {
    chill: Array.from({ length: 30 }, (_, i) => ({
      title: `Chill ${i + 1}`,
      artist: "Chill Vibes",
      src: `/tracks/chill/chill_${i + 1}.mp3`,
    })),
    jazzy: Array.from({ length: 30 }, (_, i) => ({
      title: `Jazzy ${i + 1}`,
      artist: "Jazzy Mood",
      src: `/tracks/jazzy/jazzy_${i + 1}.mp3`,
    })),
    sleepy: Array.from({ length: 30 }, (_, i) => ({
      title: `Sleepy ${i + 1}`,
      artist: "Sleepy Time",
      src: `/tracks/sleepy/sleepy_${i + 1}.mp3`,
    })),
  };

  const songs = [
    ...trackCollections.chill,
    ...trackCollections.jazzy,
    ...trackCollections.sleepy,
  ];

  return (
    <div
      className="
    fixed left-1/2 -translate-x-1/2 bottom-2 md:bottom-3
    flex flex-col md:flex-row items-center md:items-center
    gap-2.5 md:gap-4
    w-[95%] sm:w-[90%] md:w-auto md:min-w-[320px]
    px-3 py-2.5 md:px-5 md:py-3
    bg-gradient-to-br from-black/70 via-black/50 to-black/30
    backdrop-blur-xl text-white
    rounded-xl shadow-xl border border-white/10
    transition-all duration-300 ease-in-out
    z-20
  "
    >
      <audio
        ref={audioRef}
        src={songs[current].src}
        onEnded={next}
        onPause={() => setPlaying(false)}
        onPlay={() => setPlaying(true)}
        autoPlay={playing}
      />

      {/* Info lagu */}
      <div className="text-center md:text-left w-full md:w-auto md:min-w-[120px]">
        <span className="block font-semibold text-xs md:text-sm leading-tight">
          {songs[current].title}
        </span>
        <span className="block text-[11px] text-gray-300">
          {songs[current].artist}
        </span>
      </div>

      {/* Kontrol musik */}
      <div className="flex justify-center items-center gap-2.5 md:gap-3 w-full md:w-auto">
        <button className="p-1.5 hover:bg-white/10 rounded-full" onClick={prev}>
          <SkipBack size={18} />
        </button>
        <button
          className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition"
          onClick={playing ? pause : play}
        >
          {playing ? <Pause size={18} /> : <Play size={18} />}
        </button>
        <button className="p-1.5 hover:bg-white/10 rounded-full" onClick={next}>
          <SkipForward size={18} />
        </button>
      </div>

      {/* Volume + Wallpaper + Brightness */}
      <div className="flex justify-center items-center gap-2.5 md:gap-3 w-full md:w-auto">
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          className="accent-white w-20 md:w-24"
        />

        <button
          className="p-1.5 hover:bg-white/10 rounded-full"
          onClick={changeWallpaper}
          title="Ganti Wallpaper"
        >
          <ImageIcon size={18} />
        </button>

        <div className="flex items-center gap-1.5">
          <Sun size={14} className="text-gray-300" />
          <input
            type="range"
            min={0.5}
            max={1.5}
            step={0.01}
            value={brightness}
            onChange={(e) => setBrightness(Number(e.target.value))}
            className="accent-white w-16 md:w-20"
          />
        </div>
      </div>

      {/* Tombol overlay toggle */}
      <div className="flex justify-center gap-1.5 w-full md:w-auto">
        <button
          onClick={() => setShowOverlay(false)}
          className={`p-1.5 rounded-full transition ${
            !showOverlay
              ? "bg-white/30 text-black"
              : "bg-white/10 hover:bg-white/20 text-white"
          }`}
          title="Biasa"
        >
          {sceneIcons.default}
        </button>

        {sceneVariants.map((scene, i) => {
          const label = scene.replace(".mp4", "");
          return (
            <button
              key={scene}
              onClick={() => {
                setShowOverlay(true);
                setSceneIdx(i);
              }}
              className={`p-1.5 rounded-full transition ${
                showOverlay && sceneIdx === i
                  ? "bg-white/30 text-black"
                  : "bg-white/10 hover:bg-white/20 text-white"
              }`}
              title={label}
            >
              {sceneIcons[label]}
            </button>
          );
        })}
      </div>
    </div>
  );
}
