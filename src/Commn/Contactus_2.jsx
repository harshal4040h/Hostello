import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { name, email, message } = formData;

    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error("⚠ Please fill all fields!");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("⚠ Please enter a valid email address!");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      const res = await fetch("http://localhost/hostello_php/contact.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.status === "success") {
        toast.success("✅ Message Sent Successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        toast.error("❌ " + (data.message || "Something went wrong!"));
      }
    } catch (error) {
      toast.error("⚠ Server error, please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 min-h-screen flex items-center justify-center px-4 py-12 text-gray-200">
      <div className="w-full max-w-3xl bg-slate-800 rounded-2xl shadow-xl p-8">
        {/* Title */}
        <h1 className="text-center text-4xl font-extrabold text-white mb-10">
          Contact Us
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div>
            <label htmlFor="name" className="block mb-2 text-gray-300 font-medium">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full bg-slate-700 border border-slate-600 text-gray-200 text-base rounded-xl 
                focus:ring-emerald-500 focus:border-emerald-500 block px-4 py-3 transition"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block mb-2 text-gray-300 font-medium">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full bg-slate-700 border border-slate-600 text-gray-200 text-base rounded-xl 
                focus:ring-emerald-500 focus:border-emerald-500 block px-4 py-3 transition"
            />
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block mb-2 text-gray-300 font-medium">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Write your message..."
              className="w-full bg-slate-700 border border-slate-600 text-gray-200 text-base rounded-xl 
                focus:ring-emerald-500 focus:border-emerald-500 block px-4 py-3 h-40 resize-none transition"
            />
          </div>

          {/* Button */}
          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className="relative inline-flex items-center justify-center 
    bg-gray-950 text-gray-300 border border-gray-500 border-b-4
    px-6 py-3 rounded-lg font-medium overflow-hidden
    hover:text-white hover:border-t-4 hover:border-b 
    hover:border-white hover:brightness-110
    active:opacity-80 outline-none duration-300 
    disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              {/* Animated Shine Effect */}
              <span className="absolute -top-[150%] left-0 w-64 h-[5px] 
    bg-white opacity-40 rounded-md
    group-hover:top-[150%] duration-700 ease-in-out"></span>

              {loading ? "Sending..." : "Send Message"}
            </button>

          </div>
        </form>

        {/* Contact Info */}
        <div className="mt-10 text-center text-gray-400 text-sm space-y-2">
          <p><b>Address:</b> VIP Road, Surat, Gujarat</p>
          <p><b>Email:</b> support@hostel.com</p>
          <p><b>Phone:</b> +91 98765 43210</p>
        </div>
      </div>

      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}
