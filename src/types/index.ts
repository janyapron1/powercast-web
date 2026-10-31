export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatarUrl?: string;
  department?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export type ScreenName = 'Home' | 'Profile';

export interface AppMetric {
  id: string;
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
}

