import { useEffect, useRef } from 'react'
import { DoubleSide, Mesh } from 'three';

const Entry = () => {

  const entry = useRef<Mesh>(null!);

  const MAP_RADIUS = parseInt(import.meta.env.VITE_MAP_RADIUS!, 10) - 5;
  
  useEffect(() => {
    entry.current.rotateX( Math.PI / 2 );
    entry.current.position.set( 0, 0, 0 );
  }, [])

  return (
    <mesh ref={entry}>
      <circleGeometry args={[MAP_RADIUS]}/>
      <meshPhysicalMaterial
        color={0xFFFFFF}
        metalness={0}
        roughness={0.2}
        thickness={0.9}
        transmission={1}
        side={DoubleSide}
      />
    </mesh>
  )
}

export default Entry