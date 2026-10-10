import React, { useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, Text, View } from 'react-native';

import {
  DashboardModule,
  DashboardTopbar,
  DataSourcesView,
  ForecastView,
  GasRiskView,
  GenerationMixView,
  ModelPerformanceView,
  OverviewView,
  ReportsView,
  SettingsView,
  Sidebar,
  SimulatorView,
} from '@/presentation/components/dashboard';
import { Button, Card } from '@/presentation/components/ui';
import { usePowerSummary } from '@/presentation/hooks/usePowerSummary';
import { useTheme } from '@/presentation/theme/ThemeContext';

type HomeScreenProps = {
  onSignOut?: () => void;
};

export function HomeScreen({ onSignOut }: HomeScreenProps) {
  const { data, error, isLoading, refresh } = usePowerSummary();
  const { colors } = useTheme();
  const [activeModule, setActiveModule] = useState<DashboardModule>('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState<boolean>(false);

  const renderActiveView = () => {
    switch (activeModule) {
      case 'forecast':
        return <ForecastView />;
      case 'mix':
        return <GenerationMixView />;
      case 'gas':
      case 'risk':
        return <GasRiskView />;
      case 'simulator':
        return <SimulatorView />;
      case 'performance':
        return <ModelPerformanceView />;
      case 'sources':
        return <DataSourcesView />;
      case 'reports':
        return <ReportsView />;
      case 'settings':
        return <SettingsView />;
      case 'overview':
      default:
        return <OverviewView />;
    }
  };

  return (
    <View className="flex-1 flex-row bg-[#F8FAFC] dark:bg-[#080A0F] min-h-screen transition-colors">
      <View className="hidden md:flex">
        <Sidebar
          activeModule={activeModule}
          onSelectModule={setActiveModule}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed((prev) => !prev)}
        />
      </View>

      {mobileSidebarOpen && (
        <View className="md:hidden absolute inset-0 z-50 flex-row">
          <Sidebar
            activeModule={activeModule}
            onSelectModule={(mod) => {
              setActiveModule(mod);
              setMobileSidebarOpen(false);
            }}
            collapsed={false}
            onToggleCollapse={() => setMobileSidebarOpen(false)}
          />
          <Pressable
            className="flex-1 bg-black/60"
            onPress={() => setMobileSidebarOpen(false)}
            accessibilityLabel="Close navigation drawer"
          />
        </View>
      )}

      <View className="flex-1 flex-col min-w-0 bg-[#F8FAFC] dark:bg-[#080A0F]">
        <DashboardTopbar
          activeModule={activeModule}
          onRefresh={() => void refresh()}
          isRefreshing={isLoading}
          onSignOut={onSignOut}
          onToggleSidebar={() => setMobileSidebarOpen((prev) => !prev)}
        />

        <ScrollView
          className="flex-1"
          contentContainerClassName="p-4 md:p-6 lg:p-8 gap-6 max-w-7xl mx-auto w-full pb-16"
        >
          {isLoading && !data ? (
            <Card className="items-center justify-center gap-3 py-16 bg-white dark:bg-[#0D111B] border-slate-200 dark:border-[#252B3A]">
              <ActivityIndicator color={colors.accent} size="large" />
              <Text className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                Synchronizing Transmission Bus Telemetry...
              </Text>
              <Text className="text-xs text-slate-500 dark:text-slate-400">
                Ingesting live generation mix, reserve margins, and DeepAR probabilistic forecasts
              </Text>
            </Card>
          ) : error ? (
            <Card className="gap-4 border-rose-300 dark:border-rose-500/30 bg-rose-50 dark:bg-rose-500/10 p-6">
              <View className="gap-1">
                <Text className="text-base font-semibold text-rose-600 dark:text-rose-400">
                  Could not synchronize grid telemetry
                </Text>
                <Text className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {error.message}
                </Text>
              </View>
              <Button
                label="Retry telemetry sync"
                variant="primary"
                onPress={() => void refresh()}
                className="self-start"
              />
            </Card>
          ) : (
            <>
              {renderActiveView()}

              <View className="pt-4 border-t border-slate-200 dark:border-[#1E2433] flex-col sm:flex-row items-center justify-between gap-3">
                <Text className="text-xs text-slate-500 dark:text-slate-500 text-center sm:text-left">
                  PowerCast Energy Intelligence • Multi-Horizon Probabilistic Dispatch • EGAT & Regional SCADA Feed
                </Text>

                <Pressable
                  onPress={() => void refresh()}
                  className="flex-row items-center gap-2 active:opacity-75"
                >
                  <View className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <Text className="text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200">
                    {data ? `Last telemetry sync: ${new Date(data.updatedAt).toLocaleTimeString()}` : 'Live stream active'} • Tap to re-sync
                  </Text>
                </Pressable>
              </View>
            </>
          )}
        </ScrollView>
      </View>
    </View>
  );
}
