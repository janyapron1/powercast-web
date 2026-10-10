import React from 'react';
import { Pressable, Text, View } from 'react-native';

import { BrandMark, ThemeSwitcher } from '@/presentation/components/ui';
import { useTheme } from '@/presentation/theme/ThemeContext';
import {
  BrainCircuitIcon,
  DashboardIcon,
  DatabaseIcon,
  FlameIcon,
  ForecastIcon,
  MixIcon,
  PanelToggleIcon,
  PulseActivityIcon,
  ReportsIcon,
  SettingsIcon,
  ShieldAlertIcon,
  SimulatorIcon,
} from './DashboardIcons';

export type DashboardModule =
  | 'overview'
  | 'forecast'
  | 'mix'
  | 'gas'
  | 'risk'
  | 'simulator'
  | 'performance'
  | 'sources'
  | 'reports'
  | 'settings';

type SidebarProps = {
  activeModule: DashboardModule;
  onSelectModule: (module: DashboardModule) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
};

type MenuItemConfig = {
  id: DashboardModule;
  label: string;
  icon: (color: string) => React.ReactNode;
  badge?: string;
  badgeVariant?: 'amber' | 'cyan' | 'default';
};

const WORKSPACE_ITEMS: MenuItemConfig[] = [
  {
    id: 'overview',
    label: 'Overview',
    icon: (c) => <DashboardIcon color={c} size={18} />,
  },
  {
    id: 'forecast',
    label: 'Generation Forecast',
    icon: (c) => <ForecastIcon color={c} size={18} />,
  },
  {
    id: 'mix',
    label: 'Generation Mix',
    icon: (c) => <MixIcon color={c} size={18} />,
  },
  {
    id: 'gas',
    label: 'Gas Dependency',
    icon: (c) => <FlameIcon color={c} size={18} />,
  },
  {
    id: 'risk',
    label: 'Risk Intelligence',
    icon: (c) => <ShieldAlertIcon color={c} size={18} />,
    badge: '2',
    badgeVariant: 'amber',
  },
  {
    id: 'simulator',
    label: 'Scenario Simulator',
    icon: (c) => <SimulatorIcon color={c} size={18} />,
  },
  {
    id: 'performance',
    label: 'Model Performance',
    icon: (c) => <BrainCircuitIcon color={c} size={18} />,
  },
  {
    id: 'sources',
    label: 'Data & Sources',
    icon: (c) => <DatabaseIcon color={c} size={18} />,
  },
];

const SYSTEM_ITEMS: MenuItemConfig[] = [
  {
    id: 'reports',
    label: 'Reports & Exports',
    icon: (c) => <ReportsIcon color={c} size={18} />,
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: (c) => <SettingsIcon color={c} size={18} />,
  },
];

