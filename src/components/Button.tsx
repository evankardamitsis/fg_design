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
      className={`inline-flex min-h-12 items-center justify-center whitespace-nowrap px-6 py-3.5 text-base font-semibold tracking-tight transition-colors duration-200 ease-out active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current motion-reduce:transition-none ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
