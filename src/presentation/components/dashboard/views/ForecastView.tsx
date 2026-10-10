import React from 'react';
import { Text, View } from 'react-native';

import {
  Badge,
  Card,
  SectionHeader,
} from '@/presentation/components/ui';
import { ForecastChart } from '../ForecastChart';

const HOURLY_DISPATCH_SCHEDULE = [
  { time: '12:00 (Current)', actual: '24,850 MW', predicted: '24,810 MW', delta: '+40 MW', interval: '±340 MW', status: 'Synchronized', variant: 'success' as const },
  { time: '14:00', actual: '—', predicted: '25,120 MW', delta: '—', interval: '±380 MW', status: 'Optimal', variant: 'default' as const },
  { time: '16:00', actual: '—', predicted: '25,890 MW', delta: '—', interval: '±410 MW', status: 'Ramp Up', variant: 'cyan' as const },
  { time: '18:30 (Peak)', actual: '—', predicted: '26,420 MW', delta: '—', interval: '±450 MW', status: 'Peak Demand', variant: 'warning' as const },
  { time: '21:00', actual: '—', predicted: '24,300 MW', delta: '—', interval: '±390 MW', status: 'Ramp Down', variant: 'default' as const },
  { time: '23:00', actual: '—', predicted: '21,800 MW', delta: '—', interval: '±360 MW', status: 'Off-Peak', variant: 'default' as const },
];

export function ForecastView() {
  return (
    <View className="gap-6 max-w-6xl w-full mx-auto">
      <SectionHeader
        eyebrow="MULTI-HORIZON LOAD PREDICTION"
        title="Generation Forecast & Dispatch Scheduling"
        subtitle="Probabilistic transformer deep learning forecasts across transmission grid interconnection buses."
        action={<Badge label="MODEL v2.4-DL ACTIVE" variant="cyan" />}
      />

      <View className="flex-col sm:flex-row gap-3.5">
        <Card variant="elevated" className="flex-1 p-4 gap-1 bg-white dark:bg-[#0D111B] border-slate-200 dark:border-[#252B3A]">
          <Text className="text-[11px] font-bold uppercase text-slate-500 dark:text-slate-400">Projected Peak Load</Text>
          <Text className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">26,420 MW</Text>
          <Text className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold">At 18:30 (+4.5h)</Text>
        </Card>

        <Card variant="elevated" className="flex-1 p-4 gap-1 bg-white dark:bg-[#0D111B] border-slate-200 dark:border-[#252B3A]">
          <Text className="text-[11px] font-bold uppercase text-slate-500 dark:text-slate-400">Ramp Requirement</Text>
          <Text className="text-2xl font-extrabold text-cyan-600 dark:text-cyan-400">+1,570 MW</Text>
          <Text className="text-[11px] text-slate-500 dark:text-slate-400">Across 15:00–18:00 window</Text>
        </Card>

        <Card variant="elevated" className="flex-1 p-4 gap-1 bg-white dark:bg-[#0D111B] border-slate-200 dark:border-[#252B3A]">
          <Text className="text-[11px] font-bold uppercase text-slate-500 dark:text-slate-400">Mean WAPE Accuracy</Text>
          <Text className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">2.4%</Text>
          <Text className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">Exceeds 95% target</Text>
        </Card>
      </View>

      <ForecastChart />

      <Card variant="elevated" className="p-6 gap-4 bg-white dark:bg-[#0D111B] border-slate-200 dark:border-[#252B3A]">
        <View className="flex-row items-center justify-between">
          <View className="gap-0.5">
            <Text className="text-base font-bold text-slate-900 dark:text-slate-100">
              Hourly Dispatch Telemetry Interval Schedule
            </Text>
            <Text className="text-xs text-slate-600 dark:text-slate-400">
              Validated actual readings compared against probabilistic forecast horizons.
            </Text>
          </View>
          <Badge label="24-HOUR HORIZON" variant="default" />
        </View>

        <View className="gap-2 pt-2">
          {HOURLY_DISPATCH_SCHEDULE.map((item) => (
            <View
              key={item.time}
              className="flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-[#080A0F]/80 border border-slate-200 dark:border-[#1E2433] gap-2"
            >
              <View className="flex-row items-center gap-3">
                <Text className="text-xs font-bold text-slate-900 dark:text-slate-100 w-32">
                  {item.time}
                </Text>
                <Badge label={item.status} variant={item.variant} />
              </View>

              <View className="flex-row items-center gap-6 self-end sm:self-auto">
                <View className="items-end">
                  <Text className="text-[10px] text-slate-500 uppercase">Actual Load</Text>
                  <Text className="text-xs font-bold text-slate-800 dark:text-slate-200">{item.actual}</Text>
                </View>

                <View className="items-end">
                  <Text className="text-[10px] text-slate-500 uppercase">Forecast Load</Text>
                  <Text className="text-xs font-bold text-sky-600 dark:text-sky-400">{item.predicted}</Text>
                </View>

                <View className="items-end">
                  <Text className="text-[10px] text-slate-500 uppercase">Confidence Band</Text>
                  <Text className="text-xs font-semibold text-slate-600 dark:text-slate-400">{item.interval}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </Card>
    </View>
  );
}

