type LogoProps = {
  variant?: "color" | "white";
  className?: string;
};

export function Logo({ variant = "color", className = "logo" }: LogoProps) {
  const src =
    variant === "white"
      ? "/logo/omegots-logo-horizontal-blanc.svg"
      : "/logo/omegots-logo-horizontal-sans-ville.svg";

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt="O'Mégots" width={180} height={51} className={className} />
  );
}
