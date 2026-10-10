import React from 'react';
import { Text, View } from 'react-native';

import {
  Badge,
  Card,
  SectionHeader,
} from '@/presentation/components/ui';

const DATA_SOURCES = [
  { name: 'EGAT National Dispatch Center SCADA', protocol: 'DNP3 / IEC 60870-5-104', rate: '15m intervals', latency: '0.8s', status: 'Online • 100% Ingest', variant: 'success' as const },
  { name: 'Thai Meteorological Radar & Heat Index API', protocol: 'REST / GeoJSON Polling', rate: '30m intervals', latency: '1.4s', status: 'Online • Synchronized', variant: 'success' as const },
  { name: 'PTT Gas Transmission Linepack Telemetry', protocol: 'Modbus TCP Stream', rate: '5m intervals', latency: '0.6s', status: 'Online • Synchronized', variant: 'success' as const },
  { name: 'Regional 115kV/230kV Substation Feeders', protocol: 'OPC-UA Realtime', rate: '15m intervals', latency: '1.2s', status: 'Online • Zero Loss', variant: 'success' as const },
];

export function DataSourcesView() {
  return (
    <View className="gap-6 max-w-6xl w-full mx-auto">
      <SectionHeader
        eyebrow="TELEMETRY PIPELINE & INGESTION HEALTH"
        title="Data Sources & SCADA Connectivity"
        subtitle="Real-time transmission bus feeds, weather radar sensors, and natural gas linepack pressure streams."
        action={<Badge label="100% DATA COMPLETENESS" variant="success" />}
      />

      <View className="flex-col sm:flex-row gap-3.5">
        <Card variant="elevated" className="flex-1 p-4 gap-1 bg-white dark:bg-[#0D111B] border-slate-200 dark:border-[#252B3A]">
          <Text className="text-[11px] font-bold uppercase text-slate-500 dark:text-slate-400">Daily Telemetry Ingested</Text>
          <Text className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">842,400</Text>
          <Text className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">0 missing packet records</Text>
        </Card>

        <Card variant="elevated" className="flex-1 p-4 gap-1 bg-white dark:bg-[#0D111B] border-slate-200 dark:border-[#252B3A]">
          <Text className="text-[11px] font-bold uppercase text-slate-500 dark:text-slate-400">Mean Pipeline Latency</Text>
          <Text className="text-2xl font-extrabold text-cyan-600 dark:text-cyan-400">1.2s</Text>
          <Text className="text-[11px] text-slate-500 dark:text-slate-400">Real-time SCADA throughput</Text>
        </Card>

        <Card variant="elevated" className="flex-1 p-4 gap-1 bg-white dark:bg-[#0D111B] border-slate-200 dark:border-[#252B3A]">
          <Text className="text-[11px] font-bold uppercase text-slate-500 dark:text-slate-400">Stream Validation</Text>
          <Text className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">Clean</Text>
          <Text className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">Checksums verified</Text>
        </Card>
      </View>

      <Card variant="elevated" className="p-6 gap-4 bg-white dark:bg-[#0D111B] border-slate-200 dark:border-[#252B3A]">
        <View className="flex-row items-center justify-between">
          <View className="gap-0.5">
            <Text className="text-base font-bold text-slate-900 dark:text-slate-100">
              Active Telemetry Pipeline Connectors
            </Text>
            <Text className="text-xs text-slate-600 dark:text-slate-400">
              Direct connection status with transmission operators and fuel logistics feeds.
            </Text>
          </View>
          <Badge label="4/4 OPERATIONAL" variant="success" />
        </View>

        <View className="gap-3 pt-2">
          {DATA_SOURCES.map((src) => (
            <View
              key={src.name}
              className="flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-[#080A0F]/80 border border-slate-200 dark:border-[#1E2433] gap-2"
            >
              <View className="gap-0.5">
                <Text className="text-xs font-bold text-slate-900 dark:text-slate-100">{src.name}</Text>
                <Text className="text-[11px] text-slate-500 dark:text-slate-400">{src.protocol} • Polling {src.rate}</Text>
              </View>

              <View className="flex-row items-center gap-5 self-end sm:self-auto">
                <View className="items-end">
                  <Text className="text-[10px] text-slate-500 uppercase">Stream Latency</Text>
                  <Text className="text-xs font-bold text-slate-800 dark:text-slate-200">{src.latency}</Text>
                </View>
                <Badge label={src.status} variant={src.variant} />
              </View>
            </View>
          ))}
        </View>
      </Card>
    </View>
  );
}

