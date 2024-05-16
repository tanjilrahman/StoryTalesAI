import React, { useEffect, useState } from "react";
import {
  Home,
  BookOpen,
  Compass,
  User,
  HomeIcon,
  Gem,
  Feather,
  LogOut,
  LogIn,
  UserPlus,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Sidebar = () => {
  let location = useLocation();
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);

  useEffect(() => {
    setUsername(localStorage.getItem("username"));
    setEmail(localStorage.getItem("email"));
  }, []);
  return (
    <div className="sticky inset-y-0 left-0 flex flex-col w-64 h-screen py-4 pl-4 text-white border-r-2 border-gray-900 shadow-lg sidebar md:w-72">
      <div className="flex items-center justify-between mb-6 sidebar-header">
        <h1 className="text-2xl font-bold">Golpo.ai</h1>
        <button className="p-2 rounded-full md:hidden hover:bg-gray-900">
          <Home size={24} />
        </button>
      </div>
      <nav className="flex-1 mt-24 space-y-4 sidebar-body">
        <div>
          <Link to={"/story"}>
            <button
              className={`flex items-center w-full px-4 py-3 transition hover:bg-gray-900 rounded-l-2xl ${
                location.pathname === "/story" && "bg-gray-900"
              }`}
            >
              <Feather className="mr-3" size={24} />
              Story
            </button>
          </Link>
        </div>
        <div>
          <Link to={"/library"}>
            <button
              className={`flex items-center w-full px-4 py-3 transition hover:bg-gray-900 rounded-l-2xl ${
                location.pathname === "/library" && "bg-gray-900"
              }`}
            >
              <BookOpen className="mr-3" size={24} />
              Library
            </button>
          </Link>
        </div>
        <div>
          <Link to={"/discover"}>
            <button
              className={`flex items-center w-full px-4 py-3 transition hover:bg-gray-900 rounded-l-2xl ${
                location.pathname === "/discover" && "bg-gray-900"
              }`}
            >
              <Compass className="mr-3" size={24} />
              Discover
            </button>
          </Link>
        </div>
        <div>
          <Link to={"/#pricing"}>
            <button
              className={`flex items-center w-full px-4 py-3 transition hover:bg-gray-900 rounded-l-2xl`}
            >
              <Gem className="mr-3" size={24} />
              Pricing
            </button>
          </Link>
        </div>
        <div>
          <Link to={"/"}>
            <button
              className={`flex items-center w-full px-4 py-3 transition hover:bg-gray-900 rounded-l-2xl`}
            >
              <HomeIcon className="mr-3" size={24} />
              Home
            </button>
          </Link>
        </div>
      </nav>
      <div className="border-t-2 border-gray-900" />
      {username ? (
        <div className="mt-4">
          <div>
            <Link to={"/logout"}>
              <button
                className={`flex items-center w-full px-4 py-3 transition hover:bg-gray-900 rounded-l-2xl`}
              >
                <LogOut className="mr-3" size={24} />
                Logout
              </button>
            </Link>
          </div>
          <div className="flex items-center p-2 mt-3 space-x-4 bg-opacity-50 rounded-l-2xl">
            <div className="flex items-center justify-center w-10 h-10 bg-gray-900 rounded-full">
              <User size={24} />
            </div>
            <div>
              <p className="text-lg font-medium">{username}</p>
              <p className="text-sm text-gray-400">{email}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-3">
          <div>
            <Link to={"/signin"}>
              <button
                className={`flex items-center w-full px-4 py-3 transition hover:bg-gray-900 rounded-l-2xl`}
              >
                <LogIn className="mr-3" size={24} />
                Signin
              </button>
            </Link>
            <Link to={"/register"}>
              <button
                className={`flex items-center w-full px-4 py-3 transition hover:bg-gray-900 rounded-l-2xl mt-2`}
              >
                <UserPlus className="mr-3" size={24} />
                Create account
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
