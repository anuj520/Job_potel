import { useState } from "react";
import AxiosURL from "../../axios/axios";
import { FiBriefcase, FiLayers } from "react-icons/fi"; // Icons for better UI
import { toast } from "react-toastify";

const AdminPost = () => {
  const [post, setpost] = useState({
    jobTitle: "",
    jobDesc: "",
    experience: "",
    jobType: "",
    jobRole: "",
    location: "",
    salary: ""
  });

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setpost((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };

    try {
      const response = await AxiosURL.post(import.meta.env.VITE_Recruiter_Jobs_Create_URL, post, { headers });
      toast.success("Job Posted Successfully!");
      
      setpost({
        jobTitle: "", jobDesc: "", experience: "",
        jobType: "", jobRole: "", location: "", salary: ""
      });
    } catch (error:any) {
      toast.error("Post Error:", error.response?.data || error.message);
      toast.error("Failed to post job.");
    }
  };

  return (
    <main className="min-h-screen  bg-[url('/bg.png')] bg-cover bg-center flex items-center justify-center p-4 md:p-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl bg-white/5 backdrop-blur-xl p-6 md:p-12 rounded-[2rem] border border-white/10 shadow-2xl"
      >
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-black text-white tracking-tight">
            Post a <span className="text-blue-500">New Job</span>
          </h2>
          <p className="text-gray-400 mt-2">Fill in the details to find your next best hire</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Job Title */}
          <div className="md:col-span-2">
            <label className="text-gray-300 text-sm font-medium mb-2 flex items-center gap-2">
              <FiBriefcase className="text-blue-500" /> Job Title
            </label>
            <input
              type="text"
              name="jobTitle"
              required
              value={post.jobTitle}
              placeholder="e.g. Senior Solution Architect"
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            />
          </div>

          {/* Job Role Dropdown */}
          <div>
            <label className="text-gray-300 text-sm font-medium mb-2 flex items-center gap-2">
              <FiLayers className="text-blue-500" /> Job Role
            </label>
            <select
              name="jobRole"
              required
              value={post.jobRole}
              onChange={handleChange}
              className="w-full border border-white/10 rounded-xl px-4 py-3.5 text-white/60 outline-none focus:border-blue-500 transition-all appearance-none cursor-pointer"
            >
              <option value="">Select Role</option>
              <option value="softwere_engineer" className="text-[#1e293b]">Software Engineer</option>
              <option value="fullstack_developer" className="text-[#1e293b]">Fullstack Developer</option>
              <option value="backend_developer" className="text-[#1e293b]">Backend Developer</option>
              <option value="frontend_developer" className="text-[#1e293b]">Frontend Developer</option>
              <option value="dotnet_developer" className="text-[#1e293b]">.NET Developer</option>
            </select>
          </div>

          {/* Job Type Dropdown */}
          <div>
            <label className="text-gray-300 text-sm font-medium mb-2 flex items-center gap-2">
              <FiBriefcase className="text-blue-500" /> Job Type
            </label>
            <select
              name="jobType"
              required
              value={post.jobType}
              onChange={handleChange}
              className="w-full border border-white/10 rounded-xl px-4 py-3.5 text-white/60 outline-none focus:border-blue-500 transition-all appearance-none cursor-pointer"
            >
              <option value="">Select Type</option>
              <option value="fulltime" className="text-[#1e293b]">Full-Time</option>
              <option value="parttime" className="text-[#1e293b]">Part-Time</option>
              <option value="remote" className="text-[#1e293b]">Remote</option>
              <option value="hybrid" className="text-[#1e293b]">Hybrid</option>
              <option value="internship" className="text-[#1e293b]">Internship</option>
              <option value="contract" className="text-[#1e293b]">Contract</option>
            </select>
          </div>

          {/* Experience */}
          <div>
            <label className="text-gray-300 text-sm font-medium mb-2 block">Experience</label>
            <input
              type="text"
              name="experience"
              value={post.experience}
              placeholder="e.g. 2-3 Years"
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white outline-none focus:border-blue-500 transition-all"
            />
          </div>

          {/* Salary */}
          <div>
            <label className="text-gray-300 text-sm font-medium mb-2 block">Salary Range</label>
            <input
              type="text"
              name="salary"
              value={post.salary}
              placeholder="e.g. 10LPA - 15LPA"
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white outline-none focus:border-blue-500 transition-all"
            />
          </div>

          {/* Location */}
          <div className="md:col-span-2">
            <label className="text-gray-300 text-sm font-medium mb-2 block">Location</label>
            <input
              type="text"
              name="location"
              value={post.location}
              placeholder="e.g. Noida, India"
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white outline-none focus:border-blue-500 transition-all"
            />
          </div>

          {/* Job Description */}
          <div className="md:col-span-2">
            <label className="text-gray-300 text-sm font-medium mb-2 block">Job Description</label>
            <textarea
              name="jobDesc"
              required
              value={post.jobDesc}
              placeholder="Describe the responsibilities and requirements..."
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white outline-none focus:border-blue-500 transition-all h-40 resize-none"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-10 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold py-4 rounded-tl-2xl rounded-br-2xl  cursor-pointer shadow-xl shadow-blue-500/20 transition-all transform active:scale-[0.98]"
        >
          Publish Job Listing
        </button>
      </form>
    </main>
  );
};

export default AdminPost;