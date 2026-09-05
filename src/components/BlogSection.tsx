import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useJournalPosts } from "@/lib/journalStore";

const BlogSection = () => {
  const { posts } = useJournalPosts();
  return (
    <section id="blog" className="bg-secondary py-16 sm:py-24 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-6 sm:gap-8 mb-10 sm:mb-16">
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl sm:text-5xl md:text-7xl font-bold uppercase leading-[0.95] text-foreground"
          >
            Journal Insight
          </motion.h2>
          <div className="flex flex-col items-start sm:items-end gap-2">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-body text-sm text-muted-foreground max-w-xs sm:text-right leading-relaxed"
            >
              Our ability to combine expertise and systems thinking is what fuels us as a team.
            </motion.p>
            <motion.a
              href="#blog"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="group inline-flex items-center gap-2 font-display text-base sm:text-lg uppercase tracking-wide text-foreground border-b border-foreground/30 pb-1 hover:border-highlight hover:text-highlight transition-colors"
            >
              All Blog
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {posts.map((post, i) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-card rounded-2xl overflow-hidden border border-border"
            >
              <Link to={`/blog/${post.slug}`}>
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4 sm:p-6">
                  <h3 className="font-display text-lg sm:text-xl md:text-2xl uppercase font-semibold text-foreground mb-2 sm:mb-3 leading-tight group-hover:text-highlight transition-colors">
                    {post.title}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
