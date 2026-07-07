import type { CSSProperties } from 'react';

export function getBorderStyle(borderStyleId: string, borderColor: string): CSSProperties {
  switch (borderStyleId) {
    case 'none':
      return { border: 'none' };
    case 'solid':
      return {
        border: `3px solid ${borderColor}`,
        boxShadow: `0 0 10px ${borderColor}40`,
      };
    case 'double':
      return {
        border: `6px double ${borderColor}`,
        boxShadow: `0 0 15px ${borderColor}50`,
      };
    case 'dashed':
      return {
        border: `3px dashed ${borderColor}`,
        boxShadow: `0 0 10px ${borderColor}40`,
      };
    case 'dotted':
      return {
        border: `4px dotted ${borderColor}`,
        boxShadow: `0 0 10px ${borderColor}40`,
      };
    case 'neon-glow':
      return {
        border: `2px solid ${borderColor}`,
        boxShadow: `0 0 5px ${borderColor}, 0 0 10px ${borderColor}, 0 0 20px ${borderColor}, 0 0 40px ${borderColor}, inset 0 0 10px ${borderColor}30`,
      };
    case 'neon-pulse':
      return {
        border: `2px solid ${borderColor}`,
        boxShadow: `0 0 5px ${borderColor}, 0 0 10px ${borderColor}, 0 0 20px ${borderColor}`,
        animation: 'breathe 2s ease-in-out infinite',
      };
    case 'gradient':
      return {
        border: '3px solid transparent',
        backgroundImage: `linear-gradient(#0a0a0f, #0a0a0f), linear-gradient(135deg, #b026ff, #00f5ff, #ff2d92)`,
        backgroundOrigin: 'border-box',
        backgroundClip: 'padding-box, border-box',
        boxShadow: '0 0 20px rgba(176, 38, 255, 0.3)',
      };
    default:
      return { border: 'none' };
  }
}
