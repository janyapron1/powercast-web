import type { PowerSummary } from '@/domain/types/power';

export async function getPowerSummary(): Promise<PowerSummary> {
  return {
    currentUsage: 12.4,
    dailyGoal: 24,
    unit: 'kWh',
    changePercent: -8,
    updatedAt: new Date().toISOString(),
  };
}
