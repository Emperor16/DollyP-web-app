import type { FormEvent } from "react";

import ReservationField from "./reservationField";
import ServiceSelection from "./serviceSelection";

import type { ReservationFormData } from "../../../types/reservation";

interface ReservationFormProps {
  form: ReservationFormData;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onServiceChange: (service: string) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

const ReservationForm = ({
  form,
  onChange,
  onServiceChange,
  onSubmit,
}: ReservationFormProps) => {
  const today = new Date().toISOString().split("T")[0];

  return (
    <div
      className="
        rounded-[2rem]
        border border-dp-black/5
        bg-white
        p-6
        shadow-[0_24px_70px_rgba(28,24,19,0.08)]
        sm:p-8
        lg:p-10
      "
    >
      <div className="mb-8">
        <p className="font-sans text-[10px] font-medium uppercase tracking-[0.28em] text-dp-gold">
          Reservation Details
        </p>

        <h2 className="mt-3 font-serif text-3xl tracking-[-0.025em] text-dp-black">
          Your details
        </h2>
      </div>

      <form onSubmit={onSubmit} className="space-y-7">
        <ReservationField
          label="Full Name"
          type="text"
          name="name"
          value={form.name}
          onChange={onChange}
          autoComplete="name"
          placeholder="Full name"
          required
        />

        <div className="grid gap-6 md:grid-cols-2">
          <ReservationField
            label="Email Address"
            type="email"
            name="email"
            value={form.email}
            onChange={onChange}
            autoComplete="email"
            placeholder="Email address"
            required
          />

          <ReservationField
            label="Phone Number"
            type="tel"
            name="phone"
            value={form.phone}
            onChange={onChange}
            autoComplete="tel"
            placeholder="Phone number"
            required
          />
        </div>

        <div>
          <ReservationField
            label="Preferred Date"
            type="date"
            name="date"
            value={form.date}
            onChange={onChange}
            min={today}
            required
          />
        </div>

        <ServiceSelection
          value={form.service}
          onChange={onServiceChange}
        />

        <ReservationField
          label="Additional Notes"
          name="notes"
          value={form.notes}
          onChange={onChange}
          placeholder="Anything we should know before your appointment?"
          rows={4}
          multiline
        />

        <button
          type="submit"
          className="
            group
            flex w-full
            items-center justify-center
            gap-3
            rounded-full
            bg-dp-black
            px-7 py-4
            font-sans text-sm font-medium
            text-white
            shadow-[0_12px_30px_rgba(28,24,19,0.16)]
            transition-all duration-300
            hover:-translate-y-0.5
            hover:bg-dp-gold
            hover:text-dp-black
            hover:shadow-[0_16px_35px_rgba(198,157,93,0.20)]
          "
        >
          Request Appointment

          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </button>
      </form>
    </div>
  );
};

export default ReservationForm;