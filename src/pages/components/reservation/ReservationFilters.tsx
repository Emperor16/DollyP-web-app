import type {
  Reservation,
  ReservationStatus,
} from "../../../../services/adminReservationService";

export type ReservationFilter =
  | "all"
  | ReservationStatus;

type ReservationFiltersProps = {
  selected: ReservationFilter;
  onChange: (filter: ReservationFilter) => void;
  reservations: Reservation[];
};

const filters: Array<{
  value: ReservationFilter;
  label: string;
}> = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "confirmed", label: "Confirmed" },
  { value: "completed", label: "Completed" },
  { value: "declined", label: "Declined" },
  { value: "cancelled", label: "Cancelled" },
];

const ReservationFilters = ({
  selected,
  onChange,
  reservations,
}: ReservationFiltersProps) => {
  const getCount = (filter: ReservationFilter) => {
    if (filter === "all") {
      return reservations.length;
    }

    return reservations.filter(
      (reservation) => reservation.status === filter,
    ).length;
  };

  return (
    <div className="overflow-x-auto">
      <div className="flex min-w-max items-center gap-2">
        {filters.map((filter) => {
          const active = selected === filter.value;

          return (
            <button
              key={filter.value}
              type="button"
              onClick={() => onChange(filter.value)}
              className={`
                rounded-full border px-4 py-2
                font-sans text-xs
                transition-colors
                ${
                  active
                    ? "border-dp-black bg-dp-black text-white"
                    : "border-dp-black/10 bg-white text-dp-charcoal/65 hover:border-dp-gold/50 hover:text-dp-black"
                }
              `}
            >
              {filter.label}

              <span
                className={`
                  ml-2
                  ${
                    active
                      ? "text-white/60"
                      : "text-dp-charcoal/35"
                  }
                `}
              >
                {getCount(filter.value)}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ReservationFilters;