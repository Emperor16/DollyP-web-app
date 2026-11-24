type ReservationHeaderProps = {
  pendingCount: number;
};

const ReservationHeader = ({
  pendingCount,
}: ReservationHeaderProps) => {
  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <p className="mb-2 font-sans text-[10px] font-medium uppercase tracking-[0.28em] text-dp-gold">
          Appointments
        </p>

        <h1 className="font-serif text-3xl text-dp-black sm:text-4xl">
          Reservations
        </h1>

        <p className="mt-2 max-w-xl font-sans text-sm leading-6 text-dp-charcoal/60">
          Review incoming appointment requests and manage existing
          bookings.
        </p>
      </div>

      <div className="inline-flex w-fit items-center gap-2 rounded-full border border-dp-gold/20 bg-dp-gold/10 px-4 py-2">
        <span className="h-2 w-2 rounded-full bg-dp-gold" />

        <span className="font-sans text-xs font-medium text-dp-charcoal">
          {pendingCount} pending
        </span>
      </div>
    </div>
  );
};

export default ReservationHeader;