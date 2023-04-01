import { extend } from '@react-three/fiber'
import { Color } from 'three'

extend({ Color })

const Background = () => {

    return (
      <color attach={"background"} args={[0xC8DFF0]}/>
    )
  }
  
  export default Background