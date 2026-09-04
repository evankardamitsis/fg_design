import Link from "next/link";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "frosted" | "dark";
  className?: string;
};

/**
 * Matches the Figma hero treatment: square corners, semibold, generous padding.
 * `frosted` is the translucent panel over photography; `solid` is the cream
 * panel with ink text used for the primary action.
 */
const variants = {
  solid: "bg-cream text-ink hover:bg-white",
  frosted: "bg-white/15 text-cream backdrop-blur-[2px] hover:bg-white/25",
  dark: "bg-ink text-cream hover:bg-ink/85",
};

export function Button({ href, children, variant = "solid", className = "" }: ButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center px-6 py-3.5 text-base font-semibold tracking-tight transition-colors duration-300 ease-out ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
