import { useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState } from 'react'
import { DoubleSide } from 'three';

const Exit = () => {

  const exit = useRef();
  const scale = 10;
  const [scaled, setScaled] = useState(false);

  // const texture = useLoader(TextureLoader, Galaxy);

  const [MAP_RADIUS, MAP_HEIGHT] =
  useMemo(() => {
    const MAP_RADIUS = parseInt(process.env.REACT_APP_MAP_RADIUS, 10) - 5;
    const MAP_HEIGHT = parseInt(process.env.REACT_APP_MAP_HEIGHT, 10);
    return [MAP_RADIUS, MAP_HEIGHT];
  }, [])

  useEffect(() => {
    exit.current.rotateX( Math.PI / 2 );
    exit.current.position.set( 0, MAP_HEIGHT, 0 );
  }, [MAP_HEIGHT])

  const Scale = () => {
    useFrame(() => {
      if (exit.current.scale.x < scale || exit.current.scale.y < scale) {
        exit.current.scale.set(
          exit.current.scale.x + 0.1,
          exit.current.scale.y + 0.1,
          1
        )
      } else {
        setScaled(true);
      }
    })
  }

  return (
    <mesh ref={exit}>
      <circleGeometry args={[MAP_RADIUS / scale, 360]}/>
      <meshBasicMaterial color={"black"} side={DoubleSide}/>
      { !scaled && <Scale/> }
    </mesh>
  )
}

export default Exit