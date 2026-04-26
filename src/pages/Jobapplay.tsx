import { useQuery } from "@tanstack/react-query";
import AxiosURL from "../axios/axios";

const Jobapplay = () => {
const getApplayJobs = async() =>{
try{
const headers = {
 Authorization: `Bearer ${localStorage.getItem("token")}` 
};

const response = await AxiosURL.get(import.meta.env.VITE_User_Application_GET_URL,{headers});
return response.data.data

}catch(err){
console.error("API ERROR:",err);
throw err;  
}
}


const{data:apply,isLoading,error} = useQuery({
queryKey:[`user`],
queryFn:getApplayJobs  
})

if(error) return <div>error</div>

 if (isLoading) return <div className="h-screen flex items-center justify-center bg-[#0a0a0a] text-[#D91099] font-black tracking-[10px] animate-pulse">LOADING...</div>;


  return (
    <main className="min-h-screen bg-[url('/bg2.png')] bg-cover bg-center text-white p-4 sm:p-6">

      <div className="max-w-5xl mx-auto space-y-4">

        {apply?.length === 0 ? (
          <p className="text-center text-gray-400 mt-10">
            No applications yet 
          </p>
        ) : (
         Array.isArray(apply) &&
          apply?.map((job, index) => {
            return(
            <div
              key={index}
              className="flex flex-col sm:flex-row items-center justify-between gap-4 
                         bg-white/10 backdrop-blur-md border border-white/10 
                         rounded-xl p-4 shadow-md"
            >
              {/* Left Side */}
              <div className="flex items-center gap-4 w-full sm:w-auto">

                <img
                  src={job.companyImage}
                  alt="logo"
                  className="h-12 w-12 object-contain rounded"
                />

                <div>
                  <h2 className="text-lg font-semibold">
                    {job.companyName}
                  </h2>
                  <p className="text-sm text-gray-300">
                    {job.jobTitle}
                  </p>
                  <p className="text-sm text-gray-400">
                    {job.salary}
                  </p>
                </div>

              </div>

              {/* Right Side Buttons */}
              <div className="flex gap-3">
                <button  
                style={{backgroundColor:job.status === "pending" ? "green" : job.status === "selected"? "blue":"red"}}
                className="px-4 py-1 rounded-tl-[10px] rounded-br-[10px]  cursor-default">
                  {job.status}
                </button>

              </div>
            </div>
          )})
        )}

      </div>
    </main>
  );
};

export default Jobapplay;