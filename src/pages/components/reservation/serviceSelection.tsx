import { Check } from "lucide-react";

const services = [
  {
    value: "couture-fitting",
    label: "Couture Fitting",
  },
  {
    value: "custom-design",
    label: "Custom Design",
  },
  {
    value: "bridal-session",
    label: "Bridal Session",
  },
  {
    value: "measurement",
    label: "Measurements",
  },
];

type ServiceSelectionProps = {
  value: string;
  onChange: (service: string) => void;
};

const ServiceSelection = ({
  value,
  onChange,
}: ServiceSelectionProps) => {
  return (
    <div>
      <p className="mb-3 font-sans text-xs font-medium text-dp-charcoal/65">
        Service Type
      </p>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {services.map((service) => {
          const isSelected = service.value === value;

          return (
            <button
              key={service.value}
              type="button"
              aria-pressed={isSelected}
              onClick={() => onChange(service.value)}
              className={`
                flex min-h-[72px]
                items-center justify-between
                rounded-2xl
                border
                px-5 py-4
                text-left
                transition-all duration-300
                ${
                  isSelected
                    ? "border-dp-gold bg-dp-gold/10 shadow-[0_8px_24px_rgba(198,157,93,0.12)]"
                    : "border-dp-black/10 bg-[#faf8f4] hover:border-dp-gold/40 hover:bg-white"
                }
              `}
            >
              <span className="font-sans text-sm font-medium text-dp-black">
                {service.label}
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
    </div>
  );
};

export default ServiceSelection;