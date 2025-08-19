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
  ChevronUp,
  ChevronDown,
  Volume2,
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
  const [effectIdx, setEffectIdx] = useState(0);

  const audioRef = useRef(null);
  const effectRef = useRef(null);

  const effectSounds = [
    { label: "Biasa", src: null },
    { label: "Birds", src: "/effects/birds.mp3" },
    { label: "Campfire", src: "/effects/campfire.mp3" },
    { label: "City Traffic", src: "/effects/city-traffic.mp3" },
    { label: "Fireplace", src: "/effects/fireplace.mp3" },
    { label: "Forest Night", src: "/effects/forest-night.mp3" },
    { label: "Keyboard", src: "/effects/keyboard.mp3" },
    { label: "Ocean", src: "/effects/ocean.mp3" },
    { label: "Rain City", src: "/effects/rain-city.mp3" },
    { label: "Rain Forest", src: "/effects/rain-forest.mp3" },
    { label: "Thunders", src: "/effects/thunders.mp3" },
    { label: "Waves", src: "/effects/waves.mp3" },
    { label: "Window Rain", src: "/effects/window-rain.mp3" },
  ];

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
    if (effectRef.current) effectRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    if (!effectRef.current) return;
    if (effectIdx === 0) {
      effectRef.current.pause();
    } else {
      effectRef.current.src = effectSounds[effectIdx].src;
      effectRef.current.play().catch(() => {});
    }
  }, [effectIdx]);

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

  const sceneIcons = {
    default: <Monitor size={16} />,
    day: <Sun size={16} />,
    night: <Moon size={16} />,
    "day-rain": <CloudRain size={16} />,
    "night-rain": <Cloud size={16} />,
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
      fixed bottom-3 left-1/2 -translate-x-1/2
      flex flex-col md:flex-row items-center
      gap-3 md:gap-4
      w-[92%] sm:w-[85%] md:w-auto md:min-w-[320px]
      px-4 py-3
      rounded-2xl
      backdrop-blur-xl bg-black/40 border border-white/10
      shadow-[0_8px_32px_rgba(0,0,0,0.6)]
      transition-all duration-300
      z-20 text-sm
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

      {/* efek */}
      <audio ref={effectRef} loop />

      {/* lagu */}
      <div className="text-center md:text-left w-full md:w-auto truncate max-w-[160px]">
        <p className="font-semibold text-white text-sm drop-shadow truncate">
          {songs[current].title}
        </p>
        <p className="text-[11px] text-white/70 truncate">
          {songs[current].artist}
        </p>
      </div>

      {/* control musik*/}
      <div className="flex justify-center items-center gap-2">
        <button
          className="p-1.5 hover:bg-white/10 rounded-full transition"
          onClick={prev}
        >
          <SkipBack size={16} className="text-white/80" />
        </button>
        <button
          className="p-3 rounded-full bg-gradient-to-br from-gray-200/70 to-gray-400/30 hover:from-white hover:to-white/70 text-black shadow-md transition transform hover:scale-105"
          onClick={playing ? pause : play}
        >
          {playing ? <Pause size={18} /> : <Play size={18} />}
        </button>
        <button
          className="p-1.5 hover:bg-white/10 rounded-full transition"
          onClick={next}
        >
          <SkipForward size={16} className="text-white/80" />
        </button>
      </div>

      {/* volume */}
      <div className="flex items-center gap-1">
        <Volume2 size={14} className="text-white/70" />
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          className="w-20 md:w-24 h-1 accent-white/80 bg-white/20 rounded-full"
        />
      </div>

      {/* wallpaper + brightness */}
      <div className="flex items-center gap-2">
        <button
          className="p-1.5 hover:bg-white/10 rounded-full transition"
          onClick={changeWallpaper}
          title="Ganti Wallpaper"
        >
          <ImageIcon size={16} className="text-white/80" />
        </button>

        <div className="flex items-center gap-1">
          <Sun size={12} className="text-white/70" />
          <input
            type="range"
            min={0.5}
            max={1.5}
            step={0.01}
            value={brightness}
            onChange={(e) => setBrightness(Number(e.target.value))}
            className="w-14 md:w-16 h-1 accent-white/80 bg-white/20 rounded-full"
          />
        </div>
      </div>

      {/* overlay + efek*/}
      <div className="flex items-center gap-3">
        {/* Overlay */}
        <div className="flex gap-1">
          <button
            onClick={() => setShowOverlay(false)}
            className={`p-1.5 rounded-full transition ${
              !showOverlay
                ? "bg-white/20 text-white"
                : "bg-white/5 hover:bg-white/10 text-white"
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
                    ? "bg-white/20 text-white"
                    : "bg-white/5 hover:bg-white/10 text-white"
                }`}
                title={label}
              >
                {sceneIcons[label]}
              </button>
            );
          })}
        </div>

        {/* efek*/}
        <div className="flex flex-col items-center">
          <button
            className="p-1 hover:bg-white/10 rounded-full transition"
            onClick={() =>
              setEffectIdx((prev) =>
                prev === 0 ? effectSounds.length - 1 : prev - 1
              )
            }
            title="Previous Effect"
          >
            <ChevronUp size={14} className="text-white/80" />
          </button>
          <span className="text-[10px] text-white/70 truncate max-w-[60px]">
            {effectSounds[effectIdx].label}
          </span>
          <button
            className="p-1 hover:bg-white/10 rounded-full transition"
            onClick={() =>
              setEffectIdx((prev) => (prev + 1) % effectSounds.length)
            }
            title="Next Effect"
          >
            <ChevronDown size={14} className="text-white/80" />
          </button>
        </div>
      </div>
    </div>
  );
}
