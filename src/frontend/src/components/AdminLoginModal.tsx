import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Eye, EyeOff, Lock, ShieldCheck } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface AdminLoginModalProps {
  open: boolean;
  onClose: () => void;
  onLogin: (password: string) => Promise<{ success: boolean; error?: string }>;
}

export function AdminLoginModal({
  open,
  onClose,
  onLogin,
}: AdminLoginModalProps) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setPassword("");
      setError("");
      setSuccess(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setError("Please enter the admin password.");
      return;
    }
    setLoading(true);
    setError("");
    const result = await onLogin(password);
    setLoading(false);
    if (result.success) {
      setSuccess(true);
      setTimeout(() => onClose(), 1200);
    } else {
      setError(result.error ?? "Invalid password.");
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => !o && onClose()}
      data-ocid="admin.dialog"
    >
      <DialogContent className="bg-card border border-primary/30 shadow-elevation-lg max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-xl font-display">
            <div className="p-2 rounded-lg bg-primary/20 border border-primary/40">
              <Lock className="w-5 h-5 text-primary" />
            </div>
            <span className="text-gradient">Admin Access</span>
          </DialogTitle>
        </DialogHeader>

        {success ? (
          <div
            className="flex flex-col items-center gap-4 py-6"
            data-ocid="admin.success_state"
          >
            <div className="p-4 rounded-full bg-accent/20 border border-accent/40 animate-pulse-glow">
              <ShieldCheck className="w-10 h-10 text-accent" />
            </div>
            <p className="text-foreground font-display text-lg">
              Access Granted
            </p>
            <p className="text-muted-foreground text-sm">
              Welcome back, Ashwin.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5 pt-2">
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="admin-password"
                className="text-muted-foreground text-sm"
              >
                Password
              </Label>
              <div className="relative">
                <Input
                  id="admin-password"
                  ref={inputRef}
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  placeholder="Enter admin password"
                  className="bg-input border-border pr-10 focus:border-primary/60 focus:ring-primary/30"
                  data-ocid="admin.input"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {error && (
                <div
                  className="flex items-center gap-2 text-destructive text-sm"
                  data-ocid="admin.error_state"
                >
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                className="flex-1 border-border text-muted-foreground hover:border-primary/40"
                onClick={onClose}
                data-ocid="admin.cancel_button"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 gradient-primary text-primary-foreground font-semibold hover:opacity-90 transition-smooth"
                disabled={loading}
                data-ocid="admin.submit_button"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Verifying...
                  </span>
                ) : (
                  "Login"
                )}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
