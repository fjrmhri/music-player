"use client";
import { useState } from "react";
import Wallpaper from "./components/Wallpaper";
import OverlayVideo from "./components/OverlayVideo";
import MusicPlayer from "./components/MusicPlayer";

const wallpapers = [
  "/wallpapers/wallpaper1.jpg",
  "/wallpapers/wallpaper2.jpg",
  "/wallpapers/wallpaper3.jpg",
  "/wallpapers/wallpaper4.jpg",
  "/wallpapers/wallpaper5.jpg",
  "/wallpapers/wallpaper6.jpg",
  "/wallpapers/wallpaper7.jpg",
];

export default function Home() {
  const [wallpaperIdx, setWallpaperIdx] = useState(0);
  const [showOverlay, setShowOverlay] = useState(false);
  const [volume, setVolume] = useState(1);
  const [overlaySpeed, setOverlaySpeed] = useState(1);
  const [brightness, setBrightness] = useState(1);

  return (
    <div className="relative min-h-screen flex flex-col justify-end items-center overflow-hidden">
      <div style={{ filter: `brightness(${brightness})` }} className="absolute inset-0 w-full h-full -z-10">
        <Wallpaper src={wallpapers[wallpaperIdx]} />
      </div>
      <OverlayVideo src="/videos/overlay.webm" show={showOverlay} playbackRate={overlaySpeed} />
      <button
        className="absolute top-6 right-6 z-30 w-8 h-8 rounded-full bg-white/30 border border-white shadow transition"
        onClick={() => setShowOverlay((v) => !v)}
        aria-label={showOverlay ? "Matikan Overlay" : "Tampilkan Overlay"}
      />
      <MusicPlayer
        wallpapers={wallpapers}
        wallpaperIdx={wallpaperIdx}
        setWallpaperIdx={setWallpaperIdx}
        setVolume={setVolume}
        volume={volume}
        overlaySpeed={overlaySpeed}
        setOverlaySpeed={setOverlaySpeed}
        brightness={brightness}
        setBrightness={setBrightness}
      />
           {}
      <footer className="text-white text-xs mt-2 mb-4 opacity-60 z-20">
        &copy; {new Date().getFullYear()} fjrmhri
      </footer>
    </div>
  );
}
