import { useCallback, useEffect, useState } from "react";
import { mockBackend } from "../mocks/backend";

const TOKEN_KEY = "admin_token";
const ADMIN_PASSWORD = "ashwin@chouhan";

interface UseAdminReturn {
  isAdmin: boolean;
  token: string | null;
  login: (password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

export function useAdmin(): UseAdminReturn {
  const [token, setToken] = useState<string | null>(() => {
    try {
      const stored = localStorage.getItem(TOKEN_KEY);
      if (!stored) return null;
      const parsed = JSON.parse(stored) as { token: string; expiresAt: number };
      if (parsed.expiresAt && Date.now() > parsed.expiresAt) {
        localStorage.removeItem(TOKEN_KEY);
        return null;
      }
      return parsed.token;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (!token) {
      localStorage.removeItem(TOKEN_KEY);
    }
  }, [token]);

  const login = useCallback(async (password: string) => {
    // Validate password client-side first for fast UX
    if (password !== ADMIN_PASSWORD) {
      return { success: false, error: "Invalid password. Please try again." };
    }
    // Get a real token from the backend
    const result = await mockBackend.adminLogin(password);
    if (result.__kind__ === "err") {
      return { success: false, error: result.err };
    }
    const newToken = result.ok;
    const session = {
      token: newToken,
      expiresAt: Date.now() + 24 * 60 * 60 * 1000,
    };
    localStorage.setItem(TOKEN_KEY, JSON.stringify(session));
    setToken(newToken);
    return { success: true };
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
  }, []);

  return { isAdmin: !!token, token, login, logout };
}
