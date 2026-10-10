import React from 'react';
import { Pressable, Text, View } from 'react-native';
import Svg, { Circle, Line, Path, Rect } from 'react-native-svg';

import { ThemeMode, useTheme } from '@/presentation/theme/ThemeContext';

type ThemeSwitcherProps = {
  compact?: boolean;
  className?: string;
};

function SunIcon({ size = 14, color = '#94A3B8' }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <Circle cx={12} cy={12} r={4} />
      <Path d="M12 2v2" />
      <Path d="M12 20v2" />
      <Path d="m4.93 4.93 1.41 1.41" />
      <Path d="m17.66 17.66 1.41 1.41" />
      <Path d="M2 12h2" />
      <Path d="M20 12h2" />
      <Path d="m6.34 17.66-1.41 1.41" />
      <Path d="m19.07 4.93-1.41 1.41" />
    </Svg>
  );
}

function MoonIcon({ size = 14, color = '#94A3B8' }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </Svg>
  );
}

function MonitorIcon({ size = 14, color = '#94A3B8' }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <Rect width={20} height={14} x={2} y={3} rx={2} />
      <Line x1={8} x2={16} y1={21} y2={21} />
      <Line x1={12} x2={12} y1={17} y2={21} />
    </Svg>
  );
}

export function ThemeSwitcher({ compact = false, className = '' }: ThemeSwitcherProps) {
  const { themeMode, setThemeMode, isDark } = useTheme();

  const options: { mode: ThemeMode; label: string; icon: (c: string) => React.ReactNode }[] = [
    {
      mode: 'light',
      label: 'สว่าง',
      icon: (c) => <SunIcon color={c} size={14} />,
    },
    {
      mode: 'dark',
      label: 'มืด',
      icon: (c) => <MoonIcon color={c} size={14} />,
    },
    {
      mode: 'system',
      label: 'ระบบ',
      icon: (c) => <MonitorIcon color={c} size={14} />,
    },
  ];

  return (
    <View
      className={`flex-row items-center rounded-lg p-0.5 border ${
        isDark ? 'bg-[#080A0F] border-[#252B3A]' : 'bg-slate-100 border-slate-200'
      } ${className}`}
      accessibilityRole="radiogroup"
    >
      {options.map((opt) => {
        const isSelected = themeMode === opt.mode;
        const activeColor = isDark ? '#38BDF8' : '#0284C7';
        const inactiveColor = isDark ? '#94A3B8' : '#64748B';
        const iconColor = isSelected ? activeColor : inactiveColor;

        return (
          <Pressable
            key={opt.mode}
            onPress={() => setThemeMode(opt.mode)}
            accessibilityRole="radio"
            accessibilityState={{ selected: isSelected }}
            accessibilityLabel={`Theme ${opt.label}`}
            className={`flex-row items-center justify-center rounded-md transition-all ${
              compact ? 'px-2 py-1' : 'px-2.5 py-1 gap-1.5'
            } ${
              isSelected
                ? isDark
                  ? 'bg-sky-500/20 border border-sky-500/40 shadow-sm'
                  : 'bg-white border border-slate-300 shadow-sm'
                : 'hover:bg-black/[0.04] dark:hover:bg-white/[0.04]'
            }`}
          >
            {opt.icon(iconColor)}
            {!compact && (
              <Text
                className={`text-[11px] font-semibold ${
                  isSelected
                    ? isDark
                      ? 'text-sky-300'
                      : 'text-slate-900'
                    : isDark
                      ? 'text-slate-400'
                      : 'text-slate-600'
                }`}
              >
                {opt.label}
              </Text>
            )}
          </Pressable>
        );
      })}
    </View>
  );
}

