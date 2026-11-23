import type { ReservationFormData } from "../types/reservation";

const API_URL =
  import.meta.env.VITE_API_URL?.replace(/\/$/, "") ||
  "http://localhost:5000";

export type CreatedReservation = {
  _id: string;
  fullName: string;
  phone: string;
  email: string;
  measurementType: "in-office" | "home-visit";
  requestedDate: string;
  requestedTime: string;
  address?: string;
  status: "pending" | "confirmed" | "completed" | "cancelled" | "declined";
  createdAt: string;
  updatedAt: string;
};

type CreateReservationResponse = {
  success: boolean;
  message: string;
  data: CreatedReservation;
};

export async function createReservation(
  form: ReservationFormData,
): Promise<CreateReservationResponse> {
  if (!form.service) {
    throw new Error("Please select a measurement type.");
  }

  const payload = {
    fullName: form.name.trim(),
    phone: form.phone.trim(),
    email: form.email.trim(),
    measurementType: form.service,
    requestedDate: form.date,
    requestedTime: form.time,
    address:
      form.service === "home-visit"
        ? form.address.trim()
        : undefined,
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
      data?.message ||
        `Reservation request failed (${response.status})`,
    );
  }

  if (!data?.success) {
    throw new Error(
      data?.message || "Failed to create reservation",
    );
  }

  return data as CreateReservationResponse;
}