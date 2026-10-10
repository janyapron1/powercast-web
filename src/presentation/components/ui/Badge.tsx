import { Text, type TextProps, View } from 'react-native';

import { cn } from '@/lib/cn';

type BadgeVariant = 'default' | 'accent' | 'cyan' | 'success' | 'warning' | 'destructive' | 'lime' | 'ocean' | 'outline' | 'muted';

type BadgeProps = TextProps & {
  label: string;
  variant?: BadgeVariant;
  icon?: string;
  className?: string;
};

const variantStyles: Record<BadgeVariant, { container: string; text: string }> = {
  default: {
    container: 'bg-sky-500/10 border border-sky-500/30',
    text: 'text-sky-400 font-semibold',
  },
  accent: {
    container: 'bg-[#0284C7]/20 border border-[#0EA5E9]/40',
    text: 'text-[#F1F5F9] font-semibold',
  },
  cyan: {
    container: 'bg-cyan-500/10 border border-cyan-500/30',
    text: 'text-cyan-400 font-semibold',
  },
  success: {
    container: 'bg-emerald-500/10 border border-emerald-500/20',
    text: 'text-emerald-400 font-medium',
  },
  warning: {
    container: 'bg-amber-500/15 border border-amber-500/35',
    text: 'text-amber-300 font-semibold',
  },
  destructive: {
    container: 'bg-rose-500/10 border border-rose-500/20',
    text: 'text-rose-400 font-medium',
  },
  lime: {
    container: 'bg-emerald-500/10 border border-emerald-500/30',
    text: 'text-emerald-400 font-semibold',
  },
  ocean: {
    container: 'bg-[#0F131D] border border-border',
    text: 'text-cyan-400 font-semibold tracking-wider',
  },
  outline: {
    container: 'border border-border bg-transparent',
    text: 'text-foreground-muted font-medium',
  },
  muted: {
    container: 'bg-white/[0.04] border border-border/60',
    text: 'text-foreground-muted font-medium',
  },
};

export function Badge({ label, variant = 'default', icon, className, ...props }: BadgeProps) {
  const styles = variantStyles[variant];

  return (
    <View
      className={cn(
        'self-start flex-row items-center gap-1.5 rounded-full px-2.5 py-0.5',
        styles.container,
        className,
      )}
    >
      {icon ? <Text className={cn('text-[10px]', styles.text)}>{icon}</Text> : null}
      <Text className={cn('text-xs', styles.text)} {...props}>
        {label}
      </Text>
    </View>
  );
}
