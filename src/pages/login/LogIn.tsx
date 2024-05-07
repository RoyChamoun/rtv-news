import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setAccessToken, setRefreshToken } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import image from "../../assets/logo2.png";
import { api } from "../../utils/api";
import { toast } from "react-toastify";

const LogIn: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${api}login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, token_expires_in: "0.2m" }),
      });
      const data = await response.json();
      if (response.ok) {
        dispatch(setAccessToken(data.accessToken));
        dispatch(setRefreshToken(data.refreshToken));
        toast.success("Success Login !");
      } else {
        toast.error(data.message || "An error occurred during login");
      }
    } catch (error: any) {
      setError("Failed to connect to the server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-[sans-serif] text-[#333]">
      <div className="grid lg:grid-cols-2 gap-4 bg-gradient-to-r from-blue-500 to-blue-700 sm:p-8 p-4 h-[320px]">
        <div>
          <img src={image} alt="logo" className=" w-32" />

          <div className="max-w-lg mt-10 px-6 max-lg:hidden">
            <h3 className="text-3xl font-bold text-white">RTV News</h3>
            <p className="text-sm mt-2 text-white">
              Sign in to RTV News for real-time updates and comprehensive news
              coverage. Access exclusive insights and in-depth analysis anytime.
            </p>
          </div>
        </div>
        <div className="bg-white my-4 rounded-xl sm:px-6 px-4 py-8 max-w-md w-full h-max shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] max-lg:mx-auto">
          <form>
            <div className="mb-10">
              <h3 className="text-3xl font-extrabold">Sign in</h3>
            </div>
            <div className="sm:flex sm:items-start space-x-4 max-sm:space-y-4 mb-10"></div>
            <div>
              <label className="text-sm mb-2 block">Email</label>
              <div className="relative flex items-center">
                <input
                  className="w-full text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#bbb"
                  stroke="#bbb"
                  className="w-[18px] h-[18px] absolute right-4"
                  viewBox="0 0 24 24"
                >
                  <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                  <path
                    d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                    data-original="#000000"
                  ></path>
                </svg>
              </div>
            </div>
            <div className="mt-6">
              <label className="text-sm mb-2 block">Password</label>
              <div className="relative flex items-center">
                <input
                  required
                  className="w-full text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
              </div>
            </div>
            <div className="mt-4 text-right">
              <a
                href="jajvascript:void(0);"
                className="text-blue-600 text-sm font-semibold hover:underline"
              >
                Forgot your password?
              </a>
            </div>
            <div className="mt-10">
              {error && <Error>{error}</Error>}
              {loading ? (
                <p>Loading...</p>
              ) : (
                <button
                  className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                  onClick={handleLogin}
                >
                  Login
                </button>
              )}
            </div>

            <p>Don't have an account?</p>
            <button
              className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const Error = styled.span`
  color: red;
`;

export default LogIn;
