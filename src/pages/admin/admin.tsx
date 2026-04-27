import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/contextAPI";
import { FiMapPin, FiBriefcase, FiUsers, FiCalendar } from "react-icons/fi";
import {motion} from "framer-motion"
import Adminloading from "./loading/admin loading";
import AxiosURL from "../../axios/axios";

const AdminDashbord = () => {
  const navigate = useNavigate();
  const { getAllJobsPosted } = useAuth();

const getCompanyProfile = async() =>{
 const token = localStorage.getItem("token");
const headers = { Authorization: `Bearer ${token}` };
const response = await AxiosURL.get(import.meta.env.VITE_Recruiter_Profile_URL ,{headers})
return response.data.data.company
}


  const { data: user, isLoading } = useQuery({
    queryKey: ['posted'],
    queryFn: getAllJobsPosted
  });
    const {data: profile} = useQuery({
    queryKey: ['profileget'],
    queryFn: getCompanyProfile
  });


  // Helper to format date
  const formatDate = (dateStr:any) => {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const handleLogout = () =>{
    localStorage.removeItem("token")
    localStorage.removeItem("role")
     localStorage.removeItem("isLoggedIn")
    navigate("/login")
  }

  if (isLoading || profile === undefined) return (
    <Adminloading/>
  );

  return (
    <main className="min-h-screen  bg-[url('/bg.png')] bg-cover bg-center p-4 md:p-10">
    <main className="p-4 md:p-1 font-sans">
      
      <section className="max-w-6xl mx-auto mb-10">
        <div className="p-6 rounded-[2.5rem] flex flex-col md:flex-row items-center gap-6 shadow-2xl ">
          
          <div className="w-24 h-24 rounded-3xl overflow-hidden border-2 border-blue-500/50 p-1 bg-white/5 shrink-0">
            <img 
              src={profile.company_img} 
              alt={`${profile.companyName} Logo`} 
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>

          <div className="text-center md:text-left">
            <h1 className="text-4xl font-black text-white tracking-tight uppercase">
              {profile.companyName} <span className="text-blue-500">Recruiter Panel</span>
            </h1>
            <p className="text-gray-400 text-sm mt-1 tracking-wide">
              Official dashboard for {profile.companyName} talent acquisition
            </p>
          </div>

        </div>
      </section>

    </main>
  );
      
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Recruiter <span className="text-[#066BDB]">Dashboard</span>
          </h1>
          <div className="flex gap-6 flex-row-reverse">
          <motion.button 
          whileHover={{scale:1.1,transition:{duration:.2,ease:"easeInOut"}}}
          whileTap={{scale:1,transition:{duration:.2,ease:"easeInOut"}}}
            onClick={handleLogout} // Assuming this is your create route
            className="bg-[#db0606] cursor-pointer text-white px-6 py-2.5 rounded-tr-2xl rounded-bl-2xl  font-bold transition-all"
          > 
            Logout
          </motion.button>
          <motion.button 
          whileHover={{scale:1.1,transition:{duration:.2,ease:"easeInOut"}}}
          whileTap={{scale:1,transition:{duration:.2,ease:"easeInOut"}}}
            onClick={() => navigate('/admin/post')} // Assuming this is your create route
            className="bg-[#066BDB] cursor-pointer text-white px-6 py-2.5 rounded-tr-2xl rounded-bl-2xl  font-bold transition-all"
          >
            + Post New Job
          </motion.button>
          </div>
          
        </div>

        <div className="grid grid-cols-1 gap-4">
          {user?.jobs.length > 0 ? (
            user.jobs.map((curr:any) => (
              <div 
                key={curr.id}
                className="group bg-white/5 border border-white/10 p-5 md:p-6  backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-6 hover:border-[#066BDB]/50 transition-all shadow-xl"
              >
                {/* Left Side: Job Info */}
                <div className="flex-1 w-full">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-xl font-bold text-white">
                      {curr.title}
                    </h2>
                    <span className="bg-blue-500/10 text-blue-400 text-[10px] px-2 py-0.5 rounded-md border border-blue-500/20 uppercase font-bold">
                      {curr.jobType}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-400">
                    <span className="flex items-center gap-1.5">
                      <FiBriefcase className="text-blue-500" /> {curr.jobRole.replace('_', ' ')}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <FiMapPin className="text-blue-500" /> {curr.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <FiCalendar className="text-blue-500" /> {formatDate(curr.createdAt)}
                    </span>
                  </div>
                </div>

                {/* Right Side: Actions */}
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <motion.button 
                   whileHover={{scale:1.05,transition:{duration:.2,ease:"easeInOut"}}}
                  whileTap={{scale:1,transition:{duration:.2,ease:"easeInOut"}}}
                    onClick={() => navigate(`/admin/job/aplay/${curr.id}`)}
                    className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white text-slate-900 px-6 py-3 cursor-pointer rounded-tl-2xl rounded-br-2xl  font-bold"
                  >
                    <FiUsers /> View Applicants
                  </motion.button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/20">
              <p className="text-gray-500 text-lg">No jobs posted yet.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default AdminDashbord;