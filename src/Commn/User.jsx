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
            if (d.status === "success") {
            setForm({
                firstname: d.user.firstname,
                lastname: d.user.lastname,
                gender: d.user.gender,
                contact_number: d.user.contact_number,
            });
            }
        });
    }, []);

    if (!data) return <h1>Loading</h1>;
    if (data.status !== "success") return <p>Please log in first.</p>;

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
        alert("Profile updated successfully");
        setData({
            ...data,
            user: {
            ...data.user,
            ...form,
            },
        });
        setShowUpdate(false);
        } else {
        alert("Failed to update user");
        }
    };

    return (
        <div className="bg-gray-200 flex justify-center mt-12 relative">
        <div className="w-10/12 bg-white h-[600px] relative">
            {/* Header with Update button */}
            <div className="h-[110px] bg-slate-400 flex justify-end items-center pr-5">
            <button
                onClick={openUpdate}
                className="flex p-2.5 bg-blue-500 rounded-xl hover:rounded-3xl hover:bg-blue-600 transition-all duration-300 text-white"
            >
                <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
                </svg>
            </button>
            </div>

            {/* User info */}
            <div className="h-[190px] bg-slate-300 p-5">
            <div className="flex">
                <label className="text-xl font-extrabold">First Name:</label>
                <h1 className="text-xl ml-3">{data.user.firstname}</h1>
            </div>
            <div className="flex">
                <label className="text-xl font-extrabold">Last Name:</label>
                <h1 className="text-xl ml-3">{data.user.lastname}</h1>
            </div>
            <div className="flex">
                <label className="text-xl font-extrabold">Email:</label>
                <h1 className="text-xl ml-3">{data.user.email}</h1>
            </div>
            <div className="flex">
                <label className="text-xl font-extrabold">Gender:</label>
                <h1 className="text-xl ml-3">{data.user.gender}</h1>
            </div>
            <div className="flex">
                <label className="text-xl font-extrabold">Contact-number:</label>
                <h1 className="text-xl ml-3">{data.user.contact_number}</h1>
            </div>
            </div>

            {/* Booking info */}
            <div className="h-[300px] bg-slate-200 mt-1 p-5">
            {data.booking && (
                <>
                <div className="flex">
                    <label className="text-xl font-extrabold">Course:</label>
                    <h1 className="text-xl ml-3">{data.booking.course}</h1>
                </div>
                <div className="flex">
                    <label className="text-xl font-extrabold">Room:</label>
                    <h1 className="text-xl ml-3">{data.booking.roomnumber}</h1>
                </div>
                <div className="flex">
                    <label className="text-xl font-extrabold">Duration:</label>
                    <h1 className="text-xl ml-3">{data.booking.duration}</h1>
                </div>
                <div className="flex">
                    <label className="text-xl font-extrabold">Food_status:</label>
                    <h1 className="text-xl ml-3">{data.booking.food_status}</h1>
                </div>
                <div className="flex">
                    <label className="text-xl font-extrabold">Total_amount:</label>
                    <h1 className="text-xl ml-3">{data.booking.total_amount}</h1>
                </div>
                </>
            )}
            </div>
            
            {/* Update Modal */}
            {showUpdate && (
            <form
                onSubmit={handleSubmit}
                className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            >
                <div className="bg-white p-6 rounded-xl shadow-xl w-1/2">
                <h2 className="text-2xl font-bold mb-4">Update Info</h2>

                First Name:
                <input
                    type="text"
                    name="firstname"
                    value={form.firstname}
                    onChange={handleChange}
                    className="w-full p-2 mb-3 border rounded"
                />
                Last Name:
                <input
                    type="text"
                    name="lastname"
                    value={form.lastname}
                    onChange={handleChange}
                    className="w-full p-2 mb-3 border rounded"
                />
                Gender:
                <input
                    type="text"
                    name="gender"
                    value={form.gender}
                    onChange={handleChange}
                    className="w-full p-2 mb-3 border rounded"
                />
                Contact Number:
                <input
                    type="text"
                    name="contact_number"
                    value={form.contact_number}
                    onChange={handleChange}
                    className="w-full p-2 mb-3 border rounded"
                />

                <div className="flex justify-end space-x-3 mt-4">
                    <button
                    type="button"
                    onClick={closeUpdate}
                    className="px-4 py-2 bg-gray-400 rounded hover:bg-gray-500 text-white"
                    >
                    Cancel
                    </button>
                    <button
                    type="submit"
                    className="bg-gray-950 px-4 py-2 text-gray-400 border border-gray-400 border-b-4 font-medium overflow-hidden relative rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group"
                    >
                    <span className="bg-gray-400 shadow-gray-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
                    Update
                    </button>
                </div>
                <h1></h1>
                </div>
            </form>
            )}
        </div>
        </div>
    );
    }
