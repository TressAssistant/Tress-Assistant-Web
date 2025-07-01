import React from "react";

export default function SunAndMoonLights({
  sunPos,
  sunIntensity,
  sunColor,
  moonElevationAngle,
  moonIllumination,
  moonDirection
}) {
  return (
    <>
      {/* Main sunlight */}
      <directionalLight
        position={sunPos}
        intensity={3.5 * sunIntensity}
        color={sunColor}
        castShadow={true}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0001}
        shadow-camera-left={-50}
        shadow-camera-right={50}
        shadow-camera-top={50}
        shadow-camera-bottom={-50}
        shadow-camera-near={0.1}
        shadow-camera-far={500}
      />
      {/* Moonlight - only if moon is above horizon and illuminated */}
      {moonElevationAngle > 0 && moonIllumination > 0 && (
        <directionalLight
          position={moonDirection.map((v) => v * 100)}
          intensity={1.5 * moonIllumination}
          color="#b0c4de"
          castShadow={false}
        />

      )}

      <pointLight
        position={moonDirection.map((v) => v * 550)}
        intensity={5}
        distance={75}
        decay={0}
        color="#FFFFFF"
      />
    </>
  );
}
