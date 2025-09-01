'use client';

import React, {
  useRef,
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  OrbitControls,
  PerspectiveCamera,
  useGLTF,
} from '@react-three/drei';
import * as THREE from 'three';
import { FBXLoader } from 'three-stdlib';

// External control for parent to start/stop talking
export type AvatarHandle = {
  startTalking: () => void;
  stopTalking: () => void;
};

type AvatarModelProps = {
  isTalking: boolean;
  position?: [number, number, number];
  scale?: [number, number, number];
};

const AvatarModel = ({
  isTalking,
  position = [0, -1.5, 0],
  scale = [4, 4, 4],
}: AvatarModelProps) => {
  const avatarRef = useRef<THREE.Group>(null);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const mouthMesh = useRef<THREE.Mesh | null>(null);

  const [blendIndex, setBlendIndex] = useState<number | null>(null);
  const [animations, setAnimations] = useState<{
    idle: THREE.AnimationClip | null;
    talking: THREE.AnimationClip | null;
  }>({ idle: null, talking: null });

  const { scene: avatarScene } = useGLTF('/avatar.glb') as any;

  // Find blendshape and setup morph target
  useEffect(() => {
    avatarScene.traverse((child: any) => {
      if (child.isMesh && child.name === 'Wolf3D_Head' && child.morphTargetDictionary) {
        mouthMesh.current = child;
        setBlendIndex(child.morphTargetDictionary['mouthOpen'] ?? null);
      }
    });
  }, [avatarScene]);

  // Load idle and talking FBX animations
  useEffect(() => {
    const avatar = avatarRef.current;
    if (!avatar) return;

    const mixer = new THREE.AnimationMixer(avatar);
    mixerRef.current = mixer;

    const loader = new FBXLoader();

    loader.load('/idle.fbx', (fbx) => {
      setAnimations((prev) => ({ ...prev, idle: fbx.animations[0] }));
    });

    loader.load('/talking.fbx', (fbx) => {
      setAnimations((prev) => ({ ...prev, talking: fbx.animations[0] }));
    });

    return () => {
      mixer.stopAllAction();
    };
  }, []);

  // Switch between idle and talking animations
  useEffect(() => {
    const mixer = mixerRef.current;
    if (!mixer || !animations.idle || !animations.talking) return;

    mixer.stopAllAction();
    const action = mixer.clipAction(isTalking ? animations.talking : animations.idle);
    action.reset();
    action.play();
  }, [isTalking, animations]);

  // Animate mouthOpen blendshape while talking
  useFrame((state, delta) => {
    mixerRef.current?.update(delta);

    if (!mouthMesh.current || blendIndex === null) return;

    const influences = mouthMesh.current.morphTargetInfluences!;
    if (isTalking) {
      influences[blendIndex] = Math.abs(Math.sin(state.clock.elapsedTime * 10));
    } else {
      influences[blendIndex] = 0;
    }
  });

  return (
    <group ref={avatarRef} position={position} scale={scale}>
      <primitive object={avatarScene} />
    </group>
  );
};

type AvatarCanvasProps = {
  position?: [number, number, number];
  scale?: [number, number, number];
};

const AvatarCanvas = forwardRef<AvatarHandle, AvatarCanvasProps>(
  ({ position = [0, -3, 0], scale = [2, 2, 2] }, ref) => {
    const [isTalking, setIsTalking] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({ width: 400, height: 400 });

    useImperativeHandle(ref, () => ({
      startTalking() {
        setIsTalking(true);
      },
      stopTalking() {
        setIsTalking(false);
      },
    }));

    useEffect(() => {
      const updateSize = () => {
        if (containerRef.current) {
          const size = Math.min(
            containerRef.current.clientWidth,
            window.innerHeight * 0.9
          );
          setDimensions({ width: size, height: size });
        }
      };
      updateSize();
      window.addEventListener('resize', updateSize);
      return () => window.removeEventListener('resize', updateSize);
    }, []);

    return (
      <div
        ref={containerRef}
        className="w-full flex justify-center items-center"
        style={{ height: '60vh', minHeight: '400px' }}
      >
        <Canvas
          style={{
            width: dimensions.width,
            height: dimensions.height,
            background: 'transparent',
          }}
        >
          <PerspectiveCamera makeDefault position={[0, 1, 7.2]} fov={35} />
          <ambientLight intensity={0.6} />
          <directionalLight position={[2, 4, 3]} intensity={1.2} />
          <OrbitControls enablePan={false} enableZoom={false} enableRotate={false} />
          <AvatarModel isTalking={isTalking} position={position} scale={scale} />
        </Canvas>
      </div>
    );
  }
);

export default AvatarCanvas;
