import React from 'react';
import { View, Text, TextInput, type TextInputProps } from 'react-native';
import { cn } from '@/utils/helpers';

export interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  className?: string;
  containerClassName?: string;
}

export function Input({
  label,
  error,
  className,
  containerClassName,
  ...props
}: InputProps) {
  return (
    <View className={cn('w-full mb-3', containerClassName)}>
      {label && (
        <Text className="text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
          {label}
        </Text>
      )}
      <TextInput
        placeholderTextColor="#64748B"
        className={cn(
          'w-full bg-[#0F131D] text-slate-100 px-4 py-3 rounded-xl border border-[#252B3A] text-sm focus:border-sky-500',
          error && 'border-red-500',
          className
        )}
        {...props}
      />
      {error && <Text className="text-xs text-red-400 mt-1">{error}</Text>}
    </View>
  );
}
