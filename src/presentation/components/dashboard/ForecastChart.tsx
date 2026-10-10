import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import Svg, {
  Circle,
  Defs,
  LinearGradient,
  Path,
  Rect,
  Stop,
  Text as SvgText,
} from 'react-native-svg';

import { Card } from '@/presentation/components/ui';
import { useTheme } from '@/presentation/theme/ThemeContext';

type HorizonOption = '6h' | '24h' | '7d';
type GranularityOption = '15m' | '1h';

export function ForecastChart() {
  const [horizon, setHorizon] = useState<HorizonOption>('24h');
  const [granularity, setGranularity] = useState<GranularityOption>('15m');
  const { isDark } = useTheme();

  const actualPath =
    'M 40 160 C 90 175, 140 185, 190 145 C 240 105, 290 85, 340 92';

  const predictedPath =
    'M 340 92 C 390 98, 440 60, 490 52 C 540 44, 590 110, 660 140';

  const confidenceBandPath =
    'M 340 82 C 390 86, 440 48, 490 40 C 540 32, 590 98, 660 126 L 660 154 C 590 122, 540 58, 490 64 C 440 74, 390 112, 340 102 Z';

  const gridLineColor = isDark ? '#1E2433' : '#E2E8F0';
  const axisTextColor = isDark ? '#64748B' : '#94A3B8';
  const baseAxisColor = isDark ? '#252B3A' : '#CBD5E1';
  const confidenceBandColor = isDark ? 'rgba(14, 165, 233, 0.12)' : 'rgba(2, 132, 199, 0.10)';

  return (
    <Card variant="elevated" className="p-5 md:p-6 gap-5 bg-white dark:bg-[#0D111B] border-slate-200 dark:border-[#252B3A]">
      {/* Header & Controls Bar */}
      <View className="flex-col lg:flex-row lg:items-center justify-between gap-4">
        <View className="gap-1">
          <View className="flex-row items-center gap-2">
            <Text className="text-xs font-bold tracking-wider text-cyan-600 dark:text-cyan-400 uppercase">
              02. Generation Forecast
            </Text>
            <View className="px-2 py-0.5 rounded-full bg-sky-500/10 dark:bg-sky-500/15 border border-sky-500/20 dark:border-sky-500/30">
              <Text className="text-[10px] font-semibold text-sky-700 dark:text-sky-300">DeepAR-Transformer v2.4</Text>
            </View>
          </View>
          <Text className="text-base font-bold text-slate-900 dark:text-slate-100">
            Grid Demand vs Predictive Dispatch Curve
          </Text>
          <Text className="text-xs text-slate-600 dark:text-slate-400">
            Actual load compared against multi-horizon deep learning probabilistic forecasts
          </Text>
        </View>

        <View className="flex-row flex-wrap items-center gap-2 self-start lg:self-auto">
          <View className="flex-row items-center rounded-lg bg-slate-100 dark:bg-[#080A0F] border border-slate-200 dark:border-[#252B3A] p-0.5">
            {(['6h', '24h', '7d'] as HorizonOption[]).map((h) => (
              <Pressable
                key={h}
                onPress={() => setHorizon(h)}
                className={`px-2.5 py-1 rounded-md transition-all ${horizon === h
                  ? 'bg-white dark:bg-sky-500/20 border border-slate-300 dark:border-sky-500/40 shadow-xs'
                  : 'hover:bg-black/[0.03] dark:hover:bg-white/[0.04]'
                  }`}
              >
                <Text
                  className={`text-[11px] font-semibold ${horizon === h
                    ? 'text-sky-700 dark:text-sky-300'
                    : 'text-slate-600 dark:text-slate-400'
                    }`}
                >
                  {h.toUpperCase()}
                </Text>
              </Pressable>
            ))}
          </View>

          <View className="flex-row items-center rounded-lg bg-slate-100 dark:bg-[#080A0F] border border-slate-200 dark:border-[#252B3A] p-0.5">
            {(['15m', '1h'] as GranularityOption[]).map((g) => (
              <Pressable
                key={g}
                onPress={() => setGranularity(g)}
                className={`px-2 py-1 rounded-md transition-all ${granularity === g
                  ? 'bg-white dark:bg-cyan-500/20 border border-slate-300 dark:border-cyan-500/40 shadow-xs'
                  : 'hover:bg-black/[0.03] dark:hover:bg-white/[0.04]'
                  }`}
              >
                <Text
                  className={`text-[11px] font-semibold ${granularity === g
                    ? 'text-cyan-700 dark:text-cyan-300'
                    : 'text-slate-600 dark:text-slate-400'
                    }`}
                >
                  {g}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      </View>

      <View className="w-full bg-slate-50 dark:bg-[#080A0F]/80 rounded-xl p-3 border border-slate-200 dark:border-[#1E2433] overflow-hidden">
        <Svg viewBox="0 0 680 230" width="100%" height={230}>
          <Defs>
            <LinearGradient id="actualGlow" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0%" stopColor="#06B6D4" stopOpacity={isDark ? 0.25 : 0.15} />
              <Stop offset="100%" stopColor="#06B6D4" stopOpacity="0.0" />
            </LinearGradient>

            <LinearGradient id="forecastGlow" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0%" stopColor="#0EA5E9" stopOpacity={isDark ? 0.2 : 0.12} />
              <Stop offset="100%" stopColor="#0EA5E9" stopOpacity="0.0" />
            </LinearGradient>
          </Defs>

          <Path d="M 40 40 L 660 40" stroke={gridLineColor} strokeDasharray="3 3" strokeWidth={1} />
          <SvgText x={35} y={44} fill={axisTextColor} fontSize="10" textAnchor="end">
            28k MW
          </SvgText>

          <Path d="M 40 100 L 660 100" stroke={gridLineColor} strokeDasharray="3 3" strokeWidth={1} />
          <SvgText x={35} y={104} fill={axisTextColor} fontSize="10" textAnchor="end">
            24k MW
          </SvgText>

          <Path d="M 40 160 L 660 160" stroke={gridLineColor} strokeDasharray="3 3" strokeWidth={1} />
          <SvgText x={35} y={164} fill={axisTextColor} fontSize="10" textAnchor="end">
            20k MW
          </SvgText>

          <Path d="M 40 200 L 660 200" stroke={baseAxisColor} strokeWidth={1} />

          {/* Time Axis Labels */}
          <SvgText x={40} y={216} fill={axisTextColor} fontSize="10" textAnchor="middle">00:00</SvgText>
          <SvgText x={140} y={216} fill={axisTextColor} fontSize="10" textAnchor="middle">04:00</SvgText>
          <SvgText x={240} y={216} fill={axisTextColor} fontSize="10" textAnchor="middle">08:00</SvgText>
          <SvgText x={340} y={216} fill="#0284C7" fontSize="10" fontWeight="bold" textAnchor="middle">12:00 (Now)</SvgText>
          <SvgText x={440} y={216} fill={axisTextColor} fontSize="10" textAnchor="middle">16:00</SvgText>
          <SvgText x={540} y={216} fill={axisTextColor} fontSize="10" textAnchor="middle">20:00</SvgText>
          <SvgText x={650} y={216} fill={axisTextColor} fontSize="10" textAnchor="middle">24:00</SvgText>

          <Path d={confidenceBandPath} fill={confidenceBandColor} />

          <Path d="M 40 160 C 90 175, 140 185, 190 145 C 240 105, 290 85, 340 92 L 340 200 L 40 200 Z" fill="url(#actualGlow)" />

          <Path d={actualPath} fill="none" stroke="#06B6D4" strokeWidth={2.75} strokeLinecap="round" />

          <Path
            d={predictedPath}
            fill="none"
            stroke="#0EA5E9"
            strokeWidth={2.5}
            strokeDasharray="5 4"
            strokeLinecap="round"
          />

          <Path d="M 340 30 L 340 200" stroke="#0EA5E9" strokeWidth={1.5} strokeDasharray="3 3" />

          <Circle cx={340} cy={92} r={5} fill="#06B6D4" stroke={isDark ? '#080A0F' : '#FFFFFF'} strokeWidth={2} />

          <Circle cx={490} cy={52} r={4.5} fill="#F59E0B" stroke={isDark ? '#080A0F' : '#FFFFFF'} strokeWidth={2} />

          <Rect
            x={445}
            y={15}
            width={90}
            height={22}
            rx={4}
            fill={isDark ? '#1E2433' : '#FFFFFF'}
            stroke={isDark ? '#F59E0B' : '#D97706'}
            strokeWidth={1}
          />
          <SvgText
            x={490}
            y={29}
            fill={isDark ? '#FDE68A' : '#B45309'}
            fontSize="9.5"
            fontWeight="bold"
            textAnchor="middle"
          >
            Peak: 26,420 MW
          </SvgText>
        </Svg>
      </View>

      <View className="flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 border-t border-slate-200 dark:border-[#1E2433]">
        {/* Visual Legends */}
        <View className="flex-row flex-wrap items-center gap-4">
          <View className="flex-row items-center gap-1.5">
            <View className="w-3 h-1 rounded-full bg-cyan-500" />
            <Text className="text-xs font-medium text-slate-700 dark:text-slate-300">Actual Grid Load</Text>
          </View>

          <View className="flex-row items-center gap-1.5">
            <View className="w-3 h-1 rounded-full bg-sky-500" />
            <Text className="text-xs font-medium text-slate-700 dark:text-slate-300">DeepAR Prediction</Text>
          </View>

          <View className="flex-row items-center gap-1.5">
            <View className="w-3 h-2 rounded bg-sky-500/20 border border-sky-500/30" />
            <Text className="text-xs font-medium text-slate-500 dark:text-slate-400">95% Confidence Band</Text>
          </View>
        </View>

        <View className="flex-row items-center gap-3">
          <Text className="text-xs text-slate-500 dark:text-slate-400">
            WAPE: <Text className="font-semibold text-slate-900 dark:text-slate-200">2.4%</Text>
          </Text>
          <Text className="text-xs text-slate-300 dark:text-slate-600">•</Text>
          <Text className="text-xs text-slate-500 dark:text-slate-400">
            Confidence: <Text className="font-semibold text-emerald-600 dark:text-emerald-400">96.8%</Text>
          </Text>
          <Text className="text-xs text-slate-300 dark:text-slate-600">•</Text>
          <Text className="text-xs text-slate-500 dark:text-slate-400">
            Latency: <Text className="font-semibold text-cyan-600 dark:text-cyan-400">1.2s</Text>
          </Text>
        </View>
      </View>
    </Card>
  );
}
