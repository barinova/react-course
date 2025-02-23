import { createContext, ReactNode, useContext, useState } from 'react';

interface ThemeContext {
  isDarkTheme: boolean;
  themeSwitchHandler: () => void;
}

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeContext = createContext<ThemeContext | undefined>(undefined);

export const useTheme = (): ThemeContext => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be defined within a ThemeProvider');
  }

  return context;
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [isDarkTheme, setTheme] = useState<boolean>(false);

  const themeSwitchHandler = (): void => {
    setTheme((isDarkTheme: boolean) => !isDarkTheme);
  };

  return (
    <ThemeContext.Provider value={{ isDarkTheme, themeSwitchHandler }}>
      {children}
    </ThemeContext.Provider>
  );
};
