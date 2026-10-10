export const darkThemeColors = {
  backgroundDeep: '#06070B',
  backgroundBase: '#080A0F',
  backgroundElevated: '#0D111B',
  surface: 'rgba(255, 255, 255, 0.04)',
  surfaceHover: 'rgba(255, 255, 255, 0.08)',
  foreground: '#F1F5F9',
  foregroundMuted: '#94A3B8',
  foregroundSubtle: '#64748B',
  accent: '#0EA5E9',
  accentBright: '#38BDF8',
  accentGlow: 'rgba(14, 165, 233, 0.25)',
  cyan: '#06B6D4',
  cyanLight: '#38BDF8',
  borderDefault: '#252B3A',
  borderHover: '#363E53',
  borderAccent: 'rgba(14, 165, 233, 0.35)',

  primary: '#0284C7',
  primaryDark: '#0369A1',
  primaryHover: '#0EA5E9',
  destructive: '#EF4444',
  success: '#10B981',
  successLight: 'rgba(16, 185, 129, 0.1)',
  warning: '#F59E0B',

  inputBg: '#0F131D',
  tabBg: 'rgba(255, 255, 255, 0.04)',
  placeholder: '#64748B',
  cardBg: '#0D111B',
} as const;

export const lightThemeColors = {
  backgroundDeep: '#F1F5F9',
  backgroundBase: '#F8FAFC',
  backgroundElevated: '#FFFFFF',
  surface: 'rgba(0, 0, 0, 0.03)',
  surfaceHover: 'rgba(0, 0, 0, 0.06)',
  foreground: '#0F172A',
  foregroundMuted: '#64748B',
  foregroundSubtle: '#94A3B8',
  accent: '#0284C7',
  accentBright: '#0EA5E9',
  accentGlow: 'rgba(2, 132, 199, 0.15)',
  cyan: '#0891B2',
  cyanLight: '#06B6D4',
  borderDefault: '#E2E8F0',
  borderHover: '#CBD5E1',
  borderAccent: 'rgba(2, 132, 199, 0.3)',

  primary: '#0284C7',
  primaryDark: '#0369A1',
  primaryHover: '#0EA5E9',
  destructive: '#DC2626',
  success: '#059669',
  successLight: 'rgba(5, 150, 105, 0.1)',
  warning: '#D97706',

  inputBg: '#FFFFFF',
  tabBg: 'rgba(0, 0, 0, 0.04)',
  placeholder: '#94A3B8',
  cardBg: '#FFFFFF',
} as const;

export type ThemeColors = Record<keyof typeof darkThemeColors, string>;

export function getThemeColors(theme: 'light' | 'dark'): ThemeColors {
  return theme === 'light' ? lightThemeColors : darkThemeColors;
}

export const colors = darkThemeColors;
