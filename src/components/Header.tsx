import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { cn } from '@/utils/helpers';

export interface HeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  onBackPress?: () => void;
  rightAction?: React.ReactNode;
  className?: string;
}

export function Header({
  title,
  subtitle,
  showBack = false,
  onBackPress,
  rightAction,
  className,
}: HeaderProps) {
  return (
    <View
      className={cn(
        'w-full flex-row items-center justify-between px-4 py-3 bg-[#0D111B] border-b border-[#252B3A]',
        className
      )}
    >
      <View className="flex-row items-center flex-1">
        {showBack && (
          <Pressable
            onPress={onBackPress}
            hitSlop={10}
            className="mr-3 p-1 rounded-lg bg-slate-800/80 active:bg-slate-700"
          >
            <ArrowLeft size={20} color="#F1F5F9" />
          </Pressable>
        )}
        <View className="flex-1">
          <Text className="text-lg font-bold text-slate-100" numberOfLines={1}>
            {title}
          </Text>
          {subtitle && (
            <Text className="text-xs text-slate-400 mt-0.5" numberOfLines={1}>
              {subtitle}
            </Text>
          )}
        </View>
      </View>

      {rightAction && <View className="ml-2">{rightAction}</View>}
    </View>
  );
}

