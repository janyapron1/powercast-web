import { Pressable, View, type PressableProps, type ViewProps } from 'react-native';

import { cn } from '@/lib/cn';

type CardVariant = 'default' | 'elevated' | 'ocean' | 'muted' | 'outline' | 'accent';

type CardProps = ViewProps & {
  variant?: CardVariant;
  className?: string;
};

type InteractiveCardProps = PressableProps & {
  variant?: CardVariant;
  className?: string;
};

const variantStyles: Record<CardVariant, string> = {
  default:
    'bg-white dark:bg-[#0D111B] border border-slate-200 dark:border-[#252B3A] shadow-sm dark:shadow-none',
  elevated:
    'bg-white dark:bg-[#0D111B] border border-slate-200 dark:border-[#252B3A] shadow-md dark:shadow-none',
  ocean:
    'bg-slate-50 dark:bg-[#0E1320] border border-slate-200 dark:border-slate-700/60',
  muted:
    'bg-slate-50/70 dark:bg-white/[0.03] border border-slate-200/60 dark:border-[#252B3A]/50',
  outline:
    'bg-transparent border border-slate-200 dark:border-[#252B3A]',
  accent:
    'bg-sky-500/10 border border-sky-500/30',
};

export function Card({ variant = 'default', className, ...props }: CardProps) {
  return (
    <View
      className={cn(
        'rounded-2xl p-5',
        variantStyles[variant],
        className,
      )}
      {...props}
    />
  );
}

export function InteractiveCard({ variant = 'default', className, ...props }: InteractiveCardProps) {
  return (
    <Pressable
      className={cn(
        'rounded-2xl p-5 active:scale-[0.98] transition-all active:bg-slate-100 dark:active:bg-white/[0.08]',
        variantStyles[variant],
        className,
      )}
      {...props}
    />
  );
}
