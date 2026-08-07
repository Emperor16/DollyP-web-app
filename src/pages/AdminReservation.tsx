import { useEffect, useState } from "react";
import AdminLayout from "./Admin/AdminLayout";
import axios from "axios";

interface Reservation {
  _id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  service: string;
  notes: string;
  status: string; // "pending" | "approved" | "completed"
}

const AdminReservation = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/reservations`)
      .then((res) => setReservations(res.data.reservations || []))
      .catch(() => setReservations([]));
  }, []);

  const updateStatus = async (id: string, status: string) => {
    await axios.put(`${import.meta.env.VITE_API_URL}/api/reservations/${id}`, {
      status,
    });

    setReservations((prev) =>
      prev.map((r) => (r._id === id ? { ...r, status } : r))
    );
  };

  const deleteReservation = async (id: string) => {
    if (!confirm("Delete this reservation?")) return;

    await axios.delete(`${import.meta.env.VITE_API_URL}/api/reservations/${id}`);

    setReservations((prev) => prev.filter((r) => r._id !== id));
  };

  return (
    <AdminLayout>
      <h1 className="font-serif text-3xl text-dp-black mb-10 tracking-wide">
        Manage Reservations
      </h1>

      {reservations.length === 0 ? (
        <p className="font-sans text-dp-charcoal/70">No reservations found.</p>
      ) : (
        <div className="space-y-10">
          {reservations.map((res) => (
            <div
              key={res._id}
              className="bg-white p-8 rounded-lg shadow-sm border border-dp-offwhite"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="font-serif text-xl text-dp-black">
                    {res.name}
                  </h2>
                  <p className="font-sans text-sm text-dp-charcoal/70">
                    {res.email} • {res.phone}
                  </p>

                  <p className="font-sans text-sm text-dp-black mt-2">
                    Date: {new Date(res.date).toLocaleDateString()}
                  </p>

                  <p className="font-sans text-sm text-dp-black">
                    Service: {res.service.replace("-", " ")}
                  </p>

                  {res.notes && (
                    <p className="font-sans text-sm text-dp-charcoal/70 mt-2">
                      Notes: {res.notes}
                    </p>
                  )}

                  <p
                    className={`mt-3 font-sans text-sm px-3 py-1 inline-block rounded ${
                      res.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : res.status === "approved"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    Status: {res.status}
                  </p>
                </div>

                {/* ACTION BUTTONS */}
                <div className="flex flex-col gap-3">
                  {res.status === "pending" && (
                    <button
                      onClick={() => updateStatus(res._id, "approved")}
                      className="px-6 py-2 bg-dp-gold text-dp-black rounded hover:bg-dp-velvet hover:text-white transition"
                    >
                      Approve
                    </button>
                  )}

                  {res.status !== "completed" && (
                    <button
                      onClick={() => updateStatus(res._id, "completed")}
                      className="px-6 py-2 border border-dp-black text-dp-black rounded hover:bg-dp-black hover:text-white transition"
                    >
                      Mark Completed
                    </button>
                  )}

                  <button
                    onClick={() => deleteReservation(res._id)}
                    className="px-6 py-2 text-red-600 hover:text-red-800 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminReservation;
