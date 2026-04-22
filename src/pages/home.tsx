import { Canvas } from "@react-three/fiber"
import Scene from "../components/scene";
import HomeSection1 from "../components/HomeSection1";
import HomeSection2 from "../components/HomeSection2";
import HomeSection3 from "../components/HomeSection3";
const Home = () => {
  return (
    <main className="relative">
<Canvas style={{width:"100vw",height:"100vh",position:"fixed",top:0,left:0,
// background:"#0951B7",
zIndex:"1",
backgroundImage:'url(./bg2.png)',
backgroundSize:"cover",
backgroundPosition:"center"
}} dpr={[1,2]}>
<Scene/>

{/* //Lights */}
<ambientLight color={"#D91099"} intensity={5}/>
<directionalLight color={"#D91099"} intensity={111}/>
</Canvas>
<HomeSection1/>
<HomeSection2/>
<HomeSection3/>
    </main>
  );
};

export default Home;