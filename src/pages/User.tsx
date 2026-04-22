import { useState, useEffect } from "react";
import { MdEdit, MdCheck, MdCameraAlt, MdCloudUpload, MdLogout } from "react-icons/md";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import AxiosURL from "../axios/axios";

const User = () => {
  const queryClient = useQueryClient();
  const [editField, setEditField] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // States for Files & Previews
  const [profileImgPreview, setProfileImgPreview] = useState("https://www.pngall.com/wp-content/uploads/15/User-PNG-HD-Image.png");
  const [profileFile, setProfileFile] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);

  // Form Data State
  const [formData, setFormData] = useState({
    graduationClg: "",
    graduationPerc: "",
    school: "",
    interPercent: "",
    postGradClg: "",
    postGradPerc: ""
  });

  // --- FETCH DATA LOGIC ---
  const fetchAllUserData = async () => {
    const token = JSON.parse(localStorage.getItem("token") || "null");
    const headers = { Authorization: `Bearer ${token}` };

    // Fetching from both profile and education endpoints
    const [profileRes, eduRes] = await Promise.all([
      AxiosURL.get("/api/user/profile", { headers }),
      AxiosURL.get("/api/user/education", { headers })
    ]);

    const profileData = profileRes.data?.data?.[0];
    const eduData = eduRes.data?.data?.[0];

    return { ...profileData, ...eduData };
  };

  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: fetchAllUserData,
    onSuccess: (data) => {
      if (data) {
        setFormData({
          graduationClg: data.graduationClg || "",
          graduationPerc: data.graduationPerc || "",
          school: data.intermediateSchool || "",
          interPercent: data.intermediatePerc || "",
          postGradClg: data.postGradClg || "",
          postGradPerc: data.postGradPerc || ""
        });
        if (data.profilePhoto) setProfileImgPreview(data.profilePhoto);
      }
    }
  });

  // --- HANDLERS ---
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileFile(file);
      setProfileImgPreview(URL.createObjectURL(file));
    }
  };

  const handleSaveProfile = async () => {
    setIsSaving(true);
    const token = JSON.parse(localStorage.getItem("token") || "null");
    const headers = { Authorization: `Bearer ${token}` };

    try {
      const requests = [];

      // 1. Files Update (PATCH)
      if (profileFile || resumeFile) {
        const fileData = new FormData();
        if (profileFile) fileData.append("profilePhoto", profileFile);
        if (resumeFile) fileData.append("resume", resumeFile);
        requests.push(AxiosURL.patch("/api/user/profile", fileData, { 
          headers: { ...headers, "Content-Type": "multipart/form-data" } 
        }));
      }

      // 2. Education Update (POST)
      const eduBody = {
        graduationClg: formData.graduationClg,
        graduationPerc: formData.graduationPerc,
        postGradClg: formData.postGradClg,
        postGradPerc: formData.postGradPerc,
        intermediateSchool: formData.school,
        intermediatePerc: formData.interPercent
      };
      requests.push(AxiosURL.post("/api/user/education", eduBody, { headers }));

      await Promise.all(requests);
      alert("Profile & Education synced successfully!");
      queryClient.invalidateQueries(["user"]);
    } catch (err) {
      alert(err.response?.data?.message || "Update failed");
    } finally {
      setIsSaving(false);
      setEditField(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login"; // Ya jo bhi tumhara login route hai
  };

  const InputGroup = ({ label, value, field }) => (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-[10px] text-gray-500 uppercase font-bold tracking-[2px]">{label}</label>
      <div className={`flex items-center border-b-2 transition-all pb-1 ${editField === field ? "border-[#D91099]" : "border-white/10"}`}>
        <input
          type="text"
          value={value}
          disabled={editField !== field}
          onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
          className="bg-transparent w-full outline-none text-sm md:text-base text-white disabled:text-gray-400"
        />
        <button onClick={() => setEditField(editField === field ? null : field)} className="ml-2">
          {editField === field ? <MdCheck className="text-green-500" size={20}/> : <MdEdit className="text-gray-600 hover:text-white" size={18}/>}
        </button>
      </div>
    </div>
  );

  if (isLoading) return <div className="h-screen flex items-center justify-center bg-[#0a0a0a] text-[#D91099] font-black tracking-[10px] animate-pulse">LOADING...</div>;

  return (
    <main className="min-h-screen bg-[#050505] bg-[url('/bg2.png')] bg-cover bg-fixed text-white p-4 md:p-10 flex justify-center items-start">
      <section className="w-full max-w-4xl bg-black/80 backdrop-blur-3xl border border-white/5 rounded-[2rem] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        
        {/* Top Banner */}
        <div className="h-32 md:h-44 bg-gradient-to-r from-[#D91099]/40 via-[#4c10d9]/20 to-transparent relative">
          <button 
            onClick={handleLogout}
            className="absolute top-4 right-4 bg-red-600/20 hover:bg-red-600 p-3 rounded-full transition-all group"
          >
            <MdLogout size={20} className="group-hover:scale-110 transition-transform" />
          </button>
        </div>

        <div className="px-6 md:px-12 pb-12">
          {/* Avatar & Info */}
          <div className="relative flex flex-col md:flex-row items-center md:items-end gap-6 -mt-16 md:-mt-20 mb-10">
            <div className="relative group">
              <div className="h-32 w-32 md:h-40 md:w-40 rounded-3xl overflow-hidden border-[6px] border-[#050505] bg-gray-900 shadow-2xl rotate-3 group-hover:rotate-0 transition-transform duration-500">
                <img src={profileImgPreview} alt="User" className="h-full w-full object-cover" />
              </div>
              <label htmlFor="user-img" className="absolute inset-0 bg-[#D91099]/40 flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-all rounded-3xl">
                <MdCameraAlt size={40} />
                <input type="file" id="user-img" hidden onChange={handleImageChange} accept="image/*" />
              </label>
            </div>
            
            <div className="text-center md:text-left pb-2">
              <h1 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter leading-none">
                {user?.firstName} <span className="text-[#D91099]">{user?.lastName}</span>
              </h1>
              <p className="text-gray-500 font-mono text-sm mt-2">{user?.email}</p>
            </div>
          </div>

          {/* Form Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            <InputGroup label="Engineering College" value={formData.graduationClg} field="graduationClg" />
            <InputGroup label="Graduation Percentage" value={formData.graduationPerc} field="graduationPerc" />
            <InputGroup label="Intermediate School" value={formData.school} field="school" />
            <InputGroup label="Intermediate Percentage" value={formData.interPercent} field="interPercent" />
            <InputGroup label="Post Graduation" value={formData.postGradClg} field="postGradClg" />
            <InputGroup label="PG Percentage" value={formData.postGradPerc} field="postGradPerc" />
          </div>

          {/* Resume Slot */}
          <div className="mt-12 bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center justify-between hover:bg-white/10 transition-colors">
            <div className="flex items-center gap-4">
              <div className="bg-[#D91099]/20 p-3 rounded-xl text-[#D91099]">
                <MdCloudUpload size={24} />
              </div>
              <div>
                <h4 className="text-sm font-bold uppercase tracking-widest">Resume Attachment</h4>
                <p className="text-xs text-gray-500">{resumeFile ? resumeFile.name : (user?.resumeLink ? "CV_Final_Updated.pdf" : "No file found")}</p>
              </div>
            </div>
            <label className="bg-white text-black text-xs font-black px-4 py-2 rounded-lg cursor-pointer hover:bg-[#D91099] hover:text-white transition-all">
              UPLOAD
              <input type="file" hidden onChange={(e) => setResumeFile(e.target.files[0])} accept=".pdf" />
            </label>
          </div>

          {/* Footer Actions */}
          <div className="flex flex-col md:flex-row gap-4 mt-12">
            <button 
              onClick={handleSaveProfile}
              disabled={isSaving}
              className="flex-[2] bg-[#D91099] hover:bg-white hover:text-black text-white py-5 rounded-2xl font-black uppercase tracking-[4px] transition-all transform active:scale-95 disabled:opacity-50"
            >
              {isSaving ? "Syncing Data..." : "Update Profile"}
            </button>
            <button className="flex-1 bg-white/5 border border-white/20 py-5 rounded-2xl font-bold uppercase tracking-widest hover:bg-white/10 transition-all">
              History
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default User;