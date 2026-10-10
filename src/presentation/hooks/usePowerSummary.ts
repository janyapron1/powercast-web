import { useCallback, useEffect, useState } from 'react';

import { getPowerSummary } from '@/data/services/powerService';
import type { PowerSummary } from '@/domain/types/power';

type PowerSummaryState = {
  data: PowerSummary | null;
  isLoading: boolean;
  error: Error | null;
};

export function usePowerSummary() {
  const [state, setState] = useState<PowerSummaryState>({
    data: null,
    isLoading: true,
    error: null,
  });

  const refresh = useCallback(async () => {
    setState((current) => ({ ...current, isLoading: true, error: null }));

    try {
      const data = await getPowerSummary();
      setState({ data, isLoading: false, error: null });
    } catch (error) {
      const resolvedError =
        error instanceof Error ? error : new Error('Unable to load power data.');
      setState({ data: null, isLoading: false, error: resolvedError });
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return { ...state, refresh };
}
