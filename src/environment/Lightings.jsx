import React, { useMemo, useEffect } from "react";

import { useThree } from "@react-three/fiber";
import * as THREE from "three";

import useEnvironmentStore from "../stores/environmentStore";

import LightingSimulator from "../services/LightingSimulator";
import RealisticSky from "./RealisticSky";

import Scene from "../enums/Scene";

import Moon from "../objects/Moon";
import SunAndMoonLights from "./SunAndMoonLights";

export default function Lightings() {
  const {
    timestamp,
    latitude,
    longitude,
    scene
  } = useEnvironmentStore();

  const dateObj = new Date(timestamp);

  const lighting = useMemo(
    () => LightingSimulator(dateObj, latitude, longitude),
    [timestamp, latitude, longitude]
  );

  const {
    sunIntensity,
    sunElevationAngle,
    sunDirection,
    sunColor,
    sunAzimuth,
    // Moon data
    moonElevationAngle,
    moonAzimuth,
    moonDirection,
    moonIllumination,
    moonPhase
  } = lighting;

  const sunPos = sunDirection.map((v) => v * 100);
  const { scene: threeScene } = useThree();


  useEffect(() => {
    if (scene === Scene.none) {
      threeScene.background = null;
      threeScene.background = new THREE.Color("#b1e1ff");
    }
  }, [scene, threeScene]);

  return (
    <>
      {scene === Scene.none ? (
        <>
          {/* Main key light - simulates sunlight */}
          <directionalLight
            position={[15, 25, 15]}
            intensity={2.5}
            color="#fff9e6"
            castShadow={true}
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-bias={-0.0005}
            shadow-camera-left={-40}
            shadow-camera-right={40}
            shadow-camera-top={40}
            shadow-camera-bottom={-40}
            shadow-camera-near={0.1}
            shadow-camera-far={300}
          />

          {/* Rim light - creates edge definition */}
          <directionalLight
            position={[-20, 15, -20]}
            intensity={1.2}
            color="#e6f3ff"
          />

          {/* Fill light - softens harsh shadows */}
          <directionalLight
            position={[5, 10, -15]}
            intensity={0.8}
            color="#f0f5ff"
          />

          {/* Ambient light for overall scene illumination */}
          <ambientLight
            color="#f5f8ff"
            intensity={0.4}
          />

          {/* Hemisphere light for natural sky/ground color variation */}
          <hemisphereLight
            skyColor="#87ceeb"
            groundColor="#deb887"
            intensity={0.6}
            position={[0, 50, 0]}
          />

          {/* Subtle bounce light from below */}
          <directionalLight
            position={[0, -5, 10]}
            intensity={0.3}
            color="#fff2e6"
          />
        </>
      ) : (
        <>
          <RealisticSky elevation={sunElevationAngle} azimuth={sunAzimuth + 180} />
          <Moon moonDirection={moonDirection} moonIllumination={moonIllumination} />

          <SunAndMoonLights
            sunPos={sunPos}
            sunIntensity={sunIntensity}
            sunColor={sunColor}
            moonElevationAngle={moonElevationAngle}
            moonIllumination={moonIllumination}
            moonDirection={moonDirection}
          />

          {/* Sky light - simulates diffuse sky illumination */}
          <hemisphereLight
            skyColor="#87ceeb"
            groundColor="#d2b48c"
            intensity={1.0 * sunIntensity}
            position={[0, 50, 0]}
          />

          {/* Ambient light for overall scene brightness */}
          <ambientLight
            color="#f0f5ff"
            intensity={0.5 * sunIntensity}
          />

          {/* Fill lights to simulate realistic bounce lighting */}
          <directionalLight
            position={[-15, 15, -15]}
            intensity={0.8 * sunIntensity}
            color="#a8d4ff"
          />
          <directionalLight
            position={[0, 35, 0]}
            intensity={0.6 * sunIntensity}
            color="#ffffff"
          />
          <directionalLight
            position={[15, 8, -15]}
            intensity={0.4 * sunIntensity}
            color="#fff5d6"
          />
          <directionalLight
            position={[-15, 8, 15]}
            intensity={0.4 * sunIntensity}
            color="#fff5d6"
          />

          {/* Ground bounce light */}
          <directionalLight
            position={[0, -3, 8]}
            intensity={0.25 * sunIntensity}
            color="#f5deb3"
          />

          {/* Soft rim lighting for better separation */}
          <directionalLight
            position={[-25, 20, -25]}
            intensity={0.6 * sunIntensity}
            color="#e6f3ff"
          />
        </>
      )}
    </>
  );
}