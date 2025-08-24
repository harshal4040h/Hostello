import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [login, setlogin] = useState(
    {
      email: "",
      password: ""
    }
  );

  const handleChange = (e) => {
    setlogin({
      ...login,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    const response = await fetch("http://localhost/hostello_php/login.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(login),
      credentials: "include"   // 🔑 send cookies to PHP
    });


    const result = await response.json();

    if (result.status === 'success') {
      alert('✅ ' + result.message);
       window.location.href = "/home"; 
    }
    else {
      alert('❌ ' + result.message);
    }

  };

  return (
    <div className='bg-gray-200 '>
      <h1 className='text-center text-2xl font-bold mt-6'>Login</h1>
      <div className='flex justify-center my-6'>

        <div className='w-8/12 bg-white h-[460px] rounded-2xl'>
          <div className='flex justify-center mt-5'>
            <form className='my-3 mx-3 ' onSubmit={handleSubmit}>

              <div className='w-4/12 my-8'>
                <label for="email">Email:</label>
                <input type="text" name="email" onChange={handleChange} value={login.email} className='bg-gray-50 border v border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[400px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' ></input>
              </div>

              <div className='w-4/12 my-8'>
                <label for="password">Password: </label>
                <input type="password" name="password" onChange={handleChange} value={login.password} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[400px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' ></input>
              </div>
              <button class="bg-gray-950 my-8 mx-36 text-gray-400 border border-gray-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group">
                <span class="bg-gray-400 shadow-gray-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
                Login
              </button>
            </form>

          </div>

        </div>
      </div>
    </div>
  )
}
