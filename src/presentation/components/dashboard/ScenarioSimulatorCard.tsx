import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import { Card } from '@/presentation/components/ui';

type ScenarioMode = 'base' | 'gas_drop' | 'heatwave';

type ScenarioConfig = {
  id: ScenarioMode;
  name: string;
  tagline: string;
  reserveMargin: string;
  deficitOrSurplus: string;
  isPositive: boolean;
  peakerDispatch: string;
};

const SCENARIOS: Record<ScenarioMode, ScenarioConfig> = {
  base: {
    id: 'base',
    name: 'Baseline Forecast',
    tagline: 'Standard dispatch matching current weather & fuel commitments',
    reserveMargin: '14.2% Reserve',
    deficitOrSurplus: '+3,520 MW Adequate Buffer',
    isPositive: true,
    peakerDispatch: '15,950 MW (Nominal)',
  },
  gas_drop: {
    id: 'gas_drop',
    name: 'Gas Supply Drop (-15%)',
    tagline: 'Simulated pipeline maintenance & lower LNG terminal throughput',
    reserveMargin: '6.8% Narrow Margin',
    deficitOrSurplus: '-2,390 MW Gas Peaker Shortfall',
    isPositive: false,
    peakerDispatch: '13,560 MW (Restricted)',
  },
  heatwave: {
    id: 'heatwave',
    name: 'Heatwave Spike (+8% Load)',
    tagline: 'Severe ambient temperature driving residential cooling surge',
    reserveMargin: '8.4% Tight Margin',
    deficitOrSurplus: '+1,980 MW Peaker Demand Required',
    isPositive: false,
    peakerDispatch: '17,930 MW (Maximum)',
  },
};

export function ScenarioSimulatorCard() {
  const [selectedScenario, setSelectedScenario] = useState<ScenarioMode>('base');
  const active = SCENARIOS[selectedScenario];

  return (
    <Card variant="elevated" className="p-5 md:p-6 gap-5 bg-white dark:bg-[#0D111B] border-slate-200 dark:border-[#252B3A] flex-1">
      <View className="flex-row items-start justify-between">
        <View className="gap-1">
          <Text className="text-xs font-bold tracking-wider text-cyan-600 dark:text-cyan-400 uppercase">
            05. Scenario Simulator
          </Text>
          <Text className="text-base font-bold text-slate-900 dark:text-slate-100">
            Interactive What-If Grid Stress Analysis
          </Text>
          <Text className="text-xs text-slate-600 dark:text-slate-400">
            Simulate fuel disruptions and demand spikes against operational reserves
          </Text>
        </View>

        <View className="px-2.5 py-1 rounded-full bg-cyan-50 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/30">
          <Text className="text-[10px] font-bold text-cyan-700 dark:text-cyan-300">Fast Solver Engine</Text>
        </View>
      </View>

      <View className="flex-col sm:flex-row gap-2">
        {(Object.keys(SCENARIOS) as ScenarioMode[]).map((key) => {
          const item = SCENARIOS[key];
          const isSelected = selectedScenario === key;

          return (
            <Pressable
              key={key}
              onPress={() => setSelectedScenario(key)}
              className={`flex-1 p-3 rounded-lg border transition-all ${isSelected
                ? 'bg-sky-50 dark:bg-sky-500/15 border-sky-300 dark:border-sky-500/40'
                : 'bg-slate-50 dark:bg-[#080A0F]/60 border-slate-200 dark:border-[#1E2433] hover:bg-slate-100 dark:hover:bg-[#111624]'
                }`}
            >
              <Text
                className={`text-xs font-bold ${isSelected ? 'text-sky-900 dark:text-sky-300' : 'text-slate-700 dark:text-slate-300'
                  }`}
              >
                {item.name}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <View className="p-4 rounded-xl bg-slate-50 dark:bg-[#080A0F]/90 border border-slate-200 dark:border-[#1E2433] gap-3">
        <View className="flex-row items-center justify-between">
          <Text className="text-xs font-bold text-slate-900 dark:text-slate-200">{active.name}</Text>
          <View
            className={`px-2 py-0.5 rounded-full ${active.isPositive
              ? 'bg-emerald-50 dark:bg-emerald-500/15 border border-emerald-200 dark:border-emerald-500/30'
              : 'bg-amber-50 dark:bg-amber-500/15 border border-amber-200 dark:border-amber-500/30'
              }`}
          >
            <Text
              className={`text-[10px] font-bold ${active.isPositive ? 'text-emerald-700 dark:text-emerald-400' : 'text-amber-800 dark:text-amber-300'
                }`}
            >
              {active.reserveMargin}
            </Text>
          </View>
        </View>

        <Text className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{active.tagline}</Text>

        <View className="h-px bg-slate-200 dark:bg-[#1E2433]" />

        <View className="flex-row items-center justify-between pt-1">
          <View className="gap-0.5">
            <Text className="text-[10px] font-semibold text-slate-500 dark:text-slate-500 uppercase">
              Projected Capacity Impact
            </Text>
            <Text
              className={`text-sm font-bold ${active.isPositive ? 'text-emerald-700 dark:text-emerald-400' : 'text-amber-700 dark:text-amber-400'
                }`}
            >
              {active.deficitOrSurplus}
            </Text>
          </View>

          <View className="items-end gap-0.5">
            <Text className="text-[10px] font-semibold text-slate-500 dark:text-slate-500 uppercase">
              Thermal Dispatch
            </Text>
            <Text className="text-sm font-bold text-slate-900 dark:text-slate-200">{active.peakerDispatch}</Text>
          </View>
        </View>
      </View>
    </Card>
  );
}
