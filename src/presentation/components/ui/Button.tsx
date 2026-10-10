import { type ReactNode } from 'react';
import { ActivityIndicator, Pressable, Text, type PressableProps, View } from 'react-native';

import { cn } from '@/lib/cn';
import { colors } from '@/presentation/theme/colors';

type ButtonVariant = 'default' | 'primary' | 'secondary' | 'outline' | 'ghost' | 'lime' | 'destructive';
type ButtonSize = 'sm' | 'md' | 'lg';

type ButtonProps = Omit<PressableProps, 'children'> & {
  label: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  isLoading?: boolean;
  className?: string;
};

const variantContainer: Record<ButtonVariant, { base: string; pressed: string }> = {
  default: {
    base: 'bg-primary border border-primary/60 shadow-sm shadow-[#0284C7]/35',
    pressed: 'bg-[#0EA5E9]',
  },
  primary: {
    base: 'bg-primary border border-primary/60 shadow-sm shadow-[#0284C7]/35',
    pressed: 'bg-[#0EA5E9]',
  },
  secondary: {
    base: 'bg-slate-100 dark:bg-[#0F131D] border border-slate-200 dark:border-[#252B3A]',
    pressed: 'bg-slate-200 dark:bg-white/[0.08]',
  },
  outline: {
    base: 'border border-slate-300 dark:border-[#252B3A] bg-transparent',
    pressed: 'bg-slate-100 dark:bg-white/[0.05]',
  },
  ghost: {
    base: 'bg-transparent',
    pressed: 'bg-slate-100 dark:bg-white/[0.05]',
  },
  lime: {
    base: 'bg-cyan border border-cyan/40',
    pressed: 'opacity-90',
  },
  destructive: {
    base: 'bg-destructive border border-destructive/50',
    pressed: 'opacity-90',
  },
};

const variantText: Record<ButtonVariant, string> = {
  default: 'text-white font-semibold',
  primary: 'text-white font-semibold',
  secondary: 'text-slate-800 dark:text-slate-100 font-medium',
  outline: 'text-slate-800 dark:text-slate-100 font-medium',
  ghost: 'text-slate-600 dark:text-slate-400 font-medium',
  lime: 'text-white font-semibold',
  destructive: 'text-white font-semibold',
};

const sizeContainer: Record<ButtonSize, string> = {
  sm: 'min-h-[36px] px-3.5 py-1.5 rounded-lg gap-1.5',
  md: 'min-h-[44px] px-5 py-2.5 rounded-lg gap-2',
  lg: 'min-h-[50px] px-6 py-3 rounded-lg gap-2.5',
};

const sizeText: Record<ButtonSize, string> = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
};

export function Button({
  label,
  variant = 'default',
  size = 'md',
  iconLeft,
  iconRight,
  isLoading = false,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const containerStyle = variantContainer[variant];
  const textColor = variantText[variant];
  const containerSize = sizeContainer[size];
  const textSize = sizeText[size];

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: disabled || isLoading, busy: isLoading }}
      className={cn(
        'flex-row items-center justify-center transition-all active:scale-[0.98]',
        containerSize,
        containerStyle.base,
        (disabled || isLoading) && 'opacity-50 pointer-events-none',
        className,
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {({ pressed }) => (
        <View
          className={cn(
            'flex-row items-center justify-center gap-2 w-full h-full rounded-lg',
            pressed && containerStyle.pressed,
          )}
        >
          {isLoading ? (
            <ActivityIndicator
              color={variant === 'default' || variant === 'primary' ? '#FFFFFF' : colors.accent}
              size="small"
            />
          ) : (
            <>
              {iconLeft}
              <Text className={cn(textSize, textColor)}>{label}</Text>
              {iconRight}
            </>
          )}
        </View>
      )}
    </Pressable>
  );
}
