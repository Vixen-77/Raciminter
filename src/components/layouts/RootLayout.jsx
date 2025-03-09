import { Outlet,NavLink } from "react-router-dom";
import React from 'react'

const RootLayout = () => {
  return (
    <>
        <div className="flex justify-evenly gap-3 text-xl text-white">
           <NavLink to={"/"}>
                <div>
                    Home
                </div>
            </NavLink>
            <NavLink to={"/about"}>
                <div>
                    About
                </div>
            </NavLink>
            <NavLink to={"/contact"}>
                <div>
                    Contact
                </div>
            </NavLink> 
            <NavLink to={"/Loading"}>
                <div>
                    Loading
                </div>
            </NavLink> 
      </div> 
      <div>
        <Outlet/>
        </div>   
    </>
  )
}

export default RootLayout
