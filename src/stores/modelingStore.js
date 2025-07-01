import { create } from 'zustand';

const STORAGE_KEY = 'modelingStore';

const defaultState = {
  modelXRotation: 0,
  modelYRotation: 180,
  modelZRotation: 0,
  yAutoRotationSpeed: 0,
  xAutoRotationSpeed: 0,
  zAutoRotationSpeed: 0,
  cameraPosition: [0, 0, 150],
  cameraLookAt: [0, 20, 0],
};

function getInitialState() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return { ...defaultState, ...JSON.parse(stored) };
  } catch {
    console.error('Failed to parse modeling store from localStorage, using default state.');
  }
  return defaultState;
}

const useModelingStore = create((set) => ({
  ...getInitialState(),
  setModelXRotation: (modelXRotation) => set((state) => {
    const s = { ...state, modelXRotation };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
    return { modelXRotation };
  }),
  setModelYRotation: (modelYRotation) => set((state) => {
    const s = { ...state, modelYRotation };
    if (s.yAutoRotationSpeed != 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
    }
    return { modelYRotation };
  }),
  setModelZRotation: (modelZRotation) => set((state) => {
    const s = { ...state, modelZRotation };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
    return { modelZRotation };
  }),
  setYAutoRotationSpeed: (yAutoRotationSpeed) => set((state) => {
    const s = { ...state, yAutoRotationSpeed };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
    return { yAutoRotationSpeed };
  }),
  setXAutoRotationSpeed: (xAutoRotationSpeed) => set((state) => {
    const s = { ...state, xAutoRotationSpeed };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
    return { xAutoRotationSpeed };
  }),
  setZAutoRotationSpeed: (zAutoRotationSpeed) => set((state) => {
    const s = { ...state, zAutoRotationSpeed };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
    return { zAutoRotationSpeed };
  }),
  // Camera state setters (not persisted)
  setCameraPosition: (cameraPosition) => set(() => ({ cameraPosition })),
  setCameraLookAt: (cameraLookAt) => set(() => ({ cameraLookAt })),
  reset: () => set(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultState));
    return { ...defaultState };
  }),
}));

export default useModelingStore;
