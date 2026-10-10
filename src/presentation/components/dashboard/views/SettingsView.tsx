import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import {
  Badge,
  Button,
  Card,
  SectionHeader,
  TextInput,
  ThemeSwitcher,
} from '@/presentation/components/ui';
import { useTheme } from '@/presentation/theme/ThemeContext';

export function SettingsView() {
  const { themeMode, setThemeMode } = useTheme();
  const [gasThreshold, setGasThreshold] = useState('65');
  const [reserveThreshold, setReserveThreshold] = useState('10');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [savedNotice, setSavedNotice] = useState(false);

  const handleSave = () => {
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  return (
    <View className="gap-6 max-w-5xl w-full mx-auto">
      <SectionHeader
        eyebrow="SYSTEM CONFIGURATION"
        title="Settings & Workspace Preferences"
        subtitle="Manage theme appearance, transmission bus telemetry thresholds, and AI dispatch alerts."
      />

      <Card variant="elevated" className="p-6 gap-5 bg-white dark:bg-[#0D111B] border-slate-200 dark:border-[#252B3A]">
        <View className="flex-row items-center justify-between">
          <View className="gap-1">
            <Text className="text-base font-bold text-slate-900 dark:text-slate-100">
              Interface Theme & Appearance
            </Text>
            <Text className="text-xs text-slate-600 dark:text-slate-400">
              Select how PowerCast renders across control rooms and mobile devices.
            </Text>
          </View>
          <Badge label="MULTI-THEME READY" variant="cyan" />
        </View>

        <View className="flex-col sm:flex-row gap-3 pt-1">
          <Pressable
            onPress={() => setThemeMode('light')}
            className={`flex-1 p-4 rounded-xl border transition-all ${themeMode === 'light'
              ? 'bg-sky-50 dark:bg-sky-500/15 border-sky-500 shadow-sm'
              : 'bg-slate-50 dark:bg-[#080A0F] border-slate-200 dark:border-[#1E2433]'
              }`}
          >
            <View className="flex-row items-center justify-between pb-2">
              <Text className="text-sm font-bold text-slate-900 dark:text-slate-100">
                ธีมสว่าง (Light)
              </Text>
              {themeMode === 'light' && (
                <View className="w-2 h-2 rounded-full bg-sky-500" />
              )}
            </View>
            <Text className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              เหมาะสำหรับห้องทำงานที่มีแสงสว่างและการนำเสนอรายงานให้ผู้บริหาร
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setThemeMode('dark')}
            className={`flex-1 p-4 rounded-xl border transition-all ${themeMode === 'dark'
              ? 'bg-sky-50 dark:bg-sky-500/15 border-sky-500 shadow-sm'
              : 'bg-slate-50 dark:bg-[#080A0F] border-slate-200 dark:border-[#1E2433]'
              }`}
          >
            <View className="flex-row items-center justify-between pb-2">
              <Text className="text-sm font-bold text-slate-900 dark:text-slate-100">
                ธีมมืด (Dark)
              </Text>
              {themeMode === 'dark' && (
                <View className="w-2 h-2 rounded-full bg-cyan-400" />
              )}
            </View>
            <Text className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              สไตล์ Technical Minimalism ลดแสงสะท้อนในห้องควบคุมระบบไฟฟ้า 24 ชม.
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setThemeMode('system')}
            className={`flex-1 p-4 rounded-xl border transition-all ${themeMode === 'system'
              ? 'bg-sky-50 dark:bg-sky-500/15 border-sky-500 shadow-sm'
              : 'bg-slate-50 dark:bg-[#080A0F] border-slate-200 dark:border-[#1E2433]'
              }`}
          >
            <View className="flex-row items-center justify-between pb-2">
              <Text className="text-sm font-bold text-slate-900 dark:text-slate-100">
                ธีมระบบ (System)
              </Text>
              {themeMode === 'system' && (
                <View className="w-2 h-2 rounded-full bg-sky-500" />
              )}
            </View>
            <Text className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              ปรับเปลี่ยนอัตโนมัติตามโหมดการแสดงผลของระบบปฏิบัติการหรืออุปกรณ์
            </Text>
          </Pressable>
        </View>

        <View className="pt-2 flex-row items-center justify-between border-t border-slate-200 dark:border-[#1E2433]">
          <Text className="text-xs text-slate-500 dark:text-slate-400">Quick Switcher</Text>
          <ThemeSwitcher compact={false} />
        </View>
      </Card>

      <Card variant="elevated" className="p-6 gap-5 bg-white dark:bg-[#0D111B] border-slate-200 dark:border-[#252B3A]">
        <View className="flex-row items-center justify-between">
          <View className="gap-1">
            <Text className="text-base font-bold text-slate-900 dark:text-slate-100">
              Early Warning & Risk Alert Thresholds
            </Text>
            <Text className="text-xs text-slate-600 dark:text-slate-400">
              Configure trigger points for dispatch notices and gas peaking alerts.
            </Text>
          </View>
          <Badge label="ACTIVE DISPATCH RULES" variant="default" />
        </View>

        <View className="flex-col sm:flex-row gap-4 pt-1">
          <View className="flex-1">
            <TextInput
              label="Gas Peaker Reliance Alert Threshold (%)"
              value={gasThreshold}
              onChangeText={setGasThreshold}
              helperText="Alert dispatch team when natural gas share exceeds this level."
              keyboardType="numeric"
            />
          </View>

          <View className="flex-1">
            <TextInput
              label="Minimum Reserve Margin Warning (%)"
              value={reserveThreshold}
              onChangeText={setReserveThreshold}
              helperText="Trigger spinning reserve notices when capacity margin drops below this."
              keyboardType="numeric"
            />
          </View>
        </View>

        <View className="flex-row items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-[#080A0F] border border-slate-200 dark:border-[#1E2433]">
          <View className="gap-0.5">
            <Text className="text-xs font-semibold text-slate-900 dark:text-slate-200">
              Automated AI Dispatch Guidance Notifications
            </Text>
            <Text className="text-[11px] text-slate-500 dark:text-slate-400">
              Push real-time pumped storage hydro dispatch recommendations to control screen.
            </Text>
          </View>

          <Pressable
            onPress={() => setNotificationsEnabled((prev) => !prev)}
            className={`w-12 h-6 rounded-full p-0.5 transition-all ${notificationsEnabled ? 'bg-sky-500' : 'bg-slate-300 dark:bg-slate-700'
              }`}
          >
            <View
              className={`w-5 h-5 rounded-full bg-white transition-all ${notificationsEnabled ? 'translate-x-6' : 'translate-x-0'
                }`}
            />
          </Pressable>
        </View>
      </Card>

      <Card variant="elevated" className="p-6 gap-5 bg-white dark:bg-[#0D111B] border-slate-200 dark:border-[#252B3A]">
        <View className="gap-1">
          <Text className="text-base font-bold text-slate-900 dark:text-slate-100">
            Operator Profile & Station Attribution
          </Text>
          <Text className="text-xs text-slate-600 dark:text-slate-400">
            Transmission control operator credentials and audit log identity.
          </Text>
        </View>

        <View className="flex-col sm:flex-row gap-4 pt-1">
          <View className="flex-1">
            <TextInput label="Operator Name" value="Senior Dispatch Analyst" editable={false} />
          </View>
          <View className="flex-1">
            <TextInput label="Control Bus Station" value="EGAT Regional Transmission Bus A-12" editable={false} />
          </View>
        </View>
      </Card>

      <View className="flex-row items-center justify-between pt-2">
        {savedNotice ? (
          <View className="flex-row items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30">
            <View className="w-2 h-2 rounded-full bg-emerald-500" />
            <Text className="text-xs font-bold text-emerald-700 dark:text-emerald-300">
              Settings updated successfully.
            </Text>
          </View>
        ) : (
          <Text className="text-xs text-slate-500 dark:text-slate-400">
            All configuration changes are logged in compliance audit trail.
          </Text>
        )}

        <Button
          label="Save Settings"
          variant="primary"
          size="md"
          onPress={handleSave}
          className="self-end"
        />
      </View>
    </View>
  );
}

