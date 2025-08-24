import React, { useState } from 'react'

export default function BookHostel() {

  const [data ,setdata]=useState({
    course:"",
    room:"",
    duration:""
  });


  const handlechange = (e) =>{
    setdata({
      ...data,
      [e.target.name]:e.target.value
    });

  };

    const handlesubmit = async(e) =>{
       e.preventDefault();

        const response = await fetch("http://localhost/hostello_php/book_hostel.php",{
            method: "POST",
               headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data), 
                credentials: "include"
        });

        
    const result = await response.json();

    if(result.status === "success"){
        alert("✅ Hostel booked!");
          window.location.href = "/user"; 
    }else{
        alert("❌ " + result.message);
    }

  }

  return (
    <div>
      <h1 className='text-center text-2xl font-bold'>Book Hostel</h1>
      <div>
        <form className='text-center mt-8' onSubmit={handlesubmit}>
          <div className='my-5'>
          <label className=''>Course</label>
          <input type='text' name='course' onChange={handlechange} value={data.course}></input><br></br>
          </div>
          <div className='my-5'>
          <label>room</label>
          <input type='text' name='room' onChange={handlechange} value={data.room}></input><br></br>
          </div>
          <div className='my-5'>
          <label >duration</label>
          <input type="text" name='duration' onChange={handlechange} value={data.duration}></input>
          </div>
          <button type="submit" class="bg-gray-950 my-8 mx-36 text-gray-400 border border-gray-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group">
                <span class="bg-gray-400 shadow-gray-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
                BOOK
              </button>
        </form>
      </div>
    </div>
  )
}
