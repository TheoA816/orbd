import { useEffect, useMemo, useRef } from 'react'
import { Color, DoubleSide, Vector2, Vector3, } from 'three';

const Roof = ({ rotate }) => {

  const top = useRef();
  const geom = useRef();

  useEffect(() => {
    top.current.scale.set(10, 10, 10);
    top.current.position.set(0, 100, 0);
    if (rotate) {
      top.current.position.set(0, 0, 0);
      top.current.rotateX( - Math.PI );
    }
  }, [rotate])

  // lathe geometry points
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

  // material color points
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

  useEffect(() => {
    geom.current.computeBoundingBox();

    const bbox = geom.current.boundingBox;
    const count = geom.current.attributes.position.count * 3;
    const positions = geom.current.attributes.position.array;
    const size = new Vector3().subVectors(bbox.max, bbox.min); // we'll use it to get normalized positions of vertices in faces of geometry

    let vertex = new Vector3(), normalized = new Vector3(), normalizedY = 0, color = new Color();
    const green = new Color(0x7FF234), blue = new Color(0x167BE7);
    
    for (let i = 0; i < count; i++){
      
      if (i % 3 === 0) {
        vertex.set(positions[i], positions[i + 1], positions[i + 2]);
      }
      
      normalizedY = normalized.subVectors(vertex, bbox.min).divide(size).y; // we'll use the normalized Y-coordinate
      color = green.clone().lerp(blue, normalizedY);
      
      // every column 17 vectors
      // for (let idx = i; idx < count * 3; idx += count) {
      //   if (idx % 3 === 0) geom.current.attributes.color.array[idx] = color.r;
      //   else if (idx % 3 === 1) geom.current.attributes.color.array[idx] = color.g;
      //   else if (idx % 3 === 2) geom.current.attributes.color.array[idx] = color.b;
      // }
      
      if (i % 3 === 0) geom.current.attributes.color.array[i] = color.r;
      else if (i % 3 === 1) geom.current.attributes.color.array[i] = color.g;
      else if (i % 3 === 2) geom.current.attributes.color.array[i] = color.b;
    }
    
    geom.current.attributes.color.needsUpdate = true;
  }, [])

  return (
    <mesh ref={top}>
      <latheGeometry ref={geom} args={[points, 360]}>
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </latheGeometry>
      {/* <meshPhongMaterial wireframe={true} color={0x1E231F} side={DoubleSide}/> */}
      <meshBasicMaterial vertexColors={true} side={DoubleSide}/>
    </mesh>
  )
}

export default Roof