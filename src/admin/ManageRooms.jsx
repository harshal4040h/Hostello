import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ManageRooms() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetch("http://localhost/hostello_php/get_all_rooms.php", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Rooms response from PHP:", data);
        if (data.status === "success") {
          setRooms(data.data);
        } else {
          toast.error(data.message || "Failed to load rooms");
        }
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        toast.error("Failed to fetch rooms");
      });
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete room?")) return;
    try {
      const res = await fetch("http://localhost/hostello_php/delete_room.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ id }),
      });
      const result = await res.json();
      if (result.status === "success") {
        setRooms((prev) => prev.filter((r) => r.id !== id));
        toast.success("Room deleted");
      } else {
        toast.error(result.message || "Failed to delete");
      }
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Error deleting room");
    }
  };

  return (
    <div className="bg-slate-800 p-4 rounded-xl">
      <h2 className="text-xl font-bold mb-4 text-white">Manage Rooms</h2>

      <table className="w-full  border-collapse text-center">
        <thead>
          <tr className="bg-slate-700 text-gray-100">
            <th className="px-4 py-2">Room No</th>
            <th className="px-4 py-2">1st Yr</th>
            <th className="px-4 py-2">2nd Yr</th>
            <th className="px-4 py-2">3rd Yr</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rooms.length > 0 ? (
            rooms.map((r) => (
              <tr key={r.id} className="border-b border-slate-600 text-gray-200">
                <td className="px-4 py-2">{r.roomnumber}</td>
                <td className="px-4 py-2">₹{r.c_1year}</td>
                <td className="px-4 py-2">₹{r.c_2year}</td>
                <td className="px-4 py-2">₹{r.c_3year}</td>
                <td className="px-4 py-2">
                  <button className="px-3 py-1 bg-blue-600 rounded mr-2 text-white">
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(r.id)}
                    className="px-3 py-1 bg-red-600 rounded text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="px-4 py-6 text-center text-gray-400">
                No rooms found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
