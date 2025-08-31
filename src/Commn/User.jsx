import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function User() {
  const [data, setData] = useState(null);
  const [showUpdate, setShowUpdate] = useState(false);
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    gender: "",
    contact_number: "",
  });

  useEffect(() => {
    fetch("http://localhost/hostello_php/get_user.php", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((d) => {
        setData(d);
        if (d.status === "success" && d.user) {
          setForm({
            firstname: d.user.firstname || "",
            lastname: d.user.lastname || "",
            gender: d.user.gender || "",
            contact_number: d.user.contact_number || "",
          });
        }
      });
  }, []);

  if (!data) return <h1 className="text-center mt-10 text-white">Loading...</h1>;
  if (data.status !== "success")
    return <p className="text-center mt-10 text-white">Please log in first.</p>;

  const openUpdate = () => setShowUpdate(true);
  const closeUpdate = () => setShowUpdate(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost/hostello_php/update.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(form),
    });

    const result = await response.json();
    if (result.status === "success") {
      toast.success("✅ Profile updated successfully!");
      setData({
        ...data,
        user: {
          ...data.user,
          ...form,
        },
      });
      setShowUpdate(false);
    } else {
      toast.error("❌ Failed to update user");
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-900 flex justify-center items-start py-12 px-4">
      <div className="w-full max-w-4xl bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-lg overflow-hidden text-gray-200">

        {/* Header */}
        <div className="h-[100px] bg-slate-700 flex justify-between items-center px-6">
          <h1 className="text-2xl font-bold text-white">User Dashboard</h1>
          <button
            onClick={openUpdate}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-500 rounded-lg hover:bg-emerald-600 transition font-medium"
          >
            ✏️ Update
          </button>
        </div>

        {/* Content */}
        <div className="p-6 grid md:grid-cols-2 gap-6">
          {/* Personal Info */}
          <div className="bg-slate-800 rounded-xl p-5 border border-slate-700 shadow-md">
            <h2 className="text-lg font-semibold text-white border-b border-slate-600 pb-2 mb-4">
              Personal Info
            </h2>
            <div className="space-y-2 text-gray-300">
              <p><span className="font-bold text-white">First Name:</span> {data?.user?.firstname}</p>
              <p><span className="font-bold text-white">Last Name:</span> {data?.user?.lastname}</p>
              <p><span className="font-bold text-white">Email:</span> {data?.user?.email}</p>
              <p><span className="font-bold text-white">Gender:</span> {data?.user?.gender}</p>
              <p><span className="font-bold text-white">Contact:</span> {data?.user?.contact_number}</p>
            </div>
          </div>

          {/* Booking Info */}
          <div className="bg-slate-800 rounded-xl p-5 border border-slate-700 shadow-md">
            <h2 className="text-lg font-semibold text-white border-b border-slate-600 pb-2 mb-4">
              Booking Info
            </h2>
            {data?.booking ? (
              <div className="space-y-2 text-gray-300">
                <p><span className="font-bold text-white">Course:</span> {data.booking.course}</p>
                <p><span className="font-bold text-white">Room:</span> {data.booking.roomnumber}</p>
                <p><span className="font-bold text-white">Duration:</span> {data.booking.duration}</p>
                <p><span className="font-bold text-white">Food:</span> {data.booking.food_status}</p>
                <p><span className="font-bold text-white">Total:</span> ₹{data.booking.total_amount}</p>
              </div>
            ) : (
              <p className="text-gray-400">No booking found.</p>
            )}
          </div>
        </div>

        {/* Update Modal */}
        {showUpdate && (
          <form
            onSubmit={handleSubmit}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <div className="bg-slate-800/90 backdrop-blur-xl p-8 rounded-2xl shadow-xl w-[500px]">
              <h2 className="text-2xl font-bold text-white mb-6 text-center">Update Profile</h2>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1 text-gray-300">First Name</label>
                  <input
                    type="text"
                    name="firstname"
                    value={form.firstname}
                    onChange={handleChange}
                    className="w-full p-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1 text-gray-300">Last Name</label>
                  <input
                    type="text"
                    name="lastname"
                    value={form.lastname}
                    onChange={handleChange}
                    className="w-full p-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1 text-gray-300">Gender</label>
                  <input
                    type="text"
                    name="gender"
                    value={form.gender}
                    onChange={handleChange}
                    className="w-full p-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1 text-gray-300">Contact Number</label>
                  <input
                    type="text"
                    name="contact_number"
                    value={form.contact_number}
                    onChange={handleChange}
                    className="w-full p-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={closeUpdate}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 rounded-lg text-white font-semibold"
                >
                  Update
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}
