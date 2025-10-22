/**
 * Figma integration utilities
 * Helper functions for working with Figma MCP assets and transformations
 */

import type { RotationDegrees, TransformStyle } from '@/types/figma';

/**
 * Creates a rotation transform style object
 */
export function createRotation(degrees: RotationDegrees): TransformStyle {
  return {
    rotate: degrees,
  };
}

/**
 * Formats a Figma node ID for data attributes
 */
export function formatNodeId(nodeId: string): string {
  return nodeId;
}

/**
 * Helper to conditionally apply rotation styles
 * Figma often applies slight rotations to elements for a hand-drawn effect
 */
export function applyRotation(degrees?: RotationDegrees): React.CSSProperties {
  if (!degrees || Math.abs(degrees) < 0.1) {
    return {};
  }
  return {
    transform: `rotate(${degrees}deg)`,
  };
}

/**
 * Checks if an asset URL is from the Figma MCP localhost server
 */
export function isFigmaAsset(url: string): boolean {
  return url.startsWith('http://localhost:3845/assets/');
}

