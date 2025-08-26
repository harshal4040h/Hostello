    import React, { useEffect, useState } from 'react'

    export default function User() {

        const [data, setData] = useState(null);

        useEffect(() => {
            fetch("http://localhost/hostello_php/get_user.php", {
                credentials: "include"
            })
                .then(res => res.json())
                .then(d => setData(d));

        }, []);

        if (!data) return <h1>Loading</h1>;
        if (data.status !== "success") return <p>Please log in first.</p>;

        return (
            <div className='bg-gray-200 flex justify-center mt-12 '>
                <div className='w-10/12  bg-white h-[600px]'>
                    <div className='h-[110px] bg-slate-400 flex justify-between' >
                       
                    </div>
                    <div className='h-[190px] bg-slate-300'>
                        <div className='ml-5 mt-1'>

                            <div className='flex '>
                                <label className='text-xl font-extrabold'  >First Name:</label>
                                <h1 className='text-xl ml-3'>{data.user.firstname}</h1>
                            </div>
                            <div className='flex'>
                                <label className='text-xl font-extrabold'>Last Name:</label>
                                <h1 className='text-xl ml-3'>{data.user.lastname}</h1>
                            </div>
                            <div className='flex'>
                                <label className='text-xl font-extrabold'>Email:</label>
                                <h1 className='text-xl ml-3'>{data.user.email}</h1>
                            </div>
                            <div className='flex'>
                                <label className='text-xl font-extrabold'>Gender:</label>
                                <h1 className='text-xl ml-3'>{data.user.gender}</h1>
                            </div>
                            <div className='flex'>
                                <label className='text-xl font-extrabold'>Contact-number:</label>
                                <h1 className='text-xl ml-3'>{data.user.contact_number}</h1>
                            </div>

                        </div>
                    </div>
                    <div className='h-[300px] bg-slate-200 mt-1'>
                        {data.booking && (
                            <div className='ml-5 mt-1'>

                                <div className='flex '>
                                    <label className='text-xl font-extrabold'>Course:</label>
                                    <h1 className='text-xl ml-3'>{data.booking.course}</h1>
                                </div>
                                <div className='flex '>
                                    <label className='text-xl font-extrabold'>Room:</label>
                                    <h1 className='text-xl ml-3'>{data.booking.roomnumber}</h1>
                                </div>
                                <div className='flex '>
                                    <label className='text-xl font-extrabold'>Duration:</label>
                                    <h1 className='text-xl ml-3'>{data.booking.duration}</h1>
                                </div>
                                <div className='flex '>
                                    <label className='text-xl font-extrabold'>food_status</label>
                                    <h1 className='text-xl ml-3'>{data.booking.food_status}</h1>
                                </div>
                                <div className='flex '>
                                    <label className='text-xl font-extrabold'>total_amount</label>
                                    <h1 className='text-xl ml-3'>{data.booking.total_amount}</h1>
                                </div>

                            </div>
                        )
                        }
                    </div>

                </div>

            </div>
        )
    }
