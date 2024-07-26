import React, { createContext, ReactNode, useContext, useState } from "react";

interface IThemeContext {
  darkMode: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<IThemeContext | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [darMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darMode);
  };

  return (
    <ThemeContext.Provider value={{ darkMode: darMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): IThemeContext => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
