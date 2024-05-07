import React from "react";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../../redux/authSlice";
import MainNavigator from "../mainnavigator/MainNavigator";
import Navbar from "../navbar/Navbar";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Navigation: React.FC = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return isAuthenticated ? (
    <>
      <Navbar />
      <ToastContainer
        position="top-right"
        hideProgressBar={false}
        newestOnTop={false}
        rtl={false}
        draggable
        theme="light"
      />
    </>
  ) : (
    <>
      <MainNavigator />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default Navigation;
