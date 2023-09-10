import React from 'react';
import { NavLink } from "react-router-dom";

function Navbar() {
    const activeLink = " bg-blue-100 text-black";
    const normalLink = "";
    return (

        <div className="w-full h-16 bg-black text-white text-xl uppercase font-bold grid grid-cols-4 overflow-hidden">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? activeLink : normalLink)}
          >
            <p className="border w-full h-full px-4 centered">Home</p>
          </NavLink>
          <NavLink
            to="/theory1"
            className={({ isActive }) => (isActive ? activeLink : normalLink)}
          >
            <p className="border w-full h-full px-4 centered">theory</p>
          </NavLink>
          <NavLink
            to="/graph1"
            className={({ isActive }) => (isActive ? activeLink : normalLink)}
          >
            <p className="border w-full h-full px-4 centered">graph</p>
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) => (isActive ? activeLink : normalLink)}
          >
            <p className="border w-full h-full px-4 centered">contact</p>
          </NavLink>
        </div>


    );
}

export default Navbar;