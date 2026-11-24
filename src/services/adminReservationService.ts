import api from "./api";

export type ReservationStatus =
  | "pending"
  | "confirmed"
  | "completed"
  | "cancelled"
  | "declined";

export interface Reservation {
  _id: string;
  fullName: string;
  phone: string;
  email: string;
  measurementType: "in-office" | "home-visit";
  requestedDate: string;
  requestedTime: string;
  address?: string;
  status: ReservationStatus;
  createdAt: string;
  updatedAt: string;
}

type ReservationsResponse = {
  success: boolean;
  message: string;
  data: Reservation[];
};

type ReservationResponse = {
  success: boolean;
  message: string;
  data: Reservation;
};

export async function getReservations() {
  const response =
    await api.get("/api/reservations");

  return response.data.data;
}

export async function updateReservationStatus(
  id: string,
  status: ReservationStatus,
) {
  const response = await api.put<ReservationResponse>(
    `/api/reservations/${id}`,
    { status },
  );

  return response.data.data;
}

export async function deleteReservation(id: string) {
  const response = await api.delete<ReservationResponse>(
    `/api/reservations/${id}`,
  );

  return response.data.data;
}