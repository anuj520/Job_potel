import { useEffect, useState } from "react";

const Jobapplay = () => {
 const getData = localStorage.getItem("apply")
const[apply,setapplay] = useState<any[]>([]);

const handleRemove = (name:string) =>{
const data =  JSON.parse(localStorage.getItem("apply") || "[]");
const updated = data.filter((item) => item.companyName !== name);
localStorage.setItem("apply",JSON.stringify(updated))
setapplay(updated);

}


 useEffect(()=>{
if(getData === null) return;
const parsed  = JSON.parse(getData);
setapplay(parsed );

 },[getData])


  return (
    <main className="min-h-screen bg-[url('/bg2.png')] bg-cover bg-center text-white p-4 sm:p-6">

      <div className="max-w-5xl mx-auto space-y-4">

        {apply.length === 0 ? (
          <p className="text-center text-gray-400 mt-10">
            No applications yet 
          </p>
        ) : (
          apply.map((job, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row items-center justify-between gap-4 
                         bg-white/10 backdrop-blur-md border border-white/10 
                         rounded-xl p-4 shadow-md"
            >
              {/* Left Side */}
              <div className="flex items-center gap-4 w-full sm:w-auto">

                <img
                  src={job.companyLogo}
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

                <button onClick={() =>handleRemove(job.companyName)} className="px-4 py-1 rounded-tr-[10px] rounded-bl-[10px]  bg-red-500 hover:bg-red-600 transition">
                  Cancel
                </button>

                <button  className="px-4 py-1 rounded-tl-[10px] rounded-br-[10px] border-2 border-[#D91099]/75 text-white cursor-default">
                  Pending
                </button>

              </div>
            </div>
          ))
        )}

      </div>
    </main>
  );
};

export default Jobapplay;