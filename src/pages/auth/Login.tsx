import { useState } from "react"
import AxiosURL from "../../axios/axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
const navigate = useNavigate()  
const[user,setuser] = useState({
email: "",
password: ""  
})

const handleSubmit = async(e:any) =>{
e.preventDefault();

 try {
    const res = await AxiosURL.post("/api/user/login", user);
    if (res.data?.success) {
      const userData = res.data.data?.[0];
      if (userData?.token) {
        localStorage.setItem("token", userData.token);
      }
      console.log("User Created:", userData);

      // optional: redirect / reset form
      navigate("/home")
    }

  } catch (error: any) {
    if (error.response) {
      const { status, data } = error.response;

      if (status === 400) {
        console.log("Validation Errors:", data.details);
      }
      else if (status === 404) {
        console.log("User not found with this email:", data.message);
      }else if (status === 401) {
        console.log("Invalid password", data.message); 
      }
      else {
        console.log("Server Error:", data.message);
      }
    } else {
      console.log("Network Error:", error.message);
    }
  }

}

  return (
       <main className="min-h-screen bg-[url('/bg2.png')] bg-cover bg-center flex items-center justify-center p-4">

      {/* Glass Card */}
      <section className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 
                          rounded-2xl p-6 sm:p-8 shadow-xl">

        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">
          Create Account
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

          {/* Button */}
          <button
            type="submit"
            className="mt-2 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-600 
                       transition font-semibold"
          >
            Register
          </button>

        </form>

        {/* Footer */}
        <p className="text-sm text-gray-300 text-center mt-4">
          Already have an account?{" "}
          <span className="text-cyan-400 cursor-pointer">Login</span>
        </p>

      </section>

    </main>
  )
}

export default Login
