export interface PaperMetadata {
  title: string;
  authors: Author[];
  abstract: string;
  date: string;
  arxivId?: string;
}

export interface Author {
  name: string;
  email: string;
  affiliation: string;
}

export interface ParameterSpaceData {
  mass: number;
  mixing: number;
  successful: boolean;
  experiment?: string;
}

export interface EvolutionData {
  z: number;
  muDelta_e: number;
  muDelta_mu: number;
  muDelta_tau: number;
  yB: number;
}

export interface DiagramPoint {
  x: number;
  y: number;
  label?: string;
  type?: 'diquark' | 'lepton' | 'higgs' | 'rhsn';
}
