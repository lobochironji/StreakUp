import { AnimatePresence, motion } from 'framer-motion'
import { FaBars, FaHome,FaUser } from "react-icons/fa";
import { BiCog } from "react-icons/bi";
import { AiTwotoneFileExclamation } from "react-icons/ai";
import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import Habits from '../Pages/Habits';

export default function Sidebar({children, isOpen, setIsOpen}){
    function toggle(){
      setIsOpen(prevBool => !prevBool)
    }
    const motionAnimation = {
      hidden: {
        maxWidth: 0,
        opacity: 0,
        overflow: "hidden",
      },
      show: {
        maxWidth: "200px",
        opacity: 1,
        transition: {
          duration: 0.1,
          ease: "easeInOut",
        },
      },
    };
    
    const routes = [
        {
            path: "/",
            name: "Habits",
            icon: <FaHome/>,
          },
          {
            path: "/dashboard",
            name: "Dashboard",
            icon: <FaUser />,
          },
   
          {
            path: "/pageTwo",
            name: "Page Two",
            icon: <AiTwotoneFileExclamation />,
          },
          {
            path: "/setting",
            name: "Settings",
            icon: <BiCog />,
            exact: true,
          },
        ]
    return(
        <div className="main-container">
            <motion.div
              animate={{width: isOpen ? "200px" : "50px",
              transition:{
              duration: 0.5,
              type: "spring",
              damping: 13,
              },
              }}
              className={`sidebar `}
            >

              <div className="top-section">
                <div className="bars">
                 <FaBars onClick={toggle}/>
                </div>
                <AnimatePresence>
                {isOpen && 
                <motion.div
                variants={motionAnimation} 
                initial="hidden"
                animate="show"
                exit="hidden">
                <h1>Dashboard</h1>
                </motion.div>
                }
                </AnimatePresence>
              </div>
                <section className="routes">
                    {routes.map((route) => (
                        <NavLink className={({ isActive }) => isActive ? 'active link' : 'link'} to={route.path} key={route.name}>
                            <div className="icon">{route.icon}</div>
                            <AnimatePresence> 
                            {isOpen && 
                            <motion.div
                            variants={motionAnimation} 
                            initial="hidden"
                            animate="show"
                            exit="hidden"
                            className="link-text">{route.name}</motion.div>}
                            </AnimatePresence>
                        </NavLink>
                    ))}
                </section>
            </motion.div>
            <main>{children}</main>
        </div>
    )
}