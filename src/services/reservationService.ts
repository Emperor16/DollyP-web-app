import type { ReservationFormData } from "../types/reservation";

const API_URL =
  import.meta.env.VITE_API_URL?.replace(/\/$/, "") ||
  "http://localhost:5000";

export async function createReservation(form: ReservationFormData) {
  const payload = {
    fullName: form.name,
    email: form.email,
    phone: form.phone,
    date: form.date,
    measurementType: form.service,
    address: form.notes || "",
  };

  const response = await fetch(`${API_URL}/api/reservations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      data?.message || `Reservation request failed (${response.status})`,
    );
  };

  if (!response.ok || !data.success) {
  throw new Error(data.message || "Failed to create reservation");
}

  return data;
}