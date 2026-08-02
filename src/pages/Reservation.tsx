import PageContainer from "../components/layout/PageContainer";
import { useState } from "react";

const Reservation = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    service: "",
    notes: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Reservation submitted:", form);
    alert("Your reservation request has been submitted. We will contact you shortly.");
  };

  return (
    <div className="bg-dp-white">
      {/* HERO */}
      <section className="relative h-[60vh] w-full overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1520975922071-a57c1d1a6a3b?auto=format&fit=crop&q=80&w=1600"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 h-full flex flex-col justify-center items-start px-10 lg:px-20">
          <h1 className="font-serif text-5xl text-white tracking-wide">
            Book a Private Fitting
          </h1>
          <p className="text-white/90 font-sans text-lg max-w-xl mt-4">
            Experience luxury craftsmanship tailored exclusively for you.
          </p>
        </div>
      </section>

      {/* FORM SECTION */}
      <PageContainer>
        <div className="max-w-3xl mx-auto">
          <h2 classend="font-serif text-3xl text-dp-black tracking-wide mb-10">
            Reservation Details
          </h2>

          <form onSubmit={handleSubmit} className="space-y-8">

            {/* NAME */}
            <div>
              <label className="block font-sans text-sm text-dp-charcoal/80 mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full border border-dp-charcoal/30 px-4 py-3 font-sans text-sm focus:border-dp-black outline-none"
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="block font-sans text-sm text-dp-charcoal/80 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full border border-dp-charcoal/30 px-4 py-3 font-sans text-sm focus:border-dp-black outline-none"
              />
            </div>

            {/* PHONE */}
            <div>
              <label className="block font-sans text-sm text-dp-charcoal/80 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
                className="w-full border border-dp-charcoal/30 px-4 py-3 font-sans text-sm focus:border-dp-black outline-none"
              />
            </div>

            {/* DATE */}
            <div>
              <label className="block font-sans text-sm text-dp-charcoal/80 mb-2">
                Preferred Date
              </label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                required
                className="w-full border border-dp-charcoal/30 px-4 py-3 font-sans text-sm focus:border-dp-black outline-none"
              />
            </div>

            {/* SERVICE TYPE */}
            <div>
              <label className="block font-sans text-sm text-dp-charcoal/80 mb-2">
                Service Type
              </label>
              <select
                name="service"
                value={form.service}
                onChange={handleChange}
                required
                className="w-full border border-dp-charcoal/30 px-4 py-3 font-sans text-sm focus:border-dp-black outline-none"
              >
                <option value="">Select a service</option>
                <option value="couture-fitting">Couture Fitting</option>
                <option value="custom-design">Custom Design Consultation</option>
                <option value="bridal-session">Bridal Session</option>
                <option value="measurement">Measurement Appointment</option>
              </select>
            </div>

            {/* NOTES */}
            <div>
              <label className="block font-sans text-sm text-dp-charcoal/80 mb-2">
                Additional Notes (Optional)
              </label>
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                rows={4}
                className="w-full border border-dp-charcoal/30 px-4 py-3 font-sans text-sm focus:border-dp-black outline-none"
              />
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              className="w-full bg-dp-gold text-dp-black py-3 font-sans tracking-wide hover:bg-dp-velvet hover:text-white transition"
            >
              Submit Reservation
            </button>
          </form>
        </div>
      </PageContainer>
    </div>
  );
};

export default Reservation;
