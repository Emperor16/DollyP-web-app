import type { ChangeEvent, FormEvent } from "react";
import { ArrowUpRight } from "lucide-react";

import type { ReservationFormData } from "../../../types/reservation";
import ReservationField from "./reservationField";
import ServiceSelection from "./serviceSelection";

type ReservationFormProps = {
  form: ReservationFormData;
  onChange: (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
  onServiceChange: (service: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  isSubmitting?: boolean;
};

const ReservationForm = ({
  form,
  onChange,
  onServiceChange,
  onSubmit,
  isSubmitting = false,
}: ReservationFormProps) => {
  const today = new Date().toISOString().split("T")[0];

  return (
    <form
      onSubmit={onSubmit}
      className="
        rounded-3xl
        border border-dp-black/5
        bg-white
        p-6
        shadow-[0_18px_55px_rgba(28,24,19,0.07)]
        sm:p-8
        lg:p-10
      "
    >
      <div className="mb-8">
        <p className="font-sans text-[10px] font-medium uppercase tracking-[0.28em] text-dp-gold">
          Your Details
        </p>

        <h2 className="mt-3 font-serif text-3xl tracking-[-0.025em] text-dp-black">
          Reservation Details
        </h2>

        <p className="mt-3 max-w-xl font-sans text-sm leading-6 text-dp-charcoal/55">
          Tell us how to reach you and choose your preferred appointment.
        </p>
      </div>

      <div className="space-y-7">
        <ReservationField
          label="Full Name"
          type="text"
          name="name"
          value={form.name}
          onChange={onChange}
          required
          autoComplete="name"
          placeholder="Your full name"
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <ReservationField
            label="Email Address"
            type="email"
            name="email"
            value={form.email}
            onChange={onChange}
            required
            autoComplete="email"
            placeholder="you@example.com"
          />

          <ReservationField
            label="Phone Number"
            type="tel"
            name="phone"
            value={form.phone}
            onChange={onChange}
            required
            autoComplete="tel"
            placeholder="Your phone number"
          />
        </div>

        <div>
  <p className="mb-4 font-sans text-[10px] font-medium uppercase tracking-[0.28em] text-dp-gold">
    Appointment
  </p>

  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
    <ReservationField
      label="Preferred Date"
      type="date"
      name="date"
      min={today}
      value={form.date}
      onChange={onChange}
      required
    />

    <ReservationField
      label="Preferred Time"
      type="time"
      name="time"
      value={form.time}
      onChange={onChange}
      required
    />
  </div>
</div>

        <ServiceSelection
          value={form.service}
          onChange={onServiceChange}
        />

        <ReservationField
          label="Additional Notes"
          multiline
          name="notes"
          value={form.notes}
          onChange={onChange}
          rows={4}
          placeholder="Measurements, occasion, preferred style, or anything else we should know..."
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="
            group
            flex w-full
            items-center justify-center
            gap-3
            rounded-2xl
            bg-dp-black
            px-6 py-4
            font-sans text-sm font-medium
            text-white
            shadow-[0_12px_30px_rgba(28,24,19,0.14)]
            transition-all duration-300
            hover:-translate-y-0.5
            hover:bg-dp-gold
            hover:text-dp-black
            hover:shadow-[0_16px_38px_rgba(198,157,93,0.22)]
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >
          {isSubmitting ? "Submitting..." : "Request Appointment"}

          {!isSubmitting && (
            <ArrowUpRight
              size={16}
              strokeWidth={1.6}
              className="
                transition-transform duration-300
                group-hover:translate-x-0.5
                group-hover:-translate-y-0.5
              "
            />
          )}
        </button>
      </div>
    </form>
  );
};

export default ReservationForm;