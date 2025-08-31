import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ManageRooms() {
  const [rooms, setRooms] = useState([]);
  const [editingRoom, setEditingRoom] = useState(null);
  const [form, setForm] = useState({
    roomnumber: "",
    c_1year: "",
    c_2year: "",
    c_3year: "",
  });

  // ✅ Load rooms
  useEffect(() => {
    fetch("http://localhost/hostello_php/get_all_rooms.php", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setRooms(data.data);
        } else {
          toast.error(data.message || "Failed to load rooms");
        }
      })
      .catch((err) => {
        console.error("Fetch rooms error:", err);
        toast.error("Failed to fetch rooms");
      });
  }, []);

  // ✅ Delete room
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

  // ✅ Open edit modal
  const handleEditClick = (room) => {
    setEditingRoom(room.id);
    setForm({
      roomnumber: room.roomnumber,
      c_1year: room.c_1year,
      c_2year: room.c_2year,
      c_3year: room.c_3year,
    });
  };

  // ✅ Update room
  const handleUpdate = async () => {
    try {
      const res = await fetch("http://localhost/hostello_php/update_room.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ id: editingRoom, ...form }),
      });

      const text = await res.text(); // raw
      console.log("Update response raw:", text);

      let result;
      try {
        result = JSON.parse(text);
      } catch {
        toast.error("Invalid server response");
        return;
      }

      if (result.status === "success") {
        setRooms((prev) =>
          prev.map((r) =>
            r.id === editingRoom ? { ...r, ...form } : r
          )
        );
        toast.success("Room updated");
        setEditingRoom(null);
      } else {
        toast.error(result.message || "Failed to update room");
      }
    } catch (err) {
      console.error("Update error:", err);
      toast.error("Error updating room");
    }
  };

  return (
    <div className="bg-slate-800 p-4 rounded-xl">
      <h2 className="text-xl font-bold mb-4 text-white">Manage Rooms</h2>

      {/* ✅ Rooms Table */}
      <table className="w-full border-collapse text-center">
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
              <tr
                key={r.id}
                className="border-b border-slate-600 text-gray-200"
              >
                <td className="px-4 py-2">{r.roomnumber}</td>
                <td className="px-4 py-2">₹{r.c_1year}</td>
                <td className="px-4 py-2">₹{r.c_2year}</td>
                <td className="px-4 py-2">₹{r.c_3year}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleEditClick(r)}
                    className="px-3 py-1 bg-blue-600 rounded mr-2 text-white"
                  >
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
              <td
                colSpan="5"
                className="px-4 py-6 text-center text-gray-400"
              >
                No rooms found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* ✅ Edit Modal */}
      {editingRoom && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-96 shadow-xl">
            <h3 className="text-lg font-bold mb-4">Edit Room</h3>

            {["roomnumber", "c_1year", "c_2year", "c_3year"].map((field) => (
              <div className="mb-3" key={field}>
                <label className="block text-sm font-medium mb-1">
                  {field === "roomnumber"
                    ? "Room Number"
                    : field === "c_1year"
                    ? "1st Year Fee"
                    : field === "c_2year"
                    ? "2nd Year Fee"
                    : "3rd Year Fee"}
                </label>
                <input
                  type={field === "roomnumber" ? "text" : "number"}
                  value={form[field]}
                  onChange={(e) =>
                    setForm({ ...form, [field]: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                />
              </div>
            ))}

            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => setEditingRoom(null)}
                className="px-4 py-2 bg-gray-500 text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
