import React from 'react';
import { Text, View } from 'react-native';

import {
  Badge,
  Card,
  ProgressBar,
  SectionHeader,
} from '@/presentation/components/ui';
import { GenerationMixCard } from '../GenerationMixCard';

const POWER_PLANT_UNITS = [
  { name: 'Bang Pakong Combined Cycle Block 1', type: 'Natural Gas Thermal', capacity: '1,400 MW', output: '1,320 MW', status: 'Online • Baseload', variant: 'warning' as const },
  { name: 'South Bangkok CC Block 2', type: 'Natural Gas Thermal', capacity: '1,200 MW', output: '1,150 MW', status: 'Online • Baseload', variant: 'warning' as const },
  { name: 'Bhumibol Hydroelectric Complex', type: 'Hydro Dispatch', capacity: '779 MW', output: '420 MW', status: 'Spinning Reserve', variant: 'success' as const },
  { name: 'Lam Takhong Pumped Storage', type: 'Clean Storage', capacity: '500 MW', output: 'Standby', status: 'Scheduled 17:00', variant: 'cyan' as const },
  { name: 'Central Region Solar PV Farm Cluster', type: 'Solar Photovoltaic', capacity: '3,800 MW', output: '3,680 MW', status: 'Active Peak Generation', variant: 'cyan' as const },
];

export function GenerationMixView() {
  return (
    <View className="gap-6 max-w-6xl w-full mx-auto">
      <SectionHeader
        eyebrow="FUEL DISPATCH & RENEWABLE TRACKING"
        title="Generation Mix & Energy Transition"
        subtitle="Real-time thermal natural gas reliance compared against clean energy and pumped storage integration."
        action={<Badge label="32.8% CLEAN MIX" variant="success" />}
      />

      <GenerationMixCard />

      <Card variant="elevated" className="p-6 gap-4 bg-white dark:bg-[#0D111B] border-slate-200 dark:border-[#252B3A]">
        <View className="flex-row items-center justify-between">
          <View className="gap-0.5">
            <Text className="text-base font-bold text-slate-900 dark:text-slate-100">
              National Clean Energy Transition Target (2030 Benchmark)
            </Text>
            <Text className="text-xs text-slate-600 dark:text-slate-400">
              Tracking renewable & low-carbon share against national master plan goals.
            </Text>
          </View>
          <Text className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400">
            32.8% / 40.0% Target
          </Text>
        </View>

        <ProgressBar value={32.8} max={40.0} variant="success" height={8} />

        <View className="flex-row items-center justify-between text-xs pt-1">
          <Text className="text-xs text-slate-500 dark:text-slate-400">
            Current trajectory is +2.4% ahead of 2026 milestone
          </Text>
          <Text className="text-xs font-semibold text-slate-800 dark:text-slate-200">
            Remaining gap: 7.2% to 2030 commitment
          </Text>
        </View>
      </Card>

      <Card variant="elevated" className="p-6 gap-4 bg-white dark:bg-[#0D111B] border-slate-200 dark:border-[#252B3A]">
        <View className="flex-row items-center justify-between">
          <View className="gap-0.5">
            <Text className="text-base font-bold text-slate-900 dark:text-slate-100">
              Major Generation Blocks Status
            </Text>
            <Text className="text-xs text-slate-600 dark:text-slate-400">
              Active SCADA telemetry across key combined cycle and renewable generation units.
            </Text>
          </View>
          <Badge label="REAL-TIME TELEMETRY" variant="default" />
        </View>

        <View className="gap-2 pt-2">
          {POWER_PLANT_UNITS.map((unit) => (
            <View
              key={unit.name}
              className="flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-[#080A0F]/80 border border-slate-200 dark:border-[#1E2433] gap-2"
            >
              <View className="gap-0.5">
                <Text className="text-xs font-bold text-slate-900 dark:text-slate-100">{unit.name}</Text>
                <Text className="text-[11px] text-slate-500 dark:text-slate-400">{unit.type}</Text>
              </View>

              <View className="flex-row items-center gap-5 self-end sm:self-auto">
                <View className="items-end">
                  <Text className="text-[10px] text-slate-500 uppercase">Installed Capacity</Text>
                  <Text className="text-xs font-bold text-slate-800 dark:text-slate-200">{unit.capacity}</Text>
                </View>

                <View className="items-end">
                  <Text className="text-[10px] text-slate-500 uppercase">Active Output</Text>
                  <Text className="text-xs font-bold text-sky-600 dark:text-sky-400">{unit.output}</Text>
                </View>

                <Badge label={unit.status} variant={unit.variant} />
              </View>
            </View>
          ))}
        </View>
      </Card>
    </View>
  );
}

