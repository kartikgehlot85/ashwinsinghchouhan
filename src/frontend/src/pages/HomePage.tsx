import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  Atom,
  Beaker,
  BookOpen,
  ChevronDown,
  ChevronRight,
  Dna,
  FileText,
  FlaskConical,
} from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useCallback } from "react";
import { ContentCard } from "../components/ContentCard";
import { useContent } from "../hooks/useContent";

const PILLARS = [
  {
    icon: Beaker,
    title: "Drug Discovery",
    desc: "Designing novel compounds with optimized pharmacological profiles and minimal toxicity.",
    color: "text-primary",
    bg: "bg-primary/10 border-primary/30",
  },
  {
    icon: Dna,
    title: "Molecular Pharmacology",
    desc: "Investigating drug-receptor interactions at the molecular level to understand mechanisms of action.",
    color: "text-secondary",
    bg: "bg-secondary/10 border-secondary/30",
  },
  {
    icon: FlaskConical,
    title: "Computational Chemistry",
    desc: "Leveraging in silico tools for ADMET prediction, docking, and pharmacophore modeling.",
    color: "text-accent",
    bg: "bg-accent/10 border-accent/30",
  },
];

const SECTION_LINKS = [
  {
    icon: Beaker,
    label: "Researches",
    href: "/researches",
    count: "9+",
    color:
      "from-primary/20 to-primary/5 border-primary/30 hover:border-primary/60",
  },
  {
    icon: BookOpen,
    label: "Articles",
    href: "/articles",
    count: "60+",
    color:
      "from-secondary/20 to-secondary/5 border-secondary/30 hover:border-secondary/60",
  },
  {
    icon: FileText,
    label: "Publications",
    href: "/publications",
    count: "4",
    color: "from-accent/20 to-accent/5 border-accent/30 hover:border-accent/60",
  },
];

