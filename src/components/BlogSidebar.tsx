import Link from "next/link";
import TrackedLink from "@/components/TrackedLink";
import { BUSINESS } from "@/lib/data";
import { slugifyCategory, type BlogPost } from "@/lib/blog";

interface BlogSidebarProps {
  recentPosts: BlogPost[];
  categories: string[];
  currentSlug?: string;
}

export default function BlogSidebar({ recentPosts, categories, currentSlug }: BlogSidebarProps) {
  return (
    <div className="space-y-6">
      {/* Recent Posts */}
      <div className="bg-navy rounded-xl p-6 text-white">
        <h3 className="text-xl font-bold mb-4">Recent Posts</h3>
        <ul className="space-y-3">
          {recentPosts
            .filter((p) => p.slug !== currentSlug)
            .slice(0, 5)
            .map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-gray-300 hover:text-orange focus:text-orange focus:outline-2 focus:outline-offset-2 focus:outline-orange rounded px-1 transition-colors text-sm leading-snug block"
                >
                  {post.title}
                </Link>
              </li>
            ))}
        </ul>
      </div>

      {/* Categories */}
      {categories.length > 0 && (
        <div className="bg-gray-warm rounded-xl p-6">
          <h3 className="text-xl font-bold text-navy mb-4">Categories</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`/blog/category/${slugifyCategory(cat)}`}
                className="bg-white text-navy font-medium px-3 py-1.5 rounded-lg text-sm hover:bg-orange hover:text-white focus:outline-2 focus:outline-offset-2 focus:outline-orange transition-colors"
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="bg-orange rounded-xl p-6 text-white text-center">
        <h3 className="text-xl font-bold mb-2">Need Help Now?</h3>
        <p className="text-white/90 mb-4 text-sm">Call for same-day service</p>
        <TrackedLink
          href={`tel:${BUSINESS.phone}`}
          event="phone_click"
          params={{ location: "blog_sidebar" }}
          className="block bg-white text-orange font-bold py-3 rounded-lg hover:bg-gray-100 focus:outline-2 focus:outline-offset-2 focus:outline-orange transition-colors"
        >
          {BUSINESS.phone}
        </TrackedLink>
      </div>
    </div>
  );
}
