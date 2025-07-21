import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useColorScheme } from 'react-native';

interface ThemeColors {
  background: string;
  text: string;
  secondaryText: string;
  card: string;
  border: string;
  primary: string;
  accent: string;
  disabled: string;
}

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
  colors: ThemeColors;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const lightTheme: ThemeColors = {
  background: '#F8FAFC',
  text: '#1E293B',
  secondaryText: '#64748B',
  card: '#FFFFFF',
  border: '#E5E7EB',
  primary: '#6366F1',
  accent: '#10B981',
  disabled: '#9CA3AF',
};

const darkTheme: ThemeColors = {
  background: '#1A1A1A',
  text: '#F8FAFC',
  secondaryText: '#A1A1AA',
  card: '#2D2D2D',
  border: '#3F3F46',
  primary: '#818CF8',
  accent: '#34D399',
  disabled: '#6B7280',
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [overrideTheme, setOverrideTheme] = useState<'light' | 'dark' | null>(null);
  const isDarkMode = overrideTheme ? overrideTheme === 'dark' : systemColorScheme === 'dark';
  const colors = isDarkMode ? darkTheme : lightTheme;

  const toggleTheme = () => {
    setOverrideTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};