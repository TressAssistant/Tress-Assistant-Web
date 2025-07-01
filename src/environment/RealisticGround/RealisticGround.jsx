import React from "react";

import { useTexture } from "@react-three/drei";
import GroundType from '../../enums/GroundType';

function RealisticGround() {
  const ground = GroundType.Concrete;
  const textures = ground.textures;
  const [colorMap, normalMap, roughnessMap, aoMap, displacementMap] = useTexture([
    textures.color,
    textures.normal,
    textures.roughness,
    textures.ao,
    textures.displacement
  ]);

  // Hardcoded geometry and material values
  const geometryArgs = [1000, 1000, 256, 256];
  const geometryPosition = [0, 0, 0];
  const geometryRotation = [-Math.PI / 2, 0, 0];
  const materialProps = {
    displacementScale: 2,
    roughness: 0.7,
    metalness: 0.15,
    color: '#CCCCCC',
    emissive: '#000000',
    emissiveIntensity: 0.0,
  };

  return (
    <mesh
      position={geometryPosition}
      rotation={geometryRotation}
      receiveShadow
    >
      <planeGeometry args={geometryArgs} />
      <meshStandardMaterial
        map={colorMap}
        normalMap={normalMap}
        roughnessMap={roughnessMap}
        displacementMap={displacementMap}
        displacementScale={materialProps.displacementScale}
        roughness={materialProps.roughness}
        metalness={materialProps.metalness}
        color={materialProps.color}
        emissive={materialProps.emissive}
        emissiveIntensity={materialProps.emissiveIntensity}
      />
    </mesh>
  );
}

export default RealisticGround;
