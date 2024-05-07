import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setAccessToken, setRefreshToken } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import image from "../../assets/logo2.png";
import { api } from "../../utils/api";
import { toast } from "react-toastify";

const Signup: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = async () => {
    setLoading(true);
    if (!email.includes("@")) {
      toast.error("Invalid email address.");
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      setLoading(false);
      return;
    }
    try {
      const response = await fetch(`${api}signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, token_expires_in: "0.2m" }),
      });
      const data = await response.json();
      if (response.ok) {
        dispatch(setAccessToken(data.accessToken));
        dispatch(setRefreshToken(data.refreshToken));
        toast.success("Register Success !");
        navigate("/");
      } else {
        toast.error(
          data.message || "Failed to sign up. Please try again later."
        );
      }
    } catch (error: any) {
      toast.error("Failed to connect to the server. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-[sans-serif] text-[#333]">
      <div className="grid lg:grid-cols-2 gap-4 bg-gradient-to-l from-blue-500 to-blue-700 sm:p-8 p-4 h-[320px]">
        <div className="bg-white my-4 rounded-xl sm:px-6 px-4 py-8 max-w-md w-full h-max shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] max-lg:mx-auto">
          <form>
            <div className="mb-10">
              <h3 className="text-3xl font-extrabold">Sign up</h3>
            </div>
            <div>
              <label className="text-sm mb-2 block">Email</label>
              <input
                className="w-full text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
            </div>
            <div className="mt-6">
              <label className="text-sm mb-2 block">Password</label>
              <input
                required
                className="w-full text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </div>
            <div className="mt-6 pb-8">
              <label className="text-sm mb-2 block">Confirm Password</label>
              <input
                required
                className="w-full text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
              />
            </div>
            {error && <Error>{error}</Error>}
            {loading ? (
              <p>Loading...</p>
            ) : (
              <button
                className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                onClick={handleSignup}
              >
                Sign Up
              </button>
            )}
            <p className="pt-8">Already have an account?</p>
            <div className="mt-4 text-right">
              <button
                className="text-blue-600 font-semibold hover:underline ml-1"
                onClick={() => navigate("/")}
              >
                Log In
              </button>
            </div>
          </form>
        </div>
        <div>
          <img src={image} alt="logo" className="w-32" />
          <div className="max-w-lg mt-10 px-6 max-lg:hidden">
            <h3 className="text-3xl font-bold text-white">RTV News</h3>
            <p className="text-sm mt-2 text-white">
              Sign up for RTV News to access personalized content, save
              favorites, and get alerts on critical updates. Register today to
              stay connected and informed with accurate, timely news.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Error = styled.span`
  color: red;
`;

export default Signup;
