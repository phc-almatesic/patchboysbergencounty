export default function ServiceImage({ service, size = "large" }: { service: string; size?: "large" | "medium" | "small" }) {
  const dimensions = size === "large" ? "w-full aspect-[4/3]" : size === "medium" ? "w-full aspect-square" : "w-20 h-20";

  const configs: Record<string, { gradient: string; emoji: string; label: string }> = {
    "drywall-repair": { gradient: "from-orange/10 via-amber-50 to-orange/5", emoji: "🔧", label: "Drywall Repair" },
    "ceiling-repair": { gradient: "from-blue-50 via-sky-50 to-blue-50", emoji: "🏠", label: "Ceiling Repair" },
    "plaster-repair": { gradient: "from-stone-50 via-amber-50 to-stone-50", emoji: "🏗️", label: "Plaster Repair" },
    "drywall-installation": { gradient: "from-emerald-50 via-green-50 to-emerald-50", emoji: "📐", label: "Drywall Installation" },
    "popcorn-ceiling-removal": { gradient: "from-violet-50 via-purple-50 to-violet-50", emoji: "✨", label: "Popcorn Ceiling Removal" },
    "texture-matching": { gradient: "from-rose-50 via-pink-50 to-rose-50", emoji: "🎨", label: "Texture Matching" },
    "painting": { gradient: "from-cyan-50 via-teal-50 to-cyan-50", emoji: "🖌️", label: "Painting & Touch-Up" },
  };

  const config = configs[service] || configs["drywall-repair"];

  return (
    <div className={`${dimensions} bg-gradient-to-br ${config.gradient} rounded-2xl flex items-center justify-center relative overflow-hidden border border-gray-100`}>
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%231B2D6E' fill-opacity='1'%3E%3Cpath d='M20 20h-4v-4h4v4zm0-20h-4v4h4V0zM0 20h4v-4H0v4z'/%3E%3C/g%3E%3C/svg%3E")`,
      }} />
      <div className="text-center relative z-10">
        <div className="text-7xl mb-3">{config.emoji}</div>
        <p className="text-navy font-bold text-lg">{config.label}</p>
        <p className="text-gray-500 text-sm mt-1">Bergen County, NJ</p>
      </div>
    </div>
  );
}
