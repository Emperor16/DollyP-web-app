import { CalendarDays, Check, UserRound } from "lucide-react";

import type { ReservationFormData } from "../../../types/reservation";

type AppointmentSummaryProps = {
  form: ReservationFormData;
};

const serviceLabels: Record<string, string> = {
  "couture-fitting": "Couture Fitting",
  "custom-design": "Custom Design",
  "bridal-session": "Bridal Session",
  measurement: "Measurements",
};

const formatDate = (value: string) => {
  if (!value) {
    return "Not selected";
  }

  const date = new Date(`${value}T00:00:00`);

  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
};

const AppointmentSummary = ({
  form,
}: AppointmentSummaryProps) => {
  const service = form.service
    ? serviceLabels[form.service] || form.service
    : "Not selected";

  return (
    <aside
      className="
        overflow-hidden
        rounded-3xl
        bg-dp-black
        text-white
        shadow-[0_24px_65px_rgba(0,0,0,0.18)]
        lg:sticky
        lg:top-28
      "
    >
      <div className="p-7 sm:p-8">
        <p className="font-sans text-[10px] font-medium uppercase tracking-[0.3em] text-dp-gold">
          Your Appointment
        </p>

        <h2 className="mt-3 font-serif text-3xl tracking-[-0.025em] text-white">
          At a Glance
        </h2>

        <p className="mt-3 font-sans text-sm leading-6 text-white/50">
          Your reservation details will appear here as you complete the form.
        </p>

        <div className="mt-8 divide-y divide-white/10">
          <div className="flex gap-4 py-5 first:pt-0">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-dp-gold/10 text-dp-gold">
              <UserRound size={18} strokeWidth={1.5} />
            </div>

            <div className="min-w-0">
              <p className="font-sans text-[10px] uppercase tracking-[0.16em] text-white/40">
                Client
              </p>

              <p className="mt-1 truncate font-sans text-sm font-medium text-white">
                {form.name || "Your name"}
              </p>
            </div>
          </div>

          <div className="flex gap-4 py-5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-dp-gold/10 text-dp-gold">
              <CalendarDays size={18} strokeWidth={1.5} />
            </div>

            <div>
              <p className="font-sans text-[10px] uppercase tracking-[0.16em] text-white/40">
                Preferred Date
              </p>

              <p className="mt-1 font-sans text-sm font-medium text-white">
                {formatDate(form.date)}
              </p>
            </div>
          </div>

          <div className="flex gap-4 py-5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-dp-gold/10 text-dp-gold">
              <Check size={18} strokeWidth={1.7} />
            </div>

            <div>
              <p className="font-sans text-[10px] uppercase tracking-[0.16em] text-white/40">
                Service
              </p>

              <p className="mt-1 font-sans text-sm font-medium text-white">
                {service}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 bg-white/[0.035] px-7 py-6 sm:px-8">
        <div className="flex gap-3">
          <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-dp-gold" />

          <p className="font-sans text-xs leading-6 text-white/50">
            Submitting the form sends a reservation request. Appointment
            confirmation happens separately.
          </p>
        </div>
      </div>
    </aside>
  );
};

export default AppointmentSummary;