export type ReservationFormData = {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  service: string;
  address: string;
  notes: string;
};

export const initialReservationForm: ReservationFormData = {
  name: "",
  email: "",
  phone: "",
  date: "",
  time: "",
  service: "",
  address: "",
  notes: "",
};