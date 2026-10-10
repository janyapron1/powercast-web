import React from 'react';
import { View } from 'react-native';

import { ExecutiveOverviewKPIs } from '../ExecutiveOverviewKPIs';
import { ForecastChart } from '../ForecastChart';
import { GenerationMixCard } from '../GenerationMixCard';
import { ModelIntelligenceCard } from '../ModelIntelligenceCard';
import { RiskIntelligenceCard } from '../RiskIntelligenceCard';
import { ScenarioSimulatorCard } from '../ScenarioSimulatorCard';

export function OverviewView() {
  return (
    <View className="gap-6 w-full">
      <ExecutiveOverviewKPIs />

      <ForecastChart />

      <View className="flex-col xl:flex-row gap-6">
        <GenerationMixCard />
        <RiskIntelligenceCard />
      </View>

      <View className="flex-col xl:flex-row gap-6">
        <ScenarioSimulatorCard />
        <ModelIntelligenceCard />
      </View>
    </View>
  );
}

