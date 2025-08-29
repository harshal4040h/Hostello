import React from "react";
import { c_images_1, c_images_2, c_images_3, c_images_4 } from "../UTILS";
import Carousel from "../carousel";
import { Link } from "react-router-dom";

export default function Home() {
  const book = () => {
    return (<Link to="/bookhostel"></Link>);
  };
  return (
    <div className="w-8/12 m-auto bg-gray-200">
      {/* {console.log(c_images_1)} */}
      <h1 className="text-center text-[40px] font-bold my-2 p-2">
        Welcome to Home Page
      </h1>
      {/* First Carousel */}
      <h1 className="text-center text-2xl my-4 font-bold">🧳 Standard </h1>
      <div className="border-b border-black m-4 flex">
        <div className="3/12 p-3">
          <div className="p-4">
            <Carousel img={c_images_1} />
          </div>
        </div>

        <div className="9/12 mx-10 my-14">
          <div>
            <p className="m-2 p-2 text-center text-xl font-semibold"> Comfort meets affordability. Clean, cozy rooms with all the essentials for a pleasant stay. </p>
            <p className="m-2 p-2 text-center text-xl font-bold">₹70000/year</p>
            {/* <p className="m-2 p-2 text-center text-xl font-semibold"></p> */}
          </div>
          <div className="flex justify-center">
            <button className=" bg-green-500 m-4 text-white px-4 py-2 rounded-md hover:bg-600 transition">
              <Link to="/bookhostel?category=standard">Book Now</Link>
            </button>
          </div>
        </div>
      </div>
      {/* Second Carousel */}
      <h1 className="text-center text-2xl my-4 font-bold"> 💼 Executive </h1>
      <div className="border-b border-black m-4 flex">
        <div className="3/12 p-3">
          <div className="p-4">
            <Carousel img={c_images_2} />
          </div>
        </div>

        <div className="9/12 mx-10 my-14">
          <div>
            <p className="m-2 p-2 text-center text-xl font-semibold">A step up in style and convenience. Spacious rooms, modern amenities, and added comfort for working or relaxing.</p>
            <p className="m-2 p-2 text-center text-xl font-bold">₹100000/year</p>
            {/* <p className="m-2 p-2 text-center text-xl font-semibold"></p> */}
          </div>
          <div className="flex justify-center">
            <button className=" bg-green-500 m-4 text-white px-4 py-2 rounded-md hover:bg-600 transition">
              <Link to="/bookhostel?category=executive">Book Now</Link>
            </button>
          </div>
        </div>
      </div>
      {/* Third Carousel */}
      <h1 className="text-center text-2xl my-4 font-bold"> ✨ Premium </h1>
      <div className="border-b border-black m-4 flex">
        <div className="3/12 p-3">
          <div className="p-4">
            <Carousel img={c_images_3} />
          </div>
        </div>

        <div className="9/12 mx-10 my-14">
          <div>
            <p className="m-2 p-2 text-center text-xl font-semibold"> Comfort meets affordability. Clean, cozy rooms with all the essentials for a pleasant stay. </p>
            <p className="m-2 p-2 text-center text-xl font-bold">₹10000/year</p>
            {/* <p className="m-2 p-2 text-center text-xl font-semibold"></p> */}
          </div>
          <div className="flex justify-center">
            <button className=" bg-green-500 m-4 text-white px-4 py-2 rounded-md hover:bg-600 transition">
              <Link to="/bookhostel?category=premium">Book Now</Link>
            </button>
          </div>
        </div>
      </div>
      {/* fourth Carousel */}
      <h1 className="text-center text-2xl my-4 font-bold"> 👑 Royal </h1>
      <div className="border-b border-black m-4 flex">
        <div className="3/12 p-3">
          <div className="p-4">
            <Carousel img={c_images_4} />
          </div>
        </div>

        <div className="9/12 mx-10 my-14">
          <div>
            <p className="m-2 p-2 text-center text-xl font-semibold"> Luxury redefined. Exclusive rooms, premium furnishings, and elite services for those who want the best. </p>
            <p className="m-2 p-2 text-center text-xl font-bold">₹250000/year</p>
            {/* <p className="m-2 p-2 text-center text-xl font-semibold"></p> */}
          </div>
          <div className="flex justify-center">
            <button className=" bg-green-500 m-4 text-white px-4 py-2 rounded-md hover:bg-600 transition">
              <Link to="/bookhostel?category=royal">Book Now</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}