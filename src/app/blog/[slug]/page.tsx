import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug, getRecentPosts, getAllCategories, getRelatedPosts, slugifyCategory } from "@/lib/blog";
import { BUSINESS } from "@/lib/data";
import BlogSidebar from "@/components/BlogSidebar";
import BlogCard from "@/components/BlogCard";
import TrackedCTA from "@/components/TrackedCTA";
import TrackedLink from "@/components/TrackedLink";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  const pageTitle = `${post.title} | Patch Boys Bergen County Blog`;
  return {
    title: { absolute: pageTitle },
    description: post.excerpt,
    keywords: [...post.tags, ...post.categories.map((c) => c.toLowerCase())],
    alternates: {
      canonical: `/blog/${slug}/`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://www.bergencountypatchboys.com/blog/${slug}/`,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const recentPosts = getRecentPosts(6);
  const categories = getAllCategories();
  const relatedPosts = getRelatedPosts(slug, 3);

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      {/* Hero */}
      <section className="bg-navy py-16">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="text-sm text-gray-400 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-orange focus:text-orange focus:outline-2 focus:outline-offset-2 focus:outline-orange rounded px-1">Home</Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <Link href="/blog" className="hover:text-orange focus:text-orange focus:outline-2 focus:outline-offset-2 focus:outline-orange rounded px-1">Blog</Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <span className="text-white">{post.title}</span>
          </nav>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-gray-300 text-sm">
            <time dateTime={post.date}>{formattedDate}</time>
            <span aria-hidden="true">|</span>
            <span>{post.readingTime} min read</span>
            {post.categories.length > 0 && (
              <>
                <span aria-hidden="true">|</span>
                <div className="flex flex-wrap gap-2">
                  {post.categories.map((cat) => (
                    <Link key={cat} href={`/blog/category/${slugifyCategory(cat)}`} className="bg-white/10 px-2.5 py-0.5 rounded-full text-xs font-medium hover:bg-orange/80 transition-colors">
                      {cat}
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Content + Sidebar */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Article Content */}
            <div className="lg:col-span-2">
              <article
                className="prose prose-lg max-w-none overflow-hidden prose-headings:text-navy prose-headings:font-bold prose-a:text-orange prose-a:font-semibold hover:prose-a:text-orange-dark prose-strong:text-navy"
                dangerouslySetInnerHTML={{ __html: post.htmlContent }}
              />

              {/* Bottom CTA */}
              <div className="mt-12 bg-navy rounded-xl p-8 text-center">
                <h2 className="text-2xl font-bold text-white mb-3">
                  Need Drywall Repair in Bergen County?
                </h2>
                <p className="text-gray-300 mb-6 max-w-xl mx-auto">
                  Get a free, no-obligation estimate from The Patch Boys. Most repairs completed same day!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <TrackedCTA
                    href="/contact"
                    event="cta_click"
                    params={{ button_text: "Get Free Estimate", location: "blog_post_bottom", post: post.slug }}
                    className="bg-orange text-white font-bold px-8 py-4 rounded-lg hover:bg-orange-dark focus:outline-2 focus:outline-offset-2 focus:outline-orange transition-colors"
                  >
                    Get Free Estimate
                  </TrackedCTA>
                  <TrackedLink
                    href={`tel:${BUSINESS.phone}`}
                    event="phone_click"
                    params={{ location: "blog_post_bottom", post: post.slug }}
                    className="border-2 border-white text-white font-bold px-8 py-4 rounded-lg hover:bg-white hover:text-navy focus:outline-2 focus:outline-offset-2 focus:outline-white transition-colors text-center"
                  >
                    Call {BUSINESS.phone}
                  </TrackedLink>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <BlogSidebar recentPosts={recentPosts} categories={categories} currentSlug={slug} />
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-gray-warm">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-navy mb-8 text-center">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((p) => (
                <BlogCard
                  key={p.slug}
                  slug={p.slug}
                  title={p.title}
                  date={p.date}
                  excerpt={p.excerpt}
                  readingTime={p.readingTime}
                  categories={p.categories}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* BlogPosting + BreadcrumbList Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              headline: post.title,
              description: post.excerpt,
              datePublished: post.date,
              dateModified: post.date,
              author: {
                "@type": "Organization",
                "@id": "https://www.bergencountypatchboys.com/#business",
                name: BUSINESS.name,
              },
              publisher: {
                "@type": "Organization",
                "@id": "https://www.bergencountypatchboys.com/#business",
                name: BUSINESS.name,
                logo: {
                  "@type": "ImageObject",
                  url: "https://www.bergencountypatchboys.com/logo.png",
                },
              },
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": `https://www.bergencountypatchboys.com/blog/${post.slug}/`,
              },
              url: `https://www.bergencountypatchboys.com/blog/${post.slug}/`,
              isPartOf: {
                "@type": "Blog",
                "@id": "https://www.bergencountypatchboys.com/blog/",
                name: "The Patch Boys Bergen County Blog",
              },
              wordCount: post.content.split(/\s+/).length,
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://www.bergencountypatchboys.com/" },
                { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.bergencountypatchboys.com/blog/" },
                { "@type": "ListItem", position: 3, name: post.title },
              ],
            },
          ]),
        }}
      />
    </>
  );
}
