import { useFrame } from '@react-three/fiber';
import  { useEffect, useRef } from 'react'

const Star = ({ x, y, z }) => {

  const star = useRef();
  console.log("STAR BRO")

  useEffect(() => {
    // set bounding sphere's position to that of object
    star.current.material.color.set(0x000000);
    star.current.geometry.computeBoundingSphere();
  }, [x, y, z])

  useFrame(() => {
    star.current.rotation.x += 0.01;
    star.current.rotation.z += 0.01;
  })

  return (
    <mesh ref={star} position={[x, y, z]}>
      <octahedronGeometry args={[2, 0]} />
      <meshStandardMaterial wireframe={true}/>
    </mesh>
  )
}

export default Star