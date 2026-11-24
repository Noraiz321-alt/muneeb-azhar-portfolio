import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, OrbitControls, Sparkles } from '@react-three/drei'
import { useRef } from 'react'
import type { Mesh, Group } from 'three'

function Core() {
  const group = useRef<Group>(null)
  const sphere = useRef<Mesh>(null)
  useFrame(({ pointer, clock }) => {
    if (group.current) { group.current.rotation.y += (pointer.x * .22 - group.current.rotation.y) * .018; group.current.rotation.x += (-pointer.y * .12 - group.current.rotation.x) * .018 }
    if (sphere.current) sphere.current.scale.setScalar(1 + Math.sin(clock.elapsedTime * 1.4) * .035)
  })
  return <group ref={group}>
    <mesh ref={sphere}><icosahedronGeometry args={[.68, 3]}/><MeshDistortMaterial color="#62dfff" emissive="#0874a4" emissiveIntensity={1.4} roughness={.18} metalness={.35} distort={.18} speed={1.5}/></mesh>
    <mesh><icosahedronGeometry args={[1.12, 1]}/><meshBasicMaterial color="#48c9ff" wireframe transparent opacity={.28}/></mesh>
    <mesh rotation={[.8,.2,.3]}><torusGeometry args={[1.42,.012,8,120]}/><meshBasicMaterial color="#b37cff"/></mesh>
    <mesh rotation={[1.4,.6,-.4]}><torusGeometry args={[1.65,.009,8,120]}/><meshBasicMaterial color="#62dfff" transparent opacity={.7}/></mesh>
    {[0,1,2,3,4,5].map(i=><mesh key={i} position={[Math.cos(i*Math.PI/3)*1.5,Math.sin(i*Math.PI/3)*.95,Math.sin(i*2)*.24]}><sphereGeometry args={[.055,12,12]}/><meshBasicMaterial color={i%2?'#b37cff':'#a7f2ff'}/></mesh>)}
  </group>
}

export default function RobotScene() {
  return <Canvas dpr={[1,1.5]} camera={{position:[0,0,5.2],fov:42}} gl={{alpha:true,antialias:false}}><ambientLight intensity={.8}/><pointLight position={[3,2,3]} intensity={22} color="#33cfff"/><pointLight position={[-3,-2,2]} intensity={12} color="#8a58ff"/><Float speed={1.15} rotationIntensity={.18} floatIntensity={.25}><Core/></Float><Sparkles count={34} scale={5} size={1.5} speed={.22} color="#a1eaff"/><OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={.22} maxPolarAngle={Math.PI/1.7} minPolarAngle={Math.PI/3.5}/></Canvas>
}
