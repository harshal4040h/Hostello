import React, { useState, useEffect } from 'react'
import toast, { Toaster } from "react-hot-toast";
import { useLocation, useNavigate } from 'react-router-dom';

export default function BookHostel() {

  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category"); // standard | executive | premium | royal

  const [data, setdata] = useState({
    course: "",
    room: "",
    start_date: "",
    food_status: "",
    total_amount: "",
    duration: "",
    g_name: "",
    g_contact: "",
    g_relation: "",
    g_address: ""
  });

  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetch("http://localhost/hostello_php/get_rooms.php", { credentials: "include" })
      .then(res => res.json())
      .then(data => {
        let filtered = data;

        if (category === "standard") {
          filtered = data.filter(r => r.roomnumber.startsWith("1"));
        } else if (category === "executive") {
          filtered = data.filter(r => r.roomnumber.startsWith("2"));
        } else if (category === "premium") {
          filtered = data.filter(r => r.roomnumber.startsWith("3"));
        } else if (category === "royal") {
          filtered = data.filter(r => r.roomnumber.startsWith("4"));
        }

        setRooms(filtered);
      });
  }, [category]);

  const handlechange = (e) => {
    const { name, value } = e.target;

    if (name === "duration") {
      const selectedRoom = rooms.find(r => r.roomnumber === data.room);
      if (selectedRoom) {
        let amount = 0;
        if (value === "1yr") amount = Number(selectedRoom.c_1year);
        if (value === "2yr") amount = Number(selectedRoom.c_2year);
        if (value === "3yr") amount = Number(selectedRoom.c_3year);

        setdata({
          ...data,
          duration: value,
          total_amount: amount
        });
        return;
      }
    }

    if (name === "food_status") {
      let baseAmount = 0;
      const selectedRoom = rooms.find(r => r.roomnumber === data.room);
      if (selectedRoom && data.duration) {
        if (data.duration === "1yr") baseAmount = Number(selectedRoom.c_1year);
        if (data.duration === "2yr") baseAmount = Number(selectedRoom.c_2year);
        if (data.duration === "3yr") baseAmount = Number(selectedRoom.c_3year);
      }

      if (value === "yes") {
        baseAmount += 20000;
      }

      setdata({
        ...data,
        food_status: value,
        total_amount: baseAmount
      });
      return;
    }

    if (name === "room") {
      setdata({
        ...data,
        room: value,
        total_amount: "",
        duration: ""
      });
      return;
    }

    setdata({
      ...data,
      [e.target.name]: e.target.value
    });
  };

  const handlesubmit = (e) => {
    e.preventDefault();

    if (!data.room || !data.duration || !data.total_amount) {
      toast.error("⚠️ Please select room, duration and food option before submitting!");
      return;
    }

    const query = new URLSearchParams(data).toString();
    navigate(`/payment?${query}`);
  }

  return (
    <div className="min-h-screen bg-slate-900 text-gray-200 py-10">
      {/* Title (unchanged) */}
      <h1 className="text-center text-3xl font-bold text-white mb-8">
        Book Hostel
      </h1>

      <form className="flex justify-center" onSubmit={handlesubmit}>
        <div className="w-11/12 md:w-10/12 lg:w-8/12 rounded-2xl p-10 
            bg-slate-800/80 backdrop-blur-xl shadow-xl border border-slate-700">

          {/* First Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left */}
            <div className="space-y-6">
              <div>
                <label className="block mb-2 font-medium text-gray-300">Start Date</label>
                <input
                  type="date"
                  name="start_date"
                  onChange={handlechange}
                  value={data.start_date}
                  className="w-full bg-slate-700/70 border border-slate-600 text-gray-100 
                  rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-emerald-500 
                  focus:border-emerald-500 focus:outline-none placeholder-gray-400"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium text-gray-300">Course</label>
                <select
                  onChange={handlechange}
                  value={data.course}
                  name='course'
                  className="w-full bg-slate-700/70 border border-slate-600 text-gray-100 
                  rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-emerald-500 
                  focus:border-emerald-500 focus:outline-none"
                >
                  <option value="">-- Select Course --</option>
                  <option value='BBA'>BBA</option>
                  <option value='BCA'>BCA</option>
                  <option value='BCOM'>BCOM</option>
                  <option value='BSC'>BSC</option>
                  <option value='MCOM'>M.COM</option>
                  <option value='MCA'>MCA</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 font-medium text-gray-300">Room Number</label>
                <select
                  name="room"
                  onChange={handlechange}
                  value={data.room}
                  className="w-full bg-slate-700/70 border border-slate-600 text-gray-100 
                  rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-emerald-500 
                  focus:border-emerald-500 focus:outline-none"
                >
                  <option value="">-- Select Room --</option>
                  {rooms.map((room, index) => (
                    <option
                      key={index}
                      value={room.roomnumber}
                      disabled={room.booked_count >= 2}
                    >
                      {room.roomnumber} {room.booked_count >= 2 ? "(Full)" : `(${room.booked_count}/2 booked)`}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Right */}
            <div className="space-y-6">
              <div>
                <label className="block mb-2 font-medium text-gray-300">Duration</label>
                <select
                  name="duration"
                  onChange={handlechange}
                  value={data.duration}
                  disabled={!data.room}
                  className="w-full bg-slate-700/70 border border-slate-600 text-gray-100 
                  rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-emerald-500 
                  focus:border-emerald-500 focus:outline-none disabled:opacity-50"
                >
                  <option value="">-- Select Duration --</option>
                  <option value="1yr">1 Year</option>
                  <option value="2yr">2 Years</option>
                  <option value="3yr">3 Years</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 font-medium text-gray-300">Food Status</label>
                <select
                  name="food_status"
                  onChange={handlechange}
                  value={data.food_status}
                  className="w-full bg-slate-700/70 border border-slate-600 text-gray-100 
                  rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-emerald-500 
                  focus:border-emerald-500 focus:outline-none"
                >
                  <option value="">-- Select --</option>
                  <option value="yes">With Food (+20000)</option>
                  <option value="no">Without Food</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 font-medium text-gray-300">Total Amount</label>
                <input
                  type="text"
                  name="total_amount"
                  value={data.total_amount ? `₹ ${data.total_amount}` : ""}
                  readOnly
                  className="w-full bg-slate-700/70 border border-slate-600 text-gray-100 
                  rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-emerald-500 
                  focus:border-emerald-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Guardian Info Title (unchanged) */}
          <div className="mt-12">
            <h2 className="text-center text-2xl font-bold text-white mb-6">
              Guardian Information
            </h2>

            {/* Guardian Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block mb-2 font-medium text-gray-300">Name</label>
                <input
                  type="text"
                  value={data.g_name}
                  name="g_name"
                  onChange={handlechange}
                  className="w-full bg-slate-700/70 border border-slate-600 text-gray-100 
                  rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-emerald-500 
                  focus:border-emerald-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block mb-2 font-medium text-gray-300">Contact</label>
                <input
                  type="text"
                  value={data.g_contact}
                  name="g_contact"
                  onChange={handlechange}
                  className="w-full bg-slate-700/70 border border-slate-600 text-gray-100 
                  rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-emerald-500 
                  focus:border-emerald-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block mb-2 font-medium text-gray-300">Relation</label>
                <input
                  type="text"
                  value={data.g_relation}
                  name="g_relation"
                  onChange={handlechange}
                  className="w-full bg-slate-700/70 border border-slate-600 text-gray-100 
                  rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-emerald-500 
                  focus:border-emerald-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block mb-2 font-medium text-gray-300">Address</label>
                <input
                  type="text"
                  value={data.g_address}
                  name="g_address"
                  onChange={handlechange}
                  className="w-full bg-slate-700/70 border border-slate-600 text-gray-100 
                  rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-emerald-500 
                  focus:border-emerald-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Button (unchanged) */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-gray-950 text-gray-400 border mt-6 border-gray-400 border-b-4 
              font-medium overflow-hidden relative px-4 py-2 rounded-md 
              hover:brightness-150 hover:border-t-4 hover:border-b 
              active:opacity-75 outline-none duration-300 group"
            >
              <span className="bg-gray-400 shadow-gray-400 absolute -top-[150%] left-0 
              inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] 
              duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
              Proceed to Payment
            </button>
          </div>
        </div>
      </form>   
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  )
}
