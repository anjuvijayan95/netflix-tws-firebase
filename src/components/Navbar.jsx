import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import { BsBellFill } from "react-icons/bs";
import { UserAuth } from "../context/AuthContext";
import Logo from "./Logo";
import blueSmile from "../assets/img/blueSmile.jpg";

const Navbar = ({ onSearch }) => {
  const { user, logOut } = UserAuth();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value); // Send search query to parent component
  };

  return (
    <nav className="fixed top-0 w-full bg-black bg-opacity-80 px-4 md:px-8 py-4 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left: Logo & Navigation */}
        <div className="flex items-center space-x-6">
          <Link to="/">
            <Logo height="auto" width="100px" />
          </Link>
          <ul className="hidden md:flex space-x-6 text-white">
            <li className="cursor-pointer hover:text-gray-400">
              <Link to="/">Home</Link>
            </li>
            <li className="cursor-pointer hover:text-gray-400">
              <Link to="/tvshows">TV Shows</Link>
            </li>
            <li className="cursor-pointer hover:text-gray-400">
              <Link to="/movies">Movies</Link>
            </li>
            <li className="cursor-pointer hover:text-gray-400">
              <Link to="/popular">New & Popular</Link>
            </li>
            <li className="cursor-pointer hover:text-gray-400">
              <Link to="/account">My List</Link>
            </li>
          </ul>
        </div>

        {/* Right: Search, Icons & Profile */}
        <div className="flex items-center space-x-4 text-white text-sm">
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={handleSearch}
              placeholder="Search..."
              className="bg-gray-800 text-white px-4 py-1 rounded-md w-40 sm:w-64 focus:outline-none"
            />
            <BiSearch className="absolute right-2 top-2 w-5 h-5 text-gray-400" />
          </div>
          <div className="flex items-center space-x-4 flex-nowrap">
            <p className="hidden lg:block cursor-pointer hover:text-gray-400">
              <Link to="/kids">Kids</Link>
            </p>
            <BsBellFill className="w-6 h-6 cursor-pointer hover:text-gray-400" />
            {user?.email ? (
              <div className="relative group">
                <img
                  src={blueSmile}
                  alt="User Profile"
                  className="w-8 h-8 cursor-pointer"
                />
                <div className="absolute hidden group-hover:block bg-gray-800 text-white text-sm right-0 mt-0 py-2 w-32 rounded-md shadow-lg">
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2 sm:space-x-4 flex-nowrap">
                <Link
                  to="/login"
                  className="hover:text-gray-400 whitespace-nowrap"
                >
                  Sign In
                </Link>
                <Link to="/signup">
                  <button className="bg-red-600 px-4 sm:px-6 py-2 rounded text-white whitespace-nowrap">
                    Sign Up
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
