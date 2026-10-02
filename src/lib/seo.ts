import type { Metadata } from "next";

export const SITE_URL = "https://www.fgdpartners.com";
export const SITE_NAME = "FG Design Partners";

const DEFAULT_IMAGE = {
  url: "/og.jpg",
  width: 1200,
  height: 630,
  alt: "FG Design Partners: turnkey design and build for London homes",
};

/**
 * Social share image for a project photo. Contentful photos are cropped to
 * 1200x630 by its image API; local files are passed through as they are.
 */
export function shareImage(src: string | undefined, alt: string) {
  if (!src) return undefined;
  if (src.includes("images.ctfassets.net")) {
    const url = new URL(src);
    url.search = new URLSearchParams({ w: "1200", h: "630", fit: "fill", f: "center", fm: "jpg", q: "80" }).toString();
    return { url: url.toString(), width: 1200, height: 630, alt };
  }
  return { url: src, alt };
}

/**
 * Title, description, canonical URL and matching Open Graph / Twitter tags for
 * one page. Next replaces (not merges) a page's openGraph with the layout's, so
 * every page builds the full set here.
 */
export function pageMetadata({
  title,
  description,
  path,
  image,
}: {
  title: string;
  description: string;
  path: string;
  image?: { url: string; width?: number; height?: number; alt: string };
}): Metadata {
  const images = [image ?? DEFAULT_IMAGE];
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: "en_GB",
      url: path,
      title,
      description,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: images.map((item) => item.url),
    },
  };
}
