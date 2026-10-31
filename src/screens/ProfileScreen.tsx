import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { User as UserIcon, Mail, Building, ShieldCheck, LogOut, Info } from 'lucide-react-native';

import { Header } from '@/components/Header';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { User } from '@/types';
import { APP_CONFIG } from '@/utils/constants';

export interface ProfileScreenProps {
  user: User | null;
  onBack: () => void;
  onSignOut: () => void;
}

export function ProfileScreen({ user, onBack, onSignOut }: ProfileScreenProps) {
  return (
    <View className="flex-1 bg-[#080A0F]">
      <Header
        title="User Profile"
        subtitle="Account & System Credentials"
        showBack
        onBackPress={onBack}
      />

      <ScrollView className="flex-1 px-4 py-4">
        {/* User Card */}
        <Card className="items-center py-6 mb-4">
          <View className="w-20 h-20 rounded-full bg-sky-500/10 border-2 border-sky-400/40 items-center justify-center mb-3">
            <UserIcon size={38} color="#38BDF8" />
          </View>
          <Text className="text-xl font-bold text-white mb-0.5">
            {user?.name ?? 'PowerCast User'}
          </Text>
          <Text className="text-xs font-semibold text-sky-400 tracking-wide uppercase">
            {user?.role ?? 'Analyst'}
          </Text>
        </Card>

        {/* Credentials Info */}
        <Text className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
          Contact & Organization
        </Text>

        <Card className="mb-4 gap-3.5">
          <View className="flex-row items-center">
            <View className="p-2 rounded-lg bg-slate-800 mr-3">
              <Mail size={16} color="#94A3B8" />
            </View>
            <View className="flex-1">
              <Text className="text-[11px] text-slate-400">Email Address</Text>
              <Text className="text-sm font-medium text-slate-100">
                {user?.email ?? 'user@powercast.energy'}
              </Text>
            </View>
          </View>

          <View className="w-full h-[1px] bg-[#252B3A]" />

          <View className="flex-row items-center">
            <View className="p-2 rounded-lg bg-slate-800 mr-3">
              <Building size={16} color="#94A3B8" />
            </View>
            <View className="flex-1">
              <Text className="text-[11px] text-slate-400">Department</Text>
              <Text className="text-sm font-medium text-slate-100">
                {user?.department ?? 'Grid Forecasting'}
              </Text>
            </View>
          </View>

          <View className="w-full h-[1px] bg-[#252B3A]" />

          <View className="flex-row items-center">
            <View className="p-2 rounded-lg bg-slate-800 mr-3">
              <ShieldCheck size={16} color="#94A3B8" />
            </View>
            <View className="flex-1">
              <Text className="text-[11px] text-slate-400">Access Level</Text>
              <Text className="text-sm font-medium text-emerald-400">
                Authorized SCADA Operator (Level 3)
              </Text>
            </View>
          </View>
        </Card>

        {/* App Info Card */}
        <Text className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
          Application Details
        </Text>

        <Card className="mb-6">
          <View className="flex-row items-center justify-between py-1">
            <View className="flex-row items-center">
              <Info size={16} color="#64748B" className="mr-2.5" />
              <Text className="text-sm text-slate-300">Software Build</Text>
            </View>
            <Text className="text-sm font-semibold text-slate-400">
              v{APP_CONFIG.version}
            </Text>
          </View>

          <View className="w-full h-[1px] bg-[#252B3A] my-2" />

          <View className="flex-row items-center justify-between py-1">
            <Text className="text-sm text-slate-300">Architecture Pattern</Text>
            <Text className="text-sm font-semibold text-sky-400">
              Flat Structure
            </Text>
          </View>
        </Card>

        {/* Sign Out Action */}
        <Button
          label="Sign Out"
          variant="destructive"
          icon={<LogOut size={16} color="#FFFFFF" />}
          onPress={onSignOut}
          className="mb-8"
        />
      </ScrollView>
    </View>
  );
}
