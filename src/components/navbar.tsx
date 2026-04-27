import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom"
import {motion} from "framer-motion"
import "@fontsource/inter/700.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useState } from "react";

const Navbar = () => {
type AuthState = {
  role: string | null
  token: string | null
  profilePhoto: string | null
  resumeLink: string | null
  login: string | null
}

const [auth, setAuth] = useState<AuthState>({
  role: null,
  token: null,
  profilePhoto: null,
  resumeLink: null,
  login: null
})

const navigate = useNavigate()
const {contextSafe} = useGSAP();
const{pathname} = useLocation()

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

useEffect(() => {
  setAuth({
    role: localStorage.getItem("role"),
    token: localStorage.getItem("token"),
    profilePhoto: localStorage.getItem("profilePhoto"),
    resumeLink: localStorage.getItem("resumeLink"),
    login: localStorage.getItem("isLoggedIn"),
  })
}, [])

useEffect(() => {
  const { role, token, profilePhoto, resumeLink, login } = auth

  if (!token || !role) {
    navigate("/login")
    return
  }

  if (role === "admin") {
    navigate("/admin")
    return
  }
  if (!profilePhoto && !resumeLink && !login) {
    navigate("/home/user")
  } else {
    navigate("/home")
  }
}, [auth])

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
