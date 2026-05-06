import { Link, useParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { posts } from "@/data/posts";
import { ArrowLeft, Calendar } from "lucide-react";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

const renderParagraph = (line: string, idx: number) => {
  // Bold **text**
  const parts = line.split(/(\*\*[^*]+\*\*)/g);
  return (
    <p key={idx} className="mt-4 text-muted-foreground leading-relaxed">
      {parts.map((p, i) =>
        p.startsWith("**") && p.endsWith("**") ? (
          <strong key={i} className="text-foreground font-semibold">
            {p.slice(2, -2)}
          </strong>
        ) : (
          <span key={i}>{p}</span>
        )
      )}
    </p>
  );
};

const BlogPost = () => {
  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <section className="container py-24 flex-1 text-center">
          <h1 className="font-display text-3xl font-bold">Post not found</h1>
          <p className="mt-3 text-muted-foreground">
            The article you're looking for doesn't exist.
          </p>
          <Link
            to="/blog"
            className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-foreground text-background px-5 py-2.5 text-sm font-semibold hover:opacity-90 transition-smooth"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to blog
          </Link>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <article className="container py-12 sm:py-16 flex-1 max-w-3xl">
        <Link
          to="/blog"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-smooth"
        >
          <ArrowLeft className="h-4 w-4" />
          All articles
        </Link>

        <div className="mt-6 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Calendar className="h-3.5 w-3.5" />
          {formatDate(post.date)}
        </div>

        <h1 className="mt-3 font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.1]">
          {post.title}
        </h1>

        <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
          {post.description}
        </p>

        <div className="mt-8 overflow-hidden rounded-3xl border border-border">
          <img
            src={post.thumbnail}
            alt={post.title}
            className="w-full aspect-[16/9] object-cover"
          />
        </div>

        <div className="mt-10">
          {post.content.split("\n\n").map((para, idx) => renderParagraph(para, idx))}
        </div>

        <div className="mt-14 rounded-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-8 sm:p-10 text-center shadow-elegant">
          <h2 className="font-display text-2xl font-bold text-primary-foreground">
            Find your next viral niche
          </h2>
          <p className="mt-2 text-primary-foreground/80 text-sm">
            Let NicheRadar do the research for you.
          </p>
          <Link
            to="/results"
            className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-background text-foreground px-6 py-3 text-sm font-semibold hover:scale-[1.02] transition-smooth"
          >
            Explore niches
          </Link>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default BlogPost;
