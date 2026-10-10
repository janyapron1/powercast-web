import { Text, View } from 'react-native';

import { cn } from '@/lib/cn';
import { Badge } from '@/presentation/components/ui/Badge';

type MetricDisplayProps = {
  label: string;
  value: string | number;
  unit?: string;
  trend?: {
    value: string | number;
    isPositive?: boolean;
    label?: string;
  };
  caption?: string;
  className?: string;
};

export function MetricDisplay({
  label,
  value,
  unit,
  trend,
  caption,
  className,
}: MetricDisplayProps) {
  return (
    <View className={cn('gap-2', className)}>
      <View className="flex-row items-center justify-between">
        <Text className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          {label}
        </Text>
        {trend ? (
          <Badge
            label={`${trend.value}${trend.label ? ` ${trend.label}` : ''}`}
            variant={trend.isPositive ? 'success' : 'outline'}
          />
        ) : null}
      </View>

      <View className="flex-row items-baseline gap-2">
        <Text className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100">{value}</Text>
        {unit ? (
          <Text className="text-lg font-normal text-slate-500 dark:text-slate-400">{unit}</Text>
        ) : null}
      </View>

      {caption ? <Text className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{caption}</Text> : null}
    </View>
  );
}
