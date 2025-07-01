import { create } from 'zustand';
import Scene from '../enums/Scene';

const STORAGE_KEY = 'environmentStore';

const defaultState = {
  timestamp: Date.now(),
  timeMode: true,
  dateMode: true,
  latitude: 0.0,
  latitudeMode: true,
  longitude: 0.0,
  longitudeMode: true,
  scene: Scene.outdoor,
};

function getInitialState() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return { ...defaultState, ...JSON.parse(stored) };
  } catch {
    console.error('Failed to parse environment store from localStorage, using default state.');
  }
  return defaultState;
}

const useEnvironmentStore = create((set) => ({
  ...getInitialState(),
  setTimestamp: (timestamp) => set((state) => {
    const s = { ...state, timestamp };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
    return { timestamp };
  }),
  setTimeMode: (timeMode) => set((state) => {
    const s = { ...state, timeMode };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
    return { timeMode };
  }),
  setDateMode: (dateMode) => set((state) => {
    const s = { ...state, dateMode };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
    return { dateMode };
  }),
  setLatitude: (latitude) => set((state) => {
    if (latitude === null || latitude === undefined || isNaN(latitude)) {
      latitude = 0;
    } else {
      latitude = Math.max(-90, Math.min(90, latitude));
    }
    const s = { ...state, latitude };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
    return { latitude };
  }),
  setLongitude: (longitude) => set((state) => {
    if (longitude === null || longitude === undefined || isNaN(longitude)) {
      longitude = 0;
    } else {
      longitude = Math.max(-180, Math.min(180, longitude));
    }
    const s = { ...state, longitude };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
    return { longitude };
  }),
  setLatitudeMode: (latitudeMode) => set((state) => {
    const s = { ...state, latitudeMode };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
    return { latitudeMode };
  }),
  setLongitudeMode: (longitudeMode) => set((state) => {
    const s = { ...state, longitudeMode };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
    return { longitudeMode };
  }),
  setScene: (scene) => set((state) => {
    const s = { ...state, scene };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
    return { scene };
  }),
  reset: () => set(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultState));
    return { ...defaultState };
  }),
}));

export default useEnvironmentStore;
