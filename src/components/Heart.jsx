import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const HeartShape = new THREE.Shape();
const x = 0, y = 0;
HeartShape.moveTo(x + 5, y + 5);
HeartShape.bezierCurveTo(x + 5, y + 5, x + 4, y, x, y);
HeartShape.bezierCurveTo(x - 6, y, x - 6, y + 7, x - 6, y + 7);
HeartShape.bezierCurveTo(x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19);
HeartShape.bezierCurveTo(x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7);
HeartShape.bezierCurveTo(x + 16, y + 7, x + 16, y, x + 10, y);
HeartShape.bezierCurveTo(x + 7, y, x + 5, y + 5, x + 5, y + 5);

const extrudeSettings = {
  depth: 2,
  bevelEnabled: true,
  bevelSegments: 2,
  steps: 2,
  bevelSize: 1,
  bevelThickness: 1
};

const Heart = ({ position, onClick, color = '#ff0055' }) => {
  const mesh = useRef();
  const [hovered, setHover] = useState(false);
  const [rotationSpeed] = useState(Math.random() * 0.02 + 0.01);
  const [scale, setScale] = useState(0.1);

  useFrame((state, delta) => {
    if (mesh.current) {
        mesh.current.rotation.y += rotationSpeed;
        mesh.current.rotation.z = Math.sin(state.clock.elapsedTime * rotationSpeed * 10) * 0.1;
        
        // Pulse effect
        const pulse = Math.sin(state.clock.elapsedTime * 3) * 0.01;
        mesh.current.scale.set(
            (hovered ? 0.13 : 0.1) + pulse, 
            (hovered ? 0.13 : 0.1) + pulse, 
            (hovered ? 0.13 : 0.1) + pulse
        );
    }
  });

  return (
    <mesh
      ref={mesh}
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      onPointerOver={() => {
        document.body.style.cursor = 'pointer';
        setHover(true);
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'auto';
        setHover(false);
      }}
      rotation={[Math.PI, 0, 0]} 
    >
      <extrudeGeometry args={[HeartShape, extrudeSettings]} />
      {/* Emissive material for glow effect */}
      <meshStandardMaterial 
        color={hovered ? '#ff00ff' : color} 
        emissive={hovered ? '#ff00ff' : color}
        emissiveIntensity={hovered ? 2 : 0.8}
        roughness={0.1} 
        metalness={0.3} 
      />
    </mesh>
  );
};

export default Heart;
