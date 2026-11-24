import { useEffect, useState } from "react";

import AdminLayout from "./AdminLayout";

import {
  deleteReservation,
  getReservations,
  updateReservationStatus,
  type Reservation,
  type ReservationStatus,
} from "../../services/adminReservationService";

import axios from "axios";

const AdminReservation = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadReservations = async () => {
      try {
        setIsLoading(true);
        setError("");

        const data = await getReservations();

        console.log("Reservations:", data);

        setReservations(data);
      } } catch (error) {
  if (axios.isAxiosError(error)) {
    console.error("GET reservations diagnostics:", {
      requestUrl: error.config?.url,
      baseURL: error.config?.baseURL,
      finalStatus: error.response?.status,
      responseData: error.response?.data,
      authorizationHeader:
        error.config?.headers?.Authorization,
    });
  } else {
    console.error("Non-Axios error:", error);
  }

  setError("Failed to load reservations.");
}
      } finally {
        setIsLoading(false);
      }
    };

    loadReservations();
  }, []);

  const handleUpdateStatus = async (
    id: string,
    status: ReservationStatus,
  ) => {
    try {
      const updatedReservation =
        await updateReservationStatus(id, status);

      setReservations((current) =>
        current.map((reservation) =>
          reservation._id === id
            ? updatedReservation
            : reservation,
        ),
      );
    } catch (error) {
      console.error("Failed to update reservation:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this reservation?")) {
      return;
    }

    try {
      await deleteReservation(id);

      setReservations((current) =>
        current.filter(
          (reservation) => reservation._id !== id,
        ),
      );
    } catch (error) {
      console.error("Failed to delete reservation:", error);
    }
  };

  return (
    <AdminLayout>
      <h1 className="mb-10 font-serif text-3xl tracking-wide text-dp-black">
        Manage Reservations
      </h1>

      {isLoading && (
        <p className="font-sans text-dp-charcoal/70">
          Loading reservations...
        </p>
      )}

      {!isLoading && error && (
        <p className="font-sans text-red-600">
          {error}
        </p>
      )}

      {!isLoading && !error && reservations.length === 0 && (
        <p className="font-sans text-dp-charcoal/70">
          No reservations found.
        </p>
      )}

      {!isLoading && !error && reservations.length > 0 && (
        <div className="space-y-10">
          {reservations.map((reservation) => (
            <div
              key={reservation._id}
              className="rounded-lg border border-dp-offwhite bg-white p-8 shadow-sm"
            >
              <div className="flex items-start justify-between gap-8">
                <div>
                  <h2 className="font-serif text-xl text-dp-black">
                    {reservation.fullName}
                  </h2>

                  <p className="font-sans text-sm text-dp-charcoal/70">
                    {reservation.email} • {reservation.phone}
                  </p>

                  <p className="mt-2 font-sans text-sm text-dp-black">
                    Date:{" "}
                    {new Date(
                      reservation.requestedDate,
                    ).toLocaleDateString()}
                  </p>

                  <p className="font-sans text-sm text-dp-black">
                    Time: {reservation.requestedTime}
                  </p>

                  <p className="font-sans text-sm text-dp-black">
                    Measurement:{" "}
                    {reservation.measurementType.replace(
                      "-",
                      " ",
                    )}
                  </p>

                  {reservation.address && (
                    <p className="mt-2 font-sans text-sm text-dp-charcoal/70">
                      Address: {reservation.address}
                    </p>
                  )}

                  <p className="mt-3 inline-block rounded bg-yellow-100 px-3 py-1 font-sans text-sm text-yellow-700">
                    Status: {reservation.status}
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  {reservation.status === "pending" && (
                    <>
                      <button
                        onClick={() =>
                          handleUpdateStatus(
                            reservation._id,
                            "confirmed",
                          )
                        }
                        className="rounded bg-dp-gold px-6 py-2 text-dp-black transition hover:bg-dp-velvet hover:text-white"
                      >
                        Confirm
                      </button>

                      <button
                        onClick={() =>
                          handleUpdateStatus(
                            reservation._id,
                            "declined",
                          )
                        }
                        className="rounded border border-red-300 px-6 py-2 text-red-600 transition hover:bg-red-50"
                      >
                        Decline
                      </button>
                    </>
                  )}

                  {reservation.status === "confirmed" && (
                    <button
                      onClick={() =>
                        handleUpdateStatus(
                          reservation._id,
                          "completed",
                        )
                      }
                      className="rounded border border-dp-black px-6 py-2 text-dp-black transition hover:bg-dp-black hover:text-white"
                    >
                      Mark Completed
                    </button>
                  )}

                  <button
                    onClick={() =>
                      handleDelete(reservation._id)
                    }
                    className="px-6 py-2 text-red-600 transition hover:text-red-800"
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