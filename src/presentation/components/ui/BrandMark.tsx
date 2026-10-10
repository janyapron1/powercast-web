import { Text, View } from 'react-native';

import { cn } from '@/lib/cn';

type BrandMarkProps = {
  variant?: 'light' | 'dark' | 'auto';
  size?: 'sm' | 'md' | 'lg';
  showWordmark?: boolean;
  className?: string;
};

export function BrandMark({
  variant = 'auto',
  size = 'md',
  showWordmark = true,
  className,
}: BrandMarkProps) {
  const barSizes = {
    sm: { w: 'w-1', h1: 'h-2.5', h2: 'h-5', h3: 'h-3.5', gap: 'gap-0.5' },
    md: { w: 'w-1.5', h1: 'h-3', h2: 'h-6', h3: 'h-4.5', gap: 'gap-1' },
    lg: { w: 'w-2', h1: 'h-4', h2: 'h-8', h3: 'h-6', gap: 'gap-1.5' },
  }[size];

  const textSize = {
    sm: 'text-xs tracking-[2px]',
    md: 'text-sm tracking-[2.5px]',
    lg: 'text-lg tracking-[3px]',
  }[size];

  return (
    <View className={cn('flex-row items-center gap-2.5', className)}>
      <View className={cn('flex-row items-end', barSizes.gap)}>
        <View className={cn('rounded-[2px] bg-cyan', barSizes.w, barSizes.h1)} />
        <View className={cn('rounded-[2px] bg-primary', barSizes.w, barSizes.h2)} />
        <View
          className={cn(
            'rounded-[2px]',
            variant === 'light'
              ? 'bg-slate-400'
              : variant === 'dark'
                ? 'bg-white/90'
                : 'bg-slate-400 dark:bg-white/90',
            barSizes.w,
            barSizes.h3,
          )}
        />
      </View>

      {showWordmark ? (
        <Text
          className={cn(
            'font-semibold',
            variant === 'light'
              ? 'text-slate-900'
              : variant === 'dark'
                ? 'text-white'
                : 'text-slate-900 dark:text-slate-100',
            textSize,
          )}
        >
          POWERCAST
        </Text>
      ) : null}
    </View>
  );
}
