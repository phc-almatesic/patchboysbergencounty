import Image from "next/image";
import { SERVICES } from "@/lib/data";

export default function ServiceImage({ service, size = "large" }: { service: string; size?: "large" | "medium" | "small" }) {
  const dimensions = size === "large" ? "w-full aspect-[4/3]" : size === "medium" ? "w-full aspect-square" : "w-20 h-20";
  const match = SERVICES.find((s) => s.slug === service);
  const title = match?.title ?? "Drywall repair";
  const src = `/images/${service}.jpg`;
  const alt = `${title} in Bergen County, NJ`;

  return (
    <div className={`${dimensions} relative rounded-2xl overflow-hidden`}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes={size === "large" ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 33vw"}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy/30 to-transparent" />
    </div>
  );
}
