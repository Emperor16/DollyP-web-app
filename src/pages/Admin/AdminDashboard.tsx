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
  {/* TOTAL PRODUCTS */}
  <div
    className="
      group relative overflow-hidden
      rounded-[2rem]
      bg-dp-black
      p-7 md:p-8
      min-h-[280px] xl:min-h-[300px]
      text-white
      shadow-[0_22px_65px_rgba(0,0,0,0.16)]
    "
  >
    <div
      className="
        pointer-events-none
        absolute -right-16 -top-16
        h-48 w-48
        rounded-full
        bg-dp-gold/15
        blur-3xl
      "
    />

    <div className="relative flex h-full flex-col">
      <div className="flex items-start justify-between">
        <p className="font-sans text-[11px] font-medium uppercase tracking-[0.3em] text-white/50">
          Catalogue
        </p>

        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-dp-gold/30 bg-dp-gold/10 text-dp-gold">
          <Package size={20} strokeWidth={1.5} />
        </div>
      </div>

      <div className="my-auto py-8">
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
        className="inline-flex items-center gap-2 font-sans text-sm font-medium text-dp-gold transition-colors hover:text-white"
      >
        Add product
        <ArrowUpRight size={15} />
      </Link>
    </div>
  </div>

  {/* FEATURED PRODUCTS */}
  <div
    className="
      group
      flex min-h-[280px] flex-col
      rounded-[2rem]
      border border-dp-gold/20
      bg-white/80
      p-7 md:p-8
      xl:min-h-[300px]
      backdrop-blur-sm
      transition-all duration-300
      hover:-translate-y-1
      hover:border-dp-gold/35
      hover:shadow-[0_20px_55px_rgba(0,0,0,0.08)]
    "
  >
    <div className="flex items-start justify-between">
      <p className="font-sans text-[11px] font-medium uppercase tracking-[0.3em] text-dp-charcoal/45">
        Curation
      </p>

      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-dp-gold/10 text-dp-gold">
        <Sparkles size={20} strokeWidth={1.5} />
      </div>
    </div>

    <div className="my-auto py-8">
      <p
        className="
          font-serif
          text-[4.75rem]
          leading-[0.8]
          tracking-[-0.055em]
          text-dp-black
          md:text-[5.5rem]
          xl:text-[6rem]
        "
      >
        {featuredProducts}
      </p>

      <h2 className="mt-5 font-sans text-[15px] font-medium tracking-[-0.01em] text-dp-charcoal/70">
        Featured Products
      </h2>
    </div>

    <div>
      <div className="flex items-center gap-3">
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-dp-gold/10">
          <div
            className="h-full rounded-full bg-dp-gold transition-all duration-500"
            style={{
              width: `${Math.min(featuredPercentage, 100)}%`,
            }}
          />
        </div>

        <span className="font-sans text-sm font-medium text-dp-charcoal/55">
          {featuredPercentage}%
        </span>
      </div>
    </div>
  </div>

  {/* RESERVATIONS */}
  <div
    className="
      group
      flex min-h-[280px] flex-col
      rounded-[2rem]
      border border-dp-gold/20
      bg-white/80
      p-7 md:p-8
      xl:min-h-[300px]
      backdrop-blur-sm
      transition-all duration-300
      hover:-translate-y-1
      hover:border-dp-gold/35
      hover:shadow-[0_20px_55px_rgba(0,0,0,0.08)]
    "
  >
    <div className="flex items-start justify-between">
      <p className="font-sans text-[11px] font-medium uppercase tracking-[0.3em] text-dp-charcoal/45">
        Appointments
      </p>

      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-dp-gold/10 text-dp-gold">
        <CalendarDays size={20} strokeWidth={1.5} />
      </div>
    </div>

    <div className="my-auto py-8">
      <p
        className="
          font-serif
          text-[4.75rem]
          leading-[0.8]
          tracking-[-0.055em]
          text-dp-black
          md:text-[5.5rem]
          xl:text-[6rem]
        "
      >
        {totalReservations}
      </p>

      <h2 className="mt-5 font-sans text-[15px] font-medium tracking-[-0.01em] text-dp-charcoal/70">
        Reservations
      </h2>
    </div>

    <Link
      to="/admin/reservations"
      className="inline-flex items-center gap-2 font-sans text-sm font-medium text-dp-charcoal/60 transition-colors hover:text-dp-gold"
    >
      View reservations
      <ArrowUpRight size={15} />
    </Link>
  </div>

  {/* CATEGORIES */}
  <div
    className="
      group
      flex min-h-[280px] flex-col
      rounded-[2rem]
      border border-dp-gold/20
      bg-white/80
      p-7 md:p-8
      xl:min-h-[300px]
      backdrop-blur-sm
      transition-all duration-300
      hover:-translate-y-1
      hover:border-dp-gold/35
      hover:shadow-[0_20px_55px_rgba(0,0,0,0.08)]
    "
  >
    <div className="flex items-start justify-between">
      <p className="font-sans text-[11px] font-medium uppercase tracking-[0.3em] text-dp-charcoal/45">
        Collections
      </p>

      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-dp-gold/10 text-dp-gold">
        <Grid2X2 size={20} strokeWidth={1.5} />
      </div>
    </div>

    <div className="my-auto py-8">
      <p
        className="
          font-serif
          text-[4.75rem]
          leading-[0.8]
          tracking-[-0.055em]
          text-dp-black
          md:text-[5.5rem]
          xl:text-[6rem]
        "
      >
        {totalCategories}
      </p>

      <h2 className="mt-5 font-sans text-[15px] font-medium tracking-[-0.01em] text-dp-charcoal/70">
        Categories
      </h2>
    </div>

    <Link
      to="/admin/products"
      className="inline-flex items-center gap-2 font-sans text-sm font-medium text-dp-charcoal/60 transition-colors hover:text-dp-gold"
    >
      Manage catalogue
      <ArrowUpRight size={15} />
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
                </
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
