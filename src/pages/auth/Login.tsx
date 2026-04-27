import { useEffect, useState } from "react"
import AxiosURL from "../../axios/axios";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
const navigate = useNavigate()  
const[user,setuser] = useState({
email: "",
password: "",  
role:""
})

const handleSubmit = async(e:any) =>{
e.preventDefault();

 try {
   let res;
  if (user.role === "user") {
     res = await AxiosURL.post(import.meta.env.VITE_LOGIN_URL, user); 
  }else{
 res = await AxiosURL.post(import.meta.env.VITE_LOGIN_Recruiter_URL, user); 
  }

    if (res.data?.success) {
      const userData = res.data.data.token;
      const role = res.data.data.role
      if (userData) {
        localStorage.setItem("token", userData);
        localStorage.setItem("role", role);
        localStorage.setItem("isLoggedIn", "true");
      }
    navigate("/home")
    window.location.reload()
    }


  } catch (error: any) {
   if (error.response) {
        const { status, data } = error.response;
  
        if (status === 401) {
          toast.error("Validation Errors:", data.errors);
          toast.error("password not match")
        }
        else if (status === 409) {
          toast.error("User already exists:", data.message);
        }
        else if(status === 400) {
          toast.error( "Invalid credentials");
        }
      } else {
        toast.error("Network Error:", error.message);
      }
  }
}
const token = localStorage.getItem("token")
const role = localStorage.getItem("role")
useEffect(()=>{
if (token !== null && role === "user") {
  navigate("/home")
}else if (token !== null && role === "admin") {
navigate("/admin")
}else{
navigate("/login")
}},[token,role])

  return (
       <main className="min-h-screen bg-black flex items-center justify-center p-4 text-white">

      {/* Glass Card */}
      <section className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 
                          rounded-2xl p-6 sm:p-8 shadow-xl">

        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">
          Login Account
        </h1>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>

          {/* Email */}
          <input
            type="email"
            value={user.email}
            onChange={(e)=>setuser((prev)=>({...prev,email:e.target.value}))}
            required
            placeholder="Email Address"
            className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 
                       focus:outline-none focus:border-cyan-400 placeholder-gray-300"
          />

          {/* Password */}
          <input
            type="password"
            value={user.password}
            onChange={(e)=>setuser((prev)=>({...prev,password:e.target.value}))}
            required
            placeholder="Password"
            className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 
           focus:outline-none focus:border-cyan-400 placeholder-gray-300"
          />
          
          
          <select
                name="role"
            value={user.role}
            required
            className="px-4 py-2 rounded-lg bg-[#1e1d28]  border border-white/20 
           focus:outline-none focus:border-cyan-400 text-gray-300"
          onChange={(e)=>setuser((prev)=>({...prev,role:e.target.value}))}
          >
            <option value="">Select Role</option>
            <option value="user">User</option>
            <option value="admin">admin</option>
          </select>

          {/* Button */}
          <button
            type="submit"
            className="mt-2 py-2 rounded-tl-xl rounded-br-xl bg-cyan-500 hover:bg-cyan-600 
                       transition font-semibold text-black"
          >
            Register
          </button>

        </form>

        {/* Footer */}
        <p className="text-sm text-gray-300 text-center mt-4">
          Create your account?{" "}
       <NavLink to={'/'}> <span className="text-cyan-400 cursor-pointer">Sign up</span> </NavLink>
        </p>

      </section>

    </main>
  )
}

export default Login
