import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useRef } from "react"



const Stair = () => {

const pageAnimation = useRef(null)

useGSAP(()=>{
const tl = gsap.timeline()

tl.to(pageAnimation.current,{
display:"block"
})

tl.from('.stair',{
height:0,
stagger:{
 amount:-0.25
}  
}) 
tl.to(".stair",{
y:'100%',
stagger:{
 amount:-0.25 
}    
})
tl.to(pageAnimation.current,{
display:"none"
})
tl.to(".stair",{
y:'0%',
   })

})   

  return (
     <div ref={pageAnimation} className="h-screen w-full  fixed z-50 top-0 ">
    <div  className="h-screen w-full flex  ">
     <div className="stair h-full w-1/5 bg-[#D91099]"></div>
    <div className="stair h-full w-1/5 bg-[#D91099]"></div>
    <div className="stair h-full w-1/5 bg-[#D91099]"></div>
    <div className="stair h-full w-1/5 bg-[#D91099]"></div>
    <div className="stair h-full w-1/5 bg-[#D91099]"></div>
    <div className="stair h-full w-1/5 bg-[#D91099]"></div>
 </div>
    </div> 
  )
}

export default Stair
