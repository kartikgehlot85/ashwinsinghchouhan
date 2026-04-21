import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Atom, GraduationCap } from "lucide-react";
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
    year: "2011-2014",
    title: "B.Pharm",
    org: "College of Pharmacy",
    desc: "Strong foundation in pharmaceutical sciences and early research exposure.",
  },
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
              Dr. Ashwin Singh Chouhan is an accomplished academician and
              researcher in the field of pharmaceutical sciences, currently
              serving as an Assistant Professor in the Department of Pharmacy at
              Jai Narain Vyas University (JNVU), Jodhpur, Rajasthan, India. He
              is also complete his Ph.D. in Pharmacology from B. N. University,
              Udaipur, with a strong research focus on neuropharmacology and
              bio-guided fractionation of medicinal plants.
            </p>
            <p>
              With a robust academic and research background, Dr. Chouhan has
              authored over 75 national and international research and review
              articles, contributing significantly to the fields of
              phytochemistry, ethnopharmacology, and CNS-related pharmacological
              studies. His research work primarily explores the therapeutic
              potential of plant-based compounds, particularly within the
              Cucurbitaceae family, emphasizing their neuroprotective,
              anticonvulsant, and anxiolytic activities.
            </p>
            <p>
              Dr. Chouhan has extensive experience in advanced chromatographic
              techniques, including HPLC, TLC, column chromatography, and
              liquid-liquid extraction, alongside in vivo behavioral models such
              as elevated zero maze, actophotometer, and PTZ-induced seizure
              models. His interdisciplinary approach bridges traditional
              medicinal knowledge with modern pharmacological evaluation.
            </p>
            <p>
              Recognized for his academic excellence, he received the Best
              Research Paper Award at the ICTASEMP Conference in 2021. He is
              actively engaged in mentoring students, reviewing scientific
              manuscripts, and contributing to high-impact journals, reflecting
              his commitment to advancing pharmaceutical research and education.
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
