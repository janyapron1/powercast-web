import { type ReactNode, useState } from 'react';
import {
  Pressable,
  Text,
  TextInput as RNTextInput,
  type TextInputProps as RNTextInputProps,
  View,
} from 'react-native';

import { cn } from '@/lib/cn';
import { useTheme } from '@/presentation/theme/ThemeContext';
import { EyeIcon, EyeOffIcon } from './EyeIcons';

export type TextInputProps = RNTextInputProps & {
  label?: string;
  error?: string;
  success?: boolean;
  helperText?: string;
  containerClassName?: string;
  isPassword?: boolean;
  rightElement?: ReactNode;
};

export function TextInput({
  label,
  error,
  success,
  helperText,
  containerClassName,
  className,
  value,
  isPassword,
  secureTextEntry,
  rightElement,
  onFocus,
  onBlur,
  ...props
}: TextInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { isDark, colors } = useTheme();

  const shouldHideText = isPassword ? !showPassword : secureTextEntry;

  return (
    <View className={cn('gap-2', containerClassName)}>
      {label ? (
        <View className="flex-row items-center justify-between">
          <Text className="text-sm font-medium text-slate-800 dark:text-slate-200 tracking-tight">
            {label}
          </Text>
        </View>
      ) : null}

      <View
        className={cn(
          'min-h-[48px] rounded-lg border bg-white dark:bg-[#0F131D] px-3.5 flex-row items-center transition-all',
          'border-slate-300 dark:border-[#252B3A]',
          isFocused && 'border-sky-500 shadow-sm shadow-sky-500/20 ring-1 ring-sky-500/40',
          Boolean(error) && 'border-rose-500 bg-rose-500/5 ring-1 ring-rose-500/30',
          success && !error && 'border-emerald-500/60 ring-1 ring-emerald-500/20',
          className,
        )}
      >
        <RNTextInput
          accessibilityLabel={label}
          aria-invalid={Boolean(error)}
          placeholderTextColor={colors.placeholder}
          secureTextEntry={shouldHideText}
          className="flex-1 text-[15px] text-slate-900 dark:text-slate-100 h-full py-2.5 outline-none"
          value={value}
          onFocus={(e) => {
            setIsFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            onBlur?.(e);
          }}
          {...props}
        />

        {isPassword ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={showPassword ? 'Hide password' : 'Show password'}
            onPress={() => setShowPassword((prev) => !prev)}
            hitSlop={8}
            className="p-1.5 rounded-md active:opacity-60 items-center justify-center"
          >
            {showPassword ? (
              <EyeOffIcon size={18} color={isDark ? '#94A3B8' : '#64748B'} />
            ) : (
              <EyeIcon size={18} color={isDark ? '#94A3B8' : '#64748B'} />
            )}
          </Pressable>
        ) : (
          rightElement
        )}
      </View>

      {error ? (
        <Text accessibilityRole="alert" className="text-xs font-medium text-rose-500 dark:text-rose-400">
          {error}
        </Text>
      ) : helperText ? (
        <Text className="text-xs text-slate-500 dark:text-slate-400">{helperText}</Text>
      ) : null}
    </View>
  );
}
