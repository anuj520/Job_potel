import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom"
import {motion} from "framer-motion"
import "@fontsource/inter/700.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useAuth } from "../../../Context/contextAPI";
import { useEffect } from "react";

const AdminNavbar = () => {
const auth = useAuth()
const{pathname} = useLocation()
const navigate = useNavigate()
const {contextSafe} = useGSAP();

const hoverEffect = contextSafe((id:string)=>{
 gsap.to(`${id} p` ,{
  y:-7.5,
  color:"#066BDB",
  stagger:.05,
  fontSize:"1.5vw",
  fontWeight:"bold",
  ease:"back.in"
 }) 
})
const hoverEnd = contextSafe((id:string)=>{
 gsap.to(`${id} p` ,{
  y:0,
  color:"#D1D5DC",
  fontSize:"1.3vw",
  stagger:-.05,
    ease:"back.out"
 }) 
})
useEffect(()=>{
window.scrollTo(0,0)
},[pathname])

useEffect(() => {
  if (!auth?.adminAuthoriza) {
    navigate(-1)
  }
}, [auth])


return (
<main className="h-screen bg-black text-gray-300">
  
  {/* Canvas ke upar AdminNavbar */}
  <motion.section 
    whileHover={{backgroundColor:"#43444582",backdropFilter:"blur(20px)" , transition:{duration:.2}}}
  className="fixed bottom-0 left-1/2 -translate-x-1/2 
  w-[90vw] sm:w-[85vw] md:w-[80vw] 
   h-[8vh] sm:h-[9vh] md:h-[10vh] 
   bg-[#43444582]/40 backdrop-blur-[20px] rounded-t-xl z-50">

    <nav className="h-full">
      <ul className="h-full flex items-center justify-around 
     uppercase cursor-pointer 
      text-[3.5vw] sm:text-[2vw] md:text-[1.3vw] font-bold">
      
       <NavLink to={"/admin"}> <motion.li
        className="flex "
         id="home" 
         onHoverStart={()=>hoverEffect("#home")}
        onHoverEnd={()=>hoverEnd("#home")}
        >
          <p>A</p><p>d</p><p>m</p><p>i</p><p>n</p>
        </motion.li> </NavLink> 
       
      <NavLink to={"/admin/post"}> <motion.li 
        className="flex"
         id="post" 
         onHoverStart={()=>hoverEffect("#post")}
        onHoverEnd={()=>hoverEnd("#post")}
        ><p>p</p><p>o</p><p>s</p><p>t</p>
        </motion.li> </NavLink> 

      <NavLink to={"/admin/company/profile"}>   <motion.li 
        className="flex"
         id="user" 
         onHoverStart={()=>hoverEffect("#user")}
        onHoverEnd={()=>hoverEnd("#user")}
        ><p>p</p><p>r</p><p>o</p><p>f</p><p>i</p><p>l</p><p>e</p>
        </motion.li> </NavLink>

      <NavLink to={"/admin/dashbord"}>  <motion.li
        className="flex"
         id="search" 
         onHoverStart={()=>hoverEffect("#search")}
        onHoverEnd={()=>hoverEnd("#search")}
        ><p>d</p><p>a</p><p>s</p><p>h</p><p>b</p><p>o</p><p>r</p><p>d</p>
        </motion.li></NavLink>

      </ul>
    </nav>
  </motion.section>

  <Outlet />
</main>
  )
}

export default AdminNavbar
