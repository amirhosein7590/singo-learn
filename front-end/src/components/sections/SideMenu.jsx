import Button from "../ui/Button";
function SideMenu({ menuShowHandler , isMenuShown }) {
  const closeMenu = () => {
    menuShowHandler((prev) => !prev);
  };

  return (
    <>
      <div className={`overlay transition duration-300 w-[100vw] h-[100vh] bg-[rgba(0,0,0,0.5)] fixed inset-0 z-1000 ${isMenuShown ? 'block' : 'hidden'}`}>
        <div className={`side-menu transition duration-300 absolute top-0 h-full w-8/12 md:w-4/12 bg-white z-1000 flex flex-col ${isMenuShown ? 'right-0' : 'right-[-1000px]'}`}>
          <div className="row flex flex-row-reverse my-1">
            <Button
              classes="p-1.5 rounded-full cursor-pointer hover:bg-[#efefef] transition duration-300"
              onclick={closeMenu}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#6e6d6d"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path d="M5.72 5.72a.75.75 0 0 1 1.06 0L12 10.94l5.22-5.22a.749.749 0 0 1 1.275.326.749.749 0 0 1-.215.734L13.06 12l5.22 5.22a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215L12 13.06l-5.22 5.22a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042L10.94 12 5.72 6.78a.75.75 0 0 1 0-1.06Z"></path>
              </svg>
            </Button>
          </div>
          <div className="gutter w-full border-b border-b-[#d6d2d2]"></div>
          <div className="row px-2">
            <ul className="flex flex-col">
              <li className="my-2 flex items-center">
                <svg
                  className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv"
                  width={24}
                  height={24}
                  focusable="false"
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  data-testid="HomeRoundedIcon"
                >
                  <path d="M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1z"></path>
                </svg>
                
                <Button
                  to="/"
                  classes={(isActive) =>
                    `hover:text-[var(--dark-purple)] mr-1.5 ${
                      isActive && "text-[var(--dark-purple)]"
                    }`
                  }
                  isActiveAware={true}
                >
                  صفحه اصلی
                </Button>
              </li>

              <li className="my-2 flex items-center">
                <svg
                  className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv"
                  focusable="false"
                  aria-hidden="true"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  data-testid="SchoolRoundedIcon"
                >
                  <path d="M5 13.18v2.81c0 .73.4 1.41 1.04 1.76l5 2.73c.6.33 1.32.33 1.92 0l5-2.73c.64-.35 1.04-1.03 1.04-1.76v-2.81l-6.04 3.3c-.6.33-1.32.33-1.92 0L5 13.18zm6.04-9.66-8.43 4.6c-.69.38-.69 1.38 0 1.76l8.43 4.6c.6.33 1.32.33 1.92 0L21 10.09V16c0 .55.45 1 1 1s1-.45 1-1V9.59c0-.37-.2-.7-.52-.88l-9.52-5.19a2.04 2.04 0 0 0-1.92 0z"></path>
                </svg>
                <Button
                  to="/courses"
                  classes={(isActive) =>
                    `hover:text-[var(--dark-purple)] mr-1.5 ${
                      isActive && "text-[var(--dark-purple)]"
                    }`
                  }
                  isActiveAware={true}
                >
                  دوره ها
                </Button>
              </li>

              <li className="my-2 flex items-center">
                <svg
                  className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv"
                  width={24}
                  height={24}
                  focusable="false"
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  data-testid="ForumRoundedIcon"
                >
                  <path d="M20 6h-1v8c0 .55-.45 1-1 1H6v1c0 1.1.9 2 2 2h10l4 4V8c0-1.1-.9-2-2-2zm-3 5V4c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v13l4-4h9c1.1 0 2-.9 2-2z"></path>
                </svg>
                <Button
                  to="/students-comments"
                  classes={(isActive) =>
                    `hover:text-[var(--dark-purple)] mr-1.5 ${
                      isActive && "text-[var(--dark-purple)]"
                    }`
                  }
                  isActiveAware={true}
                >
                  نظرات دانشجویان
                </Button>
              </li>

              <li className="my-2 flex items-center">
                <svg
                  className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv"
                  width={24}
                  height={24}
                  focusable="false"
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  data-testid="AccountCircleRoundedIcon"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"></path>
                </svg>
                <Button
                  to="/about-us"
                  classes={(isActive) =>
                    `hover:text-[var(--dark-purple)] mr-1.5 ${
                      isActive && "text-[var(--dark-purple)]"
                    }`
                  }
                  isActiveAware={true}
                >
                  درباره ما
                </Button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default SideMenu;
