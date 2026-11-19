import {
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";

import PageContainer from "../components/layout/PageContainer";

import AppointmentSummary from "./components/reservation/appointmentSummary";
import ReservationForm from "./components/reservation/reservationForm";
import ReservationHeader from "./components/reservation/reservationHeader";

import {
  initialReservationForm,
  type ReservationFormData,
} from "../types/reservation";

const Reservation = () => {
  const [form, setForm] = useState<ReservationFormData>(
    initialReservationForm,
  );

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleServiceChange = (service: string) => {
    setForm((current) => ({
      ...current,
      service,
    }));
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    try {
      setIsSubmitting(true);

      // Connect to the reservation API here.
      console.log("Reservation submitted:", form);
    } catch (error) {
      console.error("Failed to submit reservation:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f7f3ed]">
      <ReservationHeader />

      <PageContainer>
        <div
          className="
            grid
            items-start
            gap-6
            py-10
            sm:py-12
            lg:grid-cols-[minmax(0,1.65fr)_minmax(300px,0.75fr)]
            lg:gap-8
            lg:py-16
          "
        >
          <ReservationForm
            form={form}
            onChange={handleChange}
            onServiceChange={handleServiceChange}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />

          <AppointmentSummary form={form} />
        </div>
      </PageContainer>
    </main>
  );
};

export default Reservation;