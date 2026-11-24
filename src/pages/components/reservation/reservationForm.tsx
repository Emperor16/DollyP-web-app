import type { ChangeEvent, FormEvent } from "react";
import { ArrowUpRight, Info } from "lucide-react";

import type {
  MeasurementType,
  ReservationFormData,
} from "../../../types/reservation";

import ReservationField from "./reservationField";
import ServiceSelection from "./serviceSelection";

type ReservationFormProps = {
  form: ReservationFormData;
  onChange: (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
  onServiceChange: (service: MeasurementType) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  isSubmitting?: boolean;
};

const getLocalDateInputValue = () => {
  const now = new Date();
  const timezoneOffset = now.getTimezoneOffset() * 60_000;

  return new Date(now.getTime() - timezoneOffset)
    .toISOString()
    .split("T")[0];
};

const ReservationForm = ({
  form,
  onChange,
  onServiceChange,
  onSubmit,
  isSubmitting = false,
}: ReservationFormProps) => {
  const today = getLocalDateInputValue();
  const isHomeVisit = form.service === "home-visit";

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-[2rem] border border-dp-black/10 bg-white p-6 shadow-[0_24px_70px_rgba(29,25,20,0.07)] sm:p-8 lg:p-10"
    >
      <div className="mb-8">
        <p className="mb-3 font-sans text-[10px] font-medium uppercase tracking-[0.28em] text-dp-gold">
          Reservation Request
        </p>

        <h1 className="font-serif text-3xl text-dp-black sm:text-4xl">
          Book a measurement session
        </h1>

        <p className="mt-3 max-w-2xl font-sans text-sm leading-6 text-dp-charcoal/65">
          Submit your preferred date and time. Your appointment remains
          pending until it has been reviewed and confirmed.
        </p>
      </div>

      <div className="space-y-8">
        <section>
          <p className="mb-4 font-sans text-[10px] font-medium uppercase tracking-[0.28em] text-dp-gold">
            Contact Information
          </p>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <ReservationField
              label="Full Name"
              type="text"
              name="name"
              value={form.name}
              onChange={onChange}
              required
              disabled={isSubmitting}
              autoComplete="name"
              placeholder="Enter your full name"
            />

            <ReservationField
              label="Phone Number"
              type="tel"
              name="phone"
              value={form.phone}
              onChange={onChange}
              required
              disabled={isSubmitting}
              hint= ""
              autoComplete="tel"
              inputMode="tel"
              placeholder="WhatsApp no. preferred"
            />

            <div className="md:col-span-2">
              <ReservationField
                label="Email Address"
                type="email"
                name="email"
                value={form.email}
                onChange={onChange}
                required
                disabled={isSubmitting}
                autoComplete="email"
                placeholder="Enter your email address"
              />
            </div>
          </div>
        </section>

        <section>
          <ServiceSelection
            value={form.service}
            onChange={onServiceChange}
            disabled={isSubmitting}
          />

          {!form.service && (
            <p className="mt-2 font-sans text-xs text-dp-charcoal/50">
              Select where you would like your measurement session to
              take place.
            </p>
          )}
        </section>

        {isHomeVisit && (
          <section className="space-y-5">
            <div className="flex gap-3 rounded-2xl border border-dp-gold/20 bg-dp-gold/10 p-4">
              <Info
                className="mt-0.5 shrink-0 text-dp-gold"
                size={18}
              />

              <p className="font-sans text-sm leading-6 text-dp-charcoal/70">
                Home visits attract an additional charge. The amount
                will be communicated when your reservation request is
                reviewed.
              </p>
            </div>

            <ReservationField
              label="Home Visit Address"
              multiline
              name="address"
              value={form.address}
              onChange={onChange}
              required
              disabled={isSubmitting}
              autoComplete="street-address"
              rows={4}
              placeholder="Enter the full address for the home visit"
            />
          </section>
        )}

        <section>
          <p className="mb-4 font-sans text-[10px] font-medium uppercase tracking-[0.28em] text-dp-gold">
            Preferred Appointment
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
              disabled={isSubmitting}
            />

            <ReservationField
              label="Preferred Time"
              type="time"
              name="time"
              value={form.time}
              onChange={onChange}
              required
              disabled={isSubmitting}
            />
          </div>
        </section>

        <button
          type="submit"
          disabled={isSubmitting || !form.service}
          className="
            inline-flex
            w-full
            items-center justify-center
            gap-2
            rounded-full
            bg-dp-black
            px-7 py-4
            font-sans text-sm font-medium
            text-white
            transition-all duration-300
            hover:bg-dp-gold
            hover:text-dp-black
            disabled:cursor-not-allowed
            disabled:opacity-60
            sm:w-auto
          "
        >
          {isSubmitting
            ? "Submitting request..."
            : "Submit reservation request"}

          {!isSubmitting && (
            <ArrowUpRight size={17} strokeWidth={1.8} />
          )}
        </button>
      </div>
    </form>
  );
};

export default ReservationForm;