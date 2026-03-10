import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code, Globe, Smartphone, Brain, Cloud, Settings,
  Palette, TestTube, Link, BarChart3, Shield, Wrench,
  Building2, Blocks, Gamepad2, Cpu
} from "lucide-react";
import avatarHead from "@/assets/avatar-head.png";

const categories = [
  { id: "development", label: "Development" },
  { id: "ai-data", label: "AI & Data" },
  { id: "cloud-infra", label: "Cloud & Infra" },
  { id: "design-quality", label: "Design & Quality" },
  { id: "specialized", label: "Specialized" },
];

const services: Record<string, Array<{
  num: string;
  title: string;
  description: string;
  bullets: string[];
  icon: typeof Code;
}>> = {
  development: [
    {
      num: "01",
      title: "Custom Software\nDevelopment",
      description: "We build software tailored to your specific business needs — from CRM systems to enterprise dashboards and financial platforms.",
      bullets: ["Enterprise Tools & Dashboards", "CRM & Financial Systems", "Python, Java, Node.js, .NET, React"],
      icon: Code,
    },
    {
      num: "02",
      title: "Web Application\nDevelopment",
      description: "Building powerful applications that run in the browser — SaaS platforms, admin panels, e-commerce sites, and AI-powered web apps.",
      bullets: ["SaaS & E-commerce Platforms", "React, Angular, Vue Frontend", "Node.js, Django, PostgreSQL Backend"],
      icon: Globe,
    },
    {
      num: "03",
      title: "Mobile App\nDevelopment",
      description: "Creating native and cross-platform mobile applications for iOS and Android — banking, fitness, delivery, and social apps.",
      bullets: ["Native iOS & Android Apps", "Cross-platform with Flutter & React Native", "Banking, Fitness & Delivery Apps"],
      icon: Smartphone,
    },
    {
      num: "04",
      title: "Enterprise Software\nDevelopment",
      description: "Building large-scale corporate systems — ERP, banking platforms, healthcare management, and supply chain systems.",
      bullets: ["ERP & Banking Platforms", "Healthcare Management Systems", "Supply Chain Solutions"],
      icon: Building2,
    },
  ],
  "ai-data": [
    {
      num: "01",
      title: "AI & Machine\nLearning",
      description: "Creating intelligent systems that learn from data — chatbots, recommendation engines, image recognition, predictive analytics, and generative AI.",
      bullets: ["AI Chatbots & Agents", "Generative AI & RAG Systems", "TensorFlow, PyTorch, LangChain"],
      icon: Brain,
    },
    {
      num: "02",
      title: "Data Engineering\n& Analytics",
      description: "Handling large datasets and building analytics systems — data pipelines, warehouses, BI dashboards, and big data processing.",
      bullets: ["Data Pipelines & Warehouses", "Business Intelligence Dashboards", "Spark, Snowflake, Airflow"],
      icon: BarChart3,
    },
  ],
  "cloud-infra": [
    {
      num: "01",
      title: "Cloud\nDevelopment",
      description: "Building systems on cloud infrastructure — AWS, Google Cloud, Azure. Cloud migration, serverless apps, and Kubernetes deployment.",
      bullets: ["AWS, GCP & Azure Solutions", "Serverless & Cloud-native Apps", "Kubernetes Deployment"],
      icon: Cloud,
    },
    {
      num: "02",
      title: "DevOps &\nCI/CD Automation",
      description: "Making development faster and more reliable with automated deployments, CI/CD pipelines, and infrastructure as code.",
      bullets: ["Automated CI/CD Pipelines", "Infrastructure as Code", "Docker, Kubernetes, Terraform"],
      icon: Settings,
    },
    {
      num: "03",
      title: "API Development\n& Integration",
      description: "Creating systems that communicate — payment gateways, maps integration, Stripe payments, and CRM integrations.",
      bullets: ["REST & GraphQL APIs", "Payment & CRM Integrations", "Webhooks & Microservices"],
      icon: Link,
    },
    {
      num: "04",
      title: "Cybersecurity\nServices",
      description: "Protecting software and systems with penetration testing, security audits, encryption, and identity management.",
      bullets: ["Penetration Testing & Audits", "Encryption Implementation", "Identity & Access Management"],
      icon: Shield,
    },
  ],
  "design-quality": [
    {
      num: "01",
      title: "UI/UX\nDesign",
      description: "Designing how software looks and feels — product design, wireframing, prototyping, and user experience research.",
      bullets: ["Product & Interface Design", "Wireframing & Prototyping", "Figma, Adobe XD, Sketch"],
      icon: Palette,
    },
    {
      num: "02",
      title: "Software Testing\n& QA",
      description: "Ensuring software works correctly with manual, automated, performance, security, and load testing.",
      bullets: ["Automated & Manual Testing", "Performance & Security Testing", "Selenium, Cypress, Playwright"],
      icon: TestTube,
    },
    {
      num: "03",
      title: "Maintenance\n& Support",
      description: "After software launches, we handle updates, bug fixes, performance optimization, and server monitoring.",
      bullets: ["Bug Fixing & Feature Updates", "Performance Optimization", "Server Monitoring & Support"],
      icon: Wrench,
    },
  ],
  specialized: [
    {
      num: "01",
      title: "Blockchain\nDevelopment",
      description: "Building decentralized applications — smart contracts, crypto wallets, DeFi platforms, and NFT marketplaces.",
      bullets: ["Smart Contracts & DApps", "DeFi & NFT Platforms", "Crypto Wallet Development"],
      icon: Blocks,
    },
    {
      num: "02",
      title: "Game\nDevelopment",
      description: "Creating games for mobile, PC, or consoles using industry-leading engines and tools.",
      bullets: ["Mobile, PC & Console Games", "Unity & Unreal Engine", "2D & 3D Game Design"],
      icon: Gamepad2,
    },
    {
      num: "03",
      title: "Embedded Software\nDevelopment",
      description: "Software for hardware devices — IoT devices, smart home systems, medical devices, and automotive systems.",
      bullets: ["IoT & Smart Home Systems", "Medical Device Software", "Automotive & Industrial Systems"],
      icon: Cpu,
    },
  ],
};

