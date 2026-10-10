import React from 'react';
import { Text, View } from 'react-native';

import { Card } from '@/presentation/components/ui';

export function ModelIntelligenceCard() {
  return (
    <Card variant="elevated" className="p-5 md:p-6 gap-5 bg-white dark:bg-[#0D111B] border-slate-200 dark:border-[#252B3A] flex-1">
      <View className="flex-row items-start justify-between">
        <View className="gap-1">
          <Text className="text-xs font-bold tracking-wider text-cyan-600 dark:text-cyan-400 uppercase">
            06. Deep Learning Model Intelligence
          </Text>
          <Text className="text-base font-bold text-slate-900 dark:text-slate-100">
            Validation Metrics & Explainability
          </Text>
          <Text className="text-xs text-slate-600 dark:text-slate-400">
            Real-time loss tracking, drift monitoring, and top load drivers
          </Text>
        </View>

        <View className="flex-row items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30">
          <View className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
          <Text className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300">Zero Drift Detected</Text>
        </View>
      </View>

      <View className="grid grid-cols-3 gap-2.5">
        <View className="p-3 rounded-lg bg-slate-50 dark:bg-[#080A0F]/80 border border-slate-200 dark:border-[#1E2433] gap-1">
          <Text className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase">MAE Error</Text>
          <Text className="text-lg font-extrabold text-slate-900 dark:text-slate-100">142 MW</Text>
          <Text className="text-[10px] text-emerald-600 dark:text-emerald-400">-12 MW vs Baseline</Text>
        </View>

        <View className="p-3 rounded-lg bg-slate-50 dark:bg-[#080A0F]/80 border border-slate-200 dark:border-[#1E2433] gap-1">
          <Text className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase">RMSE Error</Text>
          <Text className="text-lg font-extrabold text-slate-900 dark:text-slate-100">198 MW</Text>
          <Text className="text-[10px] text-slate-500 dark:text-slate-400">Across 24h cycle</Text>
        </View>

        <View className="p-3 rounded-lg bg-slate-50 dark:bg-[#080A0F]/80 border border-slate-200 dark:border-[#1E2433] gap-1">
          <Text className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase">WAPE Score</Text>
          <Text className="text-lg font-extrabold text-cyan-600 dark:text-cyan-400">2.4%</Text>
          <Text className="text-[10px] text-cyan-700 dark:text-cyan-300">Production Benchmark</Text>
        </View>
      </View>

      <View className="gap-2 pt-1 border-t border-slate-200 dark:border-[#1E2433]">
        <Text className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          Top Forecasting Drivers (SHAP Influence)
        </Text>

        <View className="gap-2">
          <View className="flex-row items-center justify-between text-xs">
            <Text className="text-xs text-slate-700 dark:text-slate-300">Ambient Temperature & Heat Index</Text>
            <Text className="text-xs font-bold text-cyan-600 dark:text-cyan-400">42% weight</Text>
          </View>
          <View className="h-1.5 w-full rounded-full bg-slate-100 dark:bg-[#111624] overflow-hidden">
            <View className="h-full bg-cyan-500" style={{ width: '42%' }} />
          </View>

          <View className="flex-row items-center justify-between text-xs pt-1">
            <Text className="text-xs text-slate-700 dark:text-slate-300">Historical 24-Hour Autoregressive Lag</Text>
            <Text className="text-xs font-bold text-sky-600 dark:text-sky-400">28% weight</Text>
          </View>
          <View className="h-1.5 w-full rounded-full bg-slate-100 dark:bg-[#111624] overflow-hidden">
            <View className="h-full bg-sky-500" style={{ width: '28%' }} />
          </View>

          <View className="flex-row items-center justify-between text-xs pt-1">
            <Text className="text-xs text-slate-700 dark:text-slate-300">Calendar & Industrial Working Hours</Text>
            <Text className="text-xs font-bold text-slate-600 dark:text-slate-300">18% weight</Text>
          </View>
          <View className="h-1.5 w-full rounded-full bg-slate-100 dark:bg-[#111624] overflow-hidden">
            <View className="h-full bg-slate-400" style={{ width: '18%' }} />
          </View>
        </View>
      </View>
    </Card>
  );
}
