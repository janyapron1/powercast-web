import { type ReactNode } from 'react';
import {
  RefreshControl,
  ScrollView,
  type ScrollViewProps,
  View,
} from 'react-native';
import { SafeAreaView, type SafeAreaViewProps } from 'react-native-safe-area-context';

import { cn } from '@/lib/cn';

type ScreenLayoutProps = {
  children: ReactNode;
  scrollable?: boolean;
  refreshing?: boolean;
  onRefresh?: () => void;
  header?: ReactNode;
  footer?: ReactNode;
  contentClassName?: string;
  className?: string;
  edges?: SafeAreaViewProps['edges'];
  keyboardShouldPersistTaps?: ScrollViewProps['keyboardShouldPersistTaps'];
};

export function ScreenLayout({
  children,
  scrollable = true,
  refreshing = false,
  onRefresh,
  header,
  footer,
  contentClassName,
  className,
  edges = ['top', 'bottom', 'left', 'right'],
  keyboardShouldPersistTaps = 'handled',
}: ScreenLayoutProps) {
  return (
    <SafeAreaView edges={edges} className={cn('flex-1 bg-[#F8FAFC] dark:bg-[#080A0F] relative', className)}>
      <View
        pointerEvents="none"
        style={{
          position: 'absolute',
          top: -100,
          alignSelf: 'center',
          width: 600,
          height: 220,
          borderRadius: 300,
          backgroundColor: 'rgba(14, 165, 233, 0.04)',
        }}
      />
      {header}
      {scrollable ? (
        <ScrollView
          className="flex-1"
          contentContainerClassName={cn('flex-grow', contentClassName)}
          keyboardShouldPersistTaps={keyboardShouldPersistTaps}
          refreshControl={
            onRefresh ? (
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#0EA5E9" />
            ) : undefined
          }
        >
          {children}
        </ScrollView>
      ) : (
        <View className={cn('flex-1', contentClassName)}>{children}</View>
      )}
      {footer}
    </SafeAreaView>
  );
}
