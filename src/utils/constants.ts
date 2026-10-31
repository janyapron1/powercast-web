export const APP_CONFIG = {
  name: 'PowerCast Mobile',
  version: '1.0.0',
  description: 'Clean Flat Architecture React Native Application',
} as const;

export const API_BASE_URL = 'https://api.example.com/v1';

export const STORAGE_KEYS = {
  AUTH_TOKEN: '@powercast_auth_token',
  USER_DATA: '@powercast_user_data',
  THEME_PREFERENCE: '@powercast_theme',
} as const;

export const NAVIGATION_ROUTES = {
  HOME: 'Home',
  PROFILE: 'Profile',
} as const;

