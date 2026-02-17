import Link from "next/link";

interface BlogCardProps {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  readingTime: number;
  categories: string[];
}

export default function BlogCard({ slug, title, date, excerpt, readingTime, categories }: BlogCardProps) {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden flex flex-col">
      <div className="p-6 flex flex-col flex-1">
        <div className="flex flex-wrap gap-2 mb-3">
          {categories.map((cat) => (
            <span
              key={cat}
              className="bg-orange/10 text-orange text-xs font-semibold px-2.5 py-1 rounded-full"
            >
              {cat}
            </span>
          ))}
        </div>
        <h3 className="text-xl font-bold text-navy mb-2">
          <Link
            href={`/blog/${slug}`}
            className="hover:text-orange focus:text-orange focus:outline-2 focus:outline-offset-2 focus:outline-orange rounded transition-colors"
          >
            {title}
          </Link>
        </h3>
        <p className="text-gray-600 text-sm mb-4 flex-1">{excerpt}</p>
        <div className="flex items-center justify-between text-sm text-gray-400">
          <time dateTime={date}>{formattedDate}</time>
          <span>{readingTime} min read</span>
        </div>
      </div>
    </article>
  );
}
