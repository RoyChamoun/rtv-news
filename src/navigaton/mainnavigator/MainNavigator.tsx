import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogIn from "../../pages/login/LogIn";
import SignUp from "../../pages/signup/SignUp";

const MainNavigator: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MainNavigator;
