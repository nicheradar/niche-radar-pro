import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { posts } from "@/data/posts";
import { Calendar, ArrowRight } from "lucide-react";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

const Blog = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <section className="relative overflow-hidden bg-gradient-hero border-b border-border">
        <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="container relative py-16 sm:py-20 text-center">
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight">
            The{" "}
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              NicheRadar
            </span>{" "}
            Blog
          </h1>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Strategies, data, and ideas to help faceless creators find niches that actually grow.
          </p>
        </div>
      </section>

      <section className="container py-16 flex-1">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="group rounded-3xl border border-border bg-card overflow-hidden shadow-card hover:shadow-elegant hover:-translate-y-0.5 transition-smooth flex flex-col"
            >
              <div className="aspect-[16/10] overflow-hidden bg-muted">
                <img
                  src={post.thumbnail}
                  alt={post.title}
                  loading="lazy"
                  className="h-full w-full object-cover group-hover:scale-105 transition-smooth"
                />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" />
                  {formatDate(post.date)}
                </div>
                <h2 className="mt-3 font-display text-lg font-bold leading-snug group-hover:text-primary transition-smooth">
                  {post.title}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-3">
                  {post.description}
                </p>
                <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                  Read article
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-smooth" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
