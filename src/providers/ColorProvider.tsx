import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

type Theme = "light" | "dark" | "system";

interface ColorContextValue {
  theme: Theme;
  resolvedTheme: "light" | "dark";
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
}

const STORAGE_KEY = "theme";

const ColorContext = createContext<ColorContextValue | undefined>(undefined);

function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function readStoredTheme(): Theme | null {
  try {
    if (typeof window === "undefined" || !window.localStorage) return null;
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    if (raw === "light" || raw === "dark" || raw === "system") return raw as Theme;
    return null;
  } catch {
    return null;
  }
}

function writeStoredTheme(t: Theme | null) {
  try {
    if (typeof window === "undefined" || !window.localStorage) return;
    if (t === null || t === "system") window.localStorage.removeItem(STORAGE_KEY);
    else window.localStorage.setItem(STORAGE_KEY, t);
  } catch {
    // ignore storage failures
  }
}

function applyResolvedTheme(resolved: "light" | "dark") {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  if (resolved === "dark") root.classList.add("dark");
  else root.classList.remove("dark");
}

export const ColorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // theme: user preference stored (or 'system' to follow OS)
  const [theme, setThemeState] = useState<Theme>(() => {
    // initial read (client-only). If no stored value -> system
    const stored = readStoredTheme();
    return stored ?? "system";
  });

  // resolvedTheme: actual theme currently applied
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">(() => {
    // conservative initial value: try matching system if possible; default light
    try {
      return getSystemTheme();
    } catch {
      return "light";
    }
  });

  // apply theme to document
  const apply = useCallback(
    (pref: Theme) => {
      const resolved = pref === "system" ? getSystemTheme() : pref;
      applyResolvedTheme(resolved);
      setResolvedTheme(resolved);
    },
    []
  );

  // setTheme exposed to consumers: persists preference and applies it
  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    writeStoredTheme(t);
    apply(t);
  }, [apply]);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : theme === "light" ? "system" : "dark");
  }, [theme, setTheme]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    apply(theme);

    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return;

    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const handler = () => {
      if (theme === "system") apply("system");
    };

    // modern browsers use addEventListener
    try {
      if (typeof media.addEventListener === "function") media.addEventListener("change", handler);
      else media.addListener(handler);
    } catch {
      // fallback: ignore
    }

    return () => {
      try {
        if (typeof media.removeEventListener === "function") media.removeEventListener("change", handler);
        else media.removeListener(handler);
      } catch {
        // ignore
      }
    };
  }, [theme, apply]);

  // Keep storage in sync if user modifies localStorage externally
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== STORAGE_KEY) return;
      const newVal = readStoredTheme() ?? "system";
      setThemeState(newVal);
      // don't write back to storage here; just apply
      apply(newVal);
    };
    if (typeof window !== "undefined") window.addEventListener("storage", onStorage);
    return () => {
      if (typeof window !== "undefined") window.removeEventListener("storage", onStorage);
    };
  }, [apply]);

  const value = useMemo(
    () => ({ theme, resolvedTheme, setTheme, toggleTheme }),
    [theme, resolvedTheme, setTheme, toggleTheme]
  );

  return <ColorContext.Provider value={value}>{children}</ColorContext.Provider>;
};

export function useColor(): ColorContextValue {
  const ctx = useContext(ColorContext);
  if (!ctx) throw new Error("useColor must be used within ColorProvider");
  return ctx;
}

// convenience: programmatic setter (if you prefer importing function instead of hook)
// NOTE: this helper only works in client code and when ColorProvider has already mounted.
export function setThemeProgrammatic(t: Theme) {
  try {
    writeStoredTheme(t);
    // apply immediately
    const resolved = t === "system" ? getSystemTheme() : t;
    applyResolvedTheme(resolved);
    // dispatch synthetic storage event so other tabs/components update
    try {
      window.dispatchEvent(new StorageEvent("storage", { key: STORAGE_KEY, newValue: t }));
    } catch {
      // ignore if it fails
    }
  } catch {
    // ignore failures
  }
}
