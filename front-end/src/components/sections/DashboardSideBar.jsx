import Button from "../ui/Button";
import { memo, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router";

function DashboardSideBar({ fullname, phonenumber, links }) {
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem("userInfos");
    navigate('/login')
  };

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
    if (!isMobileMenuOpen){
      document.body.style.overflow = 'hidden'
    }
    else {
      document.body.style.overflow = 'auto'
    }
  };

  useEffect(() => {
    const checkScreenSize = () => {
      const mobileScreen = 820;
      setIsMobileView(window.innerWidth <= mobileScreen);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const menuVariants = {
    hidden: { scale : 0 },
    visible: { 
      scale : 1,
        transition: { 
        duration: 0.5,
        ease: "easeInOut"
      }
    },
    exit: { 
      scale: 0, 
      transition: { 
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="flex relative flex-col p-2 lg:py-1 lg:px-5 rounded-md lg:shadow-[var(--cart-shadow)]">
      <div className="user-infos hidden lg:flex flex-col items-center py-4 border-b border-b-gray-300">
        <div className="profile w-[100px] h-[100px] flex justify-center items-center text-4xl rounded-full bg-[#bdbdbd] text-white">
          {fullname?.slice(0, 1)}
        </div>
        <div className="fullname text-lg text-center mt-4">
          <p>{fullname}</p>
        </div>
        <div className="phonenumber text-center mt-1">
          <p className="text-[#00000099]">{phonenumber}</p>
        </div>
      </div>

      {isMobileView && (
        <Button 
          onclick={toggleMobileMenu} 
          classes="border py-1.5 w-[147px] md:w-[167px] px-2 border-[#d7d7d7] text-sm text-[#00000099] rounded-md flex items-center"
        >
          <img 
            className="w-[18px] ml-1 h-[18px]" 
            src="../../../public/svg/three-dots-vertical.svg" 
            alt="منو" 
          />
          منوی حساب کاربری
        </Button>
      )}

      {isMobileView ? (
        <AnimatePresence>
          {(isMobileMenuOpen || !isMobileView) && (
            <motion.div
              className="flex absolute top-full bg-white flex-col lg:w-auto w-50 lg:mt-3 mt-3 py-2 px-2 shadow-[var(--cart-shadow)] lg:shadow-none"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={menuVariants}
            >
              {links.map((link) => (
                <Button
                  classes={(isActive) =>
                    `hover:text-[var(--dark-purple)] text-sm flex items-center transition duration-200 py-1 lg:!p-0 my-2.5 lg:my-2.5 ${
                      isActive && "text-[var(--dark-purple)]"
                    }`
                  }
                  key={link.id}
                  to={link.to}
                  isActiveAware={true}
                >
                  <img
                    src={link.icon}
                    className="w-[24px] -mt-[3px] h-[24px] ml-2"
                    alt=""
                  />
                  {link.text}
                </Button>
              ))}
              <Button
                onclick={logOut}
                classes="flex text-sm py-1 lg:!p-0 !px-0 items-center mt-2.5 text-red-600"
              >
                <img className="ml-2" src="../../../public/svg/logout.svg" alt="" />
                خروج
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      ) : (
        <div className="flex flex-col lg:w-auto w-full lg:mt-3 mt-3 p-2 shadow-[var(--cart-shadow)] lg:shadow-none">
          {links.map((link) => (
            <Button
              classes={(isActive) =>
                `hover:text-[var(--dark-purple)] text-sm flex items-center transition duration-200 py-1 lg:!p-0 my-2.5 lg:my-2.5 ${
                  isActive && "text-[var(--dark-purple)]"
                }`
              }
              key={link.id}
              to={link.to}
              isActiveAware={true}
            >
              <img
                src={link.icon}
                className="w-[24px] -mt-[3px] h-[24px] ml-2"
                alt=""
              />
              {link.text}
            </Button>
          ))}
          <Button
            onclick={logOut}
            classes="flex text-sm py-1 lg:!p-0 !px-0 items-center my-2.5 text-red-600"
          >
            <img className="ml-2" src="../../../public/svg/logout.svg" alt="" />
            خروج
          </Button>
        </div>
      )}
    </div>
  );
}

export default memo(DashboardSideBar);