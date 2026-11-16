import { create } from 'zustand';

export type StageType = 'hero' | 'story' | 'exploded' | 'product' | 'hidden';
export type ProductSystemType =
  | 'sliding-door'
  | 'pleated-system'
  | 'casement-window'
  | 'balcony-partition';

interface SceneState {
  stage: StageType;
  explodeProgress: number;
  storyProgress: number;
  activeSystem: ProductSystemType;
  frameColor: string;
  isSashOpenManual: boolean;
  setStage: (stage: StageType) => void;
  setExplodeProgress: (progress: number) => void;
  setStoryProgress: (progress: number) => void;
  setActiveSystem: (system: ProductSystemType) => void;
  setFrameColor: (color: string) => void;
  toggleSashManual: () => void;
}

export const useSceneStore = create<SceneState>((set) => ({
  stage: 'hero',
  explodeProgress: 0,
  storyProgress: 0,
  activeSystem: 'sliding-door',
  frameColor: '#2a2e39',
  isSashOpenManual: false,
  setStage: (stage) => set({ stage }),
  setExplodeProgress: (explodeProgress) => set({ explodeProgress }),
  setStoryProgress: (storyProgress) => set({ storyProgress }),
  setActiveSystem: (activeSystem) => set({ activeSystem }),
  setFrameColor: (frameColor) => set({ frameColor }),
  toggleSashManual: () => set((state) => ({ isSashOpenManual: !state.isSashOpenManual })),
}));
