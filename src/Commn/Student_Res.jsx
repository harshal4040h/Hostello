import React from 'react'
import { useState } from 'react'
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
    setForm({ ...form, [e.target.name]: e.target.value })
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost/hostello_php/request.php', {
      method: 'POST',
      body: JSON.stringify(form),
      headers: {
        'Content-Type': 'application/json'
      },

    });
    const result = await response.text();

    toast.success("successflly register");

    window.location.href = "/login";
  }
  return (
    <div>
      <h1 className='text-center text-2xl font-bold mt-6'>Student Registration Page</h1>
      <div>
        <form onSubmit={handleSubmit} className='flex justify-center '>

          <div className=' w-10/12 h-[460px] my-8 bg-slate-50 mt-[60px] '>

            <div className='flex justify-between mx-2'>
              <div className=''>
                <label for="name">First-Name: </label>
                <input type="text" value={form.firstname} name="firstname" onChange={handleChange} className='bg-gray-50 border    border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[300px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' ></input>
              </div>
              <div>
                <label for="name">Last-Name: </label>
                <input type="text" name="lastname" value={form.lastname} onChange={handleChange} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[300px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' ></input>
              </div>

              <div>
                <label for="name">Email: </label>
                <input type="email" name="email" value={form.email} onChange={handleChange} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[300px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'></input>
              </div>
            </div>

            <div className='flex justify-between mx-2 my-9'>
              <div >
                <label for="gender">Gender:</label>
                <input type='text' name='gender' onChange={handleChange} value={form.gender} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[300px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'></input>
              </div>

              <div>
                <label for="contact">Contact-Number:</label>
                <input type='text' name='contact' onChange={handleChange} value={form.contact} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[300px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'></input>
              </div>
              <div>
                <label for="econtact">Emergency Contact-Number:</label>
                <input type='text' name='econtact' onChange={handleChange} value={form.econtact} className=' bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[300px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'></input>
              </div>
            </div>
            <div className='flex justify-center' >
              <div>
                <label for="password">Password:</label>
                <input type='password' name='password' onChange={handleChange} value={form.password} className=' bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[300px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'></input>
              </div>
            </div>
            <div className='text-center'>
              <button class="bg-gray-950 text-gray-400 border mt-14 border-gray-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group">
                <span class="bg-gray-400 shadow-gray-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
                submit
              </button>
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
