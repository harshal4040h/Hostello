import React, { useEffect, useState } from "react";

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
      alert("✅ Profile updated successfully!");
      setData({
        ...data,
        user: {
          ...data.user,
          ...form,
        },
      });
      setShowUpdate(false);
    } else {
      alert("❌ Failed to update user");
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-900 flex justify-center items-start py-12">
      <div className="w-10/12 bg-slate-800 rounded-xl shadow-lg overflow-hidden text-gray-200">

        {/* Header with Update button */}
        <div className="h-[110px] bg-slate-700 flex justify-end items-center pr-5">
          <button
            onClick={openUpdate}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-500 rounded-lg hover:bg-emerald-600 transition"
          >
            ✏️ Update
          </button>
        </div>

        {/* User info */}
        <div className="bg-slate-800 p-6">
          <h2 className="text-xl text-white font-semibold border-b border-slate-600 pb-2 mb-4">
            Personal Info
          </h2>
          <div className="space-y-2 text-gray-200">
            <p><span className="font-bold">First Name:</span> {data?.user?.firstname}</p>
            <p><span className="font-bold">Last Name:</span> {data?.user?.lastname}</p>
            <p><span className="font-bold">Email:</span> {data?.user?.email}</p>
            <p><span className="font-bold">Gender:</span> {data?.user?.gender}</p>
            <p><span className="font-bold">Contact:</span> {data?.user?.contact_number}</p>
          </div>
        </div>

        {/* Booking info */}
        <div className="bg-slate-900 p-6">
          <h2 className="text-xl text-white font-semibold border-b border-slate-700 pb-2 mb-4">
            Booking Info
          </h2>
          {data?.booking ? (
            <div className="space-y-2 text-gray-200">
              <p><span className="font-bold">Course:</span> {data?.booking?.course}</p>
              <p><span className="font-bold">Room:</span> {data?.booking?.roomnumber}</p>
              <p><span className="font-bold">Duration:</span> {data?.booking?.duration}</p>
              <p><span className="font-bold">Food:</span> {data?.booking?.food_status}</p>
              <p><span className="font-bold">Total:</span> ₹{data?.booking?.total_amount}</p>
            </div>
          ) : (
            <p className="text-gray-400">No booking found.</p>
          )}
        </div>

        {/* Update Modal */}
        {showUpdate && (
          <form
            onSubmit={handleSubmit}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <div className="bg-slate-800 p-8 rounded-2xl shadow-xl w-[500px]">
              <h2 className="text-2xl font-bold text-white mb-6 text-center">Update Profile</h2>

              {/* Two column grid */}
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
    </div>
  );
}
