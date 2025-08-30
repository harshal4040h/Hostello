import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost/hostello_php/admin_login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });

      const result = await res.json();
      if (result.status === "success") {
        toast.success("✅ Welcome Admin!");
        navigate("/admin-dashboard");
        window.location.reload();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-900 px-4">
      <Toaster position="top-center" />
      <form
        onSubmit={handleSubmit}
        className="bg-slate-800 p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-700"
      >
        <h2 className="text-3xl font-extrabold text-center text-white mb-6 drop-shadow-md">
          Admin Login 🔑
        </h2>

        <div className="mb-5">
          <label className="block text-gray-300 text-sm font-semibold mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter admin email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white 
                       border border-gray-600 focus:border-emerald-500 
                       focus:ring-2 focus:ring-emerald-500 focus:outline-none 
                       placeholder-gray-400"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-300 text-sm font-semibold mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white 
                       border border-gray-600 focus:border-emerald-500 
                       focus:ring-2 focus:ring-emerald-500 focus:outline-none 
                       placeholder-gray-400"
            required
          />
        </div>
        <div className="flex justify-center">
        <button
                type="submit"
                className="bg-gray-950 text-gray-400 border mt-6 border-gray-400 border-b-4 
                font-medium overflow-hidden relative px-4 py-2 rounded-md 
                hover:brightness-150 hover:border-t-4 hover:border-b 
                active:opacity-75 outline-none duration-300 group text-center "
              >
                <span className="bg-gray-400 shadow-gray-400 absolute -top-[150%] left-0 
                inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] 
                duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
               Login as Admin
              </button>
              </div>
      </form>
    </div>
  );
}
