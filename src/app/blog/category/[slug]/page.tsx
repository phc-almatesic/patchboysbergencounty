import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllCategories, getPostsByCategory, slugifyCategory, getCategoryBySlug } from "@/lib/blog";
import { BUSINESS } from "@/lib/data";
import BlogCard from "@/components/BlogCard";
import TrackedCTA from "@/components/TrackedCTA";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllCategories().map((cat) => ({ slug: slugifyCategory(cat) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return {};
  const pageTitle = `${category} Articles | Patch Boys Bergen County Blog`;
  const pageDesc = `Browse our ${category.toLowerCase()} articles — tips, guides, and expert advice for Bergen County homeowners.`;
  return {
    title: { absolute: pageTitle },
    description: pageDesc,
    alternates: {
      canonical: `/blog/category/${slug}/`,
    },
    openGraph: {
      title: pageTitle,
      description: pageDesc,
      url: `https://www.bergencountypatchboys.com/blog/category/${slug}/`,
      type: "website",
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const posts = getPostsByCategory(category);

  return (
    <>
      {/* Hero */}
      <section className="bg-navy py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <nav className="text-sm text-gray-400 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-orange focus:text-orange focus:outline-2 focus:outline-offset-2 focus:outline-orange rounded px-1">Home</Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <Link href="/blog" className="hover:text-orange focus:text-orange focus:outline-2 focus:outline-offset-2 focus:outline-orange rounded px-1">Blog</Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <span className="text-white">{category}</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {category}
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            {posts.length} {posts.length === 1 ? "article" : "articles"} in this category
          </p>
        </div>
      </section>

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
              <p className="text-gray-600 mb-8">No articles in this category yet. Check back soon!</p>
              <Link href="/blog" className="text-orange font-semibold hover:underline">
                &larr; Back to all articles
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-navy py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Need Drywall Repair?</h2>
          <p className="text-gray-300 mb-6 max-w-xl mx-auto">
            Get a free estimate from Bergen County&apos;s drywall repair experts.
          </p>
          <TrackedCTA
            href="/contact"
            event="cta_click"
            params={{ button_text: "Request Free Estimate", location: "blog_category", category }}
            className="bg-orange text-white font-bold px-8 py-4 rounded-lg hover:bg-orange-dark focus:outline-2 focus:outline-offset-2 focus:outline-orange transition-colors text-lg"
          >
            Request Free Estimate
          </TrackedCTA>
        </div>
      </section>

      {/* BreadcrumbList Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://www.bergencountypatchboys.com/" },
              { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.bergencountypatchboys.com/blog/" },
              { "@type": "ListItem", position: 3, name: category },
            ],
          }),
        }}
      />
    </>
  );
}
