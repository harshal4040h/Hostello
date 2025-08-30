import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();
  const [login, setlogin] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setlogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost/hostello_php/login.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(login),
      credentials: "include", // send cookies to PHP
    });

    const result = await response.json();

    if (result.status === "success") {
      toast.success(result.message);
      setTimeout(() => {
        window.location.href = "/home";
      }, 1000);
    } else {
      toast.error(result.message || "Invalid login");
    }
  };

  return (
    <div className="bg-slate-900 min-h-screen flex items-center justify-center px-4">
      <div className="bg-slate-800 shadow-xl rounded-2xl w-full max-w-md p-8">
        <h1 className="text-3xl font-extrabold text-white text-center mb-6 drop-shadow-md">
          Login
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-300 mb-2"
            >
              Email Address
            </label>
            <input
              type="text"
              name="email"
              value={login.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white 
                         border border-gray-600 focus:border-emerald-500 
                         focus:ring-2 focus:ring-emerald-500 focus:outline-none 
                         placeholder-gray-400"
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-300 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              value={login.password}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white 
                         border border-gray-600 focus:border-emerald-500 
                         focus:ring-2 focus:ring-emerald-500 focus:outline-none 
                         placeholder-gray-400"
              placeholder="Enter your password"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-gray-950 text-gray-300 border border-gray-400 border-b-4 
                       font-semibold overflow-hidden relative px-4 py-2 rounded-md 
                       hover:brightness-125 hover:border-t-4 hover:border-b 
                       active:opacity-75 outline-none duration-300 group"
          >
            <span
              className="bg-gray-400 shadow-gray-400 absolute -top-[150%] left-0 
                         inline-flex w-80 h-[5px] rounded-md opacity-50 
                         group-hover:top-[150%] duration-500 
                         shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"
            ></span>
            Login
          </button>
        </form>

        {/* Admin Login Link */}
        <p className="text-center text-gray-400 mt-6">
          <Link
            to={"/adminlogin"}
            className="text-emerald-400 hover:underline hover:text-emerald-300"
          >
            Admin Login?
          </Link>
        </p>
      </div>

      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}
