import React from 'react';
import {
  Pressable,
  Text,
  ActivityIndicator,
  type PressableProps,
} from 'react-native';
import { cn } from '@/utils/helpers';

export interface ButtonProps extends PressableProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  className?: string;
  icon?: React.ReactNode;
}

export function Button({
  label,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  className,
  icon,
  disabled,
  ...props
}: ButtonProps) {
  const variantStyles = {
    primary: 'bg-sky-600 active:bg-sky-700 text-white border-transparent',
    secondary: 'bg-slate-800 active:bg-slate-700 text-slate-100 border-transparent',
    outline: 'bg-transparent border border-slate-700 active:bg-slate-800 text-slate-200',
    destructive: 'bg-red-600 active:bg-red-700 text-white border-transparent',
  }[variant];

  const sizeStyles = {
    sm: 'py-2 px-3.5 text-xs',
    md: 'py-3 px-5 text-sm',
    lg: 'py-4 px-6 text-base',
  }[size];

  const textColor = {
    primary: 'text-white font-semibold',
    secondary: 'text-slate-100 font-medium',
    outline: 'text-slate-200 font-medium',
    destructive: 'text-white font-semibold',
  }[variant];

  return (
    <Pressable
      className={cn(
        'flex-row items-center justify-center rounded-xl border transition-all active:scale-[0.98]',
        variantStyles,
        sizeStyles,
        (disabled || isLoading) && 'opacity-50 pointer-events-none',
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color="#FFFFFF" />
      ) : (
        <>
          {icon ? <Text className="mr-2">{icon}</Text> : null}
          <Text className={cn('text-center tracking-wide', textColor)}>{label}</Text>
        </>
      )}
    </Pressable>
  );
}

