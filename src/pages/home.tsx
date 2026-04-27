import { Canvas } from "@react-three/fiber"
import Scene from "../components/scene";
import HomeSection1 from "../components/HomeSection1";
import HomeSection2 from "../components/HomeSection2";
import {useEffect} from "react";
import { useAuth } from "../Context/contextAPI";
import { useNavigate } from "react-router-dom";
const Home = () => {
const navigate = useNavigate();
const rfa = useAuth()

const login = localStorage.getItem("isLoggedIn")
useEffect(()=>{
if (login === null) {
     navigate("/home/user")
}
},[login])



  return (
    <main className="relative">
<Canvas style={{width:"100vw",height:"100vh",position:"fixed",top:0,left:0,
// background:"#0951B7",
zIndex:"1",
backgroundImage:`url(${rfa?.roleAU ? "/bg2.png": "/bg.png"})`,
backgroundSize:"cover",
backgroundPosition:"center"
}} dpr={[1,2]}>
<Scene/> 

{/* //Lights */}
<ambientLight color={`${rfa?.colorFont.color}`} intensity={5}/>
<directionalLight color={`${rfa?.colorFont.color}`} intensity={rfa?.roleAU ? 111: 17}/>
</Canvas>
<HomeSection1/>
{
  rfa?.Authoriza &&
<HomeSection2/>
}
    </main>
  );
};

export default Home;