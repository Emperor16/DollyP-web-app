export type MeasurementType = "in-office" | "home-visit";

export type ReservationFormData = {
  name: string;
  phone: string;
  email: string;
  service: MeasurementType | "";
  date: string;
  time: string;
  address: string;
};

export const initialReservationForm: ReservationFormData = {
  name: "",
  phone: "",
  email: "",
  service: "",
  date: "",
  time: "",
  address: "",
};