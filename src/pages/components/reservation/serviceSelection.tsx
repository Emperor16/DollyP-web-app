import { Building2, Check, House } from "lucide-react";
import type { MeasurementType } from "../../../types/reservation";

const services: Array<{
  value: MeasurementType;
  label: string;
  description: string;
  icon: typeof Building2;
}> = [
  {
    value: "in-office",
    label: "In-office Measurement",
    description: "Visit our studio for your measurement session.",
    icon: Building2,
  },
  {
    value: "home-visit",
    label: "Home Visit",
    description: "Request a measurement session at your address.",
    icon: House,
  },
];

type ServiceSelectionProps = {
  value: MeasurementType | "";
  onChange: (service: MeasurementType) => void;
  disabled?: boolean;
};

const ServiceSelection = ({
  value,
  onChange,
  disabled = false,
}: ServiceSelectionProps) => {
  return (
    <fieldset disabled={disabled}>
      <legend className="mb-3 font-sans text-xs font-medium uppercase tracking-[0.08em] text-dp-charcoal/65">
        Measurement Type
      </legend>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {services.map((service) => {
          const isSelected = service.value === value;
          const Icon = service.icon;

          return (
            <button
              key={service.value}
              type="button"
              aria-pressed={isSelected}
              onClick={() => onChange(service.value)}
              className={`
                flex min-h-[104px]
                items-start justify-between
                rounded-2xl
                border
                px-5 py-4
                text-left
                transition-all duration-300
                disabled:cursor-not-allowed
                disabled:opacity-60
                ${
                  isSelected
                    ? "border-dp-gold bg-dp-gold/10 shadow-[0_8px_24px_rgba(198,157,93,0.12)]"
                    : "border-dp-black/10 bg-[#faf8f4] hover:border-dp-gold/40 hover:bg-white"
                }
              `}
            >
              <span className="flex gap-3">
                <Icon
                  className="mt-0.5 shrink-0 text-dp-gold"
                  size={19}
                  strokeWidth={1.8}
                />

                <span>
                  <span className="block font-sans text-sm font-medium text-dp-black">
                    {service.label}
                  </span>

                  <span className="mt-1 block font-sans text-xs leading-5 text-dp-charcoal/55">
                    {service.description}
                  </span>
                </span>
              </span>

              {isSelected && (
                <span className="ml-4 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-dp-gold text-dp-black">
                  <Check size={14} strokeWidth={2} />
                </span>
              )}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
};

export default ServiceSelection;