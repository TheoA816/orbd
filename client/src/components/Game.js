import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, PointerLockControls, Stats } from '@react-three/drei';
import { useEffect, useMemo, useRef, useState } from "react";
import Star from "./Star";
import { Vector3, MathUtils, Sphere } from "three";
import Background from "./Background";
import Roof from "./Roof";
import Container from "./Container";
import PlayButton from "./playbutton/PlayButton";
import Entry from "./Entry";
import Exit from "./Exit";
import Results from "./results/Results";

const Game = ({ plControls, menu, setMenu }) => {

  // INIT AND FUNCTIONS
  const [playing, setPlaying] = useState(false);
  const [portal, setPortal] = useState(false);
  const [win, setWin] = useState(false);
  const [game, setGame] = useState(1);
  
  const timeRef = useRef({
    start: 0,
    end: 0
  });

  const starsRef = useRef();
  const touchedStars = useRef(null);

  const getTouchedStars = () => {
    if (touchedStars.current === null) {
      touchedStars.current = new Set();
    }
    return touchedStars.current;
  }

  const restartGame = () => {
    setMenu(true);
    touchedStars.current = null;
    setPortal(false);
    setWin(false);
    setGame(game => game + 1);
  }

  const [STAR_COUNT, MAP_RADIUS, INNER_RADIUS, MAP_HEIGHT] =
  useMemo(() => {
    const STAR_COUNT = parseInt(process.env.REACT_APP_STAR_COUNT, 10);
    const MAP_RADIUS = parseInt(process.env.REACT_APP_MAP_RADIUS, 10);
    const INNER_RADIUS = MAP_RADIUS - 5;
    const MAP_HEIGHT = parseInt(process.env.REACT_APP_MAP_HEIGHT, 10);
    return [STAR_COUNT, MAP_RADIUS, INNER_RADIUS, MAP_HEIGHT];
  }, [])

  // POINTER LOCK
  const EventListeners = () => {
    const { camera } = useThree();
    // lock
    useEffect(() => {
      const onLock = () => {
        if (menu) {
          camera.position.set(0, -40, 0);
          camera.lookAt(0, 0, 0);
          timeRef.current.start = new Date().getTime();
        }
        setMenu(false);
        setPlaying(true);
      }
      plControls.current.addEventListener('lock', onLock);
      return () => {
        plControls.current.removeEventListener('lock', onLock);
      }
    }, [camera])
    // unlock
    useEffect(() => {
      const onUnlock = () => {
        setPlaying(false);
      }
      plControls.current.addEventListener('unlock', onUnlock);
      return () => {
        plControls.current.removeEventListener('unlock', onUnlock);
      }
    }, [])
    // animate loop
    useFrame(() => {
      if (playing) {
        animate();
      }
    });
    return null;
  }

  // ARRAY OF STAR
  const loadedStars =
    useMemo(() => {
      const stars = [];
      for (let i = 0; i < STAR_COUNT; i++) {
        const x = MathUtils.randFloatSpread(MAP_RADIUS);
        const y = MathUtils.randFloat(5, MAP_HEIGHT - 20);
        const z = MathUtils.randFloatSpread(MAP_RADIUS);
        stars.push(<Star x={x} y={y} z={z} key={i}/>);
      }
      console.log(game)
      return stars;
    }, [MAP_HEIGHT, MAP_RADIUS, STAR_COUNT, game])

  // ANIMATION

  // INIT
  let prevTime = performance.now();
  const direction = new Vector3();
  const yAxis = new Vector3();
  const sphere = new Sphere();
  
  // MOVEMENT EVENT LISTENERS AND STATES
  const [forward, setForward] = useState(false);
  const [backward, setBackward] = useState(false);
  const [right, setRight] = useState(false);
  const [left, setLeft] = useState(false);
  
  useEffect(() => {
    const onKeydown = (e) => {
      switch (e.code) {
        case 'KeyW':
          setForward(true);
          break;
        case 'KeyA':
          setLeft(true);
          break;
        case 'KeyS':
          setBackward(true);
          break;
        case 'KeyD':
          setRight(true);
          break;
        default:
          break;
      }
    }
  
    const onKeyup = (e) => {
      switch (e.code) {
        case 'KeyW':
          setForward(false);
          break;
        case 'KeyA':
          setLeft(false);
          break;
        case 'KeyS':
          setBackward(false);
          break;
        case 'KeyD':
          setRight(false);
          break;
        default:
          break;
      }
    }
  
    document.addEventListener('keydown', onKeydown);
    document.addEventListener('keyup', onKeyup);

    return () => {
      document.removeEventListener('keydown', onKeydown);
      document.removeEventListener('keyup', onKeyup);
    }
  }, []);

  // ANIMATION LOOP FUNCTION
  const animate = () => {
    
    const time = performance.now();

    if ( playing ) {

      const camera = plControls.current.getObject();

      if (!portal) {

        const intersections = [];
        
        for ( const star of starsRef.current.children ) {
          sphere.set(
            star.position,
            star.geometry.boundingSphere.radius
          )
          if (sphere.containsPoint(camera.position)) intersections.push(star);
        }

        for ( let i = 0; i < intersections.length; i ++ ) {
          const star = intersections[i];
          star.material.color.set( 0xE57065 );
          const uuid = star.uuid;
          getTouchedStars();
          touchedStars.current.add(uuid);
          if (touchedStars.current.size === STAR_COUNT) {
            setPortal(true);
          }
        }
      } 
      
      else {
        if (camera.position.y > MAP_HEIGHT) {
          setWin(true);
          timeRef.current.end = new Date().getTime();
          plControls.current.unlock();
        };
      }
      
      const delta = ( time - prevTime ) / 60;
      camera.getWorldDirection(direction);
      direction.normalize();

      if (forward) {
        camera.position.addScaledVector(direction, delta);
      }

      if (backward) {
        direction.negate();
        camera.position.addScaledVector(direction, delta);
      }

      if (right) {
        plControls.current.moveRight(delta);
      }

      if (left) {
        plControls.current.moveRight(-delta);
      }

      yAxis.set(0, camera.position.y, 0);

      if (camera.position.distanceTo(yAxis) > INNER_RADIUS) {
        direction.set(0, -10, 0);
        camera.position.lerp(direction, 1);
        camera.lookAt(0, 0, 0);
      }
    }

    prevTime = time;
  }

  return (
    <>
      {/* CANVAS */}
      <Canvas camera={{position: [0, 50, 30]}}>
        <ambientLight color={0xFFFFFF}/>
        <Background/>

        <group ref={starsRef}>{loadedStars}</group>
        <Roof rotate={false}/>
        { portal && <Exit/> }
        <Container/>
        <Entry />
        <Roof rotate={true}/>

        <OrbitControls
          enabled={menu}
          target={[0, 50, 0]}
          minDistance={100}
          maxDistance={300}
          // maxPolarAngle={ Math.PI * 2 / 3 }
          // minPolarAngle={ Math.PI / 3 }
        />
        <PointerLockControls ref={plControls} selector={"#btn"}/>
        <EventListeners/>
        <Stats/>
      </Canvas>

      {/* BUTTONS */}
      { !playing && !win && !menu && <PlayButton onClick={() => plControls.current.lock()} text={"Continue"} /> }
      { win && <Results onClick={restartGame} times={timeRef} /> }
    </>
  )
}

export default Game