import Button from "../ui/Button";
import { memo, useEffect, useState, lazy } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router";
const Alert = lazy(() => import("./Alert"));
import { alertSetter, showAlertHandler } from "../../utils/AlertController";
import { useQueryClient } from "@tanstack/react-query";
const Spinner = lazy(() => import("../sections/Spinner"));

function DashboardSideBar({ fullname, phonenumber, links }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const logOut = () => {
    localStorage.removeItem("userInfos");
    queryClient.invalidateQueries({ queryKey: ["purchase"] });
    navigate("/login");
  };

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);

  const [showAlert, setShowAlert] = useState(false);

  const onAlertConfirm = () => {
    logOut();
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
    if (!isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  };

  useEffect(() => {
    alertSetter(setShowAlert);
    const checkScreenSize = () => {
      const mobileScreen = 820;
      setIsMobileView(window.innerWidth <= mobileScreen);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const menuVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
    exit: {
      scale: 0,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  };

  return (
    <>
      <div className="flex relative flex-col p-2 lg:py-1 lg:px-5 rounded-md lg:shadow-[var(--cart-shadow)]">
        <div className="user-infos hidden lg:flex flex-col items-center py-4 border-b border-b-gray-300">
          <div className="profile w-[100px] h-[100px] flex justify-center items-center text-4xl rounded-full bg-[#bdbdbd] text-white">
            {fullname ? fullname.slice(0, 1) : <Spinner size="sm" />}
          </div>
          <div className="fullname text-lg text-center mt-4">
            <p>
              {fullname ? (
                fullname
              ) : (
                <div role="status" class="max-w-sm animate-pulse">
                  <div class="h-2.5 bg-gray-200 rounded-full w-48 mb-4"></div>
                </div>
              )}
            </p>
          </div>
          <div className="phonenumber text-center mt-1">
            <p className="text-[#00000099]">
              {phonenumber ? (
                phonenumber
              ) : (
                <div role="status" class="max-w-sm animate-pulse">
                  <div class="h-2.5 bg-gray-200 rounded-full w-48 mb-4"></div>
                </div>
              )}
            </p>
          </div>
        </div>

        {isMobileView && (
          <Button
            onclick={toggleMobileMenu}
            classes="border py-1.5 w-[147px] md:w-[167px] px-2 border-[#d7d7d7] text-sm text-[#00000099] rounded-md flex items-center"
          >
            <img
              className="w-[18px] ml-1 h-[18px]"
              src="/svg/three-dots-vertical.svg"
              alt="منو"
            />
            منوی حساب کاربری
          </Button>
        )}

        {isMobileView ? (
          <AnimatePresence>
            {(isMobileMenuOpen || !isMobileView) && (
              <motion.div
                className="flex absolute top-full bg-white z-1 flex-col lg:w-auto w-50 lg:mt-3 mt-3 py-2 px-2 shadow-[var(--cart-shadow)] lg:shadow-none"
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
                  onclick={() =>
                    showAlertHandler({
                      title: "آیا میخواهید خارج شوید",
                      icon: "warning",
                      onConfirm: onAlertConfirm,
                      cancelText: "انصراف",
                      confirmText: "خروج",
                    })
                  }
                  classes="flex text-sm py-1 lg:!p-0 !px-0 items-center mt-2.5 text-red-600"
                >
                  <img
                    className="ml-2"
                    src="/svg/logout.svg"
                    alt=""
                  />
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
              onclick={() =>
                showAlertHandler({
                  title: "آیا میخواهید خارج شوید",
                  icon: "warning",
                  onConfirm: onAlertConfirm,
                  cancelText: "انصراف",
                  confirmText: "خروج",
                })
              }
              classes="flex text-sm py-1 lg:!p-0 !px-0 items-center my-2.5 text-red-600"
            >
              <img
                className="ml-2"
                src="/svg/logout.svg"
                alt=""
              />
              خروج
            </Button>
          </div>
        )}
      </div>

      {showAlert?.visible && <Alert {...showAlert} />}
    </>
  );
}

export default memo(DashboardSideBar);
