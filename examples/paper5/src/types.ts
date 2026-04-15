export interface PortfolioData {
  time: number;
  value: number;
  allocation: number[];
}

export interface AssetPair {
  id: number;
  asset1: string;
  asset2: string;
  correlation: number;
  description: string;
}

export interface PaperInfo {
  title: string;
  authors: Author[];
  abstract: string;
  keywords: string[];
  year: number;
}

export interface Author {
  name: string;
  email: string;
  affiliation: string;
}

export interface ChartConfig {
  title: string;
  data: PortfolioData[];
  feeLevel: number;
  assetPair: AssetPair;
}
