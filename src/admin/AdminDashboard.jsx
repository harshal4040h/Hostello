import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch("http://localhost/hostello_php/check_session.php", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.loggedIn && result.user.role === "admin") {
          setAdmin(result.user);

          // ✅ fetch student + booking details
          fetch("http://localhost/hostello_php/get_all_bookings.php", {
            credentials: "include",
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.status === "success") {
                setStudents(data.data);
              }
            });
        } else {
          navigate("/adminlogin"); // block non-admins
        }
      });
  }, [navigate]);

  return (
    <div className="p-8 min-h-screen bg-slate-900 text-gray-100">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 border-b border-slate-700 pb-4">
          <h1 className="text-3xl font-bold text-white flex items-center gap-2">
            📊 Admin Dashboard
          </h1>
          <p className="text-gray-400">Welcome, {admin?.email}</p>
        </div>

        {/* Table */}
        <div className="bg-slate-800 shadow-xl rounded-xl overflow-hidden border border-slate-700">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-700 text-gray-100 text-sm uppercase tracking-wider">
                <th className="px-6 py-3">ID</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Contact</th>
                <th className="px-6 py-3">Room</th>
                <th className="px-6 py-3">Course</th>
                <th className="px-6 py-3">Duration</th>
                <th className="px-6 py-3">Food</th>
                <th className="px-6 py-3">Total</th>
              </tr>
            </thead>
            <tbody>
              {students.length > 0 ? (
                students.map((s, idx) => (
                  <tr
                    key={idx}
                    className={`text-sm ${
                      idx % 2 === 0 ? "bg-slate-900" : "bg-slate-800"
                    } hover:bg-slate-700 transition`}
                  >
                    <td className="px-6 py-3">{s.id}</td>
                    <td className="px-6 py-3 font-medium text-white">
                      {s.firstname} {s.lastname}
                    </td>
                    <td className="px-6 py-3 text-gray-300">{s.email}</td>
                    <td className="px-6 py-3">{s.contact_number}</td>
                    <td className="px-6 py-3">{s.roomnumber || "-"}</td>
                    <td className="px-6 py-3">{s.course || "-"}</td>
                    <td className="px-6 py-3">{s.duration || "-"}</td>
                    <td className="px-6 py-3">
                      {s.food_status === "yes" ? (
                        <span className="px-2 py-1 text-xs bg-green-600/30 text-green-400 border border-green-600 rounded-full">
                          Yes
                        </span>
                      ) : s.food_status === "no" ? (
                        <span className="px-2 py-1 text-xs bg-red-600/30 text-red-400 border border-red-600 rounded-full">
                          No
                        </span>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="px-6 py-3 font-semibold text-emerald-400">
                      {s.total_amount ? `₹${s.total_amount}` : "-"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="9"
                    className="px-6 py-6 text-center text-gray-400"
                  >
                    No student records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
