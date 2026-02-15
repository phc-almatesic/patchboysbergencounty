import Image from "next/image";

const SERVICE_IMAGES: Record<string, { src: string; alt: string }> = {
  "drywall-repair": { src: "/images/drywall-repair.jpg", alt: "Professional drywall repair in Bergen County NJ" },
  "ceiling-repair": { src: "/images/ceiling-repair.jpg", alt: "Ceiling repair services in Bergen County NJ" },
  "plaster-repair": { src: "/images/home-interior.jpg", alt: "Plaster repair for historic Bergen County homes" },
  "drywall-installation": { src: "/images/modern-room.jpg", alt: "New drywall installation in Bergen County NJ" },
  "popcorn-ceiling-removal": { src: "/images/ceiling-repair.jpg", alt: "Popcorn ceiling removal Bergen County NJ" },
  "texture-matching": { src: "/images/drywall-repair.jpg", alt: "Texture matching services Bergen County NJ" },
  "painting": { src: "/images/painting.jpg", alt: "Painting and touch-up services Bergen County NJ" },
};

export default function ServiceImage({ service, size = "large" }: { service: string; size?: "large" | "medium" | "small" }) {
  const dimensions = size === "large" ? "w-full aspect-[4/3]" : size === "medium" ? "w-full aspect-square" : "w-20 h-20";
  const config = SERVICE_IMAGES[service] || SERVICE_IMAGES["drywall-repair"];

  return (
    <div className={`${dimensions} relative rounded-2xl overflow-hidden`}>
      <Image
        src={config.src}
        alt={config.alt}
        fill
        className="object-cover"
        sizes={size === "large" ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 33vw"}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy/30 to-transparent" />
    </div>
  );
}
