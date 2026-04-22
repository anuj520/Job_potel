import { useAnimations, useGLTF, useTexture } from "@react-three/drei"
import { useThree } from "@react-three/fiber"
import { useEffect, useRef, useState } from "react";
import * as THREE from "three"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/all";
 
const Scene = () => {
const{scene,animations} = useGLTF("./fish.glb")
const [screenWidth, setScreenWidth] = useState(window.innerWidth);
const {actions,names} = useAnimations(animations,scene)  
const{camera,gl} = useThree();
const {contextSafe} = useGSAP();
gsap.registerPlugin(useGSAP())
gsap.registerPlugin(ScrollTrigger)

const[baseColor,emsissiveColor] = (useTexture([
"/textures/jellyfish_body_baseColor.png",
"/textures/jellyfish_body_emissive.png",
])).map(texture =>{
 texture.flipY = false,
 texture.colorSpace = THREE.SRGBColorSpace
 return texture 
})

const jallyfish_material = new THREE.MeshPhysicalMaterial({
map:baseColor,
metalness:3,
roughness:.3,
transparent:true,
opacity:.8,
emissiveIntensity:5,
emissive: new THREE.Color("#D91099"),
emissiveMap:emsissiveColor,
clearcoat:0,
clearcoatRoughness:0,
transmission:.8,
thickness:.5
})

scene.traverse((child) =>{
if (child instanceof THREE.Mesh) {
child.material = jallyfish_material 
} 
})

useEffect(()=>{
camera.position.set(0,1.5,5)
// gl.toneMapping = THREE.ReinhardToneMapping,
gl.outputColorSpace = THREE.SRGBColorSpace
},[])

useEffect(()=>{    
if(!actions) return;
const act = actions[names[0]]
act?.reset()
act?.setLoop(THREE.LoopRepeat,Infinity)
act?.fadeIn(.5)
act?.play()
},[actions])

const model = useRef(scene);
const posiOrrota = model.current 

const addgsap  = contextSafe(()=>{
const tl = gsap.timeline({
scrollTrigger:{
 trigger:"#section1",
 endTrigger:"#section3",
 start:"top top",
 end:"bottom",
 markers:true,
 scrub:true 
}
})
tl.to(posiOrrota.position,{
z:"+1",  
x:"0"
},"first")
tl.to(posiOrrota.rotation,{
y: Math.PI  
})
})

useGSAP(()=>{
addgsap()  
},[])

useEffect(()=>{
const handleResize = () => setScreenWidth(window.innerWidth)

window.addEventListener("resize",handleResize)
return () => window.removeEventListener("resize",handleResize)
},[])

const posX = screenWidth < 600 ? 0 :screenWidth < 1060 ? 1:2.5
const scaXYZ = screenWidth < 600 ? [1,1,1]:screenWidth < 1060 ? [1.5,1.9,1.5]:[2,1.4,2]


    return (
    <primitive object={scene} scale={scaXYZ} rotation-z={-Math.PI/9} position-x={posX}/>
  )
}

export default Scene
