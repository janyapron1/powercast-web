import { useMemo, useState } from 'react';
import {
  Pressable,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  Badge,
  BrandMark,
  Button,
  Card,
  TabGroup,
  TextInput,
  ThemeSwitcher,
} from '@/presentation/components/ui';
import { cn } from '@/lib/cn';

type AuthScreenProps = {
  onSuccess?: () => void;
};

type AuthMode = 'login' | 'register';

const CHART_BAR_HEIGHTS = [42, 58, 51, 72, 64, 84, 78, 95, 88];

export function AuthScreen({ onSuccess }: AuthScreenProps) {
  const { width } = useWindowDimensions();
  const isWide = width >= 1024;

  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [touched, setTouched] = useState(false);
  const [notice, setNotice] = useState('');

  const errors = useMemo(() => {
    const result: Record<string, string> = {};
    if (touched && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      result.email = 'Enter a valid work email.';
    }
    if (touched && password.length < 8) {
      result.password = 'Use at least 8 characters.';
    }
    if (mode === 'register' && touched && confirmation !== password) {
      result.confirmation = 'Passwords do not match.';
    }
    return result;
  }, [confirmation, email, mode, password, touched]);

  const title = mode === 'login' ? 'Welcome back' : 'Build a clearer forecast';
  const subtitle =
    mode === 'login'
      ? 'Sign in to access your real-time energy telemetry.'
      : 'Create your workspace and turn generation data into confident decisions.';

  function submit() {
    setTouched(true);
    setNotice('');
    const isValid =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
      password.length >= 8 &&
      (mode === 'login' || confirmation === password);

    if (isValid) {
      setNotice(
        mode === 'login'
          ? 'Secure authentication verified. Launching workspace...'
          : 'Workspace initialized. Launching workspace...',
      );
      if (onSuccess) {
        setTimeout(onSuccess, 500);
      }
    }
  }

  function changeMode(nextMode: AuthMode) {
    setMode(nextMode);
    setTouched(false);
    setNotice('');
  }

  return (
    <SafeAreaView edges={['top', 'bottom', 'left', 'right']} className="flex-1 bg-[#F8FAFC] dark:bg-[#080A0F] transition-colors">
      <ScrollView
        bounces={false}
        keyboardShouldPersistTaps="handled"
        contentContainerClassName={isWide ? 'flex-row min-h-full' : 'flex-grow'}
      >
        <View
          className={
            isWide
              ? 'flex-[3_3_0%] min-h-full justify-center p-12 xl:p-16 border-r border-slate-200 dark:border-[#252B3A] bg-slate-50/60 dark:bg-transparent relative overflow-hidden'
              : 'p-6 py-10 border-b border-slate-200 dark:border-[#252B3A] relative overflow-hidden'
          }
        >

          <View
            pointerEvents="none"
            className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-sky-500/[0.06] dark:bg-sky-500/[0.04] blur-3xl"
          />

          <View className="max-w-[540px] w-full mx-auto gap-8 z-10">
            <View className="flex-row items-center justify-between">
              <BrandMark variant="auto" size={isWide ? 'lg' : 'md'} showWordmark={true} />
              <Badge label="GRID TELEMETRY ACTIVE" variant="cyan" />
            </View>

            <View className="gap-3.5">
              <View className="flex-row items-center gap-2">
                <View className="w-2 h-2 rounded-full bg-cyan-500" />
                <Text className="text-xs font-bold uppercase tracking-[0.15em] text-cyan-600 dark:text-cyan-400">
                  ENERGY INTELLIGENCE PLATFORM
                </Text>
              </View>

              <Text className="text-3xl xl:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 leading-tight">
                See the signal{'\n'}before it shifts.
              </Text>

              <Text className="text-base leading-relaxed text-slate-600 dark:text-slate-300">
                Precision deep-learning forecasts for grid generation mix, load volatility, and natural gas peaking risk.
              </Text>
            </View>

            <Card
              variant="elevated"
              className="w-full bg-white dark:bg-[#0D111B] border-slate-200 dark:border-[#252B3A] p-6 rounded-2xl gap-5 shadow-xl dark:shadow-2xl shadow-slate-200/50 dark:shadow-black/50"
            >

              <View className="flex-row items-center justify-between">
                <View className="gap-0.5">
                  <Text className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    GENERATION MIX & DISPATCH / 2030
                  </Text>
                  <Text className="text-sm font-semibold text-slate-900 dark:text-slate-200">
                    Regional Synchronous Grid Forecast
                  </Text>
                </View>
                <Badge label="LIVE MODEL" variant="default" />
              </View>

              <View className="h-24 flex-row items-end gap-2.5 px-2 py-2 bg-slate-50 dark:bg-[#090C14] rounded-xl border border-slate-200 dark:border-[#1A2234]">
                {CHART_BAR_HEIGHTS.map((height, index) => (
                  <View key={height + index} className="flex-1 h-full justify-end relative items-center">
                    <View
                      className={cn(
                        'w-full rounded-t-sm transition-all',
                        index === 7
                          ? 'bg-cyan-500 dark:bg-cyan shadow-sm shadow-cyan/40'
                          : 'bg-[#0284C7]/80',
                      )}
                      style={{ height: `${height}%`, minHeight: 12 }}
                    />
                    {index === 7 ? (
                      <View className="absolute -top-1.5 w-2.5 h-2.5 rounded-full bg-white border-2 border-cyan-500" />
                    ) : null}
                  </View>
                ))}
              </View>

              <View className="flex-row items-center justify-between pt-2 border-t border-slate-200 dark:border-[#252B3A]">
                <View className="gap-0.5">
                  <Text className="text-2xl font-bold tracking-tight text-cyan-600 dark:text-cyan-400">
                    +12.8%
                  </Text>
                  <Text className="text-xs text-slate-500 dark:text-slate-400 font-medium">confidence interval</Text>
                </View>

                <View className="w-px h-8 bg-slate-200 dark:bg-[#252B3A]" />

                <View className="gap-0.5">
                  <Text className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                    50.02 Hz
                  </Text>
                  <Text className="text-xs text-slate-500 dark:text-slate-400 font-medium">bus frequency</Text>
                </View>

                <View className="w-px h-8 bg-slate-200 dark:bg-[#252B3A]" />

                <View className="gap-0.5">
                  <Text className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-200">
                    18.4%
                  </Text>
                  <Text className="text-xs text-slate-500 dark:text-slate-400 font-medium">peaking reliance</Text>
                </View>
              </View>
            </Card>

            <View className="flex-row flex-wrap items-center gap-x-6 gap-y-2 pt-1">
              <View className="flex-row items-center gap-2">
                <View className="w-2 h-2 rounded-full bg-emerald-500" />
                <Text className="text-xs font-medium text-slate-700 dark:text-slate-300">
                  Automated 6h dispatch window sensitivity
                </Text>
              </View>
              <View className="flex-row items-center gap-2">
                <View className="w-2 h-2 rounded-full bg-[#0284C7]" />
                <Text className="text-xs font-medium text-slate-700 dark:text-slate-300">
                  Real-time battery reserve buffer tracking
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View
          className={
            isWide
              ? 'flex-[2_2_0%] min-h-full justify-center items-center p-8 xl:p-14 bg-white dark:bg-[#0D111B]'
              : 'p-6 py-12 bg-white dark:bg-[#0D111B] justify-center items-center'
          }
        >
          <View className="w-full max-w-[400px] gap-6">
            <View className="flex-row items-center justify-between pb-1 border-b border-slate-100 dark:border-white/[0.04]">
              <View className="flex-row items-center gap-1.5">
                <View className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <Text className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                  SCADA Gateway Active
                </Text>
              </View>
              <ThemeSwitcher compact={true} />
            </View>

            <View className="gap-1.5 pt-1">
              <Text className="text-2xl lg:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
                {title}
              </Text>
              <Text className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {subtitle}
              </Text>
            </View>

            <TabGroup<AuthMode>
              tabs={[
                { key: 'login', label: 'Sign in' },
                { key: 'register', label: 'Create account' },
              ]}
              selectedKey={mode}
              onSelect={changeMode}
            />

            <View className="gap-4">
              <TextInput
                label="Email"
                placeholder="name@company.com"
                value={email}
                onChangeText={setEmail}
                error={errors.email}
                keyboardType="email-address"
                autoComplete="email"
                autoCapitalize="none"
              />

              <TextInput
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                error={errors.password}
                isPassword={true}
                autoComplete={mode === 'register' ? 'new-password' : 'password'}
              />

              {mode === 'register' ? (
                <TextInput
                  label="Confirm password"
                  placeholder="Re-enter your password"
                  value={confirmation}
                  onChangeText={setConfirmation}
                  error={errors.confirmation}
                  isPassword={true}
                  autoComplete="new-password"
                />
              ) : (
                <Pressable
                  accessibilityRole="button"
                  className="self-end active:opacity-75 pt-0.5"
                  onPress={() =>
                    setNotice('Password recovery instructions sent to registered recovery handler.')
                  }
                >
                  <Text className="text-xs font-semibold text-sky-600 dark:text-accent-bright hover:underline">
                    Forgot password?
                  </Text>
                </Pressable>
              )}
            </View>

            {notice ? (
              <View
                accessibilityLiveRegion="polite"
                className="bg-sky-500/10 border border-sky-500/30 rounded-xl p-3.5"
              >
                <Text className="text-xs font-medium text-sky-800 dark:text-slate-200 leading-relaxed">
                  {notice}
                </Text>
              </View>
            ) : null}

            <Button
              label={mode === 'login' ? 'Sign in' : 'Create account'}
              size="lg"
              variant="primary"
              onPress={submit}
            />

            <View className="pt-2">
              <Text className="text-xs leading-relaxed text-center text-slate-500 dark:text-slate-400">
                By continuing, you agree to PowerCast&apos;s{' '}
                <Text className="font-semibold text-slate-700 dark:text-slate-300">Terms of Service</Text> and{' '}
                <Text className="font-semibold text-slate-700 dark:text-slate-300">Privacy Policy</Text>.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
