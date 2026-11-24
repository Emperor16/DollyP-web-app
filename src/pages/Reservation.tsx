import {
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";

import PageContainer from "../components/layout/PageContainer";

import AppointmentSummary from "./components/reservation/appointmentSummary";
import ReservationForm from "./components/reservation/reservationForm";
import ReservationHeader from "./components/reservation/reservationHeader";

import { createReservation } from "../services/reservationService";

import {
  initialReservationForm,
  type MeasurementType,
  type ReservationFormData,
} from "../types/reservation";

type SubmissionMessage = {
  type: "success" | "error";
  text: string;
} | null;

const Reservation = () => {
  const [form, setForm] = useState<ReservationFormData>(
    initialReservationForm,
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionMessage, setSubmissionMessage] =
    useState<SubmissionMessage>(null);

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

  setSubmissionMessage(null);
};


  const handleServiceChange = (service: MeasurementType) => {
    setForm((current) => ({
      ...current,
      service,
      address:
        service === "home-visit" ? current.address : "",
    }));

    setSubmissionMessage(null);
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    setSubmissionMessage(null);

    if (form.service === "home-visit" && !form.address.trim()) {
      setSubmissionMessage({
        type: "error",
        text: "Please provide the address for your home visit.",
      });
      return;
    }

    try {
      setIsSubmitting(true);

      await createReservation(form);

      setSubmissionMessage({
        type: "success",
        text: "Your reservation request has been submitted. It is pending review, and we will contact you after it has been reviewed.",
      });

      setForm(initialReservationForm);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to submit your reservation request.";

      setSubmissionMessage({
        type: "error",
        text: message,
      });
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
          <div>
            {submissionMessage && (
              <div
                role={
                  submissionMessage.type === "error"
                    ? "alert"
                    : "status"
                }
                aria-live="polite"
                className={`
                  mb-5 rounded-2xl border px-5 py-4
                  font-sans text-sm leading-6
                  ${
                    submissionMessage.type === "success"
                      ? "border-green-700/20 bg-green-50 text-green-900"
                      : "border-red-700/20 bg-red-50 text-red-900"
                  }
                `}
              >
                {submissionMessage.text}
              </div>
            )}

            <ReservationForm
              form={form}
              onChange={handleChange}
              onServiceChange={handleServiceChange}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
            />
          </div>

          <AppointmentSummary form={form} />
        </div>
      </PageContainer>
    </main>
  );
};

export default Reservation;