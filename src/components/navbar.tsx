import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom"
import {motion} from "framer-motion"
import "@fontsource/inter/700.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect } from "react";
import { useAuth } from "../Context/contextAPI";

const Navbar = () => {
const navigate = useNavigate()
const {contextSafe} = useGSAP();
const{pathname} = useLocation()
const{Authoriza} =  useAuth()

const hoverEffect = contextSafe((id:string)=>{
 gsap.to(`${id} p` ,{
  y:-7.5,
  color:"#D91099",
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
const profilePhoto = localStorage.getItem("profilePhoto") 
const resumeLink = localStorage.getItem("resumeLink")
const role = localStorage.getItem("role");
const token = localStorage.getItem("token")
const login = localStorage.getItem("isLoggedIn")
useEffect(() => {
  if (profilePhoto === null && resumeLink === null && login === null) {
    navigate("/home/user");
  }else{
  navigate("/home");
  }
  if (role === null || token === null) {
    navigate("/login")
  }else if (role === "admin") {
    navigate("/admin")
  }
}, [profilePhoto, resumeLink,role]);

useEffect(()=>{
if (!Authoriza) {
console.log("hello");
  
navigate(-1)
}
},[Authoriza])

useEffect(()=>{
window.scrollTo(0,0)
},[pathname])


return (
<main className="h-screen bg-black text-gray-300">
  
  {/* Canvas ke upar Navbar */}
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

      <NavLink to={"/home"}>  <motion.li
        className="flex "
      id="home" 
         onHoverStart={()=>hoverEffect("#home")}
        onHoverEnd={()=>hoverEnd("#home")}
        >
          <p>H</p><p>o</p><p>m</p><p>e</p>
        </motion.li> </NavLink> 

     <NavLink to={"/home/Jobapplay"}><motion.li  
        className="flex"
            id="post" 
         onHoverStart={()=>hoverEffect("#post")}
        onHoverEnd={()=>hoverEnd("#post")}
        ><p>a</p><p>p</p><p>l</p><p>a</p><p>y</p> <span> </span> <p> j</p><p>o</p><p>b</p><p>s</p>
        </motion.li></NavLink>
         
    <NavLink to={"/home/user"}> <motion.li 
        className="flex"
         id="user" 
         onHoverStart={()=>hoverEffect("#user")}
        onHoverEnd={()=>hoverEnd("#user")}
        ><p>u</p><p>s</p><p>e</p><p>r</p></motion.li> </NavLink>  

         <NavLink to={"/home/search"}> <motion.li
        className="flex"
         id="search" 
         onHoverStart={()=>hoverEffect("#search")}
        onHoverEnd={()=>hoverEnd("#search")}
        ><p>s</p><p>e</p><p>a</p><p>r</p><p>c</p><p>h</p></motion.li>  </NavLink> 
      </ul>
    </nav>
  </motion.section>

  <Outlet />
</main>
  )
}

export default Navbar
