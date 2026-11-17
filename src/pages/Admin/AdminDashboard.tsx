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
    getProducts().then((data) =>
      setProducts(safeArray<Product>(data))
    );

    api
      .get("/reservations")
      .then((res) => {
        const rawReservations =
          res.data.data || res.data.reservations;

        setReservations(
          safeArray<Reservation>(rawReservations)
        );
      })
      .catch(() => setReservations([]));
  }, []);

  const safeProductsList = safeArray<Product>(products);
  const safeReservationsList =
    safeArray<Reservation>(reservations);

  const totalProducts = safeProductsList.length;

  const featuredProducts = safeProductsList.filter(
    (product) => product.isFeatured
  ).length;

  const totalReservations = safeReservationsList.length;

  const categoryCounts: Record<string, number> =
    safeProductsList.reduce(
      (acc, product) => {
        if (product?.category) {
          acc[product.category] =
            (acc[product.category] || 0) + 1;
        }

        return acc;
      },
      {} as Record<string, number>
    );

  const categories = Object.entries(categoryCounts).sort(
    ([, a], [, b]) => b - a
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

  const formatCategory = (category: string) =>
    category.replace(/-/g, " ");

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

            <h1 className="font-serif text-4xl md:text-5xl text-dp-black tracking-tight">
              Good morning.
            </h1>

            <p className="mt-3 max-w-xl font-sans text-sm md:text-base leading-7 text-dp-charcoal/65">
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
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {/* TOTAL PRODUCTS / HERO CARD */}
          <div
            className="
              group relative overflow-hidden
              rounded-3xl
              bg-dp-black
              p-6 md:p-7
              min-h-[220px]
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

              <div className="mt-8">
                <p className="font-serif text-5xl text-white">
                  {totalProducts}
                </p>

                <h2 className="mt-2 font-sans text-sm text-white/70">
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
              min-h-[220px]
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

            <div className="mt-8">
              <p className="font-serif text-5xl text-dp-black">
                {featuredProducts}
              </p>

              <h2 className="mt-2 font-sans text-sm text-dp-charcoal/70">
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
              min-h-[220px]
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
              <p className="font-serif text-5xl text-dp-black">
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
              min-h-[220px]
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
              <p className="font-serif text-5xl text-dp-black">
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

