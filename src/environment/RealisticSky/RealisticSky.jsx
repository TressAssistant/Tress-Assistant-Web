import React, { useRef, useEffect } from "react";

import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Sky } from "three/examples/jsm/objects/Sky.js";

export default function RealisticSky({
  elevation = 2,
  azimuth = 180,
  turbidity = 10,
  rayleigh = 3,
  mieCoefficient = 0.005,
  mieDirectionalG = 0.7
}) {
  const { scene, gl } = useThree();
  const skyRef = useRef();
  const sun = useRef(new THREE.Vector3());

  useEffect(() => {
    if (!skyRef.current) {
      skyRef.current = new Sky();
      skyRef.current.scale.setScalar(450000);
      scene.add(skyRef.current);
    }
    const uniforms = skyRef.current.material.uniforms;
    uniforms["turbidity"].value = turbidity;
    uniforms["rayleigh"].value = rayleigh;
    uniforms["mieCoefficient"].value = mieCoefficient;
    uniforms["mieDirectionalG"].value = mieDirectionalG;

    const phi = THREE.MathUtils.degToRad(90 - elevation);
    const theta = THREE.MathUtils.degToRad(azimuth);
    sun.current.setFromSphericalCoords(1, phi, theta);
    uniforms["sunPosition"].value.copy(sun.current);

    // Optionally adjust exposure
    gl.toneMappingExposure = 0.5;

    return () => {
      if (skyRef.current) {
        scene.remove(skyRef.current);
        skyRef.current.geometry.dispose();
        skyRef.current.material.dispose();
        skyRef.current = null;
      }
    };
  }, [elevation, azimuth, turbidity, rayleigh, mieCoefficient, mieDirectionalG, scene, gl]);

  return null;
}
