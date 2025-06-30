import { useState } from "react";
import Button from "../ui/Button";
import SideMenu from "./SideMenu";

function Nav() {
  const [isMenuShown, setIsMenuShown] = useState(false);

  const showMenuHandler = () => {
    setIsMenuShown((prev) => !prev);
  };
  return (
    <>
      <nav className="flex justify-between items-center p-1.5 bg-white">
        <div className="nav-right">
          <Button classes='hidden lg:block' to='/'>
            <img
              src="./public/images/logo.jpg"
              className="w-[100px] h-[80px]"
              alt="singo learn"
            />
          </Button>

          <Button
            onclick={showMenuHandler}
            classes="p-1.5 rounded-full cursor-pointer lg:hidden hover:bg-[#efefef] transition duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="gray"
              viewBox="0 0 24 24"
              width="35"
              height="35"
            >
              <path d="M3.75 5.25a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5H3.75Zm0 6a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5H3.75Zm0 6a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5H3.75Z"></path>
            </svg>
          </Button>
        </div>

        <div className="nav-center hidden lg:block">
          <ul className="flex justify-between">
            <li className="mx-5">
              <Button
                isActiveAware={true}
                classes={(isActive) =>
                  `hover:text-[var(--dark-purple)] ${
                    isActive && "text-[var(--dark-purple)]"
                  }`
                }
                to="/"
              >
                صفحه اصلی
              </Button>
            </li>

            <li className="mx-5">
              <Button
                isActiveAware={true}
                classes={(isActive) =>
                  `hover:text-[var(--dark-purple)] ${
                    isActive && "text-[var(--dark-purple)]"
                  }`
                }
                to="/courses"
              >
                دوره ها
              </Button>
            </li>

            <li className="mx-5">
              <Button
                isActiveAware={true}
                classes={(isActive) =>
                  `hover:text-[var(--dark-purple)] ${
                    isActive && "text-[var(--dark-purple)]"
                  }`
                }
                to="/students-comments"
              >
                نظرات دانشجویان
              </Button>
            </li>

            <li className="mx-5">
              <Button
                isActiveAware={true}
                classes={(isActive) =>
                  `hover:text-[var(--dark-purple)] ${
                    isActive && "text-[var(--dark-purple)]"
                  }`
                }
                to="/about-us"
              >
                درباره ما
              </Button>
            </li>
          </ul>
        </div>
        <div className="nav-left flex items-center">
          {/* condition for authorization and std render button */}

          <Button
            to="/cart"
            classes="cart-btn bg-[var(--light-purple)] p-2 rounded-xl"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22px"
              fill="#7C3AED"
              viewBox="0 0 24.661 24.019"
            >
              <g transform="translate(0.5 -5.528)">
                <g transform="translate(0 6.028)">
                  <g transform="translate(0 0)">
                    <path
                      d="M99.122,350.322a2.469,2.469,0,1,0,2.469,2.469A2.469,2.469,0,0,0,99.122,350.322Zm0,3.841a1.372,1.372,0,1,1,1.372-1.372A1.372,1.372,0,0,1,99.122,354.163Z"
                      transform="translate(-91.577 -332.242)"
                      fill="#7C3AED"
                      stroke="#7C3AED"
                      strokeWidth="1"
                    ></path>
                    <path
                      d="M297.653,350.322a2.469,2.469,0,1,0,2.469,2.469A2.469,2.469,0,0,0,297.653,350.322Zm0,3.841a1.372,1.372,0,1,1,1.372-1.372A1.372,1.372,0,0,1,297.653,354.163Z"
                      transform="translate(-279.683 -332.242)"
                      fill="#7C3AED"
                      stroke="#7C3AED"
                      strokeWidth="1"
                    ></path>
                    <path
                      d="M23.54,9.7a.686.686,0,0,0-.439-.22L5.24,9.238,4.746,7.729a2.524,2.524,0,0,0-2.36-1.7H.549a.549.549,0,1,0,0,1.1H2.387a1.427,1.427,0,0,1,1.317.96L7.188,18.594l-.274.631a2.634,2.634,0,0,0,.247,2.387,2.552,2.552,0,0,0,2.058,1.152H19.891a.549.549,0,1,0,0-1.1H9.219a1.4,1.4,0,0,1-1.152-.658,1.509,1.509,0,0,1-.137-1.317l.22-.494L19.7,17.99a3.018,3.018,0,0,0,2.606-2.3l1.317-5.515A.466.466,0,0,0,23.54,9.7Zm-2.3,5.734a1.866,1.866,0,0,1-1.674,1.454L8.149,18.072,5.6,10.335l16.818.247Z"
                      transform="translate(0 -6.028)"
                      fill="#7C3AED"
                      stroke="#7C3AED"
                      strokeWidth="1"
                    ></path>
                  </g>
                </g>
              </g>
            </svg>
          </Button>

          <Button
            to="/login"
            classes="login-btn bg-[var(--light-purple)] text-[var(--dark-purple)] py-2 px-4 rounded-xl flex py-0.5 px-1 mr-5"
          >
            <svg
              className="ml-1"
              xmlns="http://www.w3.org/2000/svg"
              width="16px"
              fill="#7C3AED"
              viewBox="0 0 17.14 21.425"
            >
              <g
                id="_000000ff"
                data-name="#000000ff"
                transform="translate(-85.345 -42.66)"
              >
                <path
                  id="Path_170"
                  data-name="Path 170"
                  d="M130.627,42.712a3.487,3.487,0,0,1,.626-.052h8.489a3.209,3.209,0,0,1,3.214,2.778,5.762,5.762,0,0,1,.031.806V60.2a5.76,5.76,0,0,1-.1,1.443,3.231,3.231,0,0,1-2.3,2.332,5.637,5.637,0,0,1-1.5.106H131.2a3.22,3.22,0,0,1-3.212-3.179c0-1.071,0-2.142,0-3.213a1.071,1.071,0,1,1,2.141-.053c0,1.089,0,2.177,0,3.266a1.075,1.075,0,0,0,1.067,1.036q4.3,0,8.59,0a1.076,1.076,0,0,0,1.053-1.085q0-7.332,0-14.665a1.873,1.873,0,0,0-.07-.7,1.073,1.073,0,0,0-.984-.69q-4.294,0-8.588,0a1.074,1.074,0,0,0-1.068,1.04c0,.986,0,1.972,0,2.958a1.516,1.516,0,0,1-.118.773,1.07,1.07,0,0,1-2.023-.472q0-1.631,0-3.264a3.221,3.221,0,0,1,2.636-3.127Z"
                  transform="translate(-40.503 0)"
                  fill="#7C3AED"
                ></path>
                <path
                  id="Path_171"
                  data-name="Path 171"
                  d="M93.612,170.98a1.072,1.072,0,0,1,1.057.253c1.042,1.033,2.071,2.08,3.118,3.108a1.107,1.107,0,0,1,.4,1.068,1.254,1.254,0,0,1-.475.731c-1.025,1.017-2.041,2.044-3.066,3.06a1.07,1.07,0,0,1-1.708-1.214,1.6,1.6,0,0,1,.4-.5c.407-.4.807-.814,1.218-1.213q-4.06.006-8.119,0a1.071,1.071,0,0,1-.362-2.085,1.634,1.634,0,0,1,.563-.058c2.639,0,5.279,0,7.918,0-.461-.448-.91-.908-1.367-1.361a1.071,1.071,0,0,1,.429-1.794Z"
                  transform="translate(0 -121.831)"
                  fill="#7C3AED"
                ></path>
              </g>
            </svg>
            ورود
          </Button>
        </div>
      </nav>
       <SideMenu menuShowHandler={setIsMenuShown} isMenuShown={isMenuShown} />
    </>
  );
}

export default Nav;
