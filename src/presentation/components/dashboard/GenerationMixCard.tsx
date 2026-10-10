import React from 'react';
import { Text, View } from 'react-native';

import { Card } from '@/presentation/components/ui';

type FuelSource = {
  name: string;
  category: string;
  mw: number;
  percent: number;
  color: string;
  status?: string;
};

const FUEL_MIX_DATA: FuelSource[] = [
  {
    name: 'Natural Gas',
    category: 'Combined Cycle / Peakers',
    mw: 15950,
    percent: 64.2,
    color: '#F59E0B',
    status: 'High Reliance',
  },
  {
    name: 'Solar PV',
    category: 'Renewable Generation',
    mw: 3680,
    percent: 14.8,
    color: '#06B6D4',
  },
  {
    name: 'Hydro & Pumped',
    category: 'Spinning Reserve / Storage',
    mw: 2860,
    percent: 11.5,
    color: '#0284C7',
  },
  {
    name: 'Wind & Biomass',
    category: 'Clean Energy',
    mw: 1610,
    percent: 6.5,
    color: '#10B981',
  },
  {
    name: 'Coal Thermal',
    category: 'Baseload Residual',
    mw: 750,
    percent: 3.0,
    color: '#64748B',
  },
];

export function GenerationMixCard() {
  const totalMW = 24850;
  const renewablePercent = (14.8 + 11.5 + 6.5).toFixed(1);

  return (
    <Card variant="elevated" className="p-5 md:p-6 gap-5 bg-white dark:bg-[#0D111B] border-slate-200 dark:border-[#252B3A] flex-1">
      <View className="flex-row items-start justify-between">
        <View className="gap-1">
          <Text className="text-xs font-bold tracking-wider text-cyan-600 dark:text-cyan-400 uppercase">
            03. Generation Mix & Fuel Dependency
          </Text>
          <Text className="text-base font-bold text-slate-900 dark:text-slate-100">
            Real-Time Fuel Share & Grid Dispatch
          </Text>
          <Text className="text-xs text-slate-600 dark:text-slate-400">
            Thermal gas dependency vs clean renewable integration
          </Text>
        </View>

        <View className="items-end gap-0.5">
          <Text className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            {totalMW.toLocaleString()} <Text className="text-xs font-normal text-slate-500 dark:text-slate-400">MW</Text>
          </Text>
          <Text className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
            {renewablePercent}% Clean & Hydro
          </Text>
        </View>
      </View>

      <View className="gap-1.5">
        <View className="h-3 w-full rounded-full bg-slate-100 dark:bg-[#111624] overflow-hidden flex-row border border-slate-200 dark:border-[#1E2433]">
          {FUEL_MIX_DATA.map((fuel) => (
            <View
              key={fuel.name}
              style={{
                width: `${fuel.percent}%`,
                backgroundColor: fuel.color,
              }}
            />
          ))}
        </View>

        <View className="flex-row items-center justify-between px-0.5">
          <Text className="text-[10px] text-slate-500 dark:text-slate-500">Baseload & Intermittent Breakdown</Text>
          <Text className="text-[10px] text-amber-700 dark:text-amber-400 font-semibold">64.2% Gas Exposure</Text>
        </View>
      </View>

      <View className="gap-2.5 pt-1">
        {FUEL_MIX_DATA.map((fuel) => (
          <View
            key={fuel.name}
            className="flex-row items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-[#080A0F]/60 border border-slate-200 dark:border-[#1E2433]"
          >
            <View className="flex-row items-center gap-2.5">
              <View
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: fuel.color }}
              />
              <View className="gap-0.5">
                <Text className="text-xs font-semibold text-slate-800 dark:text-slate-200">{fuel.name}</Text>
                <Text className="text-[10px] text-slate-500 dark:text-slate-400">{fuel.category}</Text>
              </View>
            </View>

            <View className="items-end gap-0.5">
              <View className="flex-row items-baseline gap-1.5">
                <Text className="text-xs font-bold text-slate-900 dark:text-slate-100">
                  {fuel.mw.toLocaleString()} MW
                </Text>
                <Text className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                  {fuel.percent}%
                </Text>
              </View>
              {fuel.status && (
                <Text className="text-[10px] font-medium text-amber-700 dark:text-amber-400">
                  {fuel.status}
                </Text>
              )}
            </View>
          </View>
        ))}
      </View>
    </Card>
  );
}
