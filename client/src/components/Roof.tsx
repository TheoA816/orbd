import { useEffect, useMemo, useRef } from 'react'
import { BufferAttribute, Color, DoubleSide, LatheGeometry, Mesh, Vector2, Vector3, } from 'three';

type roofProps = {
  rotate: boolean
}

type myBufferAttribute = BufferAttribute & {
  color: BufferAttribute,
  position: BufferAttribute
}

const Roof = ({ rotate }: roofProps) => {

  const top = useRef<Mesh>(null!);
  const geom = useRef<LatheGeometry>(null!);

  // rotate = true (bottom) else (top)
  useEffect(() => {
    top.current.scale.set(10, 10, 10);
    top.current.position.set(0, 100, 0);
    if (rotate) {
      top.current.position.set(0, 0, 0);
      top.current.rotateX( - Math.PI );
    }
  }, [rotate])

  // lathe geometry points for roof
  const points = 
    useMemo(() => {
      const p = [];
      // base
      p.push(new Vector2(7.0, 0));
      p.push(new Vector2(6.7, 1));
      p.push(new Vector2(6.1, 2));
      p.push(new Vector2(5.4, 3));
      p.push(new Vector2(4.3, 4));
      p.push(new Vector2(3.0, 5));
      p.push(new Vector2(1.5, 6));
      // second base
      p.push(new Vector2(1.9, 6.25));
      p.push(new Vector2(2.3, 6.50));
      p.push(new Vector2(2.8, 6.75));
      p.push(new Vector2(2.6, 7.00));
      p.push(new Vector2(2.2, 7.25));
      p.push(new Vector2(1.5, 7.50));
      p.push(new Vector2(0.8, 7.75));
      p.push(new Vector2(0.1, 8.00));
      p.push(new Vector2(0.07, 8.00));
      // spire
      p.push(new Vector2(0, 10));
      return p;
    }, [])

  // material color points - set to default color
  const colors = 
    useMemo(() => {
      const color = new Color(0, 0, 0);
      const c = [];
      
      // cannot dynamically get since reference hasnt loaded before render
      const count = 6137;

      for (let index = 0; index < count; index++) {
        c.push(color.r, color.g, color.b);
      }

      return Float32Array.from(c);
    }, [])

  // apply gradient color to each individual point
  // useEffect(() => {
  //   geom.current.computeBoundingBox();
  //   const attributes = geom.current.attributes.position as myBufferAttribute;

  //   const bbox = geom.current.boundingBox!;
  //   const count = attributes.position.count * 3;
  //   const positions = attributes.array;
  //   const size = new Vector3().subVectors(bbox.max, bbox.min); // we'll use it to get normalized positions of vertices in faces of geometry

  //   let vertex = new Vector3(), normalized = new Vector3(), normalizedY = 0, color = new Color();
  //   const col1 = new Color(0xF0A3AE), col2 = new Color(0xFCF9C6);
    
  //   for (let i = 0; i < count; i++){
      
  //     if (i % 3 === 0) {
  //       vertex.set(positions[i], positions[i + 1], positions[i + 2]);
  //     }
      
  //     normalizedY = normalized.subVectors(vertex, bbox.min).divide(size).y; // we'll use the normalized Y-coordinate
  //     color = col1.clone().lerp(col2, normalizedY);
      
  //     if (i % 3 === 0) attributes.color.array[i] = color.r;
  //     else if (i % 3 === 1) attributes.color.array[i] = color.g;
  //     else if (i % 3 === 2) attributes.color.array[i] = color.b;
  //   }
    
  //   attributes.color.needsUpdate = true;
  // }, [])

  return (
    <mesh ref={top}>
      <latheGeometry ref={geom} args={[points, 360]}>
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </latheGeometry>
      <meshBasicMaterial vertexColors={true} side={DoubleSide}/>
    </mesh>
  )
}

export default Roof