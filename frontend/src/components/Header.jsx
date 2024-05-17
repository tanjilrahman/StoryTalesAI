import { Link, useLocation } from "react-router-dom";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import { navigation } from "../constants";
import Button from "./Button";
import MenuSvg from "../assets/svg/MenuSvg";
import { HamburgerMenu } from "./design/Header";
import { useEffect, useState } from "react";
import { heroImage } from "../assets";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Header = () => {
  const pathname = useLocation();
  const [openNavigation, setOpenNavigation] = useState(false);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    setUsername(localStorage.getItem("username"));
  }, []);

  const toggleNavigation = () => {
    if (openNavigation) {
      setOpenNavigation(false);
      enablePageScroll();
    } else {
      setOpenNavigation(true);
      disablePageScroll();
    }
  };

  const handleClick = () => {
    if (!openNavigation) return;

    enablePageScroll();
    setOpenNavigation(false);
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50  border-b border-n-6 lg:bg-n-8/90 lg:backdrop-blur-sm ${
        openNavigation ? "bg-n-8" : "bg-n-8/90 backdrop-blur-sm"
      }`}
    >
      <div className="flex items-center px-5 lg:px-7.5 xl:px-10 max-lg:py-4">
        <Link className="block text-xl font-bold w- xl:mr-8" to="/">
          Golpo.ai
        </Link>

        <nav
          className={`${
            openNavigation ? "flex" : "hidden"
          } fixed top-[5rem] left-0 right-0 bottom-0 bg-n-8 lg:static lg:flex lg:mx-auto lg:bg-transparent`}
        >
          <div className="relative flex flex-col items-center justify-center m-auto z-2 lg:flex-row">
            {navigation.map((item) => (
              <Link
                key={item.id}
                to={item.url}
                onClick={handleClick}
                className={`block relative font-code text-2xl uppercase text-n-1 transition-colors hover:text-color-1 ${
                  item.onlyMobile ? "lg:hidden" : ""
                } px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold ${
                  item.url === pathname.hash
                    ? "z-2 lg:text-n-1"
                    : "lg:text-n-1/50"
                } lg:leading-5 lg:hover:text-n-1 xl:px-12 ${
                  username && item.onlyMobile && "hidden"
                } ${!username && item.title === "Logout" && "hidden"}`}
              >
                {item.title}
              </Link>
            ))}
            {username && (
              <div className="flex justify-end w-full lg:hidden">
                <Link to="/story">
                  <div className="flex items-center px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold space-x-2 bg-opacity-50 lg:space-x-4 rounded-l-2xl">
                    <div>
                      <p className="text-2xl uppercase font-code text-n-1">
                        {username}
                      </p>
                    </div>
                    <Avatar className="w-9 h-9">
                      <AvatarImage
                        src={heroImage}
                        className="scale-[2.3] translate-y-[40%] -translate-x-[10%]"
                      />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                  </div>
                </Link>
              </div>
            )}
          </div>

          <HamburgerMenu />
        </nav>

        {username ? (
          <div className="justify-end hidden w-full lg:flex lg:w-auto">
            <Link to="/story">
              <div className="flex items-center p-1 space-x-2 bg-opacity-50 lg:mr-0 lg:space-x-4 rounded-l-2xl">
                <div>
                  <p className="text-lg uppercase font-code">{username}</p>
                </div>
                <Avatar className="w-9 h-9">
                  <AvatarImage
                    src={heroImage}
                    className="scale-[2.3] translate-y-[40%] -translate-x-[10%]"
                  />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </div>
            </Link>
          </div>
        ) : (
          <div className="flex items-center">
            <Link
              to={"/login"}
              className="hidden mr-8 transition-colors button text-n-1/50 hover:text-n-1 lg:block"
            >
              Login
            </Link>
            <Link to={"/register"}>
              <Button className="hidden lg:flex">Signup</Button>
            </Link>
          </div>
        )}

        <Button
          className="ml-auto lg:hidden"
          px="px-3"
          onClick={toggleNavigation}
        >
          <MenuSvg openNavigation={openNavigation} />
        </Button>
      </div>
    </div>
  );
};

export default Header;
