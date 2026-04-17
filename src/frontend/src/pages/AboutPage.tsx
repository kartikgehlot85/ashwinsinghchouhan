import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Atom,
  Award,
  BookOpen,
  FlaskConical,
  GraduationCap,
  Users,
} from "lucide-react";
import { motion } from "motion/react";

const SKILLS = [
  "Drug Discovery",
  "Molecular Pharmacology",
  "Computational Chemistry",
  "In Silico ADMET",
  "Molecular Docking",
  "Medicinal Chemistry",
  "Pharmacokinetics",
  "Neuropharmacology",
  "Natural Products",
  "Clinical Pharmacology",
  "R & Python",
  "Statistical Analysis",
];

const TIMELINE = [
  {
    year: "2024–Present",
    title: "Senior Pharmacology Researcher",
    org: "Research Institute of Pharmacological Sciences",
    desc: "Leading drug discovery projects targeting neurological disorders and antimicrobial resistance.",
  },
  {
    year: "2022–2024",
    title: "Research Associate",
    org: "Centre for Molecular Drug Design",
    desc: "Conducted in silico and in vitro studies on novel benzimidazole and flavonoid derivatives.",
  },
  {
    year: "2020–2022",
    title: "M.Pharm – Pharmacology",
    org: "University of Pharmaceutical Sciences",
    desc: "Specialized in pharmacodynamics, toxicology, and clinical pharmacology. Gold Medal recipient.",
  },
  {
    year: "2016–2020",
    title: "B.Pharm",
    org: "College of Pharmacy",
    desc: "Graduated with distinction. Active in research seminars and student scientific societies.",
  },
];

const STATS = [
  { icon: BookOpen, label: "Publications", value: "8+" },
  { icon: FlaskConical, label: "Research Projects", value: "12+" },
  { icon: Award, label: "Awards", value: "4" },
  { icon: Users, label: "Collaborations", value: "15+" },
];

export function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="inline-flex p-4 rounded-2xl bg-primary/20 border border-primary/40 mb-6">
          <Atom className="w-10 h-10 text-primary animate-float" />
        </div>
        <h1 className="font-display text-4xl font-black text-foreground mb-4">
          About <span className="text-gradient">Ashwin Singh Chouhan</span>
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          A passionate pharmacologist and researcher dedicated to advancing the
          boundaries of drug discovery, molecular pharmacology, and
          evidence-based medicine.
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {STATS.map(({ icon: Icon, label, value }) => (
          <div
            key={label}
            className="bg-card border border-border rounded-xl p-5 text-center hover:border-primary/40 transition-smooth"
          >
            <Icon className="w-6 h-6 text-primary mx-auto mb-2" />
            <div className="font-display text-2xl font-black text-gradient">
              {value}
            </div>
            <div className="text-xs text-muted-foreground mt-1">{label}</div>
          </div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Bio */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
            <span className="w-8 h-0.5 gradient-primary rounded" />
            About Me
          </h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed text-sm">
            <p>
              I am Ashwin Singh Chouhan, a pharmacologist and researcher with a
              deep commitment to understanding the molecular basis of drug
              action and developing novel therapeutic agents. My work bridges
              the gap between computational chemistry and experimental
              pharmacology.
            </p>
            <p>
              My research focuses on neuroprotection, antimicrobial drug
              discovery, and the pharmacological validation of natural products.
              I employ a multidisciplinary approach—integrating in silico tools,
              synthetic chemistry, and biological evaluation to accelerate the
              drug discovery pipeline.
            </p>
            <p>
              Beyond research, I am passionate about science communication and
              education. Through my articles and notes, I strive to make complex
              pharmacological concepts accessible to students and early-career
              researchers.
            </p>
          </div>
        </motion.div>

        {/* Skills */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
            <span className="w-8 h-0.5 gradient-accent rounded" />
            Expertise
          </h2>
          <div className="flex flex-wrap gap-2">
            {SKILLS.map((skill, i) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Badge
                  variant="outline"
                  className="border-primary/30 text-muted-foreground bg-primary/5 hover:border-primary/60 hover:text-foreground transition-smooth cursor-default text-xs py-1 px-3"
                >
                  {skill}
                </Badge>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="font-display text-2xl font-bold text-foreground mb-8 flex items-center gap-3">
          <GraduationCap className="w-6 h-6 text-accent" />
          Academic & Professional Journey
        </h2>
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent opacity-40" />
          <div className="space-y-8 pl-12">
            {TIMELINE.map((item, i) => (
              <motion.div
                key={item.year}
                className="relative"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div
                  className="absolute -left-12 top-0 w-4 h-4 rounded-full border-2 border-primary bg-background"
                  style={{ boxShadow: "0 0 10px oklch(0.48 0.25 276 / 0.4)" }}
                />
                <div className="bg-card border border-border rounded-xl p-5 hover:border-primary/40 transition-smooth">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="font-display font-semibold text-foreground">
                      {item.title}
                    </h3>
                    <Badge
                      variant="outline"
                      className="text-xs font-mono border-accent/30 text-accent bg-accent/5 shrink-0"
                    >
                      {item.year}
                    </Badge>
                  </div>
                  <p className="text-sm text-primary mb-2">{item.org}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
