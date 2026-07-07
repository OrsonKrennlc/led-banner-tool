export type ScrollDirection = 'left' | 'right' | 'up' | 'down' | 'static';
export type TextAlign = 'left' | 'center' | 'right';
export type ActiveTab = 'text' | 'background' | 'control' | 'effect';

export interface LEDConfig {
  text: string;
  font: string;
  fontSize: number;
  textColor: string;
  bold: boolean;
  italic: boolean;
  outline: boolean;
  outlineColor: string;
  shadow: boolean;
  shadowColor: string;
  textAlign: TextAlign;

  backgroundColor: string;
  ledDotEffect: boolean;
  ledDotSize: number;
  brightness: number;
  backgroundImage: string | null;

  scrollDirection: ScrollDirection;
  scrollSpeed: number;
  blink: boolean;
  blinkSpeed: number;

  borderStyle: string;
  borderColor: string;
  glowEffect: boolean;
}

export interface FontOption {
  name: string;
  family: string;
}

export interface BorderOption {
  id: string;
  name: string;
  style: string;
}

export interface Template {
  id: string;
  name: string;
  config: Partial<LEDConfig>;
}
