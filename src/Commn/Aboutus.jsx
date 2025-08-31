import React from "react";

export default function AboutUs() {
  return (
    <div className="bg-slate-900 min-h-screen text-gray-200 px-6 py-12">
      <h1 className="text-center text-3xl font-bold text-white mb-8">
        About Us
      </h1>

      <div className="max-w-5xl mx-auto bg-slate-800 rounded-2xl shadow-lg p-8">
        
        {/* Introduction */}
        <section className="mb-10 text-center">
          <h2 className="text-2xl font-semibold text-emerald-400 mb-4">
            Welcome to Hostello
          </h2>
          <p className="text-gray-300 leading-relaxed">
            At <b>Hostello</b>, we provide safe, affordable, and comfortable 
            hostel facilities for students and working professionals. 
            Our mission is to make hostel living stress-free by 
            offering modern amenities, hygienic food, and a friendly environment.
          </p>
        </section>

        {/* Mission & Vision */}
        <section className="grid md:grid-cols-2 gap-8 text-center">
          <div className="bg-slate-700 p-6 rounded-xl shadow">
            <h3 className="text-xl font-bold text-white mb-3">Our Mission</h3>
            <p className="text-gray-300">
              To provide a second home for students with quality living, 
              good food, and a peaceful environment where they can focus 
              on their studies and career growth.
            </p>
          </div>

          <div className="bg-slate-700 p-6 rounded-xl shadow">
            <h3 className="text-xl font-bold text-white mb-3">Our Vision</h3>
            <p className="text-gray-300">
              To become the most trusted and preferred hostel provider 
              across the country by maintaining high standards of comfort, 
              security, and hospitality.
            </p>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="mt-10">
          <h3 className="text-2xl font-semibold text-center text-emerald-400 mb-6">
            Why Choose Us?
          </h3>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="bg-slate-700 p-5 rounded-lg shadow">
              <h4 className="font-bold text-white mb-2">🏠 Comfortable Rooms</h4>
              <p className="text-gray-300">Well-furnished rooms with proper ventilation and cleanliness.</p>
            </div>
            <div className="bg-slate-700 p-5 rounded-lg shadow">
              <h4 className="font-bold text-white mb-2">🍴 Healthy Food</h4>
              <p className="text-gray-300">Nutritious meals prepared in a hygienic kitchen.</p>
            </div>
            <div className="bg-slate-700 p-5 rounded-lg shadow">
              <h4 className="font-bold text-white mb-2">🔒 24/7 Security</h4>
              <p className="text-gray-300">CCTV surveillance and dedicated staff for safety.</p>
            </div>
          </div>
        </section>

        {/* Footer Quote */}
        <section className="mt-12 text-center">
          <p className="text-lg italic text-gray-400">
            “Hostel life is not just about staying, it’s about learning, sharing, 
            and growing together.”
          </p>
        </section>
      </div>
    </div>
  );
}
