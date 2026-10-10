import { Pressable, Text, View } from 'react-native';

import { cn } from '@/lib/cn';

export type TabItem<T extends string = string> = {
  key: T;
  label: string;
  badge?: string | number;
};

type TabGroupProps<T extends string = string> = {
  tabs: TabItem<T>[];
  selectedKey: T;
  onSelect: (key: T) => void;
  className?: string;
};

export function TabGroup<T extends string = string>({
  tabs,
  selectedKey,
  onSelect,
  className,
}: TabGroupProps<T>) {
  return (
    <View
      accessibilityRole="tablist"
      className={cn(
        'flex-row rounded-lg bg-slate-100 dark:bg-[#0F131D] p-1 border border-slate-200 dark:border-[#252B3A]',
        className,
      )}
    >
      {tabs.map((tab) => {
        const isSelected = tab.key === selectedKey;
        return (
          <Pressable
            key={tab.key}
            accessibilityRole="tab"
            accessibilityState={{ selected: isSelected }}
            onPress={() => onSelect(tab.key)}
            className={cn(
              'flex-1 flex-row items-center justify-center gap-1.5 py-2.5 px-3 rounded-md transition-all active:scale-[0.98]',
              isSelected
                ? 'bg-white dark:bg-[#182030] border border-slate-300 dark:border-slate-700/60 shadow-sm'
                : 'border border-transparent',
            )}
          >
            <Text
              className={cn(
                'text-sm tracking-tight transition-all',
                isSelected
                  ? 'font-semibold text-slate-900 dark:text-slate-100'
                  : 'font-medium text-slate-600 dark:text-slate-400',
              )}
            >
              {tab.label}
            </Text>
            {tab.badge !== undefined ? (
              <View
                className={cn(
                  'rounded-full px-1.5 py-0.5',
                  isSelected ? 'bg-sky-500/20' : 'bg-slate-200 dark:bg-white/[0.06]',
                )}
              >
                <Text
                  className={cn(
                    'text-[10px] font-semibold',
                    isSelected ? 'text-sky-700 dark:text-cyan-300' : 'text-slate-600 dark:text-slate-400',
                  )}
                >
                  {tab.badge}
                </Text>
              </View>
            ) : null}
          </Pressable>
        );
      })}
    </View>
  );
}