const ServicesSection = () => {
  const [activeCategory, setActiveCategory] = useState("development");

  return (
    <section id="services" className="bg-background py-24 lg:py-32">
      <div className="container mx-auto px-6">
        {/* Header area */}
        <div className="relative mb-16">
          <div className="absolute left-1/2 -translate-x-1/2 -top-12 z-10">
            <img src={avatarHead} alt="Avatar" className="w-24 md:w-32 object-contain" />
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold uppercase leading-[0.95] text-foreground text-center pt-16"
          >
            We provide premium
            <br />
            software development service
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-sm font-body text-sm text-muted-foreground leading-relaxed mt-8 ml-auto mr-0 md:mr-[15%]"
          >
            Our ability to combine expertise and systems thinking is what fuels
            us as a team.
          </motion.p>
        </div>

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-2 mb-14"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`font-display text-sm md:text-base uppercase tracking-wider px-5 py-2.5 rounded-full border transition-all duration-300 ${
                activeCategory === cat.id
                  ? "bg-highlight text-highlight-foreground border-highlight"
                  : "bg-transparent text-foreground/60 border-border/40 hover:text-foreground hover:border-border"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Service rows */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {services[activeCategory].map((service, i) => (
              <motion.div
                key={service.num + service.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="group grid grid-cols-1 md:grid-cols-[80px_1fr_1fr_80px] items-start md:items-center gap-6 md:gap-8 py-10 border-t border-border/30 cursor-pointer hover:bg-card/30 transition-colors px-4 -mx-4"
              >
                <span className="font-display text-2xl md:text-3xl font-bold text-muted-foreground">
                  {service.num}.
                </span>

                <h3 className="font-display text-2xl md:text-3xl uppercase font-bold text-foreground whitespace-pre-line leading-tight">
                  {service.title}
                </h3>

                <div>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <ul className="space-y-1.5">
                    {service.bullets.map((bullet) => (
                      <li key={bullet} className="font-body text-sm text-foreground flex items-center gap-2">
                        <span className="text-highlight text-base">+</span>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="hidden md:flex items-center justify-center w-16 h-16 rounded-full border border-border/40">
                  <service.icon className="w-7 h-7 text-foreground" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ServicesSection;
