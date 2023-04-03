import { useEffect, useMemo, useRef } from 'react'
import { DoubleSide } from 'three';

const Entry = () => {

  const entry = useRef();

  const MAP_RADIUS =
  useMemo(() => {
    const MAP_RADIUS = parseInt(process.env.REACT_APP_MAP_RADIUS, 10) - 5;
    return MAP_RADIUS;
  }, [])
  
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