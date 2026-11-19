import { CalendarDays, Check, UserRound } from "lucide-react";

import type { ReservationFormData } from "../../../types/reservation";

interface AppointmentSummaryProps {
  form: ReservationFormData;
}

const serviceLabels: Record<string, string> = {
  "couture-fitting": "Couture Fitting",
  "custom-design": "Custom Design",
  "bridal-session": "Bridal Session",
  measurement: "Measurement Appointment",
};

const formatDate = (date: string) => {
  if (!date) {
    return "Not selected";
  }

  const parsedDate = new Date(`${date}T00:00:00`);

  return parsedDate.toLocaleDateString("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const AppointmentSummary = ({
  form,
}: AppointmentSummaryProps) => {
  return (
    <aside
      className="
        rounded-[2rem]
        bg-dp-black
        p-7
        text-white
        shadow-[0_28px_70px_rgba(28,24,19,