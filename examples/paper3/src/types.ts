export interface RetrievalPerformance {
  dataset: string;
  cellWhisperer: {
    ontologyMRR: number;
    ontologyRecall: number;
    expressionMRR: number;
    expressionRecall: number;
  };
  elisaUnion: {
    ontologyMRR: number;
    ontologyRecall: number;
    expressionMRR: number;
    expressionRecall: number;
  };
}

export interface AnalysisResults {
  dataset: string;
  geneCoverage: number;
  pathwayAlignment: number;
  interactionRecovery: number;
  proportionConsistency: boolean;
  themeCoverage: number;
  compositeScore: number;
}

export interface CandidateDiscovery {
  dataset: string;
  primaryFinding: string;
  candidateDiscovery: string;
  hypothesis: string;
}

export interface Author {
  name: string;
  affiliation: string;
  email: string;
  isCorresponding: boolean;
}
