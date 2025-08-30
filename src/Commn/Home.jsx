import React from "react";
import { c_images_1, c_images_2, c_images_3, c_images_4 } from "../UTILS";
import { Link } from "react-router-dom";

export default function Home() {
  const categories = [
    {
      title: "🧳 Standard",
      desc: "Comfort meets affordability. Clean, cozy rooms with all the essentials for a pleasant stay.",
      price: "₹70,000 / year",
      img: c_images_1[0],
      slug: "standard",
    },
    {
      title: "💼 Executive",
      desc: "A step up in style and convenience. Spacious rooms, modern amenities, and added comfort for working or relaxing.",
      price: "₹1,00,000 / year",
      img: c_images_2[0],
      slug: "executive",
    },
    {
      title: "✨ Premium",
      desc: "Premium comfort with elegant interiors and modern facilities for a sophisticated experience.",
      price: "₹1,50,000 / year",
      img: c_images_3[0],
      slug: "premium",
    },
    {
      title: "👑 Royal",
      desc: "Luxury redefined. Exclusive rooms, premium furnishings, and elite services for those who want the best.",
      price: "₹2,50,000 / year",
      img: c_images_4[0],
      slug: "royal",
    },
  ];

  return (
    <div className="bg-slate-900 min-h-screen text-gray-200">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-600 to-teal-700 py-20 text-center shadow-lg">
        <h1 className="text-5xl font-extrabold mb-4 text-white drop-shadow-md tracking-wide">
          Welcome to Hostello 🏡
        </h1>
        <p className="text-lg max-w-2xl mx-auto opacity-90 text-gray-100 italic">
          Pick your perfect stay — from affordable comfort to premium luxury.
        </p>
      </section>

      {/* Rooms Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold text-white text-center mb-12 relative inline-block">
          Our Rooms
          <span className="block w-16 h-1 bg-emerald-500 mx-auto mt-3 rounded-full shadow-[0_0_8px_#10b981]"></span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {categories.map((c, idx) => {
            const [amount, perYear] = c.price.split("/"); // split ₹70,000 and year
            return (
              <div
                key={idx}
                className="bg-slate-800 rounded-2xl shadow-xl hover:shadow-emerald-500/20 transform hover:-translate-y-2 transition duration-300 overflow-hidden"
              >
                {/* Image */}
                <div className="relative w-full aspect-[4/3] overflow-hidden">
                  <img
                    src={c.img}
                    alt={c.title}
                    className="w-full h-full object-cover hover:scale-105 transition duration-500"
                  />
                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col justify-between h-56">
                  <h3 className="text-2xl font-bold text-white drop-shadow-sm mb-2 tracking-wide">
                    {c.title}
                  </h3>
                  <p className="text-gray-300 text-base leading-relaxed mb-4 italic">
                    {c.desc}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-xl font-bold drop-shadow-sm">
                      <span className="text-white">{amount}</span>
                      <span className="text-white"> /{perYear}</span>
                    </span>
                    <Link to={`/bookhostel?category=${c.slug}`}>
                      <button
                        className="bg-gray-950 text-gray-400 border mt-2 border-gray-400 border-b-4 
                        font-medium overflow-hidden relative px-4 py-2 rounded-md 
                        hover:brightness-150 hover:border-t-4 hover:border-b 
                        active:opacity-75 outline-none duration-300 group"
                      >
                        <span
                          className="bg-gray-400 shadow-gray-400 absolute -top-[150%] left-0 
                          inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] 
                          duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"
                        ></span>
                        Book Now
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
  