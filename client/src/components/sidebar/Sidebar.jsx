import { Link, NavLink } from "react-router-dom";
import { GoHomeFill } from "react-icons/go";
import { TbSquareRoundedPlus } from "react-icons/tb";
import { IoSearchOutline } from "react-icons/io5";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSelector } from "react-redux";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  const {user} = useSelector(state=>state.user)
  const routes = [
    {
      path: "/",
      name: "Home",
      icon: <GoHomeFill />,
    },
    {
      path: "/createpost",
      name: "Create",
      icon: <TbSquareRoundedPlus />,
    },
    {
      path: "/search",
      name: "Search",
      icon: <IoSearchOutline />,
    },
    {
      path: "/profile",
      name: "Profile",
      icon: <div className="h-8 w-8 rounded-full" 
      >
        <img src={user?.avatar.url} alt="" className="h-full w-full rounded-full object-cover"/>
      </div>,
    },
   
  ];
  
  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
   
    <div className="w-[18%] hidden md:block  ">
  
        <motion.div
          animate={{
            width: isOpen ? "18%" : "45px",
            height:"100vh",
            transition: {
              duration: 0.5,
              type: "spring",
              damping: 10,
            },
          }}
          className={`sidebar py-2 px-5 fixed border-r border-slate-500 text-white  ${
            isOpen ? "" : "w-20"
          }`}
        >
          <div className="top_section flex items-center justify-between px-4 py-3 ">
            <AnimatePresence>
              {isOpen && (
                <motion.h1
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="logo  font-briem text-2xl"
                >
                 SocialSphere
                </motion.h1>
              )}
            </AnimatePresence>

            {/* <div className="bars cursor-pointer text-xl mt-2">
              <FaBars onClick={toggle} />
            </div> */}
          </div>
          <section className="routes mt-4">
            {routes.map((route, index) => {
              return (
                <NavLink
                  to={route.path}
                  key={index}
                  className="link flex  text-lg items-center text-white gap-4 px-4 py-4 border-r-4 border-transparent transition-colors duration-200 hover:border-[#F2613F] hover:bg-[#3d0c02]"
                  activeClassName="active"
                >
                  <div className="icon text-3xl">{route.icon}</div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text "
                      >
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              );
            })}
          </section>
        </motion.div>
    </div>
    <div className="flex z-50 justify-between items-center md:hidden fixed h-20 bottom-0 left-0 w-full bg-[#3d0c02] border-slate-300 shadow-lg px-10 py-2  border-t">
        {
          routes.map((route,idx)=>(
            <div className="bg-inherit text-4xl  text-white" key={idx} >
              <Link to={route.path} className="bg-inherit">{route.icon}</Link>
            </div>
          ))
        }
    </div>
    </>
  );
};

export default SideBar;
