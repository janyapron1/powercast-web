import React from 'react';
import { Text, View } from 'react-native';

import { Card } from '@/presentation/components/ui';

type KPICardProps = {
  eyebrow: string;
  value: string;
  unit: string;
  description: string;
  trendText?: string;
  trendType?: 'positive' | 'negative' | 'neutral' | 'warning';
};

function KPICard({
  eyebrow,
  value,
  unit,
  description,
  trendText,
  trendType = 'neutral',
}: KPICardProps) {
  const getTrendBadgeColor = () => {
    switch (trendType) {
      case 'positive':
        return 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/30';
      case 'negative':
        return 'text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10 border-rose-200 dark:border-rose-500/30';
      case 'warning':
        return 'text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-500/15 border-amber-200 dark:border-amber-500/30';
      default:
        return 'text-sky-800 dark:text-sky-300 bg-sky-50 dark:bg-sky-500/10 border-sky-200 dark:border-sky-500/30';
    }
  };

  return (
    <Card variant="elevated" className="flex-1 p-4 md:p-5 gap-3 bg-white dark:bg-[#0D111B] border-slate-200 dark:border-[#252B3A]">
      <View className="flex-row items-center justify-between">
        <Text className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          {eyebrow}
        </Text>
        {trendText && (
          <View className={`px-2 py-0.5 rounded-full border ${getTrendBadgeColor()}`}>
            <Text className="text-[10px] font-bold">{trendText}</Text>
          </View>
        )}
      </View>

      <View className="flex-row items-baseline gap-1.5 pt-0.5">
        <Text className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
          {value}
        </Text>
        <Text className="text-xs md:text-sm font-semibold text-slate-500 dark:text-slate-400">{unit}</Text>
      </View>

      <Text className="text-xs text-slate-600 dark:text-slate-400 leading-normal">{description}</Text>
    </Card>
  );
}

export function ExecutiveOverviewKPIs() {
  return (
    <View className="gap-2">
      <View className="flex-row items-center justify-between px-1">
        <Text className="text-xs font-bold tracking-wider text-cyan-600 dark:text-cyan-400 uppercase">
          01. Executive Energy Overview
        </Text>
        <Text className="text-[11px] text-slate-500 dark:text-slate-400">
          Telemetry Interval: <Text className="font-semibold text-slate-800 dark:text-slate-200">15-Minute Realtime</Text>
        </Text>
      </View>

      <View className="flex-col sm:flex-row flex-wrap lg:flex-nowrap gap-3.5">
        <KPICard
          eyebrow="Current Grid Demand"
          value="24,850"
          unit="MW"
          description="Actual demand across transmission buses"
          trendText="+1.2% vs baseline"
          trendType="neutral"
        />

        <KPICard
          eyebrow="Forecast Peak Demand"
          value="26,420"
          unit="MW"
          description="Projected evening peak at 18:30 (+4h)"
          trendText="96.8% Conf"
          trendType="positive"
        />

        <KPICard
          eyebrow="Gas Dependency"
          value="64.2"
          unit="%"
          description="15,950 MW thermal combined cycle share"
          trendText="Elevated Share"
          trendType="warning"
        />

        <KPICard
          eyebrow="Supply Risk Index"
          value="42"
          unit="/ 100"
          description="Moderate peaker exposure; storage optimal"
          trendText="Moderate Stress"
          trendType="warning"
        />
      </View>
    </View>
  );
}
