import Image from "next/image";
import { useState } from "react";

export default function Wallpaper({ src }) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className="absolute inset-0 -z-20 w-full h-full flex items-center justify-center bg-gray-800 text-red-400 text-sm">
        Gagal memuat wallpaper: {src}
      </div>
    );
  }

  console.log("[Wallpaper] mencoba render:", src);

  return (
    <div className="absolute inset-0 z-0">
      <Image
        src={src}
        alt="Wallpaper"
        fill
        className="object-cover"
        priority
        onError={(e) => {
          console.error("[Wallpaper] ERROR load:", src, e);
          setError(true);
        }}
        onLoad={() => {
          console.log("[Wallpaper] berhasil load:", src);
        }}
      />
    </div>
  );
}