export function Sidebar({
  activeModule,
  onSelectModule,
  collapsed,
  onToggleCollapse,
}: SidebarProps) {
  const { isDark } = useTheme();

  const renderItem = (item: MenuItemConfig) => {
    const isActive = activeModule === item.id;
    const activeColor = isDark ? '#38BDF8' : '#0284C7';
    const inactiveColor = isDark ? '#94A3B8' : '#64748B';
    const iconColor = isActive ? activeColor : inactiveColor;

    return (
      <Pressable
        key={item.id}
        onPress={() => onSelectModule(item.id)}
        accessibilityRole="button"
        accessibilityState={{ selected: isActive }}
        className={`group flex-row items-center rounded-lg transition-all ${collapsed ? 'justify-center p-2.5' : 'px-3 py-2.5 gap-3'
          } ${isActive
            ? 'bg-sky-500/15 border border-sky-500/35 dark:bg-sky-500/15 dark:border-sky-500/30'
            : 'border border-transparent hover:bg-slate-100 dark:hover:bg-white/[0.04] active:bg-slate-200 dark:active:bg-white/[0.06]'
          }`}
      >
        {isActive && !collapsed && (
          <View className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-cyan-500 dark:bg-cyan-400" />
        )}

        <View className="items-center justify-center">
          {item.icon(iconColor)}
        </View>

        {!collapsed && (
          <View className="flex-1 flex-row items-center justify-between">
            <Text
              numberOfLines={1}
              className={`text-[13px] font-medium tracking-tight ${isActive
                ? 'text-sky-950 dark:text-slate-100 font-semibold'
                : 'text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-200'
                }`}
            >
              {item.label}
            </Text>

            {item.badge && (
              <View
                className={`px-1.5 py-0.5 rounded-full ${item.badgeVariant === 'amber'
                  ? 'bg-amber-500/20 border border-amber-500/40'
                  : 'bg-cyan-500/20 border border-cyan-500/40'
                  }`}
              >
                <Text
                  className={`text-[10px] font-bold ${item.badgeVariant === 'amber' ? 'text-amber-600 dark:text-amber-300' : 'text-cyan-600 dark:text-cyan-300'
                    }`}
                >
                  {item.badge}
                </Text>
              </View>
            )}
          </View>
        )}
      </Pressable>
    );
  };

  return (
    <View
      className={`border-r border-slate-200 dark:border-[#252B3A] bg-white dark:bg-[#0A0D14] flex-col justify-between py-4 select-none transition-colors ${collapsed ? 'w-[68px] px-2' : 'w-[256px] px-3.5'
        }`}
      style={{ minHeight: '100%' }}
    >
      <View className="gap-4">
        {collapsed ? (
          <View className="items-center gap-3">
            <BrandMark variant="auto" size="sm" showWordmark={false} />
            <Pressable
              onPress={onToggleCollapse}
              accessibilityRole="button"
              accessibilityLabel="Expand sidebar"
              className="p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-white/[0.06] active:bg-slate-200 dark:active:bg-white/[0.1]"
            >
              <PanelToggleIcon size={16} color={isDark ? '#64748B' : '#94A3B8'} />
            </Pressable>
          </View>
        ) : (
          <View className="flex-row items-center justify-between px-1">
            <View className="flex-row items-center gap-2.5">
              <BrandMark variant="auto" size="sm" showWordmark={false} />
              <View className="gap-0.5">
                <Text className="text-xs font-bold tracking-[0.12em] text-slate-900 dark:text-slate-100 uppercase">
                  PowerCast
                </Text>
                <Text className="text-[10px] font-medium tracking-wider text-slate-500 dark:text-slate-400 uppercase">
                  Energy Intel
                </Text>
              </View>
            </View>

            <Pressable
              onPress={onToggleCollapse}
              accessibilityRole="button"
              accessibilityLabel="Collapse sidebar"
              className="p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-white/[0.06] active:bg-slate-200 dark:active:bg-white/[0.1]"
            >
              <PanelToggleIcon size={16} color={isDark ? '#64748B' : '#94A3B8'} />
            </Pressable>
          </View>
        )}

        <View className="h-px bg-slate-200 dark:bg-[#252B3A] my-0.5" />

        <View className="gap-1">
          {!collapsed && (
            <Text className="px-3 pb-1 text-[10px] font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase">
              Workspace
            </Text>
          )}
          {WORKSPACE_ITEMS.map(renderItem)}
        </View>

        <View className="gap-1 pt-2">
          {!collapsed && (
            <Text className="px-3 pb-1 text-[10px] font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase">
              System
            </Text>
          )}
          {SYSTEM_ITEMS.map(renderItem)}
        </View>
      </View>

      <View className="pt-3 border-t border-slate-200 dark:border-[#252B3A] gap-2.5">
        {!collapsed && (
          <View className="px-1">
            <ThemeSwitcher compact={false} />
          </View>
        )}

        <View
          className={`flex-row items-center rounded-lg bg-slate-50 dark:bg-[#0F1420] border border-slate-200 dark:border-[#252B3A] p-2.5 ${collapsed ? 'justify-center' : 'gap-2.5'
            }`}
        >
          <View className="w-8 h-8 rounded-md bg-sky-500/10 border border-sky-500/20 items-center justify-center">
            <PulseActivityIcon size={16} color="#0EA5E9" />
          </View>

          {!collapsed && (
            <View className="flex-1 gap-0.5">
              <Text className="text-xs font-semibold text-slate-800 dark:text-slate-200">Forecast Engine</Text>
              <View className="flex-row items-center gap-1.5">
                <View className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
                <Text className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400">Operational • v2.4</Text>
              </View>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}
