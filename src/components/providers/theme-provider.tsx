"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface ThemeConfig {
  primaryColor: string;
  borderRadius: string;
  fontFamily: string;
  logoUrl?: string;
  sidebarColor?: string;
}

interface ThemeContextType {
  config: ThemeConfig;
  updateConfig: (newConfig: Partial<ThemeConfig>) => void;
}

const defaultTheme: ThemeConfig = {
  primaryColor: "oklch(0.42 0.18 264)", // Default ERP Blue
  borderRadius: "0.5rem",
  fontFamily: "Inter, sans-serif",
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<ThemeConfig>(defaultTheme);

  const updateConfig = (newConfig: Partial<ThemeConfig>) => {
    setConfig((prev) => ({ ...prev, ...newConfig }));
  };

  useEffect(() => {
    // Apply theme to CSS variables
    const root = document.documentElement;
    root.style.setProperty("--primary", config.primaryColor);
    root.style.setProperty("--radius", config.borderRadius);
    
    if (config.sidebarColor) {
      root.style.setProperty("--sidebar", config.sidebarColor);
    }
    
    // You could also apply font family here if needed
  }, [config]);

  return (
    <ThemeContext.Provider value={{ config, updateConfig }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
};
