import { FiDollarSign, FiMapPin, FiSearch } from "react-icons/fi";
import AxiosURL from "../../axios/axios";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useAuth } from "../../Context/contextAPI";
import { useNavigate } from "react-router-dom";

const Search = () => {
 const[search,setSearch] = useState("") 
 const navigate = useNavigate()
 const handle = useAuth()
  const getAllJobs = async () => {
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };
    const response = await AxiosURL.get(import.meta.env.VITE_User_Jobs_URL, { headers });
    return response.data.data;
  };

  const { data: user, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getAllJobs,
  });

  const login = localStorage.getItem("isLoggedIn")
  useEffect(()=>{
  if (login === null) {
       navigate("/home/user")
  }
  },[login])

const filteredJobs = user?.filter((curr:any)=>{
return(
curr.companyName.toLowerCase().includes(search.toLowerCase()) ||
curr.title.toLowerCase().includes(search.toLowerCase())||
curr.jobRole.toLowerCase().includes(search.toLowerCase())||
curr.jobType.toLowerCase().includes(search.toLowerCase())||
curr.location.toLowerCase().includes(search.toLowerCase())||
curr.salary.toLowerCase().includes(search.toLowerCase())
)  
})

if (isLoading) return <div className="h-screen flex items-center justify-center bg-[#0a0a0a] text-[#D91099] font-black tracking-[10px] animate-pulse">LOADING...</div>;

  return (
    <div className="w-full min-h-screen bg-[url('/bg2.png')] bg-cover bg-fixed flex flex-col">
      

      <header
        className="w-full pt-8 pb-4 flex justify-center items-start bg-[#0a0a0a]/40  px-4"
      >
        <section className="w-full max-w-6xl h-auto md:h-[10vh] flex items-center gap-3 md:gap-5 px-4 md:px-8 py-3 md:py-0 rounded-xl bg-white/10 backdrop-blur-[120px] border border-white/10">
          <div className="text-[#D91099] text-xl md:text-[1.7rem] flex-shrink-0">
            <FiSearch />
          </div>
          <div className="flex-1">
            <input
              type="text"
              value={search}
              onChange={(e:any)=>setSearch(e.target.value)}
              placeholder="SEARCH FOR YOUR DREAM JOBS"
              className="w-full h-10 md:h-[5vh] pl-4 bg-transparent border-l border-white/60 outline-none 
              text-white text-sm sm:text-base md:text-[1.3rem]
              placeholder:text-white/70 placeholder:text-[10px] sm:placeholder:text-sm md:placeholder:text-[1.2rem]"
            />
          </div>
        </section>
      </header>

      {/* items  */}
      <main className="flex-1 p-6 md:p-12 bg-[#0a0a0a]/40  ">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-[#D91099] mb-10 border-l-4 border-[#ddd] pl-4">
            Latest <span className="text-[#ddd]">Job Openings</span>
          </h1>

          {/* Grid setup: Mobile: 1 col, Tablet: 2 col, Desktop: 3 col */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredJobs?.map((job:any) => (
              <div 
                key={job.id} 
                className="group flex flex-col bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-md hover:bg-white/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10 h-full"
              >
                {/* Company Logo & Title */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 shrink-0 rounded-2xl overflow-hidden border border-white/10 bg-white/5 p-1">
                    <img 
                      src={job.companyImage} 
                      alt={job.companyName} 
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                  <div className="overflow-hidden">
                    <h2 className="text-white font-bold text-lg truncate group-hover:text-blue-400 transition-colors">
                      {job.title}
                    </h2>
                    <p className="text-gray-400 text-sm truncate">{job.companyName}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="bg-blue-500/10 text-blue-400 text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded-lg border border-blue-500/20">
                    {job.jobType}
                  </span>
                  <span className="bg-purple-500/10 text-purple-400 text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded-lg border border-purple-500/20">
                    {job.jobRole}
                  </span>
                </div>

                <div className="space-y-3 mb-6 flex-1">
                  <div className="flex items-center gap-3 text-gray-300">
                    <FiMapPin className="text-blue-500 shrink-0" />
                    <span className="text-sm truncate">{job.location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <FiDollarSign className="text-green-500 shrink-0" />
                    <span className="text-sm font-semibold">{job.salary}</span>
                  </div>
                  <p className="text-gray-400 text-sm line-clamp-3 italic leading-relaxed pt-2">
                    "{job.description}"
                  </p>
                </div>

                <button
                onClick={()=>handle?.handleApplay(job.id)}
                className="w-full mt-auto py-3 bg-[#ddd] text-[#000] cursor-pointer font-bold rounded-tl-2xl rounded-br-2xl hover:bg-[#D91099] hover:text-black transition-all active:scale-95 shadow-lg shadow-white/5">
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Search;