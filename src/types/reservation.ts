export type ReservationFormData = {
  name: string;
  email: string;
  phone: string;
  date: string;
  service: string;
  notes: string;
};

export const initialReservationForm: ReservationFormData = {
  name: "",
  email: "",
  phone: "",
  date: "",
  service: "",
  notes: "",
};