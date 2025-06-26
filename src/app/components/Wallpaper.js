import Image from "next/image";

export default function Wallpaper({ src }) {
  return (
    <div className="absolute inset-0 -z-10 w-full h-full overflow-hidden">
      <Image
        src={src}
        alt="Wallpaper"
        fill
        className="object-cover w-full h-full"
        priority
      />
    </div>
  );
}