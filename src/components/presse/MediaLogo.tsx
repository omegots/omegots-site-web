import Image from "next/image";

/** Logos des médias, fichiers fournis par les rédactions (public/presse/). */
const LOGOS: Record<string, { src: string; width: number; height: number }> = {
  "saint-nazaire news": {
    src: "/presse/saint-nazaire-news.png",
    width: 580,
    height: 292,
  },
  "ouest-france": { src: "/presse/ouest-france.png", width: 738, height: 246 },
};

export function MediaLogo({ media }: { media: string }) {
  const logo = LOGOS[media.toLowerCase()];
  if (!logo) return <span className="presse-media">{media}</span>;

  return (
    <span className="presse-logo">
      <Image
        src={logo.src}
        width={logo.width}
        height={logo.height}
        alt={media}
        sizes="140px"
      />
    </span>
  );
}
