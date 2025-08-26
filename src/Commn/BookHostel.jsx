import React, { useState, useEffect } from 'react'
import toast, { Toaster } from "react-hot-toast";

export default function BookHostel() {

  const [data, setdata] = useState({
    course: "",
    room: "",
    start_date: "",
    food_status: "",
    total_amount: "",
    duration: ""
  });

  const [rooms, setRooms] = useState([]);
  const [photo, setPhoto] = useState(null);
  useEffect(() => {
    fetch("http://localhost/hostello_php/get_rooms.php", {
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => setRooms(data));
  }, []);

  const handlechange = (e) => {
    const { name, value } = e.target;
   


    // If duration changes, auto-update total_amount
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

      // Get cost of selected room + duration
      const selectedRoom = rooms.find(r => r.roomnumber === data.room);
      if (selectedRoom && data.duration) {
        if (data.duration === "1yr") baseAmount = Number(selectedRoom.c_1year);
        if (data.duration === "2yr") baseAmount = Number(selectedRoom.c_2year);
        if (data.duration === "3yr") baseAmount = Number(selectedRoom.c_3year);
      }

      // Add 20,000 if food = yes
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

    // If room changes, reset cost until duration chosen
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


  const handlesubmit = async (e) => {
    e.preventDefault();

   
    const response = await fetch("http://localhost/hostello_php/book_hostel.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include"
    });


    const result = await response.json();

    if (result.status === "success") {
      toast.success("✅ Hostel booked!");
      window.location.href = "/user";
    } else {
      toast.error("❌ " + result.message);
    }

  }

  return (
    <div>
      <h1 className='text-center text-2xl font-bold'>Book Hostel</h1>
      <div>
        <form className='flex justify-center ' onSubmit={handlesubmit}>

          <div className='w-10/12 h-[460px] my-8 bg-slate-50 mt-[60px]'>

            <div className='flex  mx-2'>
              <div className='mx-48'>
                <div className="my-5">
                  <label>Start Date</label>
                  <input type="date" name="start_date" onChange={handlechange} value={data.start_date} className='bg-gray-50 border    border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[300px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                </div>
                <div className='my-5'>
                  <label className=''>Course</label>
                  <select onChange={handlechange} value={data.course} name='course' className='bg-gray-50 border    border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[300px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
                    <option value="">-- Select Course --</option>
                    <option value='BBA'>BBA</option>
                    <option value='BCA'>BCA</option>
                    <option value='BCOM'>BCOM</option>
                    <option value='BSC'>BSC</option>
                    <option value='MCOM'>M.COM</option>
                    <option value='MCA'>MCA</option>
                  </select>
                </div>
                <div className="my-5">
                  <label>Room Number</label>
                  <select name="room" onChange={handlechange} value={data.room} className='bg-gray-50 border    border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[300px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
                    <option value="">-- Select Room --</option>
                    {rooms.map((room, index) => (
                      <option key={index} value={room.roomnumber}>
                        {room.roomnumber}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className=''>
                <div className="my-5">
                  <label>Duration</label>
                  <select name="duration" onChange={handlechange} value={data.duration} disabled={!data.room} className='bg-gray-50 border    border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[300px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
                    <option value="">-- Select Duration --</option>
                    <option value="1yr">1 Year</option>
                    <option value="2yr">2 Years</option>
                    <option value="3yr">3 Years</option>
                  </select>
                </div>
                <div className="my-5">
                  <label>Food Status</label>
                  <select name="food_status" onChange={handlechange} value={data.food_status} className='bg-gray-50 border    border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[300px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
                    <option value="">-- Select --</option>
                    <option value="yes">With Food(+20000)</option>
                    <option value="no">Without Food</option>
                  </select>
                </div>
                <div className="my-5">
                  <label>Total Amount</label>
                  <input type="text" name="total_amount" value={data.total_amount} readOnly className='bg-gray-50 border    border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[300px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                </div>
              </div>

            </div>
            <div>
              <div className="my-5 text-center">
                <label>Upload Photo</label>
                <input type="file" name="photo" accept="image/*" onChange={handlechange} className='bg-gray-50 border  ml-2  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-[300px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
              </div>
            </div>
            <div className='text-center'>
              <button type="submit" class="bg-gray-950 my-8 mx-36 text-gray-400 border border-gray-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group">
                <span class="bg-gray-400 shadow-gray-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
                BOOK
              </button>
            </div>
            <div>

            </div>
          </div>
        </form>
      </div>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </div>
  )
}
