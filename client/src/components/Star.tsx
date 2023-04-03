import { useFrame } from '@react-three/fiber';
import  { useEffect, useRef } from 'react'
import { Mesh, MeshStandardMaterial } from 'three';

type starProps = {
    x: number,
    y: number,
    z: number
}

const Star = ({ x, y, z }: starProps) => {

  const star = useRef<Mesh>(null!);

  useEffect(() => {
    // set bounding sphere's position to that of object
    const material = star.current.material as MeshStandardMaterial;
    material.color.set(0x48474A);
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