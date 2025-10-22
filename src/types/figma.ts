/**
 * Figma-specific type definitions
 */

export interface FigmaAsset {
  url: string;
  alt?: string;
  width?: number;
  height?: number;
}

export interface FigmaNodeData {
  nodeId: string;
  name: string;
}

export type RotationDegrees = number;

export interface TransformStyle {
  rotate?: RotationDegrees;
}

