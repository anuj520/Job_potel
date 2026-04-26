import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useAuth } from "../Context/contextAPI"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/all"
import { useQuery } from "@tanstack/react-query"


const HomeSection2 = () => {
  const {handleApplay,getAllJbos} = useAuth()
  const [selectedJob, setSelectedJob] = useState<any>(null)

const{data,isLoading,error} = useQuery({
queryKey:["users"],
queryFn:getAllJbos  
})
  

gsap.registerPlugin(ScrollTrigger);
useGSAP(()=>{
gsap.from(".homeSection2",{  
background:"transparent",
buration:.2,
scrollTrigger:{
start:"top -100% ",
end:"bottom 150%",
scrub:true,
}
})  
})

if(isLoading) return  <div>load</div>
if(error) return  <div>error</div>



return (
    <main className="homeSection2 relative z-10 w-screen min-h-screen bg-black/50 text-white p-6 font-sans">
      <h1 className="text-xl md:text-2xl mb-6 font-semibold tracking-tight">
        Top Company Job Opportunity
      </h1>

      {/* LIST */}
      <section className="border-b border-white/30">
        {data?.map((curr: any, index: number) => (
          <motion.div
          animate={{backgroundColor:"transparent"}}
          whileHover={{backgroundColor:"#d91099a6",color:"#000",transition:{duration:.1,ease:"easeInOut"}}}     
            key={index}
            onMouseEnter={() => setSelectedJob(curr)}
            onClick={() => setSelectedJob(curr)}
            onMouseLeave={() => setSelectedJob(null)}
            className="flex justify-between items-center border-t border-white/30 py-6 px-4 cursor-pointer hover:bg-white/5 transition-all duration-300"
          >
            {/* DATE REPLACED IMAGE HERE */}
            <div className="flex flex-col">
            <img
           src={curr.companyImage}
           className="h-10 md:h-12"
            />
            </div>

            <h1 className="text-3xl md:text-6xl font-black uppercase italic tracking-tighter">
              {curr.companyName}
            </h1>
          </motion.div>
        ))}
      </section>

      {/* FLOATING CARD */}
      <AnimatePresence>
        {selectedJob && (
          <motion.div
          onMouseEnter={() => setSelectedJob(selectedJob)}
          onMouseLeave={()=>setSelectedJob(null)}
            initial={{ scaleX:0, y: 20,}}
            animate={{y: 0, scaleX: 1 }}
            exit={{scaleX:0, y: 20,}}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed top-[25%] left-1/2 -translate-x-1/2 w-[90%] md:w-[400px] bg-black/50 rounded-tr-2xl rounded-bl-2xl p-6 shadow-2xl border border-white/10 backdrop-blur-xl z-50"
          >
            {/* CLOSE BUTTON */}
            <button
              onClick={() => setSelectedJob(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-[#D91099]  transition"
            >
              ✕
            </button>

            <div className="mb-4">
              <h1 className="text-2xl font-bold text-white">
                {selectedJob.jobRole || "Frontend Developer"}
              </h1>
              <p className="text-[#D91099] font-medium">{selectedJob.companyName}</p>
            </div>

            <div className="space-y-3 text-sm border-t border-white/10 pt-4">
              <p><span className="text-gray-500">Experience:</span> {selectedJob.experience}</p>
              <p><span className="text-gray-500">Salary:</span> {selectedJob.salary}</p>
              <p><span className="text-gray-500">Skills:</span> {selectedJob.skills}</p>
              <p><span className="text-gray-500">Location:</span> {selectedJob.location}</p>
                 <p><span className="text-gray-500">jobType:</span> {selectedJob.jobType}</p>
            </div>

            <p className="mt-4 text-sm text-gray-400 leading-relaxed">
              {selectedJob.description || "Exciting opportunity to join our growing engineering team."}
            </p>

            <button
            onClick={()=>handleApplay(selectedJob.id)}
            className=" cursor-pointer mt-6 w-full  bg-[#D91099] text-black py-3 rounded-tl-2xl rounded-br-2xl font-bold ">
              Apply Now
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}

export default HomeSection2