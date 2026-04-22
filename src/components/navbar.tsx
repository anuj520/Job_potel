import { Outlet } from "react-router-dom"
import {motion} from "framer-motion"
import "@fontsource/inter/700.css";

const Navbar = () => {

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
        <motion.li
        whileHover={{scale:1.2,color:"#D91099", fontWeight:"bold",transition:{duration:.2}}}
        >
          <h1>Home</h1>
        </motion.li>
        <motion.li 
         whileHover={{scale:1.2,color:"#D91099", fontWeight:"bold",transition:{duration:.2,ease:"easeInOut"}}}
        >About</motion.li>
        <motion.li 
         whileHover={{scale:1.2,color:"#D91099", fontWeight:"bold",transition:{duration:.2,ease:"easeInOut"}}}
        >Post</motion.li>
        <motion.li 
         whileHover={{scale:1.2,color:"#D91099", fontWeight:"bold",transition:{duration:.2,ease:"easeInOut"}}}
        >User</motion.li>
        <motion.li
         whileHover={{scale:1.2,color:"#D91099", fontWeight:"bold",transition:{duration:.2,ease:"easeInOut"}}}
        >Services</motion.li>
      </ul>
    </nav>
  </motion.section>

  <Outlet />
</main>
  )
}

export default Navbar
