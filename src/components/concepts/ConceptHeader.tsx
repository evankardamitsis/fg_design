import Image from "next/image";
import Link from "next/link";

const links = [
  { href: "/portfolio", label: "Projects" },
  { href: "/studio", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function ConceptHeader({
  homeHref,
  tone = "light",
}: {
  homeHref: string;
  tone?: "light" | "dark";
}) {
  const isLight = tone === "light";
  const textTone = isLight ? "text-[#f0f0ec]" : "text-[#1c1b1b]";
  const menuTone = isLight
    ? "border-white/15 bg-[#111315] text-[#f0f0ec]"
    : "border-black/10 bg-[#f4f1ee] text-[#1c1b1b]";

  return (
    <header className={`absolute inset-x-0 top-0 z-30 ${textTone}`}>
      <div className="mx-auto flex h-24 max-w-[1440px] items-center px-5 md:px-10 lg:px-14">
        <Link
          href={homeHref}
          aria-label="FG Design Partners concept home"
          className="-ml-2 flex min-h-11 items-center px-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current"
        >
          <Image
            src={isLight ? "/logo-white.png" : "/logo-dark.png"}
            alt="FG Design Partners"
            width={1111}
            height={788}
            priority
            className="h-[3.4rem] w-auto md:h-16"
          />
        </Link>

        <nav aria-label="Primary" className="ml-auto hidden items-center gap-8 text-sm font-medium md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex min-h-11 items-center whitespace-nowrap transition-opacity duration-200 hover:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <details className="relative ml-auto md:hidden">
          <summary className="flex min-h-11 cursor-pointer list-none items-center px-2 text-sm font-medium marker:content-none [&::-webkit-details-marker]:hidden">
            Menu
          </summary>
          <nav
            aria-label="Mobile primary"
            className={`absolute right-0 top-full mt-2 min-w-48 border p-2 ${menuTone}`}
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex min-h-11 items-center px-3 text-sm transition-opacity duration-200 hover:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-current"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </details>
      </div>
    </header>
  );
}
