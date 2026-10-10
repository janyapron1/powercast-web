import React from 'react';
import { Text, View } from 'react-native';

import { Badge, Card, ProgressBar } from '@/presentation/components/ui';

export function RiskIntelligenceCard() {
  const riskScore = 68;

  return (
    <Card variant="elevated" className="p-5 md:p-6 gap-5 bg-white dark:bg-[#0D111B] border-slate-200 dark:border-[#252B3A] flex-1">
      <View className="flex-row items-start justify-between">
        <View className="gap-1">
          <Text className="text-xs font-bold tracking-wider text-amber-600 dark:text-amber-400 uppercase">
            04. Natural Gas Risk Intelligence
          </Text>
          <Text className="text-base font-bold text-slate-900 dark:text-slate-100">
            Fuel Supply & Peaker Vulnerability
          </Text>
          <Text className="text-xs text-slate-600 dark:text-slate-400">
            Explainable AI risk scoring and grid resilience breakdown
          </Text>
        </View>

        <Badge label="ELEVATED STRESS" variant="warning" />
      </View>

      <View className="flex-row items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-[#080A0F]/80 border border-slate-200 dark:border-[#1E2433]">
        <View className="w-16 h-16 rounded-xl bg-amber-500/10 dark:bg-amber-500/10 border border-amber-500/30 items-center justify-center">
          <Text className="text-2xl font-extrabold text-amber-600 dark:text-amber-400">{riskScore}</Text>
          <Text className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">/ 100</Text>
        </View>

        <View className="flex-1 gap-1">
          <Text className="text-xs font-bold text-slate-900 dark:text-slate-200">
            Gas Reliance Vulnerability Score
          </Text>
          <Text className="text-[11px] leading-relaxed text-slate-600 dark:text-slate-400">
            High natural gas share increases vulnerability to pipeline pressure dips and LNG spot market spikes during evening peak load.
          </Text>
        </View>
      </View>

      <View className="gap-3">
        <Text className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          Primary Risk Stress Factors
        </Text>

        <View className="gap-1.5">
          <View className="flex-row items-center justify-between">
            <Text className="text-xs font-medium text-slate-700 dark:text-slate-300">Peaking Turbine Ramp-Rate</Text>
            <Text className="text-xs font-semibold text-amber-700 dark:text-amber-400">78% (High Demand)</Text>
          </View>
          <ProgressBar value={78} max={100} variant="warning" height={6} />
        </View>

        <View className="gap-1.5">
          <View className="flex-row items-center justify-between">
            <Text className="text-xs font-medium text-slate-700 dark:text-slate-300">LNG Terminal Throughput</Text>
            <Text className="text-xs font-semibold text-sky-700 dark:text-sky-400">84% (Adequate Buffer)</Text>
          </View>
          <ProgressBar value={84} max={100} variant="primary" height={6} />
        </View>

        <View className="gap-1.5">
          <View className="flex-row items-center justify-between">
            <Text className="text-xs font-medium text-slate-700 dark:text-slate-300">Pipeline Linepack Stability</Text>
            <Text className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">94% (Stable Supply)</Text>
          </View>
          <ProgressBar value={94} max={100} variant="success" height={6} />
        </View>
      </View>

      <View className="p-3.5 rounded-lg bg-sky-50 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-500/20 gap-1.5">
        <View className="flex-row items-center gap-2">
          <View className="w-2 h-2 rounded-full bg-cyan-600 dark:bg-cyan-400" />
          <Text className="text-xs font-bold text-sky-900 dark:text-cyan-300">
            Automated Dispatch Recommendation
          </Text>
        </View>
        <Text className="text-xs leading-relaxed text-slate-700 dark:text-slate-300">
          Pre-dispatch pumped storage hydro prior to the 17:00–19:00 evening peak to smooth peaker ramp requirements and lower natural gas line-pack drawdown.
        </Text>
      </View>
    </Card>
  );
}