export function HomePage() {
  const { data: featured = [] } = useContent();
  const recentItems = featured.slice(0, 3);

  // Mouse-driven 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 80, damping: 20 };
  const rotateX = useSpring(
    useTransform(mouseY, [-300, 300], [10, -10]),
    springConfig,
  );
  const rotateY = useSpring(
    useTransform(mouseX, [-600, 600], [-12, 12]),
    springConfig,
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      mouseX.set(e.clientX - cx);
      mouseY.set(e.clientY - cy);
    },
    [mouseX, mouseY],
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  // Orb definitions: size, position, color, blur, opacity, animation delay, z-index
  const ORBS = [
    {
      w: 200,
      h: 200,
      left: "5%",
      top: "10%",
      color: "oklch(0.48 0.25 276 / 0.55)",
      blur: 60,
      delay: 0,
      z: 0,
    },
    {
      w: 140,
      h: 140,
      left: "80%",
      top: "8%",
      color: "oklch(0.62 0.28 166 / 0.50)",
      blur: 48,
      delay: 0.8,
      z: 0,
    },
    {
      w: 100,
      h: 100,
      left: "90%",
      top: "60%",
      color: "oklch(0.70 0.22 55 / 0.45)",
      blur: 36,
      delay: 1.5,
      z: 0,
    },
    {
      w: 160,
      h: 160,
      left: "2%",
      top: "70%",
      color: "oklch(0.55 0.22 198 / 0.50)",
      blur: 52,
      delay: 0.4,
      z: 0,
    },
    {
      w: 80,
      h: 80,
      left: "45%",
      top: "5%",
      color: "oklch(0.62 0.28 166 / 0.35)",
      blur: 24,
      delay: 1.1,
      z: 20,
    },
    {
      w: 120,
      h: 120,
      left: "60%",
      top: "75%",
      color: "oklch(0.48 0.25 276 / 0.40)",
      blur: 40,
      delay: 0.6,
      z: 0,
    },
    {
      w: 90,
      h: 90,
      left: "25%",
      top: "80%",
      color: "oklch(0.70 0.22 55 / 0.35)",
      blur: 30,
      delay: 1.8,
      z: 20,
    },
    {
      w: 180,
      h: 180,
      left: "35%",
      top: "55%",
      color: "oklch(0.48 0.25 276 / 0.20)",
      blur: 70,
      delay: 0.2,
      z: 0,
    },
  ];

  return (
    <div className="flex flex-col">
      {/* ── Hero ─────────────────────────────────────────── */}
      <section
        className="relative min-h-[calc(100vh-64px)] flex items-center justify-center overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('/assets/generated/molecular-hero.dim_1600x900.jpg')",
          }}
        />
        {/* Deep dark overlay so text always wins */}
        <div className="absolute inset-0 bg-[oklch(0.06_0_0/0.82)]" />
        {/* Radial hero glow */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 50% 45%, oklch(0.48 0.25 276 / 0.18) 0%, oklch(0.62 0.28 166 / 0.10) 50%, transparent 80%)",
          }}
        />

        {/* 3D Floating orbs */}
        {ORBS.map((orb, i) => (
          <motion.div
            key={orb.left + orb.top}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: orb.w,
              height: orb.h,
              left: orb.left,
              top: orb.top,
              zIndex: orb.z,
              background: `radial-gradient(circle at 35% 35%, ${orb.color}, transparent 70%)`,
              filter: `blur(${orb.blur}px)`,
            }}
            animate={{
              y: [0, -22, 0],
              scale: [1, 1.06, 1],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 4 + i * 0.5,
              delay: orb.delay,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Rotating ring decoration */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{ zIndex: 1 }}
        >
          <motion.div
            className="rounded-full border border-primary/10"
            style={{ width: 520, height: 520 }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 30,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
          <motion.div
            className="absolute rounded-full border border-accent/8"
            style={{ width: 580, height: 580, top: "-30px", left: "-30px" }}
            animate={{ rotate: -360 }}
            transition={{
              duration: 45,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        </div>

        {/* 3D tilt content */}
        <div
          className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          style={{ perspective: "1200px" }}
        >
          <motion.div
            style={{ rotateX, rotateY, transformPerspective: 1200 }}
            className="inline-block w-full"
          >
            {/* Backdrop blur card for text legibility */}
            <div className="bg-black/35 backdrop-blur-md rounded-3xl px-8 py-10 border border-white/10 shadow-elevation-lg">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0 }}
                className="mb-6 flex justify-center"
              >
                <Badge
                  className="border-accent/60 bg-accent/25 text-white font-mono text-xs tracking-wider px-4 py-1.5"
                  data-ocid="home.hero_badge"
                >
                  <Atom className="w-3.5 h-3.5 mr-1.5 animate-pulse text-accent" />
                  Pharmacologist &amp; Researcher
                </Badge>
              </motion.div>

              {/* Name */}
              <motion.h1
                className="font-display text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-tight mb-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 }}
              >
                <span className="text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.9)]">
                  Ashwin Singh{" "}
                </span>
                <span
                  className="text-transparent bg-clip-text"
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg, oklch(0.92 0.12 276) 0%, oklch(0.88 0.18 166) 50%, oklch(0.90 0.14 198) 100%)",
                    filter: "drop-shadow(0 0 18px oklch(0.62 0.28 166 / 0.7))",
                  }}
                >
                  Chouhan
                </span>
              </motion.h1>

              {/* Tagline */}
              <motion.p
                className="text-2xl text-white/90 font-display font-semibold mb-3 drop-shadow-[0_1px_8px_rgba(0,0,0,0.8)]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Innovating at the Intersection of{" "}
                <span
                  className="text-transparent bg-clip-text"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, oklch(0.75 0.20 198), oklch(0.80 0.22 166))",
                  }}
                >
                  Science
                </span>{" "}
                &amp;{" "}
                <span
                  className="text-transparent bg-clip-text"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, oklch(0.80 0.22 166), oklch(0.78 0.18 120))",
                  }}
                >
                  Medicine
                </span>
              </motion.p>

              {/* Description */}
              <motion.p
                className="text-white/80 max-w-xl mx-auto mb-8 text-base leading-relaxed drop-shadow-[0_1px_6px_rgba(0,0,0,0.7)]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.45 }}
              >
                Advancing pharmacological knowledge through rigorous research,
                molecular pharmacology, and evidence-based drug discovery.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <motion.div
                  whileHover={{ scale: 1.06, y: -3 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Button
                    asChild
                    size="lg"
                    className="relative overflow-hidden gradient-primary text-white font-bold px-8 py-6 text-base shadow-glow border-0 shimmer-btn"
                    data-ocid="home.explore_button"
                  >
                    <Link to="/researches">
                      Explore Research Portfolio
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Link>
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.06, y: -3 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="border-white/40 text-white bg-white/10 hover:bg-white/20 hover:border-white/60 px-8 py-6 text-base font-semibold backdrop-blur-sm"
                    data-ocid="home.publications_button"
                  >
                    <Link to="/publications">View Publications</Link>
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60 text-xs z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <span className="font-mono tracking-widest text-[10px] uppercase">
            Scroll to explore
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{
              duration: 1.4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <ChevronDown className="w-5 h-5 text-white/50" />
          </motion.div>
        </motion.div>
      </section>

      {/* Research Pillars */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-3xl font-bold text-foreground mb-3">
              Core Research Pillars
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm">
              The three domains that form the foundation of my scientific
              inquiry and academic contributions.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PILLARS.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                className={`group p-6 rounded-xl border bg-gradient-to-br ${pillar.bg} transition-smooth hover:shadow-elevation-md`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                style={{ perspective: "800px" }}
                whileHover={{ rotateX: 2, rotateY: -3, translateZ: 8 }}
              >
                <div
                  className={`w-12 h-12 rounded-lg border ${pillar.bg} flex items-center justify-center mb-4`}
                >
                  <pillar.icon className={`w-6 h-6 ${pillar.color}`} />
                </div>
                <h3
                  className={`font-display font-bold text-lg mb-2 ${pillar.color}`}
                >
                  {pillar.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {pillar.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Content sections overview */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-3xl font-bold text-foreground mb-3">
              Explore My Work
            </h2>
            <p className="text-muted-foreground text-sm max-w-xl mx-auto">
              Browse through research projects, published articles,
              peer-reviewed publications, and academic notes.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {SECTION_LINKS.map(
              ({ icon: Icon, label, href, count, color }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                >
                  <Link
                    to={href}
                    className={`flex flex-col items-center gap-3 p-6 rounded-xl border bg-gradient-to-br ${color} transition-smooth hover:shadow-elevation-md group`}
                    data-ocid={`home.section.${label.toLowerCase()}_link`}
                  >
                    <div className="p-3 rounded-full bg-background/30 border border-border/50">
                      <Icon className="w-6 h-6 text-foreground" />
                    </div>
                    <span className="font-display font-semibold text-foreground text-sm">
                      {label}
                    </span>
                    <Badge variant="secondary" className="text-xs font-mono">
                      {count}
                    </Badge>
                  </Link>
                </motion.div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Latest Content */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="flex items-end justify-between mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <h2 className="font-display text-3xl font-bold text-foreground mb-2">
                Latest Updates
              </h2>
              <p className="text-muted-foreground text-sm">
                Recent research, articles, and publications
              </p>
            </div>
            <Button
              asChild
              variant="ghost"
              className="text-accent hover:text-accent hover:bg-accent/10 text-sm"
              data-ocid="home.view_all_button"
            >
              <Link to="/researches">
                View all <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentItems.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <ContentCard item={item} index={i} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
