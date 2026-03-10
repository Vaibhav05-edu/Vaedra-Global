import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { blogPosts } from "@/lib/blogPosts";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const BlogPost = () => {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-4xl uppercase text-foreground mb-4">Post not found</h1>
          <Link to="/" className="text-primary hover:underline font-body">
            Go back home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <article className="pt-32 pb-24">
        <div className="container mx-auto px-6 max-w-3xl">
          <Link
            to="/#blog"
            className="inline-flex items-center gap-2 font-display text-sm uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors mb-10"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Journal
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="font-body text-sm text-muted-foreground">{post.date}</span>
              <span className="w-1 h-1 rounded-full bg-muted-foreground" />
              <span className="font-body text-sm text-muted-foreground">{post.readTime}</span>
            </div>

            <h1 className="font-display text-4xl md:text-6xl font-bold uppercase leading-[0.95] text-foreground mb-8">
              {post.title}
            </h1>

            <div className="rounded-2xl overflow-hidden mb-12">
              <img
                src={post.image}
                alt={post.title}
                loading="lazy"
                className="w-full h-[300px] md:h-[450px] object-cover"
              />
            </div>

            <div className="space-y-6">
              {post.content.map((paragraph, i) => (
                <p
                  key={i}
                  className="font-body text-base md:text-lg text-muted-foreground leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.div>
        </div>
      </article>
      {/* Related Posts */}
      <section className="bg-secondary py-24">
        <div className="container mx-auto px-6 max-w-5xl">
          <h2 className="font-display text-3xl md:text-5xl font-bold uppercase text-foreground mb-12">
            Related Articles
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {blogPosts
              .filter((p) => p.slug !== post.slug)
              .map((related, i) => (
                <motion.article
                  key={related.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group bg-card rounded-2xl overflow-hidden border border-border"
                >
                  <Link to={`/blog/${related.slug}`}>
                    <div className="aspect-[16/9] overflow-hidden">
                      <img
                        src={related.image}
                        alt={related.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="font-body text-xs text-muted-foreground">{related.date}</span>
                        <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                        <span className="font-body text-xs text-muted-foreground">{related.readTime}</span>
                      </div>
                      <h3 className="font-display text-xl uppercase font-semibold text-foreground leading-tight group-hover:text-highlight transition-colors mb-2">
                        {related.title}
                      </h3>
                      <p className="font-body text-sm text-muted-foreground leading-relaxed line-clamp-2">
                        {related.excerpt}
                      </p>
                    </div>
                  </Link>
                </motion.article>
              ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default BlogPost;
