import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Aboutus from "../../pages/aboutus/AboutUs";
import News from "../../pages/News/News";
import image from "../../assets/logo2.png";
import { useDispatch } from "react-redux";
import { resetAuthState } from "../../redux/authSlice";
import { clearAllPosts } from "../../redux/savedPostsSlice";
import SavedNews from "../../pages/save/Saved";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(resetAuthState());
    dispatch(clearAllPosts());
  };

  return (
    <Router>
      <nav className="bg-white  fixed w-full z-20 top-0 start-0 border-b border-gray-200 ">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src={image} className=" h-14" alt="Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-black">
              RTV News
            </span>
          </Link>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button
              type="button"
              className="text-white bg-blue-500 hover:bg-blue-700 p-2 rounded-lg"
              onClick={handleLogout}
            >
              Logout
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${
              isOpen ? "flex" : "hidden"
            }`}
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 bg-white ">
              <li>
                <Link
                  to="/"
                  className="block py-2 px-3  rounded hover:bg-blue-500 focus:bg-blue-500 p-2  text-black  "
                  aria-current="page"
                >
                  News
                </Link>
              </li>
              <li>
                <Link
                  to="/Saved"
                  className="block py-2 px-3  rounded  hover:bg-blue-500 focus:bg-blue-500 p-2   text-black  "
                >
                  Saved
                </Link>
              </li>
              <li>
                <Link
                  to="/AboutUs"
                  className="block py-2 px-3  rounded  hover:bg-blue-500 focus:bg-blue-500 p-2   text-black  "
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<News />} />
        <Route path="/Saved" element={<SavedNews />} />
        <Route path="/AboutUs" element={<Aboutus />} />
      </Routes>
    </Router>
  );
};

export default Navbar;
