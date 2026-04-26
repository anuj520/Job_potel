import "@fontsource/inter/700.css";
import { useAuth } from "../Context/contextAPI";

const HomeSection1 = () => {
const{roleAU,colorFont} = useAuth()  


  return (
<main className="relative z-10 grid justify-start items-center 
                 w-screen h-[100vh] overflow-hidden">
<p className="pb-4 sm:pb-5 pl-3 sm:pl-5 
              font-bold 
              text-[0.8rem] sm:text-[0.9rem] md:text-[1rem] lg:text-[1.1rem] 
              leading-relaxed">

  <span className="text-[#D91099] block sm:inline" style={{color:colorFont.color}}>
  {roleAU ?
   " Top Companies //"  :
" Create Job Opportunities,"}

  </span> <span className="block sm:inline text-gray-300 mt-1 sm:mt-0">
    {roleAU ?
     "Google  Microsoft  Amazon  Meta  Netflix  Rockstar":
    "Manage Applications, and Build Your Dream Team Faster Than Ever"}
  </span>

</p>

<div className="px-4 font-[Poppins]">
  
  <h1 className="uppercase font-extrabold 
                 text-[15vw] sm:text-[8] md:text-[6vw] lg:text-[9vw]
                 leading-[0.9] tracking-tight text-[#D91099] italic" style={{color:colorFont.color}}>
   {roleAU ? "Find Your":"Build Your"}
  </h1>

  <h1 className="uppercase font-extrabold 
                 text-[13vw] sm:text-[8vw] md:text-[6vw] lg:text-[9vw]
                 leading-[0.9] tracking-tight " style={{fontSize:colorFont.fontSize}}>
   {roleAU ? "Dream Job":"Team Faster"} 
    <span className="block sm:inline 
                     text-[4vw] sm:text-[3vw] md:text-[2vw]
                     font-light italic text-[#D91099] ml-2 font[cursive]" style={{color:colorFont.color}}>
      {roleAU ? "faster,":"”"} 
    </span>
  </h1>

</div>
</main>
  )
}

export default HomeSection1
