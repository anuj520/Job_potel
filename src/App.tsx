import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./pages/home"
import Navbar from "./components/navbar"
import User from "./pages/User"
import Jobapplay from "./pages/Jobapplay"
import Register from "./pages/auth/Register"
import Login from "./pages/auth/Login"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

function App() {
const queryClient = new QueryClient()
const router = createBrowserRouter([
  {
   "path":"/",
   element:<Register/>
  },
    {
   "path":"/login",
   element:<Login/>
  },
  {
    path:"/home",
    element:<Navbar/>,
    children:[
      {
        index:true,
        element:<Home/>
      },
      {
        path:"user",
        element: <User/>
      },
      {
        path:"Jobapplay",
        element: <Jobapplay/>
      }
    ]
  }
])  
  return (
    <QueryClientProvider client={queryClient}>
   <RouterProvider router={router}></RouterProvider>
   </QueryClientProvider>
  )
}

export default App
