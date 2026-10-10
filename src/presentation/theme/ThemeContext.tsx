import React, { createContext, useContext, useEffect, useState } from 'react';
import { Appearance, Platform } from 'react-native';
import { useColorScheme as useNativeWindColorScheme } from 'nativewind';

import { getThemeColors, ThemeColors } from './colors';

export type ThemeMode = 'light' | 'dark' | 'system';

type ThemeContextType = {
  themeMode: ThemeMode;
  effectiveTheme: 'light' | 'dark';
  isDark: boolean;
  colors: ThemeColors;
  setThemeMode: (mode: ThemeMode) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = 'powercast_theme_mode';

function getInitialThemeMode(): ThemeMode {
  if (Platform.OS === 'web' && typeof window !== 'undefined' && window.localStorage) {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY) as ThemeMode | null;
      if (saved === 'light' || saved === 'dark' || saved === 'system') {
        return saved;
      }
    } catch {
      // Ignore storage errors
    }
  }
  return 'system';
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeMode, setThemeModeState] = useState<ThemeMode>(getInitialThemeMode);
  const [systemScheme, setSystemScheme] = useState<'light' | 'dark'>(() => {
    return Appearance.getColorScheme() === 'light' ? 'light' : 'dark';
  });

  const { setColorScheme: setNWColorScheme } = useNativeWindColorScheme();

  // Listen to system OS appearance changes
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setSystemScheme(colorScheme === 'light' ? 'light' : 'dark');
    });

    return () => {
      subscription.remove();
    };
  }, []);

  // Compute effective theme
  const effectiveTheme: 'light' | 'dark' =
    themeMode === 'system' ? systemScheme : themeMode;

  const isDark = effectiveTheme === 'dark';
  const colors = getThemeColors(effectiveTheme);

  // Sync with NativeWind and Web documentElement
  useEffect(() => {
    try {
      setNWColorScheme(themeMode);
    } catch {
      // NativeWind colorScheme fallback
    }

    if (Platform.OS === 'web' && typeof document !== 'undefined') {
      const root = document.documentElement;
      if (isDark) {
        root.classList.add('dark');
        root.classList.remove('light');
        root.style.colorScheme = 'dark';
      } else {
        root.classList.remove('dark');
        root.classList.add('light');
        root.style.colorScheme = 'light';
      }
    }
  }, [themeMode, isDark, setNWColorScheme]);

  const setThemeMode = (mode: ThemeMode) => {
    setThemeModeState(mode);
    if (Platform.OS === 'web' && typeof window !== 'undefined' && window.localStorage) {
      try {
        window.localStorage.setItem(STORAGE_KEY, mode);
      } catch {
        // Ignore storage errors
      }
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        themeMode,
        effectiveTheme,
        isDark,
        colors,
        setThemeMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

