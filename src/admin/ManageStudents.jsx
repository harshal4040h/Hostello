import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ManageStudents() {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [form, setForm] = useState({ firstname: "", lastname: "", email: "", contact_number: "" });
  const [showAddModal, setShowAddModal] = useState(false);
  const [newStudent, setNewStudent] = useState({ firstname: "", lastname: "", email: "", contact_number: "", password: "" });

  // fetch all students
  useEffect(() => {
    fetch("http://localhost/hostello_php/get_all_students.php", { credentials: "include" })
      .then(res => res.json())
      .then(data => {
        if (data.status === "success") setStudents(data.data);
      })
      .catch(() => toast.error("Failed to load students"));
  }, []);

  // delete student
  const handleDelete = async (id) => {
    if (!window.confirm("Delete student?")) return;
    try {
      const res = await fetch("http://localhost/hostello_php/delete_student.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ id }),
      });
      const result = await res.json();
      if (result.status === "success") {
        setStudents((prev) => prev.filter((s) => s.id !== id));
        toast.success("Student deleted");
      } else toast.error(result.message || "Failed to delete");
    } catch {
      toast.error("Error deleting student");
    }
  };

  // open edit modal
  const handleEditClick = (student) => {
    setEditingStudent(student.id);
    setForm({
      firstname: student.firstname,
      lastname: student.lastname,
      email: student.email,
      contact_number: student.contact_number,
    });
  };

  // update student
  const handleUpdate = async () => {
    try {
      const res = await fetch("http://localhost/hostello_php/update_student.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ id: editingStudent, ...form }),
      });
      const result = await res.json();
      if (result.status === "success") {
        setStudents((prev) =>
          prev.map((s) => (s.id === editingStudent ? { ...s, ...form } : s))
        );
        toast.success("Student updated");
        setEditingStudent(null);
      } else {
        toast.error(result.message || "Failed to update student");
      }
    } catch {
      toast.error("Error updating student");
    }
  };

  // add student
  const handleAddStudent = async () => {
    try {
      const res = await fetch("http://localhost/hostello_php/add_student.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(newStudent),
      });
      const result = await res.json();
      if (result.status === "success") {
        setStudents((prev) => [...prev, result.data]);
        toast.success("Student added");
        setShowAddModal(false);
        setNewStudent({ firstname: "", lastname: "", email: "", contact_number: "", password: "" });
      } else {
        toast.error(result.message || "Failed to add student");
      }
    } catch {
      toast.error("Error adding student");
    }
  };

  return (
    <div className="bg-slate-800 p-4 rounded-xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-100">Manage Students</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          + Add Student
        </button>
      </div>

      <table className="w-full text-center">
        <thead>
          <tr className="bg-slate-700 text-gray-100">
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Contact</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id} className="border-b border-slate-600 text-gray-100">
              <td className="px-4 py-2">{s.id}</td>
              <td className="px-4 py-2">{s.firstname} {s.lastname}</td>
              <td className="px-4 py-2">{s.email}</td>
              <td className="px-4 py-2">{s.contact_number}</td>
              <td className="px-4 py-2">
                <button
                  onClick={() => handleEditClick(s)}
                  className="px-3 py-1 bg-blue-600 rounded mr-2 text-white"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(s.id)}
                  className="px-3 py-1 bg-red-600 rounded text-white"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 🔹 Edit Modal */}
      {editingStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-96 shadow-xl">
            <h3 className="text-lg font-bold mb-4">Edit Student</h3>

            {["firstname", "lastname", "email", "contact_number"].map((field) => (
              <div className="mb-3" key={field}>
                <label className="block text-sm font-medium mb-1 capitalize">
                  {field.replace("_", " ")}
                </label>
                <input
                  type={field === "email" ? "email" : "text"}
                  value={form[field]}
                  onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                  className="w-full p-2 border rounded"
                />
              </div>
            ))}

            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => setEditingStudent(null)}
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

      {/* 🔹 Add Student Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-96 shadow-xl">
            <h3 className="text-lg font-bold mb-4">Add Student</h3>

            {["firstname", "lastname", "email", "contact_number", "password"].map((field) => (
              <div className="mb-3" key={field}>
                <label className="block text-sm font-medium mb-1 capitalize">
                  {field.replace("_", " ")}
                </label>
                <input
                  type={field === "email" ? "email" : field === "password" ? "password" : "text"}
                  value={newStudent[field]}
                  onChange={(e) => setNewStudent({ ...newStudent, [field]: e.target.value })}
                  className="w-full p-2 border rounded"
                />
              </div>
            ))}

            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleAddStudent}
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
