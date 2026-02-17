import Link from "next/link";
import { getAllPosts, getAllCategories } from "@/lib/blog";
import { BUSINESS } from "@/lib/data";
import BlogCard from "@/components/BlogCard";
import TrackedCTA from "@/components/TrackedCTA";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Drywall Repair Blog | Patch Boys Bergen County" },
  description: "Tips, guides, and cost information for drywall repair in Bergen County, NJ. Expert advice from The Patch Boys.",
  alternates: {
    canonical: "/blog/",
  },
  openGraph: {
    title: "Drywall Repair Blog | Patch Boys Bergen County",
    description: "Tips, guides, and cost information for drywall repair in Bergen County, NJ.",
    url: "https://www.bergencountypatchboys.com/blog/",
    type: "website",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = getAllCategories();

  return (
    <>
      {/* Hero */}
      <section className="bg-navy py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <nav className="text-sm text-gray-400 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-orange focus:text-orange focus:outline-2 focus:outline-offset-2 focus:outline-orange rounded px-1">Home</Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <span className="text-white">Blog</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Drywall Repair Tips & Guides
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Expert advice on drywall repair, costs, and home improvement for Bergen County homeowners.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      {categories.length > 1 && (
        <section className="py-6 border-b">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-sm font-semibold text-navy mr-2">Categories:</span>
              {categories.map((cat) => (
                <span
                  key={cat}
                  className="bg-gray-warm text-navy font-medium px-3 py-1.5 rounded-lg text-sm"
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Posts Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <BlogCard
                  key={post.slug}
                  slug={post.slug}
                  title={post.title}
                  date={post.date}
                  excerpt={post.excerpt}
                  readingTime={post.readingTime}
                  categories={post.categories}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-navy mb-4">Blog Posts Coming Soon</h2>
              <p className="text-gray-600 mb-8">
                We&apos;re working on helpful drywall repair content for Bergen County homeowners. Check back soon!
              </p>
              <TrackedCTA
                href="/contact"
                event="cta_click"
                params={{ button_text: "Get Free Estimate", location: "blog_empty" }}
                className="bg-orange text-white font-bold px-8 py-4 rounded-lg hover:bg-orange-dark focus:outline-2 focus:outline-offset-2 focus:outline-orange transition-colors"
              >
                Get a Free Estimate
              </TrackedCTA>
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-navy py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Need Drywall Repair?</h2>
          <p className="text-gray-300 mb-6 max-w-xl mx-auto">
            Don&apos;t wait for small problems to become big ones. Get a free estimate from Bergen County&apos;s drywall repair experts.
          </p>
          <TrackedCTA
            href="/contact"
            event="cta_click"
            params={{ button_text: "Request Free Estimate", location: "blog_index_bottom" }}
            className="bg-orange text-white font-bold px-8 py-4 rounded-lg hover:bg-orange-dark focus:outline-2 focus:outline-offset-2 focus:outline-orange transition-colors text-lg"
          >
            Request Free Estimate
          </TrackedCTA>
        </div>
      </section>

      {/* Blog + BreadcrumbList Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Blog",
              name: "The Patch Boys Bergen County Blog",
              description: "Tips, guides, and cost information for drywall repair in Bergen County, NJ.",
              url: "https://www.bergencountypatchboys.com/blog/",
              publisher: {
                "@type": "Organization",
                "@id": "https://www.bergencountypatchboys.com/#business",
                name: BUSINESS.name,
              },
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://www.bergencountypatchboys.com/" },
                { "@type": "ListItem", position: 2, name: "Blog" },
              ],
            },
          ]),
        }}
      />
    </>
  );
}
