import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import AxiosURL from "../../axios/axios";
import { toast } from "react-toastify";
import Adminloading from "./loading/admin loading";

const UserApplayJobs = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();

  // Modal aur Form states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAppId, setSelectedAppId] = useState("");
  const [formData, setFormData] = useState({ status: "pending", feedback: "" });

  const applicationStatus = async (id:any) => {
    const headers = { Authorization: `Bearer ${localStorage.getItem("token")}` };
    const response = await AxiosURL.get(`${import.meta.env.VITE_Recruiter_Jobs_Applications_all_URL}/${id}`, { headers });
    return response.data.data;
  };

  const { data: users, isLoading } = useQuery({
    queryKey: ["getData", id],
    queryFn: () => applicationStatus(id),
  });

  const handleUpdateClick = (appId:any) => {
    setSelectedAppId(appId);
    setIsModalOpen(true);
  };

  const handleSubmitStatus = async (e:any) => {
    e.preventDefault();
    try {
      const headers = { Authorization: `Bearer ${localStorage.getItem("token")}` };
      await AxiosURL.patch(
        `${import.meta.env.VITE_Recruiter_Jobs_Applications_URL}/${selectedAppId}`,
        { ApplicationStatus: formData.status, feedback: formData.feedback },
        { headers }
      );
      
      toast.success("Status Updated!");
      setIsModalOpen(false);
      setFormData({ status: "pending", feedback: "" });
     queryClient.invalidateQueries({ queryKey: ["getData"] });
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) return  <Adminloading/>;

  return (
    <main className="min-h-screen bg-[url('/bg.png')] bg-cover bg-center p-4 md:p-10 text-white">
      <h1 className="text-2xl font-bold mb-8 text-center md:text-left">Applied Candidates</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users?.map((curr:any) => (
          <div key={curr.id} className="bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-md shadow-xl flex flex-col gap-4 transition-hover hover:border-blue-500/50">
            <div className="flex items-center gap-4">
              <img src={curr.user.userDetails?.profilePhoto} alt="profile" className="w-14 h-14 rounded-full object-cover border-2 border-blue-500" />
              <div>
                <h2 className="font-semibold text-lg">{curr.user.firstName} {curr.user.lastName}</h2>
                <p className="text-xs text-gray-400">{curr.user.email}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 text-xs">
              <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full border border-blue-500/30">Status: {curr.status}</span>
              <a href={curr.user.userDetails?.resumeLink} target="_blank" className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full border border-green-500/30">View Resume</a>
            </div>

            <button 
              onClick={() => handleUpdateClick(curr.id)}
              className="mt-2 w-full bg-blue-600 hover:bg-blue-700 py-3 cursor-pointer rounded-tl-xl rounded-br-xl font-medium transition-all active:scale-95"
            >
              Update Application Status
            </button>
          </div>
        ))}
      </div>

      {/* --- FORM MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <form onSubmit={handleSubmitStatus} className="bg-slate-900 border border-white/20 w-full max-w-md p-8 rounded-3xl shadow-2xl animate-in fade-in zoom-in duration-200">
            <h2 className="text-xl font-bold mb-6 text-blue-400">Update Application</h2>
            
            <label className="block text-sm text-gray-400 mb-2">Select Status</label>
            <select 
              className="w-full bg-white/10 border border-white/20 rounded-xl p-3 mb-5 outline-none focus:border-blue-500"
              value={formData.status}
              onChange={(e) => setFormData({...formData, status: e.target.value})}
            >
              <option value="pending" className="bg-slate-800 text-white">Pending</option>
              <option value="selected" className="bg-slate-800 text-white">Selected</option>
              <option value="rejected" className="bg-slate-800 text-white">Rejected</option>
            </select>

            <label className="block text-sm text-gray-400 mb-2">Feedback</label>
            <textarea 
              required
              placeholder="Enter feedback for candidate..."
              className="w-full bg-white/10 border border-white/20 rounded-xl p-3 mb-6 h-32 outline-none focus:border-blue-500 resize-none"
              value={formData.feedback}
              onChange={(e) => setFormData({...formData, feedback: e.target.value})}
            />

            <div className="flex gap-3">
              <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 bg-white/10 hover:bg-white/20 py-3 cursor-pointer rounded-tl-xl rounded-br-xl transition-all">Cancel</button>
              <button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 py-3 cursor-pointer rounded-tl-xl rounded-br-xl font-bold shadow-lg shadow-blue-500/20 transition-all">Submit</button>
            </div>
          </form>
        </div>
      )}
    </main>
  );
};

export default UserApplayJobs;