export interface Author {
  name: string;
  affiliations: string[];
  email?: string;
}

export interface DatasetMetrics {
  dataset: string;
  method: string;
  testAcc: number;
  testAUC?: number;
  retention: number;
  paramCount: number;
  paramReduction: number;
}

export interface BudgetPerformance {
  dataset: string;
  fMax: number;
  testAcc: number;
  testAUC?: number;
  retention: number;
  trainable: number;
  chosen: [number, number]; // [k, r]
}

export interface AblationResults {
  method: string;
  rank?: number;
  testAcc: number;
  retention: number;
  trainable: number;
  predError?: number;
  architecture: string;
}

export interface BackboneComparison {
  method: string;
  resNet18: { acc: number; paramsRed: number };
  resNet101: { acc: number; paramsRed: number };
  vitB16: { acc: number; paramsRed: number };
}

export interface WarmStartSensitivity {
  warmStartEpochs: number;
  testAcc: number;
  retention: number;
  time: number;
}
