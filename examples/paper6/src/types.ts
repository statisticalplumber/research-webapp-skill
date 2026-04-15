export interface Parameter {
  symbol: string;
  description: string;
  value?: number;
}

export interface PatternInfo {
  type: 'striped' | 'squared' | 'hexagonal' | 'rectangular';
  condition: string;
  parameters: {
    s0: number;
    s1: number;
    s2: number;
  };
  description: string;
}

export interface SimulationConfig {
  gamma: number;
  delta: number;
  R: number;
  xi: number;
  xiM: number;
}

export interface Author {
  name: string;
  affiliation: string;
  email?: string;
  isCorresponding?: boolean;
}
