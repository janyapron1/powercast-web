import './src/styles.css';

import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, ActivityIndicator } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Zap } from 'lucide-react-native';

import { HomeScreen } from '@/screens/HomeScreen';
import { ProfileScreen } from '@/screens/ProfileScreen';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { useAuth } from '@/hooks/useAuth';
import { ScreenName } from '@/types';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenName>('Home');
  const [emailInput, setEmailInput] = useState('thanawat@powercast.energy');
  const [passwordInput, setPasswordInput] = useState('••••••••');
  const [loginError, setLoginError] = useState<string | null>(null);

  const { user, isAuthenticated, isLoading, login, logout } = useAuth();

  const handleLogin = async () => {
    try {
      setLoginError(null);
      await login(emailInput, passwordInput);
      setCurrentScreen('Home');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setLoginError(err.message);
      } else {
        setLoginError('An unexpected error occurred.');
      }
    }
  };

  const handleSignOut = async () => {
    await logout();
    setCurrentScreen('Home');
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-[#080A0F]" edges={['top', 'left', 'right']}>
        <StatusBar style="light" backgroundColor="#080A0F" />

        {isLoading ? (
          <View className="flex-1 items-center justify-center bg-[#080A0F]">
            <ActivityIndicator size="large" color="#0EA5E9" />
            <Text className="text-slate-400 text-sm mt-3 font-medium">
              Initializing application...
            </Text>
          </View>
        ) : !isAuthenticated ? (
          <View className="flex-1 justify-center px-5 bg-[#080A0F]">
            <View className="items-center mb-6">
              <View className="w-14 h-14 rounded-2xl bg-sky-500/10 border border-sky-500/30 items-center justify-center mb-3">
                <Zap size={28} color="#38BDF8" />
              </View>
              <Text className="text-2xl font-bold text-white tracking-tight">
                PowerCast Mobile
              </Text>
              <Text className="text-sm text-slate-400 mt-1">
                Flat Architecture Setup
              </Text>
            </View>

            <Card className="p-6">
              <Text className="text-base font-semibold text-white mb-4">
                Sign in to your account
              </Text>

              <Input
                label="Email"
                value={emailInput}
                onChangeText={setEmailInput}
                autoCapitalize="none"
                keyboardType="email-address"
                placeholder="name@company.com"
              />

              <Input
                label="Password"
                value={passwordInput}
                onChangeText={setPasswordInput}
                secureTextEntry
                placeholder="••••••••"
                error={loginError ?? undefined}
              />

              <Button
                label="Sign In"
                variant="primary"
                className="mt-2"
                onPress={handleLogin}
              />
            </Card>
          </View>
        ) : currentScreen === 'Home' ? (
          <HomeScreen
            user={user}
            onNavigateToProfile={() => setCurrentScreen('Profile')}
          />
        ) : (
          <ProfileScreen
            user={user}
            onBack={() => setCurrentScreen('Home')}
            onSignOut={handleSignOut}
          />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

