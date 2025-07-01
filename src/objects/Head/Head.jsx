import React, { useEffect } from "react";

import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

import HeadData from '../../enums/Head';
import useAppearanceStore from '../../stores/appearanceStore';
import useModelingStore from '../../stores/modelingStore';
import useEnvironmentStore from '../../stores/environmentStore';

function Head({ castShadow = false }) {
  const {
    skinTone,
    headId,
  } = useAppearanceStore();

  // Find the head object by id
  const selectedHead = Object.values(HeadData).find(h => h.id === headId) || HeadData.Masculine;
  const model = selectedHead.model;
  const position = [0, 0, 0];
  const scale = [1, 1, 1];

  const { scene, nodes, materials } = useGLTF(model);

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = castShadow;
        child.material = new THREE.MeshStandardMaterial({
          color: new THREE.Color(skinTone),
          roughness: 0.5,
          metalness: 0.1,
        });
      }
    });
  }, [scene, castShadow, skinTone]);

  return <primitive object={scene} position={position} scale={scale} nodes={nodes} materials={materials} />;
}

export default Head;