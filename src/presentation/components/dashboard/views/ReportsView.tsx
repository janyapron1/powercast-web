import React, { useState } from 'react';
import { Text, View } from 'react-native';

import {
  Badge,
  Button,
  Card,
  SectionHeader,
} from '@/presentation/components/ui';

const REPORT_TEMPLATES = [
  { id: 'daily_summary', name: 'Daily Grid Dispatch & Load Forecast Summary', period: 'Last 24 Hours', size: '2.4 MB PDF', format: 'PDF & CSV' },
  { id: 'gas_risk', name: 'Natural Gas Dependency & Peaker Stress Audit', period: 'Weekly Consolidated', size: '4.1 MB PDF', format: 'PDF & JSON' },
  { id: 'clean_transition', name: 'Clean Energy & Pumped Hydro Integration Progress', period: 'Monthly Review', size: '5.8 MB PDF', format: 'PDF & CSV' },
  { id: 'model_validation', name: 'DeepAR Model Accuracy & Loss Backtesting Digest', period: 'Last 30 Days', size: '12.4 MB CSV', format: 'CSV & Parquet' },
];

export function ReportsView() {
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const handleExport = (id: string, name: string) => {
    setDownloadingId(id);
    setTimeout(() => {
      setDownloadingId(null);
      setDownloadSuccess(`Generated and downloaded: ${name}`);
      setTimeout(() => setDownloadSuccess(null), 3000);
    }, 800);
  };

  return (
    <View className="gap-6 max-w-6xl w-full mx-auto">
      <SectionHeader
        eyebrow="ANALYTICAL DIGESTS & COMPLIANCE EXPORTS"
        title="Reports & Analytics Exports"
        subtitle="Generate automated executive summaries, fuel dependency audits, and regulatory dispatch logs."
        action={<Badge label="AUTOMATED DISPATCH" variant="cyan" />}
      />

      {downloadSuccess && (
        <View className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 flex-row items-center gap-2.5">
          <View className="w-2 h-2 rounded-full bg-emerald-500" />
          <Text className="text-xs font-bold text-emerald-800 dark:text-emerald-300">
            {downloadSuccess}
          </Text>
        </View>
      )}

      <Card variant="elevated" className="p-6 gap-4 bg-white dark:bg-[#0D111B] border-slate-200 dark:border-[#252B3A]">
        <View className="flex-row items-center justify-between">
          <View className="gap-0.5">
            <Text className="text-base font-bold text-slate-900 dark:text-slate-100">
              Standard Analytical Reports Roster
            </Text>
            <Text className="text-xs text-slate-600 dark:text-slate-400">
              Formatted for regulatory submission and grid planning committee review.
            </Text>
          </View>
          <Badge label="PRODUCTION AUDIT READY" variant="default" />
        </View>

        <View className="gap-3 pt-2">
          {REPORT_TEMPLATES.map((report) => (
            <View
              key={report.id}
              className="flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-[#080A0F]/80 border border-slate-200 dark:border-[#1E2433] gap-3"
            >
              <View className="gap-1 flex-1">
                <Text className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  {report.name}
                </Text>
                <Text className="text-xs text-slate-500 dark:text-slate-400">
                  {report.period} • {report.size} • Format: {report.format}
                </Text>
              </View>

              <Button
                label={downloadingId === report.id ? 'Generating...' : `Export ${report.format.split(' ')[0]}`}
                variant="primary"
                size="sm"
                isLoading={downloadingId === report.id}
                onPress={() => handleExport(report.id, report.name)}
                className="self-start sm:self-auto"
              />
            </View>
          ))}
        </View>
      </Card>
    </View>
  );
}

