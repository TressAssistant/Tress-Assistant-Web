import { create } from 'zustand';

const STORAGE_KEY = 'renderingStore';

const defaultState = {
  showAxesHelper: false,
  showStats: true,
  fpsLimitEnabled: false,
  fpsLimit: 15,
  showShadows: true,
};

function getInitialState() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return { ...defaultState, ...JSON.parse(stored) };
  } catch {
    console.error('Failed to parse rendering store from localStorage, using default state.');
  }
  return defaultState;
}

const useRenderingStore = create((set) => ({
  ...getInitialState(),
  setShowAxesHelper: (showAxesHelper) => set((state) => {
    const s = { ...state, showAxesHelper };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
    return { showAxesHelper };
  }),
  setShowStats: (showStats) => set((state) => {
    const s = { ...state, showStats };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
    return { showStats };
  }),
  setFpsLimitEnabled: (fpsLimitEnabled) => set((state) => {
    const s = { ...state, fpsLimitEnabled };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
    return { fpsLimitEnabled };
  }),
  setFpsLimit: (fpsLimit) => set((state) => {
    const s = { ...state, fpsLimit };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
    return { fpsLimit };
  }),
  setShowShadows: (showShadows) => set((state) => {
    const s = { ...state, showShadows };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
    return { showShadows };
  }),
  reset: () => set(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultState));
    return { ...defaultState };
  }),
}));

export default useRenderingStore;
