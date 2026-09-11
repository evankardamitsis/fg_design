import Link from "next/link";

export function PortfolioCategoryNav({ active }: { active: "residential" | "commercial" }) {
  const categories = [
    { key: "residential" as const, label: "Residential", href: "/portfolio" },
    { key: "commercial" as const, label: "Commercial", href: "/portfolio/commercial" },
  ];

  return (
    <nav aria-label="Portfolio categories" className="mt-12 flex gap-8 border-t border-ink/12 pt-5">
      {categories.map((category) => {
        const isActive = category.key === active;

        return (
          <Link
            key={category.key}
            href={category.href}
            aria-current={isActive ? "page" : undefined}
            className={`relative pb-2 text-sm transition-colors ${
              isActive
                ? "text-ink after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-ink"
                : "text-ink/48 hover:text-ink"
            }`}
          >
            {category.label}
          </Link>
        );
      })}
    </nav>
  );
}
