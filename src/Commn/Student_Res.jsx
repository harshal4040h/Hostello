import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function Student_Res() {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    gender: "",
    contact: "",
    econtact: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost/hostello_php/request.php", {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "Content-Type": "application/json",
      },
    });

    await response.text();
    toast.success("Successfully registered ✅");

    setTimeout(() => {
      window.location.href = "/login";
    }, 1000);
  };

  return (
    <div className="bg-slate-900 min-h-screen flex items-center justify-center px-4">
      <div className="bg-slate-800 shadow-xl rounded-2xl w-full max-w-4xl p-8">
        <h1 className="text-3xl font-extrabold text-white text-center mb-8 drop-shadow-md">
          Student Registration 📝
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                First Name
              </label>
              <input
                type="text"
                name="firstname"
                value={form.firstname}
                onChange={handleChange}
                placeholder="Enter first name"
                className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white 
                           border border-gray-600 focus:border-emerald-500 
                           focus:ring-2 focus:ring-emerald-500 focus:outline-none 
                           placeholder-gray-400"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Last Name
              </label>
              <input
                type="text"
                name="lastname"
                value={form.lastname}
                onChange={handleChange}
                placeholder="Enter last name"
                className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white 
                           border border-gray-600 focus:border-emerald-500 
                           focus:ring-2 focus:ring-emerald-500 focus:outline-none 
                           placeholder-gray-400"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter email"
                className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white 
                           border border-gray-600 focus:border-emerald-500 
                           focus:ring-2 focus:ring-emerald-500 focus:outline-none 
                           placeholder-gray-400"
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Gender
              </label>
              <input
                type="text"
                name="gender"
                value={form.gender}
                onChange={handleChange}
                placeholder="Male / Female / Other"
                className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white 
                           border border-gray-600 focus:border-emerald-500 
                           focus:ring-2 focus:ring-emerald-500 focus:outline-none 
                           placeholder-gray-400"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Contact Number
              </label>
              <input
                type="text"
                name="contact"
                value={form.contact}
                onChange={handleChange}
                placeholder="Enter phone number"
                className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white 
                           border border-gray-600 focus:border-emerald-500 
                           focus:ring-2 focus:ring-emerald-500 focus:outline-none 
                           placeholder-gray-400"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Emergency Contact
              </label>
              <input
                type="text"
                name="econtact"
                value={form.econtact}
                onChange={handleChange}
                placeholder="Enter emergency number"
                className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white 
                           border border-gray-600 focus:border-emerald-500 
                           focus:ring-2 focus:ring-emerald-500 focus:outline-none 
                           placeholder-gray-400"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white 
                         border border-gray-600 focus:border-emerald-500 
                         focus:ring-2 focus:ring-emerald-500 focus:outline-none 
                         placeholder-gray-400"
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-gray-950 text-gray-300 border border-gray-400 border-b-4 
                         font-semibold overflow-hidden relative px-6 py-2 rounded-md 
                         hover:brightness-125 hover:border-t-4 hover:border-b 
                         active:opacity-75 outline-none duration-300 group"
            >
              <span
                className="bg-gray-400 shadow-gray-400 absolute -top-[150%] left-0 
                           inline-flex w-80 h-[5px] rounded-md opacity-50 
                           group-hover:top-[150%] duration-500 
                           shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"
              ></span>
              Submit
            </button>
          </div>
        </form>
      </div>

      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}
