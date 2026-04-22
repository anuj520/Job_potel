import {createContext, useContext, useEffect, useState } from "react";
import { log } from "three/src/nodes/math/MathNode.js";

export const AuthContext = createContext(null);

export const AuthProvider = ({children}) =>{
const[apply,setAppliedJobs] = useState<any[]>([])

const handleApplay = (job: any) => {
const oldData = JSON.parse(localStorage.getItem("apply") || "[]")  

const isExits = oldData.find((curr) => curr.companyName ===job.companyName)


  setAppliedJobs((prev) => {
    const exists = prev.find(
      (item) => item.companyName === job.companyName 
    );

    if (exists || isExits) {
      console.log("Already applied ");
      return prev;
    }

    return [...prev, job];
  });
};

useEffect(()=>{
console.log(apply);
    
if (apply?.length !== 0) {
const oldData = JSON.parse(localStorage.getItem("apply") || "[]")
const updated = [...oldData,...apply]
localStorage.setItem("apply",JSON.stringify(updated))    
}    
},[apply])

return(
<AuthContext.Provider value={{handleApplay}}>{children}</AuthContext.Provider>    
)    
}

export const useAuth = () =>{
 const AuthContextValue = useContext(AuthContext);
 return AuthContextValue   
}
