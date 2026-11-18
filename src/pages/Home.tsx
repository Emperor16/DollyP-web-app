import { useEffect, useState } from "react";
import { ArrowDown, ArrowUpRight, CalendarDays } from "lucide-react";
import { Link } from "react-router-dom";

import { getProducts, type Product } from "../services/productService";
import ProductCard from "../components/products/ProductCard";
import PageContainer from "../components/layout/PageContainer";

const Home = () => {
  const [featured, setFeatured] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadFeatured = async () => {
      try {
        setIsLoading(true);

        const data = await getProducts();

        if (!Array.isArray(data)) {
          console.error("Products response is not an array:", data);
          setFeatured([]);
          return;
        }

        const filtered = data
          .filter((product) => product.isFeatured)
          .slice(0, 6);

        setFeatured(filtered);
      } catch (error) {
        console.error(
          "Failed to load products. Check your server log:",
          error,
        );

        setFeatured([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadFeatured();
  }, []);

  return (
    <main className="overflow-hidden bg-dp-white">
      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="relative min-h-[760px] w-full overflow-hidden lg:min-h-[860px]">
        {/* HERO IMAGE */}
        <img
          src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=85&w=2000"
          alt=""
          className="
            absolute inset-0
            h-full w-full
            object-cover
            object-center
            scale-[1.02]
          "
        />

        {/* DIRECTIONAL OVERLAY */}
        <div
          className="
            absolute inset-0
            bg-gradient-to-r
            from-black/80
            via-black/45
            to-black/10
          "
        />

        {/* SOFT BOTTOM TRANSITION */}
        <div
          className="
            absolute inset-x-0 bottom-0
            h-40
            bg-gradient-to-t
            from-black/40
            to-transparent
          "
        />

        {/* SUBTLE WARMTH */}
        <div className="absolute inset-0 bg-dp-gold/[0.04]" />

        {/* HERO CONTENT */}
        <div
          className="
            relative z-10
            mx-auto flex
            min-h-[760px] w-full max-w-[1600px]
            items-center
            px-6
            pt-24
            sm:px-10
            lg:min-h-[860px]
            lg:px-16
            xl:px-20
          "
        >
          <div className="max-w-[780px]">
            {/* EYEBROW */}
            <div className="mb-7 flex items-center gap-4">
              <span className="h-px w-10 bg-dp-gold" />

              <p
                className="
                  font-sans
                  text-[10px] font-medium
                  uppercase tracking-[0.34em]
                  text-dp-gold
                  sm:text-[11px]
                "
              >
                The Dolly P Collection
              </p>
            </div>

            {/* HEADING */}
            <h1
              className="
                max-w-[760px]
                font-serif
                text-[3.6rem]
                leading-[0.92]
                tracking-[-0.045em]
                text-white
                sm:text-[4.8rem]
                md:text-[5.8rem]
                lg:text-[6.5rem]
              "
            >
              African elegance,
              <span className="block text-dp-gold">
                made unforgettable.
              </span>
            </h1>

            {/* DESCRIPTION */}
            <p
              className="
                mt-8 max-w-[590px]
                font-sans
                text-base
                leading-7
                text-white/75
                sm:text-lg
                sm:leading-8
              "
            >
              Discover handcrafted gowns, kaftans, and couture pieces
              inspired by African heritage and created for