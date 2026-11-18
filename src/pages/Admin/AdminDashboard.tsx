import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  CalendarDays,
  Grid2X2,
  Package,
  Plus,
  Sparkles,
} from "lucide-react";

import AdminLayout from "./AdminLayout";
import { getProducts, type Product } from "../../services/productService";
import api from "../../services/api";
import { safeArray } from "../../utils/safeArray";

interface Reservation {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  date: string;
}

const AdminDashboard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    getProducts().then((data) => setProducts(safeArray<Product>(data)));

    api
      .get("/reservations")
      .then((res) => {
        const rawReservations = res.data.data || res.data.reservations;

        setReservations(safeArray<Reservation>(rawReservations));
      })
      .catch(() => setReservations([]));
  }, []);

  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours();

      if (hour >= 5 && hour < 12) {
        setGreeting("Good morning.");
      } else if (hour >= 12 && hour < 17) {
        setGreeting("Good afternoon.");
      } else if (hour >= 17 && hour < 22) {
        setGreeting("Good evening.");
      } else {
        setGreeting("Good night.");
      }
    };

    // Set the greeting immediately when the dashboard loads
    updateGreeting();

    // Keep it accurate if the admin leaves the dashboard open
    const interval = window.setInterval(updateGreeting, 60_000);

    return () => window.clearInterval(interval);
  }, []);

  const safeProductsList = safeArray<Product>(products);
  const safeReservationsList = safeArray<Reservation>(reservations);

  const totalProducts = safeProductsList.length;

  const featuredProducts = safeProductsList.filter(
    (product) => product.isFeatured,
  ).length;

  const totalReservations = safeReservationsList.length;

  const categoryCounts: Record<string, number> = safeProductsList.reduce(
    (acc, product) => {
      if (product?.category) {
        acc[product.category] = (acc[product.category] || 0) + 1;
      }

      return acc;
    },
    {} as Record<string, number>,
  );

  const categories = Object.entries(categoryCounts).sort(
    ([, a], [, b]) => b - a,
  );

  const totalCategories = categories.length;

  const featuredPercentage =
    totalProducts > 0
      ? Math.round((featuredProducts / totalProducts) * 100)
      : 0;

  const largestCategoryCount =
    categories.length > 0
      ? Math.max(...categories.map(([, count]) => count))
      : 0;

  const formatCategory = (category: string) => category.replace(/-/g, " ");

  return (
    <AdminLayout>
      <div className="space-y-12">
        {/* =====================================================
            WELCOME / PAGE HEADER
        ====================================================== */}
        <section className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-3 font-sans text-[11px] uppercase tracking-[0.32em] text-dp-gold">
              Dolly P Administration
            </p>

            <h1 className="font-serif text-[3rem] leading-[0.95] tracking-[-0.035em] text-dp-black md:text-[4rem]xl:text-[4.5rem]">
              {greeting}
            </h1>
            <p className="mt-5 max-w-xl font-sans text-base leading-7 text-dp-charcoal/65 md:text-[17px]">
              Here&apos;s what&apos;s happening with Dolly P today.
            </p>
          </div>

          <Link
            to="/admin/create"
            className="
              inline-flex w-fit items-center gap-2
              rounded-full
              bg-dp-black
              px-6 py-3
              font-sans text-sm text-white
              transition-all duration-300
              hover:bg-dp-gold
              hover:text-dp-black
            "
          >
            <Plus size={17} strokeWidth={1.7} />
            Add Product
          </Link>
        </section>

        {/* =====================================================
            KPI CARDS
        ====================================================== */}
        <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4 xl:gap-6">
          {/* TOTAL PRODUCTS / HERO CARD */}
          <div
            className="
              group relative overflow-hidden
              rounded-3xl
              bg-dp-black
              p-6 md:p-7
              min-h-[280px] xl:min-h-[300px]
              text-white
              shadow-[0_18px_50px_rgba(0,0,0,0.12)]
            "
          >
            {/* DECORATIVE GOLD GLOW */}
            <div
              className="
                pointer-events-none
                absolute -right-16 -top-16
                h-40 w-40
                rounded-full
                bg-dp-gold/10
                blur-3xl
              "
            />

            <div className="relative flex h-full flex-col justify-between">
              <div className="flex items-start justify-between">
                <p className="font-sans text-[10px] uppercase tracking-[0.28em] text-white/50">
                  Catalogue
                </p>

                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-dp-gold/30 bg-dp-gold/10 text-dp-gold">
                  <Package size={18} strokeWidth={1.5} />
                </div>
              </div>

              <div className="mt-5">
                <p
                  className="
    font-serif
    text-[4.75rem]
    leading-[0.8]
    tracking-[-0.055em]
    text-white
    md:text-[5.5rem]
    xl:text-[6rem]
  "
                >
                  {totalProducts}
                </p>

                <h2 className="mt-5 font-sans text-[15px] font-medium tracking-[-0.01em] text-white/75">
  Total Products
</h2>

              </div>

              <Link
                to="/admin/create"
                className="mt-7 inline-flex items-center gap-2 font-sans text-xs text-dp-gold transition hover:text-white"
              >
                Add product
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>

          {/* FEATURED */}
          <div
            className="
              rounded-3xl
              border border-dp-gold/20
              bg-white/75
              p-6 md:p-7
              min-h-[280px] xl:min-h-[300px]
              backdrop-blur-sm
              transition-all duration-300
              hover:-translate-y-1
              hover:shadow-[0_16px_40px_rgba(0,0,0,0.07)]
            "
          >
            <div className="flex items-start justify-between">
              <p className="font-sans text-[10px] uppercase tracking-[0.28em] text-dp-charcoal/45">
                Curation
              </p>

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-dp-gold/10 text-dp-gold">
                <Sparkles size={18} strokeWidth={1.5} />
              </div>
            </div>

            <div className="mt-0">
              <p className=" font-serif text-[4.75rem] leading-[0.8] tracking-[-0.055em] md:text-[5.5rem] xl:text-[6rem] ">
                {featuredProducts}
              </p>

              <h2 className="mt-5 font-sans text-[15px] font-medium tracking-[-0.01em] text-dp-charcoal/70">
  Featured Products
</h2>
            </div>

            <div className="mt-7 flex items-center gap-2">
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-dp-gold/10">
                <div
                  className="h-full rounded-full bg-dp-gold transition-all duration-500"
                  style={{
                    width: `${Math.min(featuredPercentage, 100)}%`,
                  }}
                />
              </div>

              <span className="font-sans text-xs text-dp-charcoal/55">
                {featuredPercentage}%
              </span>
            </div>
          </div>

          {/* RESERVATIONS */}
          <div
            className="
              rounded-3xl
              border border-dp-gold/20
              bg-white/75
              p-6 md:p-7
              min-h-[280px] xl:min-h-[300px]
              backdrop-blur-sm
              transition-all duration-300
              hover:-translate-y-1
              hover:shadow-[0_16px_40px_rgba(0,0,0,0.07)]
            "
          >
            <div className="flex items-start justify-between">
              <p className="font-sans text-[10px] uppercase tracking-[0.28em] text-dp-charcoal/45">
                Appointments
              </p>

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-dp-gold/10 text-dp-gold">
                <CalendarDays size={18} strokeWidth={1.5} />
              </div>
            </div>

            <div className="mt-8">
              <p
                className="font-serif
    text-[4.75rem]
    leading-[0.8]
    tracking-[-0.055em]
    text-dp-black
    md:text-[5.5rem]
    xl:text-[6rem]"
              >
                {totalReservations}
              </p>

              <h2 className="mt-2 font-sans text-sm text-dp-charcoal/70">
                Reservations
              </h2>
            </div>

            <Link
              to="/admin/reservations"
              className="mt-7 inline-flex items-center gap-2 font-sans text-xs text-dp-charcoal/60 transition hover:text-dp-gold"
            >
              View reservations
              <ArrowUpRight size={14} />
            </Link>
          </div>

          {/* CATEGORIES */}
          <div
            className="
              rounded-3xl
              border border-dp-gold/20
              bg-white/75
              p-6 md:p-7
              min-h-[280px] xl:min-h-[300px]
              backdrop-blur-sm
              transition-all duration-300
              hover:-translate-y-1
              hover:shadow-[0_16px_40px_rgba(0,0,0,0.07)]
            "
          >
            <div className="flex items-start justify-between">
              <p className="font-sans text-[10px] uppercase tracking-[0.28em] text-dp-charcoal/45">
                Collections
              </p>

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-dp-gold/10 text-dp-gold">
                <Grid2X2 size={18} strokeWidth={1.5} />
              </div>
            </div>

            <div className="mt-8">
              <p
                className="font-serif
    text-[4.75rem]
    leading-[0.8]
    tracking-[-0.055em]
    text-dp-black
    md:text-[5.5rem]
    xl:text-[6rem]"
              >
                {totalCategories}
              </p>

              <h2 className="mt-2 font-sans text-sm text-dp-charcoal/70">
                Categories
              </h2>
            </div>

            <Link
              to="/admin/products"
              className="mt-7 inline-flex items-center gap-2 font-sans text-xs text-dp-charcoal/60 transition hover:text-dp-gold"
            >
              Manage catalogue
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </section>

       {/* =====================================================
    PRODUCT OVERVIEW
====================================================== */}
<section>
  {/* SECTION HEADER */}
  <div className="mb-8 flex items-end justify-between">
    <div>
      <p className="mb-3 font-sans text-[11px] font-medium uppercase tracking-[0.3em] text-dp-gold">
        Catalogue insights
      </p>

      <h2 className="font-serif text-3xl tracking-[-0.025em] text-dp-black md:text-4xl">
        Product Overview
      </h2>
    </div>

    <Link
      to="/admin/products"
      className="
        hidden items-center gap-2
        font-sans text-sm font-medium text-dp-charcoal/60
        transition-colors duration-300
        hover:text-dp-gold
        sm:inline-flex
      "
    >
      Manage products
      <ArrowUpRight size={15} />
    </Link>
  </div>

  <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
    {/* =====================================================
        PRODUCT DISTRIBUTION
    ====================================================== */}
    <div
      className="
        lg:col-span-2
        rounded-[2rem]
        border border-dp-gold/15
        bg-white/80
        p-7 md:p-9 lg:p-10
        backdrop-blur-sm

        shadow-[0_20px_55px_rgba(28,24,19,0.07),0_3px_12px_rgba(28,24,19,0.035)]

        transition-all duration-300
        hover:border-dp-gold/25
        hover:shadow-[0_26px_70px_rgba(28,24,19,0.10),0_4px_16px_rgba(28,24,19,0.045)]
      "
    >
      {/* CARD HEADER */}
      <div className="mb-10 flex items-start justify-between gap-6">
        <div>
          <h3 className="font-serif text-2xl tracking-[-0.02em] text-dp-black md:text-[1.75rem]">
            Product Distribution
          </h3>

          <p className="mt-2 font-sans text-sm leading-6 text-dp-charcoal/50">
            Your catalogue across each category.
          </p>
        </div>

        <span
          className="
            shrink-0
            rounded-full
            border border-dp-gold/10
            bg-dp-gold/10
            px-4 py-2
            font-sans text-[10px] font-medium
            uppercase tracking-[0.18em]
            text-dp-charcoal/65
          "
        >
          {totalProducts} items
        </span>
      </div>

      {categories.length > 0 ? (
        <div className="space-y-8">
          {categories.map(([category, count]) => {
            const percentage =
              largestCategoryCount > 0
                ? (count / largestCategoryCount) * 100
                : 0;

            return (
              <div key={category} className="group">
                <div className="mb-3 flex items-end justify-between gap-4">
                  <span
                    className="
                      font-sans
                      text-[15px]
                      font-medium
                      capitalize
                      tracking-[-0.01em]
                      text-dp-charcoal
                    "
                  >
                    {formatCategory(category)}
                  </span>

                  <span
                    className="
                      font-serif
                      text-2xl
                      leading-none
                      tracking-[-0.03em]
                      text-dp-black
                    "
                  >
                    {count}
                  </span>
                </div>

                {/* DISTRIBUTION BAR */}
                <div
                  className="
                    h-2.5
                    overflow-hidden
                    rounded-full
                    bg-dp-gold/10
                  "
                >
                  <div
                    className="
                      h-full
                      rounded-full
                      bg-dp-gold
                      transition-all duration-700
                      group-hover:brightness-95
                    "
                    style={{
                      width: `${percentage}%`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div
          className="
            flex min-h-[280px]
            items-center justify-center
            rounded-2xl
            border border-dashed border-dp-gold/30
            bg-dp-gold/[0.025]
          "
        >
          <div className="text-center">
            <div
              className="
                mx-auto flex h-14 w-14
                items-center justify-center
                rounded-full
                bg-dp-gold/10
                text-dp-gold
              "
            >
              <Package size={23} strokeWidth={1.4} />
            </div>

            <p className="mt-5 font-serif text-xl text-dp-black">
              No products yet
            </p>

            <Link
              to="/admin/create"
              className="
                mt-3 inline-flex items-center gap-2
                font-sans text-sm text-dp-gold
                transition-colors hover:text-dp-black
              "
            >
              Add your first product
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      )}
    </div>

    {/* =====================================================
        AT A GLANCE
    ====================================================== */}
    <div
      className="
        flex flex-col
        rounded-[2rem]
        border border-dp-gold/15
        bg-white/80
        p-7 md:p-9
        backdrop-blur-sm

        shadow-[0_20px_55px_rgba(28,24,19,0.07),0_3px_12px_rgba(28,24,19,0.035)]

        transition-all duration-300
        hover:border-dp-gold/25
        hover:shadow-[0_26px_70px_rgba(28,24,19,0.10),0_4px_16px_rgba(28,24,19,0.045)]
      "
    >
      {/* HEADER */}
      <div>
        <p className="mb-2 font-sans text-[10px] font-medium uppercase tracking-[0.24em] text-dp-gold">
          Quick summary
        </p>

        <h3 className="font-serif text-2xl tracking-[-0.02em] text-dp-black md:text-[1.75rem]">
          At a Glance
        </h3>

        <p className="mt-2 font-sans text-sm leading-6 text-dp-charcoal/50">
          A quick view of the Dolly P catalogue.
        </p>
      </div>

      {/* METRICS */}
      <div className="mt-9 flex-1 divide-y divide-dp-gold/15">
        {/* FEATURED */}
        <div className="group flex items-center gap-5 py-6 first:pt-0">
          <div
            className="
              flex h-14 w-14
              shrink-0 items-center justify-center
              rounded-2xl
              border border-dp-gold/10
              bg-dp-gold/10
              text-dp-gold

              shadow-[0_8px_20px_rgba(198,157,93,0.10)]

              transition-all duration-300
              group-hover:bg-dp-gold
              group-hover:text-white
            "
          >
            <Sparkles size={21} strokeWidth={1.5} />
          </div>

          <div>
            <p
              className="
                font-serif
                text-[2.6rem]
                leading-none
                tracking-[-0.04em]
                text-dp-black
              "
            >
              {featuredProducts}
            </p>

            <p className="mt-2 font-sans text-sm font-medium text-dp-charcoal/55">
              Featured products
            </p>
          </div>
        </div>

        {/* RESERVATIONS */}
        <div className="group flex items-center gap-5 py-6">
          <div
            className="
              flex h-14 w-14
              shrink-0 items-center justify-center
              rounded-2xl
              border border-dp-gold/10
              bg-dp-gold/10
              text-dp-gold

              shadow-[0_8px_20px_rgba(198,157,93,0.10)]

              transition-all duration-300
              group-hover:bg-dp-gold
              group-hover:text-white
            "
          >
            <CalendarDays size={21} strokeWidth={1.5} />
          </div>

          <div>
            <p
              className="
                font-serif
                text-[2.6rem]
                leading-none
                tracking-[-0.04em]
                text-dp-black
              "
            >
              {totalReservations}
            </p>

            <p className="mt-2 font-sans text-sm font-medium text-dp-charcoal/55">
              Reservations
            </p>
          </div>
        </div>

        {/* CATEGORIES */}
        <div className="group flex items-center gap-5 py-6">
          <div
            className="
              flex h-14 w-14
              shrink-0 items-center justify-center
              rounded-2xl
              border border-dp-gold/10
              bg-dp-gold/10
              text-dp-gold

              shadow-[0_8px_20px_rgba(198,157,93,0.10)]

              transition-all duration-300
              group-hover:bg-dp-gold
              group-hover:text-white
            "
          >
            <Grid2X2 size={21} strokeWidth={1.5} />
          </div>

          <div>
            <p
              className="
                font-serif
                text-[2.6rem]
                leading-none
                tracking-[-0.04em]
                text-dp-black
              "
            >
              {totalCategories}
            </p>

            <p className="mt-2 font-sans text-sm font-medium text-dp-charcoal/55">
              Categories
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <Link
        to="/admin/products"
        className="
          mt-6
          flex w-full
          items-center justify-between
          rounded-2xl
          border border-dp-gold/20
          bg-white/50
          px-5 py-4
          font-sans text-sm font-medium
          text-dp-charcoal

          shadow-[0_6px_18px_rgba(28,24,19,0.035)]

          transition-all duration-300

          hover:border-dp-gold/40
          hover:bg-dp-black
          hover:text-white
          hover:shadow-[0_12px_30px_rgba(28,24,19,0.12)]
        "
      >
        View full catalogue

        <ArrowUpRight
          size={16}
          className="transition-transform duration-300 group-hover:translate-x-0.5"
        />
      </Link>
    </div>
  </div>
</section>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
