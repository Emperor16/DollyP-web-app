const ReservationHeader = () => {
  return (
    <section className="border-b border-dp-gold/15 bg-[#f7f3ed]">
      <div className=" mx-auto max-w-7xl px-6 py-14 sm:px-10 sm:py-16 lg:px-16 lg:py-20">
        <div className="mt-20 max-w-3xl">
          <div className="mb-4 flex items-center gap-4">
            <span className="h-px w-9 bg-dp-gold" />

            <p className="font-sans text-[10px] font-medium uppercase tracking-[0.3em] text-dp-gold">
              Private Appointments
            </p>
          </div>

          <h1 className="font-serif text-4xl leading-tight tracking-[-0.035em] text-dp-black sm:text-5xl lg:text-6xl">
            Book a Private Fitting
          </h1>

          <p className="mt-5 max-w-2xl font-sans text-[15px] leading-7 text-dp-charcoal/65 sm:text-base">
            Choose your preferred service and date, then provide your contact
            details to request an appointment.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ReservationHeader;