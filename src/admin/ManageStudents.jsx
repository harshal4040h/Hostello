import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ManageStudents() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch("http://localhost/hostello_php/get_all_students.php", { credentials: "include" })
      .then(res => res.json())
      .then(data => {
        if (data.status === "success") setStudents(data.data);
      });
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete student?")) return;
    const res = await fetch("http://localhost/hostello_php/delete_student.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ id }),
    });
    const result = await res.json();
    if (result.status === "success") {
      setStudents(students.filter((s) => s.id !== id));
      toast.success("Student deleted");
    } else toast.error("Failed to delete");
  };

  return (
    <div className="bg-slate-800 p-4 rounded-xl">
      <h2 className="text-xl font-bold mb-4  text-gray-100">Manage Students</h2>
      <table className="w-full text-left">
        <thead>
          <tr className="bg-slate-700  text-gray-100">
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id} className="border-b border-slate-600  text-gray-100">
              <td className="px-4 py-2">{s.id}</td>
              <td className="px-4 py-2">{s.firstname} {s.lastname}</td>
              <td className="px-4 py-2">{s.email}</td>
              <td className="px-4 py-2">
                <button className="px-3 py-1 bg-blue-600 rounded mr-2">Edit</button>
                <button onClick={() => handleDelete(s.id)} className="px-3 py-1 bg-red-600 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
