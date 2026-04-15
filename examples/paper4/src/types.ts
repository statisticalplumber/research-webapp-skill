export interface Author {
  name: string;
  affiliation: string;
  affiliationId: number;
  email?: string;
}

export interface ModelResult {
  name: string;
  mAcc: number;
  mIoU: number;
  head: number;
  chest: number;
  leftArm: number;
  rightArm: number;
  leftLeg: number;
  rightLeg: number;
}

export interface BodyPart {
  name: string;
  color: string;
  points: number[][];
}

export interface GraphPoint {
  id: number;
  x: number;
  y: number;
  z: number;
  label: number;
  targetLabel: number;
}

export interface ArchitectureModule {
  name: string;
  description: string;
  inputShape: string[];
  outputShape: string[];
  layers: { type: string; shape: string[] }[];
}
