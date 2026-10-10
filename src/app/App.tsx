import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AuthScreen } from '@/presentation/screens/AuthScreen';
import { HomeScreen } from '@/presentation/screens/HomeScreen';
import { ThemeProvider, useTheme } from '@/presentation/theme/ThemeContext';

function AppContent() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { isDark } = useTheme();

  return (
    <>
      <StatusBar
        style={isDark ? 'light' : 'dark'}
        backgroundColor={isDark ? '#080A0F' : '#F8FAFC'}
      />
      {isAuthenticated ? (
        <HomeScreen onSignOut={() => setIsAuthenticated(false)} />
      ) : (
        <AuthScreen onSuccess={() => setIsAuthenticated(true)} />
      )}
    </>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
