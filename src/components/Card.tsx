import React from 'react';
import { View, type ViewProps } from 'react-native';
import { cn } from '@/utils/helpers';

export interface CardProps extends ViewProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className, ...props }: CardProps) {
  return (
    <View
      className={cn(
        'bg-[#0D111B] border border-[#252B3A] rounded-2xl p-4 shadow-sm',
        className
      )}
      {...props}
    >
      {children}
    </View>
  );
}

