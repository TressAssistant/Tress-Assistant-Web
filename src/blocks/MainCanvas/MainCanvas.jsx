import React, { useEffect, useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import useEnvironmentStore from "../../stores/environmentStore";
import Scene from "../../enums/Scene";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stats } from "@react-three/drei";
import Head from "../../objects/Head";
import Hair from "../../objects/Hair";
import Lightings from "../../environment/Lightings";
import RealisticGround from '../../environment/RealisticGround';
import HeadEnum from '../../enums/Head';
import HairStyle from '../../enums/HairStyle';
import GroundType from '../../enums/GroundType';
import useAppearanceStore from '../../stores/appearanceStore';
import useModelingStore from '../../stores/modelingStore';
import useRenderingStore from "../../stores/renderingStore";
import RotatingGroup from "./RotatingGroup";
import handleCanvasCreated from "./handleCanvasCreated";

export default function MainCanvas({ onLoaded }) {
  const {
    showHair,
  } = useAppearanceStore();

  const {
    modelXRotation = 0,
    modelYRotation = 0,
    modelZRotation = 0,
    setModelYRotation,
    setModelXRotation,
    setModelZRotation,
    yAutoRotationSpeed = 0,
    xAutoRotationSpeed = 0,
    zAutoRotationSpeed = 0,
    cameraPosition,
    cameraLookAt,
    setCameraPosition,
    setCameraLookAt,
  } = useModelingStore();

  const {
    showAxesHelper,
    showStats,
    fpsLimitEnabled,
    fpsLimit,
    showShadows
  } = useRenderingStore();

  useEffect(() => {
    const interval = setInterval(() => {
      setModelYRotation((modelYRotation + yAutoRotationSpeed) % 360);
      setModelXRotation((modelXRotation + xAutoRotationSpeed) % 360);
      setModelZRotation((modelZRotation + zAutoRotationSpeed) % 360);
    }, 16);
    return () => clearInterval(interval);
  }, [
    modelYRotation,
    setModelYRotation,
    yAutoRotationSpeed,
    modelXRotation,
    setModelXRotation,
    xAutoRotationSpeed,
    modelZRotation,
    setModelZRotation,
    zAutoRotationSpeed,
  ]);

  const { scene } = useEnvironmentStore();

  // Preload models and ground textures
  useEffect(() => {
    const headModels = Object.values(HeadEnum).map(h => h.model).filter(Boolean);
    const hairModels = Object.values(HairStyle).map(h => h.model).filter(Boolean);
    // Combine and dedupe
    const allModels = Array.from(new Set([...headModels, ...hairModels]));
    allModels.forEach((modelPath) => {
      useGLTF.preload(modelPath);
    });
    // Preload all ground textures for all ground types
    Object.values(GroundType).forEach((ground) => {
      if (ground && ground.textures) {
        Object.values(ground.textures).forEach((texturePath) => {
          useTexture.preload(texturePath);
        });
      }
    });
  }, []);

  const fpsLimitRef = useRef(fpsLimit);
  const fpsLimitEnabledRef = useRef(fpsLimitEnabled);

  useEffect(() => {
    fpsLimitRef.current = fpsLimit;
  }, [fpsLimit]);

  useEffect(() => {
    fpsLimitEnabledRef.current = fpsLimitEnabled;
  }, [fpsLimitEnabled]);

  const lastFrameTimeRef = useRef(0);
  const refs = { fpsLimitRef, fpsLimitEnabledRef, lastFrameTimeRef };
  const orbitRef = useRef();

  return (
    <div className="relative w-screen h-screen">
      <Canvas
        style={{ width: "100vw", height: "100vh" }}
        camera={{ position: cameraPosition, fov: 45, near: 0.1, far: 1000 }}
        gl={{
          alpha: false,
          antialias: true,
          outputEncoding: 3001 // THREE.sRGBEncoding
        }}
        shadows={showShadows}
        frameloop="never"
        onCreated={(args) => handleCanvasCreated(args, refs, onLoaded)}
      >
        <Lightings />

        <RotatingGroup
          rotation={[modelXRotation, modelYRotation, modelZRotation]}
          position={[0, 25, 0]}
        >
          <Head castShadow />
          {showHair && <Hair castShadow />}
        </RotatingGroup>

        {scene === Scene.outdoor && (
          <RealisticGround />)};

        {showAxesHelper && <axesHelper args={[100]} />}
        {showStats && <Stats />}

        <OrbitControls
          ref={orbitRef}
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          minDistance={10}
          maxDistance={100}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI * 3 / 4}
          target={cameraLookAt}
          onChange={(e) => {
            const cam = e.target.object;
            const tgt = e.target.target;
            // Round to 1 decimal digit
            setCameraPosition([
              Number(cam.position.x.toFixed(1)),
              Number(cam.position.y.toFixed(1)),
              Number(cam.position.z.toFixed(1)),
            ]);
            setCameraLookAt([
              Number(tgt.x.toFixed(1)),
              Number(tgt.y.toFixed(1)),
              Number(tgt.z.toFixed(1)),
            ]);
          }}
        />
      </Canvas>
    </div>
  );
}