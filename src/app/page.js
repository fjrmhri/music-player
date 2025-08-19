"use client";
import { useState } from "react";
import MusicPlayer from "./components/Music/MusicPlayer";
import OverlayVideo, { sceneVariants } from "./components/Music/OverlayVideo";
import Wallpaper from "./components/Music/Wallpaper";

const wallpapers = [
  "/thumbnails/chill-vibes.png",
  "/thumbnails/cozy-studio.png",
  "/thumbnails/honolulu.png",
  "/thumbnails/in-the-woods.jpg",
  "/thumbnails/sea-side.jpg",
  "/thumbnails/seoul.png",
  "/thumbnails/sunset-camping.png",
  "/thumbnails/tree-house.jpeg",
];

export default function Page() {
  const [wallpaperIdx, setWallpaperIdx] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [brightness, setBrightness] = useState(1);
  const [showOverlay, setShowOverlay] = useState(false);
  const [sceneIdx, setSceneIdx] = useState(0);

  const changeWallpaper = () => {
    setWallpaperIdx((i) => (i + 1) % wallpapers.length);
    setSceneIdx(0);
    setShowOverlay(false);
  };

  return (
    <main className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {}
      <div
        style={{ filter: `brightness(${brightness})` }}
        className="absolute inset-0 -z-20
    sm:blur-none sm:brightness-110
    md:blur-0 md:brightness-100"
      >
        <Wallpaper src={wallpapers[wallpaperIdx]} />
      </div>

      {}
      {showOverlay && (
        <OverlayVideo
          wallpaper={wallpapers[wallpaperIdx]}
          show={showOverlay}
          sceneIdx={sceneIdx}
          setSceneIdx={setSceneIdx}
          opacity={1}
          brightness={brightness}
        />
      )}

      {}
      <MusicPlayer
        volume={volume}
        setVolume={setVolume}
        changeWallpaper={changeWallpaper}
        showOverlay={showOverlay}
        setShowOverlay={setShowOverlay}
        sceneIdx={sceneIdx}
        setSceneIdx={setSceneIdx}
        brightness={brightness}
        setBrightness={setBrightness}
      />
    </main>
  );
}
