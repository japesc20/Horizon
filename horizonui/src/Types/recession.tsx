export type RiskLevel = 'Low' | 'Moderate' | 'High';

export interface MetricScore {
  score: number;
  value?: number;
  label?: string;
}

export interface RecessionBreakdown {
  yieldCurve: MetricScore & {
    inversionDepth: string;
    twoYear: number;
    tenYear: number;
  };
  cpi: MetricScore & {
    currentCpi: string;
    deviation: string;
    target: number;
  };
  volatility: MetricScore & {
    volatility: string;
  };
  drawdown: MetricScore & {
    maxDrawdown: string;
    currentDrawdown: string;
  };
}

export interface RecessionRiskData {
  totalScore: number;
  breakdown: RecessionBreakdown;
  riskLevel: RiskLevel;
  calculatedAt: string;
  cached?: boolean;
}