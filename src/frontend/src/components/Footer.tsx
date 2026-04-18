import { Separator } from "@/components/ui/separator";
import { Atom } from "lucide-react";
import { FiLinkedin, FiMail } from "react-icons/fi";
import { SiResearchgate, SiYoutube } from "react-icons/si";

const SOCIAL_LINKS = [
  {
    icon: FiLinkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ashwin-singh-chouhan-abba34161",
  },
  { icon: SiResearchgate, label: "ResearchGate", href: "#" },
  {
    icon: SiYoutube,
    label: "YouTube",
    href: "https://www.youtube.com/@ashwinsinghchouhan5221",
  },
  {
    icon: FiMail,
    label: "Email",
    href: "mailto:ashwinsingh26061992@gmail.com",
  },
];

const QUICK_LINKS = [
  { label: "Researches", href: "/researches" },
  { label: "Articles", href: "/articles" },
  { label: "Publications", href: "/publications" },
  { label: "Notes", href: "/notes" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <footer className="bg-card border-t border-primary/20 mt-auto">
      {/* Top glow line */}
      <div className="h-px gradient-primary opacity-30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand column */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/20 border border-primary/40">
                <Atom className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-display font-bold text-foreground">
                  Ashwin Singh <span className="text-gradient">Chouhan</span>
                </p>
                <p className="text-xs text-muted-foreground">
                  Pharmacologist & Researcher
                </p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Bridging traditional knowledge with modern science, fostering
              innovation in natural product research, and inspiring the next
              generation of pharmaceutical scientists.
            </p>
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="p-2 rounded-lg border border-border text-muted-foreground hover:text-accent hover:border-accent/40 hover:bg-accent/10 transition-smooth"
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    href.startsWith("http") ? "noopener noreferrer" : undefined
                  }
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="flex flex-col gap-4">
            <h3 className="font-display font-semibold text-foreground text-sm uppercase tracking-wider">
              Quick Links
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {QUICK_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-accent transition-smooth hover:translate-x-1 inline-block"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Research areas */}
          <div className="flex flex-col gap-4">
            <h3 className="font-display font-semibold text-foreground text-sm uppercase tracking-wider">
              Research Areas
            </h3>
            <div className="flex flex-col gap-2">
              {[
                "Drug Discovery & Development",
                "Molecular Pharmacology",
                "Computational Chemistry",
                "Neuropharmacology",
                "Natural Product Research",
              ].map((area) => (
                <span
                  key={area}
                  className="text-sm text-muted-foreground flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-accent/60 shrink-0" />
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-border/50" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {year} Ashwin Singh Chouhan. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built with love using{" "}
            <a
              href={caffeineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline transition-smooth"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
