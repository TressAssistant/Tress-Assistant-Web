import { create } from 'zustand';
import HumanSkinTone from '../enums/HumanSkinTone';
import Head from '../enums/Head';
import NaturalHairColor from '../enums/NaturalHairColor';
import HairStyle from '../enums/HairStyle';
import ColoringMode from '../enums/ColoringMode';

const STORAGE_KEY = 'appearanceStore';
const defaultState = {
  skinTone: HumanSkinTone.Fair,
  headId: Head.Masculine.id,
  hairStyleId: HairStyle.ShortMessy.id,
  hairColor: NaturalHairColor.Blonde,
  showHair: true,
  coloringMode: ColoringMode.GradientColor,
  bleachedHair: false,
  applyHairColor: false,
  // Yay! Let's go rainbow! 🌈🌈🌈🟥🟧🟨🟩🟦🟪🌈🌈🌈
  gradientColor: 'linear-gradient(90deg, #E50000 0%, #FF8D00 20%, #FFEE00 40%, #028121 50%, #004CFF 80%, #770088 100%)',
  gradientRotationX: 0,
  gradientRotationY: 0,
  gradientRotationZ: 90,
};

function getInitialState() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return { ...defaultState, ...JSON.parse(stored) };
  } catch {
    console.error('Failed to parse appearance store from localStorage, using default state.');
  }
  return defaultState;
}

const useAppearanceStore = create((set) => ({
  ...getInitialState(),
  setSkinTone: (skinTone) => set((state) => {
    const s = { ...state, skinTone };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
    return { skinTone };
  }),
  setHeadId: (headId) => set((state) => {
    const s = { ...state, headId };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
    return { headId };
  }),
  setHairStyleId: (hairStyleId) => set((state) => {
    const s = { ...state, hairStyleId };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
    return { hairStyleId };
  }),
  setHairColor: (hairColor) => set((state) => {
    const s = { ...state, hairColor };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
    return { hairColor };
  }),
  setShowHair: (showHair) => set((state) => {
    const s = { ...state, showHair };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
    return { showHair };
  }),
  setColoringMode: (coloringMode) => set((state) => {
    const s = { ...state, coloringMode };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
    return { coloringMode };
  }),
  setApplyHairColor: (applyHairColor) => set((state) => {
    const s = { ...state, applyHairColor };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
    return { applyHairColor };
  }),
  setBleachedHair: (bleachedHair) => set((state) => {
    const s = { ...state, bleachedHair };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
    return { bleachedHair };
  }),
  setGradientColor: (gradientColor) => set((state) => {
    const s = { ...state, gradientColor };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
    return { gradientColor };
  }),
  setGradientRotationX: (gradientRotationX) => set((state) => {
    const s = { ...state, gradientRotationX };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
    return { gradientRotationX };
  }),
  setGradientRotationY: (gradientRotationY) => set((state) => {
    const s = { ...state, gradientRotationY };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
    return { gradientRotationY };
  }),
  setGradientRotationZ: (gradientRotationZ) => set((state) => {
    const s = { ...state, gradientRotationZ };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
    return { gradientRotationZ };
  }),
  reset: () => set(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultState));
    return { ...defaultState };
  }),
}));

export default useAppearanceStore;
