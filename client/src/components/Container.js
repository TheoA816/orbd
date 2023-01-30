import React, { useEffect, useMemo, useRef } from 'react'
import { DoubleSide, Path, Shape } from 'three';

const Container = () => {
  
  const tube = useRef();

  const [MAP_RADIUS, INNER_RADIUS, MAP_HEIGHT] =
  useMemo(() => {
    const MAP_RADIUS = parseInt(process.env.REACT_APP_MAP_RADIUS, 10);
    const INNER_RADIUS = MAP_RADIUS - 5;
    const MAP_HEIGHT = parseInt(process.env.REACT_APP_MAP_HEIGHT, 10);
    return [MAP_RADIUS, INNER_RADIUS, MAP_HEIGHT];
  }, [])

  const shape = 
  useMemo(() => {
    const arcShape = new Shape();
    arcShape.moveTo(MAP_RADIUS * 2, MAP_RADIUS);
    arcShape.absarc(MAP_RADIUS, MAP_RADIUS, MAP_RADIUS, 0, Math.PI * 2, false);

    const holePath = new Path();
    holePath.moveTo(MAP_RADIUS + INNER_RADIUS, MAP_RADIUS);
    holePath.absarc(MAP_RADIUS, MAP_RADIUS, INNER_RADIUS, 0, Math.PI * 2, true);

    arcShape.holes.push(holePath);
    return arcShape;
  }, [MAP_RADIUS, INNER_RADIUS])
  
  useEffect(() => {
    tube.current.position.set(- MAP_RADIUS, 0, MAP_RADIUS);
    tube.current.rotateX( - Math.PI / 2 );
  }, [MAP_RADIUS])

  return (
    <mesh ref={tube}>
      <extrudeGeometry 
        args={[shape, {
          depth: MAP_HEIGHT,
          bevelEnabled: false,
          steps: 1,
          curveSegments: 60
        }]
      }/>
      {/* <meshPhysicalMaterial 
        metalness={0}
        roughness={0.1}
        thickness={0.5}
        transmission={1}
      /> */}
      <meshBasicMaterial transparent={true} opacity={0.7} side={DoubleSide}/>
    </mesh>
  )
}

export default Container