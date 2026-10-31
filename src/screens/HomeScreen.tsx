import React, { useState } from 'react';
import { View, Text, ScrollView, RefreshControl } from 'react-native';
import { Zap, ShieldAlert, User as UserIcon, RefreshCw } from 'lucide-react-native';

import { Header } from '@/components/Header';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { formatDate } from '@/utils/helpers';
import { User, AppMetric } from '@/types';

export interface HomeScreenProps {
  user: User | null;
  onNavigateToProfile: () => void;
}

const SAMPLE_METRICS: AppMetric[] = [
  { id: '1', label: 'Grid Demand Load', value: '31,420 MW', change: '+2.8%', isPositive: true },
  { id: '2', label: 'Gas Fuel Security', value: '87.4%', change: '-1.2%', isPositive: false },
  { id: '3', label: 'Solar & Wind Output', value: '4,850 MW', change: '+14.6%', isPositive: true },
  { id: '4', label: 'Reserve Margin', value: '18.2%', change: '+0.5%', isPositive: true },
];

export function HomeScreen({ user, onNavigateToProfile }: HomeScreenProps) {
  const [refreshing, setRefreshing] = useState(false);
  const [metrics] = useState<AppMetric[]>(SAMPLE_METRICS);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  return (
    <View className="flex-1 bg-[#080A0F]">
      <Header
        title="PowerCast Dashboard"
        subtitle={`Live Operations • ${formatDate(new Date())}`}
        rightAction={
          <Button
            label="Profile"
            variant="secondary"
            size="sm"
            onPress={onNavigateToProfile}
            icon={<UserIcon size={14} color="#F1F5F9" />}
          />
        }
      />

      <ScrollView
        className="flex-1 px-4 py-4"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#0EA5E9"
          />
        }
      >
        {/* Welcome Section */}
        <Card className="mb-4 bg-gradient-to-r from-sky-950/40 to-slate-900 border-sky-800/40">
          <View className="flex-row items-center justify-between mb-2">
            <View>
              <Text className="text-xs uppercase font-semibold tracking-wider text-sky-400">
                Welcome back
              </Text>
              <Text className="text-xl font-bold text-white mt-0.5">
                {user?.name ?? 'Analyst'}
              </Text>
            </View>
            <View className="p-2.5 rounded-xl bg-sky-500/10 border border-sky-500/20">
              <Zap size={22} color="#38BDF8" />
            </View>
          </View>
          <Text className="text-xs text-slate-400">
            {user?.role ?? 'Lead Operations Analyst'} • {user?.department ?? 'System Forecasting'}
          </Text>
        </Card>

        {/* Telemetry Metrics Grid */}
        <Text className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
          Grid Telemetry & Reserves
        </Text>

        <View className="flex-row flex-wrap justify-between mb-4">
          {metrics.map((item) => (
            <Card key={item.id} className="w-[48%] mb-3 p-3.5">
              <Text className="text-xs text-slate-400 mb-1" numberOfLines={1}>
                {item.label}
              </Text>
              <Text className="text-lg font-bold text-white mb-1.5">
                {item.value}
              </Text>
              <View className="flex-row items-center">
                <Text
                  className={`text-xs font-semibold ${
                    item.isPositive ? 'text-emerald-400' : 'text-rose-400'
                  }`}
                >
                  {item.change}
                </Text>
                <Text className="text-[10px] text-slate-500 ml-1.5">vs 24h avg</Text>
              </View>
            </Card>
          ))}
        </View>

        {/* Status Alert Card */}
        <Card className="mb-4 border-amber-500/30 bg-amber-500/5">
          <View className="flex-row items-start">
            <View className="p-2 rounded-lg bg-amber-500/10 mr-3">
              <ShieldAlert size={20} color="#F59E0B" />
            </View>
            <View className="flex-1">
              <Text className="text-sm font-semibold text-amber-300">
                Gas Curtailment Advisory
              </Text>
              <Text className="text-xs text-slate-300 mt-1 leading-relaxed">
                Planned compressor overhaul scheduled in Eastern gas corridor next week. Combined cycle reserve plants placed on standby alert.
              </Text>
            </View>
          </View>
        </Card>

        {/* Quick Action Buttons */}
        <View className="gap-2.5 mb-8">
          <Button
            label="Manual Telemetry Re-Sync"
            variant="outline"
            icon={<RefreshCw size={16} color="#CBD5E1" />}
            onPress={onRefresh}
            isLoading={refreshing}
          />
          <Button
            label="View User Settings & Account"
            variant="secondary"
            onPress={onNavigateToProfile}
          />
        </View>
      </ScrollView>
    </View>
  );
}
