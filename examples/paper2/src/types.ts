// Types for the Reasoning LLMs-as-Judges Visualization

export interface Author {
  name: string;
  affiliation: string;
  email?: string;
}

export interface PaperMetadata {
  title: string;
  authors: Author[];
  abstract: string;
  publication: string;
  date: string;
  affiliations: string[];
}

export interface ComparisonData {
  label: string;
  value: number;
  type: 'reasoning' | 'non-reasoning';
}

export interface RewardData {
  step: number;
  reasoningJudge: number;
  nonReasoningJudge: number;
}

export interface ArenaHardData {
  model: string;
  creativeWriting: number;
  hardPrompt: number;
}

export interface AnalysisComparison {
  method: string;
  agreement: number;
  tokens?: number;
}
