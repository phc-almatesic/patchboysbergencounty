import type { MetadataRoute } from "next";
import { SERVICES, BERGEN_TOWNS } from "@/lib/data";

export const dynamic = "force-static";

const BASE_URL = "https://www.bergencountypatchboys.com";
const LAST_UPDATED = new Date("2026-02-16");

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: `${BASE_URL}/`, lastModified: LAST_UPDATED, changeFrequency: "weekly" as const, priority: 1 },
    { url: `${BASE_URL}/services/`, lastModified: LAST_UPDATED, changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${BASE_URL}/areas/`, lastModified: LAST_UPDATED, changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${BASE_URL}/about/`, lastModified: LAST_UPDATED, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${BASE_URL}/contact/`, lastModified: LAST_UPDATED, changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${BASE_URL}/gallery/`, lastModified: LAST_UPDATED, changeFrequency: "monthly" as const, priority: 0.6 },
  ];

  const servicePages = SERVICES.map((s) => ({
    url: `${BASE_URL}/services/${s.slug}/`,
    lastModified: LAST_UPDATED,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const townPages = BERGEN_TOWNS.map((t) => ({
    url: `${BASE_URL}/areas/${t.slug}/`,
    lastModified: LAST_UPDATED,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...servicePages, ...townPages];
}
