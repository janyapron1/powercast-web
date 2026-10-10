import { View } from 'react-native';

import { cn } from '@/lib/cn';

type ProgressBarVariant = 'primary' | 'lime' | 'success' | 'warning' | 'destructive';

type ProgressBarProps = {
  value: number;
  max?: number;
  variant?: ProgressBarVariant;
  height?: number;
  className?: string;
  trackClassName?: string;
};

const variantColors: Record<ProgressBarVariant, string> = {
  primary: 'bg-accent',
  lime: 'bg-accent-bright',
  success: 'bg-emerald-500',
  warning: 'bg-amber-400',
  destructive: 'bg-rose-500',
};

export function ProgressBar({
  value,
  max = 100,
  variant = 'primary',
  height = 6,
  className,
  trackClassName,
}: ProgressBarProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <View
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max, now: value }}
      className={cn('w-full overflow-hidden rounded-full bg-white/[0.08]', trackClassName, className)}
      style={{ height }}
    >
      <View
        className={cn('h-full rounded-full transition-all', variantColors[variant])}
        style={{ width: `${percentage}%` }}
      />
    </View>
  );
}

