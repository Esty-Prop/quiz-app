import { Outlet } from "react-router-dom"
import Navbar from "../../navber/Navbar"
import Sidebar from "../../sidebar/Sidebar"
import Footer from "../../footer/Footer"
import "./dash-layout.css"

const DashLayout = () => {
  return (
   <div className="container">
        
            <Sidebar />
       
        <div className="content">
            <Navbar />
            <div className="main-content"><Outlet/></div>
            {/* <Footer /> */}
        </div>
    </div>
  )
}

export default DashLayout