import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

import HairStyle from "../../enums/HairStyle";
import ColoringMode from "../../enums/ColoringMode";

import useAppearanceStore from '../../stores/appearanceStore';
import { GradientColorService } from '../../services/GradientColorService';

import gradientHairVertexShader from '../../shaders/gradientHair.vert.glsl?raw';
import gradientHaiFragmentShader from '../../shaders/gradientHair.frag.glsl?raw';

function applyKeepOriginal(child, hairColor) {
  const mat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(hairColor),
    roughness: 0.7,
    metalness: 0.2,
    vertexColors: true,
  });
  child.material = mat;
}

// TODO: Implement highlight shader
function applyHighlight(child, hairColor) {
  const mat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(hairColor),
    roughness: 0.7,
    metalness: 0.2,
    vertexColors: true,
  });
  child.material = mat;
}

// Custom shader for gradient color
function applyGradientColor(child, hairColor, artificialColors, bleachedHair, rotationAngles = [0, 0, 0]) {
  const blendedHairColors = GradientColorService.blendHairColors(hairColor, artificialColors, bleachedHair);

  //console.log(rotationAngles);

  // Convert rotation angles to a gradient direction vector
  // Default direction is vertical (0, 1, 0) which creates top-to-bottom gradient
  const defaultDirection = new THREE.Vector3(0, 1, 0);
  
  // Create rotation from Euler angles
  const euler = new THREE.Euler(
    THREE.MathUtils.degToRad(rotationAngles[0]), // X rotation
    THREE.MathUtils.degToRad(rotationAngles[1]), // Y rotation  
    THREE.MathUtils.degToRad(rotationAngles[2])  // Z rotation
  );
  
  // Apply rotation to the default direction to get the gradient direction
  const gradientDirection = defaultDirection.clone().applyEuler(euler);

  //console.log("Blended Hair Colors:", blendedHairColors);
  /**
   * Example blendedHairColors structure:
   * {
  "isLinear": true,
  "orientationAngle": 90,
  "colors": [
    {
      "color": "#030123",
      "stop": "0"
    },
    {
      "color": "#090979",
      "stop": "24"
    },
    {
      "color": "#090979",
      "stop": "62"
    },
    {
      "color": "#05d1fa",
      "stop": "100"
    }
  ]
}
   * 
   */

  // Extract colors and stops from blendedHairColors
  const gradientColors = blendedHairColors.colors.map(colorStop => new THREE.Color(colorStop.color));
  const gradientStops = blendedHairColors.colors.map(colorStop => parseFloat(colorStop.stop));

  // Pad arrays to ensure we have 6 elements (shader expects fixed size arrays)
  while (gradientColors.length < 6) {
    gradientColors.push(gradientColors[gradientColors.length - 1] || new THREE.Color("#000000"));
  }
  while (gradientStops.length < 6) {
    gradientStops.push(100.0);
  }

  // Calculate gradient bounds by projecting bounding box vertices onto gradient direction
  let minGradientPos = Infinity;
  let maxGradientPos = -Infinity;
  
  if (child.geometry.boundingBox) {
    const bbox = child.geometry.boundingBox;
    // Check all 8 corners of the bounding box
    const corners = [
      new THREE.Vector3(bbox.min.x, bbox.min.y, bbox.min.z),
      new THREE.Vector3(bbox.max.x, bbox.min.y, bbox.min.z),
      new THREE.Vector3(bbox.min.x, bbox.max.y, bbox.min.z),
      new THREE.Vector3(bbox.max.x, bbox.max.y, bbox.min.z),
      new THREE.Vector3(bbox.min.x, bbox.min.y, bbox.max.z),
      new THREE.Vector3(bbox.max.x, bbox.min.y, bbox.max.z),
      new THREE.Vector3(bbox.min.x, bbox.max.y, bbox.max.z),
      new THREE.Vector3(bbox.max.x, bbox.max.y, bbox.max.z),
    ];
    
    corners.forEach(corner => {
      const projection = corner.dot(gradientDirection);
      minGradientPos = Math.min(minGradientPos, projection);
      maxGradientPos = Math.max(maxGradientPos, projection);
    });
  } else {
    // Fallback values
    minGradientPos = -1;
    maxGradientPos = 1;
  }

  const mat = new THREE.MeshStandardMaterial({
    // base color is not used, but required
    color: gradientColors[0],
    roughness: 0.6,
    metalness: 0.1,
    vertexColors: false,
  });

  mat.onBeforeCompile = (shader) => {
    // Inject uniforms for gradient
    shader.uniforms.gradientColors = { value: gradientColors };
    shader.uniforms.gradientStops = { value: gradientStops };
    shader.uniforms.numColors = { value: blendedHairColors.colors.length };
    shader.uniforms.gradientDirection = { value: gradientDirection };
    shader.uniforms.minGradientPos = { value: minGradientPos };
    shader.uniforms.maxGradientPos = { value: maxGradientPos };

    shader.vertexShader = gradientHairVertexShader;
    shader.fragmentShader = gradientHaiFragmentShader;
  };

  child.material = mat;
}

function Hair({ castShadow = false }) {
  const sprayColor = "#FFFF00";
  const {
    hairColor,
    hairStyleId,
    coloringMode,
    artificialColor,
    bleachedHair,
    applyHairColor,
    gradientColor,
    gradientRotationX,
    gradientRotationY,
    gradientRotationZ
  } = useAppearanceStore();

  const selectedStyle = Object.values(HairStyle).find(h => h.id === hairStyleId) || HairStyle.ShortMessy;
  let model = selectedStyle.model;
  let position = selectedStyle.position;
  let scale = selectedStyle.scale;

  const { scene } = useGLTF(model);
  const meshRef = useRef();
  const rendererRef = useRef();

  // Get renderer from context
  useEffect(() => {
    // Find the renderer from the canvas
    if (!rendererRef.current) {
      const canvas = document.querySelector('canvas');
      if (canvas && canvas.__threeObj) {
        rendererRef.current = canvas.__threeObj;
      } else if (window && window.__THREE_RENDERER__) {
        rendererRef.current = window.__THREE_RENDERER__;
      }
    }
  }, []);

  // Add vertex colors and set up material
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = castShadow;

        // --- Coloring Mode Switch ---
        if (!applyHairColor) {
          applyKeepOriginal(child, hairColor);
        } else {
          switch (coloringMode) {
            case ColoringMode.GradientColor:
            default:
              // Ensure bounding box is computed for gradient
              if (!child.geometry.boundingBox) {
                child.geometry.computeBoundingBox();
              }
              applyGradientColor(
                child, 
                hairColor, 
                gradientColor, 
                bleachedHair, 
                [gradientRotationX, gradientRotationY, gradientRotationZ]
              );
              break;
          }
        }
        // --- End Coloring Mode Switch ---

        // Add vertex colors if missing
        const geometry = child.geometry;
        const count = geometry.attributes.position.count;
        if (!geometry.attributes.color) {
          const colors = [];
          for (let i = 0; i < count; i++) {
            colors.push(1, 1, 1); // default white
          }
          geometry.setAttribute(
            "color",
            new THREE.Float32BufferAttribute(colors, 3)
          );
        }

        // Save ref for mesh
        meshRef.current = child;
      }
    });
  }, [
    scene,
    castShadow,
    hairColor,
    sprayColor,
    coloringMode,
    artificialColor,
    bleachedHair,
    applyHairColor,
    gradientColor,
    gradientRotationX,
    gradientRotationY,
    gradientRotationZ
  ]);

  return (
    <primitive
      object={scene}
      position={position}
      scale={scale}
    />
  );
}

export default Hair;