import { type ReactNode } from 'react';
import { Text, View } from 'react-native';

import { cn } from '@/lib/cn';

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  action?: ReactNode;
  variant?: 'light' | 'dark' | 'auto';
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  action,
  className,
}: SectionHeaderProps) {
  return (
    <View className={cn('gap-1.5', className)}>
      <View className="flex-row items-center justify-between">
        {eyebrow ? (
          <Text className="text-[11px] font-semibold uppercase tracking-[0.15em] text-cyan-600 dark:text-cyan-400">
            {eyebrow}
          </Text>
        ) : null}
        {action}
      </View>

      <Text className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
        {title}
      </Text>

      {subtitle ? (
        <Text className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          {subtitle}
        </Text>
      ) : null}
    </View>
  );
}
