import React, { useRef } from "react";

import { useFrame } from "@react-three/fiber";

export default function RotatingGroup({
  children,
  scale = [1, 1, 1],
  rotation = [0, 0, 0],
  position = [0, 0, 0]
}) {
  const groupRef = useRef(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.x = (rotation[0] * Math.PI) / 180;
      groupRef.current.rotation.y = (rotation[1] * Math.PI) / 180;
      groupRef.current.rotation.z = (rotation[2] * Math.PI) / 180;
    }
  });

  return <group ref={groupRef} scale={scale} position={position}>
    {children}
  </group>;
}
