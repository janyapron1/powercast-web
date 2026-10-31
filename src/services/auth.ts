import { User } from '@/types';

// Mock user for demo / offline capability
const MOCK_USER: User = {
  id: 'usr_01',
  name: 'Thanawat P.',
  email: 'thanawat@powercast.energy',
  role: 'Lead Grid Analyst',
  department: 'Power Systems & Forecast Operations',
};

export async function loginUser(email: string, _password: string): Promise<User> {
  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 600));

  if (!email || !email.includes('@')) {
    throw new Error('Please enter a valid email address.');
  }

  return {
    ...MOCK_USER,
    email,
  };
}

export async function logoutUser(): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 300));
}

export async function fetchCurrentUser(): Promise<User> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return MOCK_USER;
}

