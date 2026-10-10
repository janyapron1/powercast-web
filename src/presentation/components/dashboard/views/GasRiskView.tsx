import React from 'react';
import { Text, View } from 'react-native';

import {
  Badge,
  Card,
  ProgressBar,
  SectionHeader,
} from '@/presentation/components/ui';
import { RiskIntelligenceCard } from '../RiskIntelligenceCard';

const FUEL_INFRASTRUCTURE = [
  { name: 'Map Ta Phut LNG Terminal 1 & 2', metric: '84% Capacity', detail: '11.5 MTPA Throughput', status: 'Optimal Buffer', variant: 'primary' as const },
  { name: 'Gulf of Thailand Offshore Pipeline Linepack', metric: '1,120 psig', detail: 'Nominal Operating Pressure', status: 'Stable Pressure', variant: 'success' as const },
  { name: 'Western Gas Pipeline Import Interconnect', metric: '780 MMSCFD', detail: 'Border Metering Station', status: 'Monitored Ramp', variant: 'warning' as const },
];

export function GasRiskView() {
  return (
    <View className="gap-6 max-w-6xl w-full mx-auto">
      <SectionHeader
        eyebrow="ENERGY SECURITY & PEAKER RELIANCE"
        title="Natural Gas Risk Intelligence & Supply Stress"
        subtitle="Vulnerability scoring, peaker ramp-rate stress detection, and automated fuel linepack safeguards."
        action={<Badge label="RISK INDEX: 68/100" variant="warning" />}
      />

      <RiskIntelligenceCard />

      <Card variant="elevated" className="p-6 gap-4 bg-white dark:bg-[#0D111B] border-slate-200 dark:border-[#252B3A]">
        <View className="flex-row items-center justify-between">
          <View className="gap-0.5">
            <Text className="text-base font-bold text-slate-900 dark:text-slate-100">
              Fuel Supply Logistics & Linepack Monitoring
            </Text>
            <Text className="text-xs text-slate-600 dark:text-slate-400">
              Real-time pipeline linepack pressure and LNG import terminal throughput.
            </Text>
          </View>
          <Badge label="PIPELINE SCADA FEED" variant="default" />
        </View>

        <View className="gap-3 pt-2">
          {FUEL_INFRASTRUCTURE.map((item) => (
            <View
              key={item.name}
              className="p-4 rounded-xl bg-slate-50 dark:bg-[#080A0F]/80 border border-slate-200 dark:border-[#1E2433] gap-2"
            >
              <View className="flex-row items-center justify-between">
                <Text className="text-xs font-bold text-slate-900 dark:text-slate-100">{item.name}</Text>
                <Text className="text-xs font-semibold text-slate-700 dark:text-slate-300">{item.status}</Text>
              </View>

              <View className="flex-row items-baseline justify-between">
                <Text className="text-xl font-extrabold text-slate-900 dark:text-slate-100">{item.metric}</Text>
                <Text className="text-xs text-slate-500 dark:text-slate-400">{item.detail}</Text>
              </View>

              <ProgressBar value={item.variant === 'warning' ? 78 : item.variant === 'primary' ? 84 : 94} max={100} variant={item.variant} height={6} />
            </View>
          ))}
        </View>
      </Card>
    </View>
  );
}

