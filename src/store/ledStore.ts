import { create } from 'zustand';
import type { LEDConfig, ActiveTab } from '../types';
import { DEFAULT_CONFIG } from '../utils/constants';

interface LEDState {
  config: LEDConfig;
  activeTab: ActiveTab;
  isFullscreen: boolean;
  isPaused: boolean;
  updateConfig: (partial: Partial<LEDConfig>) => void;
  setActiveTab: (tab: ActiveTab) => void;
  setFullscreen: (fullscreen: boolean) => void;
  togglePaused: () => void;
  resetConfig: () => void;
}

export const useLEDStore = create<LEDState>((set) => ({
  config: { ...DEFAULT_CONFIG },
  activeTab: 'text',
  isFullscreen: false,
  isPaused: false,

  updateConfig: (partial) =>
    set((state) => ({
      config: { ...state.config, ...partial },
    })),

  setActiveTab: (tab) => set({ activeTab: tab }),

  setFullscreen: (fullscreen) => set({ isFullscreen: fullscreen, isPaused: false }),

  togglePaused: () => set((state) => ({ isPaused: !state.isPaused })),

  resetConfig: () => set({ config: { ...DEFAULT_CONFIG } }),
}));
