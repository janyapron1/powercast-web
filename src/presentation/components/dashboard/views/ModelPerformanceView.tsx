import React from 'react';
import { Text, View } from 'react-native';

import {
  Badge,
  Card,
  SectionHeader,
} from '@/presentation/components/ui';
import { ModelIntelligenceCard } from '../ModelIntelligenceCard';

const MODEL_VERSIONS = [
  { version: 'DeepAR-Transformer v2.4', type: 'Probabilistic Attention', trainingData: '2020–2026 Telemetry (4.2M intervals)', wape: '2.4%', status: 'Production Active', variant: 'success' as const },
  { version: 'Temporal Fusion Transformer v2.3', type: 'Quantile Multi-Horizon', trainingData: '2020–2025 Telemetry', wape: '2.9%', status: 'Shadow Evaluator', variant: 'cyan' as const },
  { version: 'LSTM-BiDirectional v2.1', type: 'Recurrent Neural Net', trainingData: '2020–2024 Telemetry', wape: '3.6%', status: 'Archived Baseline', variant: 'default' as const },
  { version: 'Seasonal Naive 24h Benchmark', type: 'Heuristic Baseline', trainingData: 'Direct 24h Persistence', wape: '7.2%', status: 'Benchmark Zero', variant: 'muted' as const },
];

export function ModelPerformanceView() {
  return (
    <View className="gap-6 max-w-6xl w-full mx-auto">
      {/* Header */}
      <SectionHeader
        eyebrow="MACHINE LEARNING METRICS & EXPLAINABILITY"
        title="Model Performance & Drift Intelligence"
        subtitle="Validation loss curves, covariate SHAP feature importance, and continuous production drift detection."
        action={<Badge label="ZERO DRIFT" variant="success" />}
      />

      <ModelIntelligenceCard />

      <Card variant="elevated" className="p-6 gap-4 bg-white dark:bg-[#0D111B] border-slate-200 dark:border-[#252B3A]">
        <View className="flex-row items-center justify-between">
          <View className="gap-0.5">
            <Text className="text-base font-bold text-slate-900 dark:text-slate-100">
              Model Version Benchmarks & Accuracy History
            </Text>
            <Text className="text-xs text-slate-600 dark:text-slate-400">
              Evaluated on 30-day out-of-sample holdout grid transmission test datasets.
            </Text>
          </View>
          <Badge label="SHAP EXPLAINABILITY ACTIVE" variant="cyan" />
        </View>

        <View className="gap-3 pt-2">
          {MODEL_VERSIONS.map((item) => (
            <View
              key={item.version}
              className="flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-[#080A0F]/80 border border-slate-200 dark:border-[#1E2433] gap-2"
            >
              <View className="gap-0.5">
                <Text className="text-xs font-bold text-slate-900 dark:text-slate-100">{item.version}</Text>
                <Text className="text-[11px] text-slate-500 dark:text-slate-400">{item.type} • {item.trainingData}</Text>
              </View>

              <View className="flex-row items-center gap-5 self-end sm:self-auto">
                <View className="items-end">
                  <Text className="text-[10px] text-slate-500 uppercase">WAPE Loss</Text>
                  <Text className="text-xs font-bold text-slate-900 dark:text-slate-100">{item.wape}</Text>
                </View>
                <Badge label={item.status} variant={item.variant} />
              </View>
            </View>
          ))}
        </View>
      </Card>
    </View>
  );
}

