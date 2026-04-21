import { useNavigate } from "@tanstack/react-router";
import { Lock } from "lucide-react";
import { useState } from "react";
import { useAdmin } from "../hooks/useAdmin";
import { AdminLoginModal } from "./AdminLoginModal";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [loginOpen, setLoginOpen] = useState(false);
  const { isAdmin, login } = useAdmin();
  const navigate = useNavigate();

  const handleLogin = async (password: string) => {
    const result = await login(password);
    if (result.success) {
      setLoginOpen(false);
      void navigate({ to: "/admin" });
    }
    return result;
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1 pt-16">{children}</main>
      <Footer />

      {/* Hidden admin lock icon — bottom-left corner */}
      {!isAdmin && (
        <button
          type="button"
          onClick={() => setLoginOpen(true)}
          className="fixed bottom-4 left-4 z-50 p-2 rounded-lg text-muted-foreground opacity-30 hover:opacity-80 transition-opacity duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
          aria-label="Admin login"
          data-ocid="layout.admin_lock_button"
        >
          <Lock className="w-4 h-4" />
        </button>
      )}

      <AdminLoginModal
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        onLogin={handleLogin}
      />
    </div>
  );
}
