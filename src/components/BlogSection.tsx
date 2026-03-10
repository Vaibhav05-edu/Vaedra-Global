import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project4 from "@/assets/project-4.jpg";

const posts = [
  {
    image: project1,
    title: "How AI is revolutionizing software development in 2026",
    excerpt: "From AI-powered code generation to intelligent debugging, artificial intelligence is reshaping how developers build, test, and deploy modern software applications.",
  },
  {
    image: project2,
    title: "The rise of AI agents in enterprise software solutions",
    excerpt: "Autonomous AI agents are transforming business operations—automating workflows, analyzing data, and making real-time decisions that drive efficiency at scale.",
  },
  {
    image: project4,
    title: "Building smarter apps with machine learning and cloud",
    excerpt: "Combining ML models with cloud-native architecture enables businesses to deliver personalized, intelligent experiences that adapt and evolve with user behavior.",
  },
];

const BlogSection = () => {
  return (
    <section id="blog" className="bg-secondary py-24 lg:py-32">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mb-16">
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="font-display text-5xl md:text-7xl font-bold uppercase leading-[0.95] text-foreground"
          >
            Journal Insight
          </motion.h2>
          <motion.a
            href="#"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="group inline-flex items-center gap-2 font-display text-lg uppercase tracking-wide text-foreground border-b border-foreground/30 pb-1 hover:border-highlight hover:text-highlight transition-colors"
          >
            All Blog
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-card rounded-2xl overflow-hidden border border-border"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl md:text-2xl uppercase font-semibold text-foreground mb-3 leading-tight group-hover:text-highlight transition-colors">
                  <a href="#">{post.title}</a>
                </h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  {post.excerpt}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
