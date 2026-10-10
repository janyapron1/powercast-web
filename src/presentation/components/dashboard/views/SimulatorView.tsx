import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import {
  Badge,
  Button,
  Card,
  SectionHeader,
} from '@/presentation/components/ui';
import { ScenarioSimulatorCard } from '../ScenarioSimulatorCard';

export function SimulatorView() {
  const [gasDropPercent, setGasDropPercent] = useState<number>(15);
  const [loadIncreasePercent, setLoadIncreasePercent] = useState<number>(8);
  const [bessActive, setBessActive] = useState<boolean>(true);

  const reserveMargin = Math.max(14.2 - (gasDropPercent * 0.45) - (loadIncreasePercent * 0.35) + (bessActive ? 2.1 : 0), 2.5).toFixed(1);
  const isHealthy = Number(reserveMargin) >= 10.0;

  return (
    <View className="gap-6 max-w-6xl w-full mx-auto">
      <SectionHeader
        eyebrow="CONTINGENCY PLANNING & WHAT-IF ANALYSIS"
        title="Grid Scenario Simulator & Stress Testing"
        subtitle="Test electrical grid resilience under extreme heatwaves, pipeline pressure loss, and generator trip events."
        action={<Badge label="FAST SOLVER READY" variant="cyan" />}
      />

      <ScenarioSimulatorCard />

      <Card variant="elevated" className="p-6 gap-5 bg-white dark:bg-[#0D111B] border-slate-200 dark:border-[#252B3A]">
        <View className="flex-row items-center justify-between">
          <View className="gap-0.5">
            <Text className="text-base font-bold text-slate-900 dark:text-slate-100">
              Interactive Stress Factor Controls
            </Text>
            <Text className="text-xs text-slate-600 dark:text-slate-400">
              Adjust supply and demand levers to observe real-time spinning reserve impact.
            </Text>
          </View>
          <Badge label={`RESERVE: ${reserveMargin}%`} variant={isHealthy ? 'success' : 'warning'} />
        </View>

        <View className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
          <View className="p-4 rounded-xl bg-slate-50 dark:bg-[#080A0F]/80 border border-slate-200 dark:border-[#1E2433] gap-2.5">
            <Text className="text-xs font-bold text-slate-900 dark:text-slate-200">
              Natural Gas Supply Loss
            </Text>
            <Text className="text-2xl font-extrabold text-amber-600 dark:text-amber-400">
              -{gasDropPercent}%
            </Text>
            <View className="flex-row items-center gap-2">
              {[10, 15, 25, 35].map((val) => (
                <Pressable
                  key={val}
                  onPress={() => setGasDropPercent(val)}
                  className={`flex-1 py-1 rounded-md border items-center ${gasDropPercent === val
                    ? 'bg-amber-500/20 border-amber-500/40'
                    : 'bg-white dark:bg-[#111624] border-slate-200 dark:border-[#252B3A]'
                    }`}
                >
                  <Text className={`text-[10px] font-bold ${gasDropPercent === val ? 'text-amber-700 dark:text-amber-300' : 'text-slate-600 dark:text-slate-400'}`}>
                    -{val}%
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          <View className="p-4 rounded-xl bg-slate-50 dark:bg-[#080A0F]/80 border border-slate-200 dark:border-[#1E2433] gap-2.5">
            <Text className="text-xs font-bold text-slate-900 dark:text-slate-200">
              Heatwave Demand Surge
            </Text>
            <Text className="text-2xl font-extrabold text-sky-600 dark:text-sky-400">
              +{loadIncreasePercent}%
            </Text>
            <View className="flex-row items-center gap-2">
              {[4, 8, 12, 16].map((val) => (
                <Pressable
                  key={val}
                  onPress={() => setLoadIncreasePercent(val)}
                  className={`flex-1 py-1 rounded-md border items-center ${loadIncreasePercent === val
                    ? 'bg-sky-500/20 border-sky-500/40'
                    : 'bg-white dark:bg-[#111624] border-slate-200 dark:border-[#252B3A]'
                    }`}
                >
                  <Text className={`text-[10px] font-bold ${loadIncreasePercent === val ? 'text-sky-700 dark:text-sky-300' : 'text-slate-600 dark:text-slate-400'}`}>
                    +{val}%
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          <View className="p-4 rounded-xl bg-slate-50 dark:bg-[#080A0F]/80 border border-slate-200 dark:border-[#1E2433] gap-2.5">
            <Text className="text-xs font-bold text-slate-900 dark:text-slate-200">
              Battery Storage (BESS) Discharge
            </Text>
            <Text className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
              {bessActive ? '+1,200 MW' : '0 MW Standby'}
            </Text>
            <Pressable
              onPress={() => setBessActive((prev) => !prev)}
              className={`py-1.5 rounded-md border items-center ${bessActive
                ? 'bg-emerald-500/20 border-emerald-500/40'
                : 'bg-white dark:bg-[#111624] border-slate-200 dark:border-[#252B3A]'
                }`}
            >
              <Text className={`text-[11px] font-bold ${bessActive ? 'text-emerald-700 dark:text-emerald-300' : 'text-slate-600 dark:text-slate-400'}`}>
                {bessActive ? '✓ BESS Injection Engaged' : 'Click to Engage BESS'}
              </Text>
            </Pressable>
          </View>
        </View>

        <View className="p-4 rounded-xl bg-slate-100 dark:bg-[#080A0F] border border-slate-200 dark:border-[#1E2433] flex-col sm:flex-row sm:items-center justify-between gap-4">
          <View className="gap-1">
            <Text className="text-xs font-bold text-slate-900 dark:text-slate-100">
              Simulated Spinning Reserve Margin: {reserveMargin}%
            </Text>
            <Text className="text-xs text-slate-600 dark:text-slate-400">
              {isHealthy
                ? 'System maintains compliance with N-1 contingency reliability criteria.'
                : 'Warning: Spinning reserve margin drops below the 10% regulatory minimum. Trigger demand response.'}
            </Text>
          </View>

          <Button
            label="Run Monte Carlo 1,000x"
            variant="secondary"
            size="sm"
            onPress={() => undefined}
          />
        </View>
      </Card>
    </View>
  );
}

