import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, useLocation } from "@tanstack/react-router";
import { Atom, LogOut, Menu, ShieldCheck, X } from "lucide-react";
import { useState } from "react";
import { useAdmin } from "../hooks/useAdmin";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Researches", href: "/researches" },
  { label: "Articles", href: "/articles" },
  { label: "Publications", href: "/publications" },
  { label: "Notes", href: "/notes" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isAdmin, logout } = useAdmin();
  const { pathname } = useLocation();

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-xl border-b border-primary/20"
      style={{
        boxShadow:
          "0 0 30px oklch(0.48 0.25 276 / 0.1), 0 1px 0 oklch(0.48 0.25 276 / 0.2)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link
          to="/"
          className="flex items-center gap-3 group"
          data-ocid="nav.brand_link"
        >
          <div className="relative p-2 rounded-lg bg-primary/20 border border-primary/40 group-hover:border-primary/70 transition-smooth">
            <Atom
              className="w-5 h-5 text-primary animate-float"
              style={{ animationDuration: "4s" }}
            />
            <div
              className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-smooth"
              style={{ boxShadow: "0 0 16px oklch(0.48 0.25 276 / 0.5)" }}
            />
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-display font-bold text-foreground leading-none">
              Ashwin Singh <span className="text-gradient">Chouhan</span>
            </p>
            <p className="text-xs text-muted-foreground leading-none mt-0.5">
              Pharmacologist & Researcher
            </p>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                to={link.href}
                className={`relative px-3 py-1.5 text-sm font-medium rounded-md transition-smooth group ${
                  active
                    ? "text-accent"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                data-ocid={`nav.${link.label.toLowerCase()}_link`}
                style={{ perspective: "200px" }}
              >
                <span className="relative z-10">{link.label}</span>
                {active && (
                  <span className="absolute inset-x-0 -bottom-px h-0.5 gradient-accent rounded-full" />
                )}
                <span className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-100 transition-smooth bg-muted/60" />
              </Link>
            );
          })}
        </nav>

        {/* Right side — admin badge (when logged in) + mobile menu */}
        <div className="flex items-center gap-3">
          {isAdmin && (
            <div className="hidden lg:flex items-center gap-2">
              <Link
                to="/admin"
                className="flex items-center gap-1.5 text-xs text-accent border border-accent/30 rounded-full px-3 py-1 bg-accent/10 hover:bg-accent/20 transition-smooth"
                data-ocid="nav.admin_dashboard_link"
              >
                <ShieldCheck className="w-3.5 h-3.5" /> Admin
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                className="text-muted-foreground hover:text-foreground text-xs"
                data-ocid="nav.logout_button"
              >
                <LogOut className="w-3.5 h-3.5 mr-1" /> Logout
              </Button>
            </div>
          )}

          {/* Mobile hamburger */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                data-ocid="nav.mobile_menu_button"
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-card border-l border-primary/20 w-72"
            >
              <div className="flex flex-col gap-6 pt-8">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-display font-bold text-foreground">
                      Ashwin Singh{" "}
                      <span className="text-gradient">Chouhan</span>
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Pharmacologist & Researcher
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setMobileOpen(false)}
                    aria-label="Close menu"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                <nav className="flex flex-col gap-1">
                  {NAV_LINKS.map((link) => {
                    const active = pathname === link.href;
                    return (
                      <Link
                        key={link.href}
                        to={link.href}
                        onClick={() => setMobileOpen(false)}
                        className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-smooth ${
                          active
                            ? "bg-primary/15 text-accent border border-primary/30"
                            : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                        }`}
                        data-ocid={`nav.mobile.${link.label.toLowerCase()}_link`}
                      >
                        {link.label}
                      </Link>
                    );
                  })}
                </nav>
                {isAdmin && (
                  <div className="border-t border-border pt-4 flex flex-col gap-2">
                    <span className="flex items-center gap-1.5 text-xs text-accent border border-accent/30 rounded-full px-3 py-1 bg-accent/10 w-fit">
                      <ShieldCheck className="w-3.5 h-3.5" /> Admin Active
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        logout();
                        setMobileOpen(false);
                      }}
                      className="justify-start text-muted-foreground w-fit"
                      data-ocid="nav.mobile.logout_button"
                    >
                      <LogOut className="w-3.5 h-3.5 mr-2" /> Logout
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
