import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Line } from '@react-three/drei';

const NODES = [
  {
    id: 1,
    repo: 'meshery/meshery',
    pr: '#8490',
    title: 'feat: Implement canvas pattern adapter node rendering',
    desc: 'Wrote the core rendering engine for mesh components inside Meshery design canvas.',
    link: 'https://github.com/meshery/meshery/pull/8490',
    position: [-2.2, 1.2, 0.5],
  },
  {
    id: 2,
    repo: 'meshery/meshery',
    pr: '#8612',
    title: 'fix: Resolve lifecycle events stream subscription leaks',
    desc: 'Debugged and patched event observer systems preventing background thread bloat.',
    link: 'https://github.com/meshery/meshery/pull/8612',
    position: [-0.8, -0.6, 1.2],
  },
  {
    id: 3,
    repo: 'meshery/meshery-operator',
    pr: '#312',
    title: 'refactor: Upgrade operator controller runtime definitions',
    desc: 'Updated controller-runtime wrappers improving event synchronization speed.',
    link: 'https://github.com/meshery/meshery-operator/pull/312',
    position: [0.9, 1.5, -0.4],
  },
  {
    id: 4,
    repo: 'meshery/meshery-adapter-library',
    pr: '#182',
    title: 'feat: Standardize adapter status telemetry reporting',
    desc: 'Added open-telemetry export formats to base adapter schemas.',
    link: 'https://github.com/meshery/meshery-adapter-library/pull/182',
    position: [2.2, -0.2, 0.8],
  },
  {
    id: 5,
    repo: 'cncf/mentorship',
    pr: 'CNCF-LFX',
    title: 'LFX Mentorship: Meshery adapter enhancements graduation',
    desc: 'Completed full term upgrading CNF adapters, graduating into core Meshery maintainer.',
    link: 'https://github.com/cncf/mentorship',
    position: [0.2, 0.4, -1.8],
  },
  {
    id: 6,
    repo: 'meshery/meshery',
    pr: '#8940',
    title: 'perf: Optimize WebGL workspace node load latency by 45%',
    desc: 'Refactored canvas object parsing to defer rendering off-screen objects.',
    link: 'https://github.com/meshery/meshery/pull/8940',
    position: [-1.5, -1.4, -0.5],
  }
];

const CONNECTIONS = [
  [NODES[0].position, NODES[1].position],
  [NODES[1].position, NODES[5].position],
  [NODES[1].position, NODES[4].position],
  [NODES[2].position, NODES[4].position],
  [NODES[3].position, NODES[4].position],
  [NODES[0].position, NODES[2].position],
];

function ConstellationGraph({ activeNode, setActiveNode }) {
  const groupRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.04;
    }
  });

  return (
    <group ref={groupRef}>
      {CONNECTIONS.map((conn, idx) => (
        <Line
          key={idx}
          points={conn}
          color="#6e5cff"
          lineWidth={1.2}
          opacity={0.25}
          transparent
        />
      ))}

      {NODES.map((node) => {
        const isHovered = activeNode?.id === node.id;
        return (
          <mesh
            key={node.id}
            position={node.position}
            onPointerOver={(e) => {
              e.stopPropagation();
              setActiveNode(node);
            }}
            onClick={(e) => {
              e.stopPropagation();
              setActiveNode(node);
            }}
          >
            <sphereGeometry args={[isHovered ? 0.16 : 0.1, 16, 16]} />
            <meshBasicMaterial
              color={isHovered ? '#ff5a36' : '#6e5cff'}
              toneMapped={false}
            />
          </mesh>
        );
      })}
    </group>
  );
}

export default function Constellation3D({ activeNode, setActiveNode }) {
  return (
    <Canvas camera={{ position: [0, 0, 4.2], fov: 60 }} className="w-full h-full select-none pointer-events-auto">
      <ambientLight intensity={0.8} />
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      <ConstellationGraph activeNode={activeNode} setActiveNode={setActiveNode} />
      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  );
}
