import type { FontOption, BorderOption, LEDConfig } from '../types';

export const FONT_OPTIONS: FontOption[] = [
  { name: 'Orbitron', family: 'Orbitron, sans-serif' },
  { name: 'Inter', family: 'Inter, sans-serif' },
  { name: 'Bangers', family: 'Bangers, cursive' },
  { name: 'Bebas Neue', family: 'Bebas Neue, sans-serif' },
  { name: 'Black Ops One', family: 'Black Ops One, cursive' },
  { name: 'Bungee', family: 'Bungee, cursive' },
  { name: 'Bungee Shade', family: 'Bungee Shade, cursive' },
  { name: 'Chewy', family: 'Chewy, cursive' },
  { name: 'Fredoka One', family: 'Fredoka One, cursive' },
  { name: 'Monoton', family: 'Monoton, cursive' },
  { name: 'Permanent Marker', family: 'Permanent Marker, cursive' },
  { name: 'Press Start 2P', family: 'Press Start 2P, cursive' },
  { name: 'Righteous', family: 'Righteous, cursive' },
  { name: 'Rubik Mono One', family: 'Rubik Mono One, sans-serif' },
];

export const BORDER_OPTIONS: BorderOption[] = [
  { id: 'none', name: '无边框', style: 'none' },
  { id: 'solid', name: '实线边框', style: 'solid' },
  { id: 'double', name: '双线边框', style: 'double' },
  { id: 'dashed', name: '虚线边框', style: 'dashed' },
  { id: 'dotted', name: '点状边框', style: 'dotted' },
  { id: 'neon-glow', name: '霓虹发光', style: 'neon-glow' },
  { id: 'neon-pulse', name: '脉冲霓虹', style: 'neon-pulse' },
  { id: 'gradient', name: '渐变边框', style: 'gradient' },
];

export const COLOR_PRESETS = [
  '#ff0040', '#ff6600', '#ffff00', '#39ff14', '#00f5ff',
  '#0066ff', '#b026ff', '#ff2d92', '#ffffff', '#000000',
];

export const BG_EFFECT_PRESETS = [
  { id: 'solid', name: '纯色', color: '#0a0a0f' },
  { id: 'party', name: '派对', gradient: 'linear-gradient(45deg, #ff0040, #ff6600, #ffff00, #39ff14, #00f5ff, #b026ff)' },
  { id: 'cyber', name: '赛博', gradient: 'linear-gradient(135deg, #b026ff, #00f5ff)' },
  { id: 'sunset', name: '日落', gradient: 'linear-gradient(135deg, #ff2d92, #ff6600, #ffff00)' },
  { id: 'ocean', name: '海洋', gradient: 'linear-gradient(135deg, #0066ff, #00f5ff)' },
  { id: 'matrix', name: '黑客', gradient: 'linear-gradient(180deg, #000000, #001a00)' },
];

export const DEFAULT_CONFIG: LEDConfig = {
  text: 'LED BANNER',
  font: 'Orbitron, sans-serif',
  fontSize: 80,
  textColor: '#ff2d92',
  bold: true,
  italic: false,
  outline: true,
  outlineColor: '#b026ff',
  shadow: true,
  shadowColor: '#ff2d92',
  textAlign: 'center',

  backgroundColor: '#0a0a0f',
  ledDotEffect: true,
  ledDotSize: 3,
  brightness: 100,
  backgroundImage: null,

  scrollDirection: 'left',
  scrollSpeed: 3,
  blink: false,
  blinkSpeed: 500,

  borderStyle: 'neon-glow',
  borderColor: '#b026ff',
  glowEffect: true,
};
