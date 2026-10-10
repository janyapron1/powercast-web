import React from 'react';
import { Pressable, Text, View } from 'react-native';

import { Badge, ThemeSwitcher } from '@/presentation/components/ui';
import { useTheme } from '@/presentation/theme/ThemeContext';
import { RefreshIcon } from './DashboardIcons';
import { DashboardModule } from './Sidebar';

type DashboardTopbarProps = {
  activeModule?: DashboardModule;
  onRefresh?: () => void;
  isRefreshing?: boolean;
  onSignOut?: () => void;
  onToggleSidebar?: () => void;
};

const MODULE_TITLES: Record<DashboardModule, { category: string; title: string }> = {
  overview: { category: 'Workspace', title: 'Executive Energy Intelligence' },
  forecast: { category: 'Workspace', title: 'Generation Forecast & Dispatch' },
  mix: { category: 'Workspace', title: 'Generation Mix & Fuel Transition' },
  gas: { category: 'Workspace', title: 'Natural Gas Dependency' },
  risk: { category: 'Workspace', title: 'Risk Intelligence & Peaker Stress' },
  simulator: { category: 'Workspace', title: 'Grid Scenario Simulator' },
  performance: { category: 'Workspace', title: 'Deep Learning Model Intelligence' },
  sources: { category: 'Workspace', title: 'Data Ingestion & SCADA Feeds' },
  reports: { category: 'System', title: 'Reports & Analytics Exports' },
  settings: { category: 'System', title: 'Settings & Workspace Preferences' },
};

export function DashboardTopbar({
  activeModule = 'overview',
  onRefresh,
  isRefreshing = false,
  onSignOut,
  onToggleSidebar,
}: DashboardTopbarProps) {
  const { isDark } = useTheme();
  const currentMeta = MODULE_TITLES[activeModule] || MODULE_TITLES.overview;

  return (
    <View className="border-b border-slate-200 dark:border-[#252B3A] bg-white/95 dark:bg-[#0A0D14]/95 px-5 py-3 z-20 transition-colors">
      <View className="flex-row items-center justify-between gap-3">
        <View className="flex-row items-center gap-3">
          {onToggleSidebar && (
            <Pressable
              onPress={onToggleSidebar}
              accessibilityRole="button"
              accessibilityLabel="Toggle menu"
              className="md:hidden p-1.5 rounded-md bg-slate-100 dark:bg-[#111624] border border-slate-200 dark:border-[#252B3A]"
            >
              <View className="w-4 h-3.5 justify-between">
                <View className="h-0.5 bg-slate-700 dark:bg-slate-300 rounded-full" />
                <View className="h-0.5 bg-slate-700 dark:bg-slate-300 rounded-full" />
                <View className="h-0.5 bg-slate-700 dark:bg-slate-300 rounded-full" />
              </View>
            </Pressable>
          )}

          <View className="gap-0.5">
            <View className="flex-row items-center gap-1.5">
              <Text className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                {currentMeta.category}
              </Text>
              <Text className="text-[11px] text-slate-400 dark:text-slate-600">/</Text>
              <Text className="text-[11px] font-semibold text-slate-700 dark:text-slate-200">
                {currentMeta.title.split(' ')[0]}
              </Text>
            </View>
            <Text className="text-sm md:text-base font-bold tracking-tight text-slate-900 dark:text-slate-100">
              {currentMeta.title}
            </Text>
          </View>
        </View>

        <View className="flex-row items-center gap-2 sm:gap-3">
          <View className="hidden lg:flex-row items-center gap-2 px-2.5 py-1 rounded-md bg-slate-100 dark:bg-[#0F1420] border border-slate-200 dark:border-[#252B3A]">
            <View className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
            <Text className="text-xs font-semibold text-slate-800 dark:text-slate-200">50.02 Hz</Text>
            <Text className="text-[10px] text-slate-500 dark:text-slate-400">Grid Sync</Text>
          </View>

          <Badge label="LIVE GRID" variant="cyan" />

          <ThemeSwitcher compact={true} />

          {onRefresh && (
            <Pressable
              onPress={onRefresh}
              accessibilityRole="button"
              accessibilityLabel="Refresh telemetry data"
              disabled={isRefreshing}
              className={`p-1.5 rounded-md border border-slate-200 dark:border-[#252B3A] bg-slate-100 dark:bg-[#0F1420] active:bg-slate-200 dark:active:bg-[#1A2234] ${isRefreshing ? 'opacity-50' : ''
                }`}
            >
              <RefreshIcon size={14} color={isDark ? '#94A3B8' : '#64748B'} />
            </Pressable>
          )}

          {onSignOut && (
            <Pressable
              onPress={onSignOut}
              accessibilityRole="button"
              className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-[#252B3A] hover:bg-slate-200 dark:hover:bg-white/[0.08]"
            >
              <Text className="text-xs font-medium text-slate-700 dark:text-slate-300">Sign out</Text>
            </Pressable>
          )}
        </View>
      </View>
    </View>
  );
}
