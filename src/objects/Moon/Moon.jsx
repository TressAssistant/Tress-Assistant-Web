import React from "react";

import { useLoader } from "@react-three/fiber";
import * as THREE from "three";

export default function Moon({ moonDirection, moonIllumination }) {
  const colorMap = useLoader(THREE.TextureLoader, "/textures/moon/lroc_color_poles_1k.jpg");
  const bumpMap = useLoader(THREE.TextureLoader, "/textures/moon/ldem_3_8bit.jpg");

  return (
    <mesh position={moonDirection.map((v) => v * 600)}>
      <sphereGeometry args={[20, 64, 64]} />
      <meshStandardMaterial
        map={colorMap}
        bumpMap={bumpMap}
        bumpScale={0.3}
        emissive="#666677"
        emissiveIntensity={0.3 + moonIllumination * 0.4}
        color="#ffffff"
        roughness={0.8}
        metalness={0.1}
        side={THREE.FrontSide} />
    </mesh>
  );
}
