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
              inspired by African heritage and created for modern elegance.
            </p>

            {/* HERO ACTIONS */}
            <div className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
              <Link
                to="/shop"
                className="
                  group
                  inline-flex items-center gap-3
                  rounded-full
                  bg-dp-gold
                  px-7 py-4
                  font-sans text-sm font-medium
                  text-dp-black

                  shadow-[0_14px_35px_rgba(198,157,93,0.28)]

                  transition-all duration-300

                  hover:-translate-y-0.5
                  hover:bg-white
                  hover:shadow-[0_20px_45px_rgba(0,0,0,0.22)]
                "
              >
                Explore Collection

                <ArrowUpRight
                  size={17}
                  strokeWidth={1.7}
                  className="
                    transition-transform duration-300
                    group-hover:translate-x-0.5
                    group-hover:-translate-y-0.5
                  "
                />
              </Link>

              <Link
                to="/reservation"
                className="
                  group
                  inline-flex items-center gap-3
                  px-1 py-3
                  font-sans text-sm font-medium
                  text-white/85
                  transition-colors duration-300
                  hover:text-dp-gold
                "
              >
                <CalendarDays size={17} strokeWidth={1.5} />

                Book a Private Fitting

                <ArrowUpRight
                  size={15}
                  strokeWidth={1.6}
                  className="
                    transition-transform duration-300
                    group-hover:translate-x-0.5
                    group-hover:-translate-y-0.5
                  "
                />
              </Link>
            </div>
          </div>
        </div>

        {/* SCROLL INDICATOR */}
        <a
          href="#brand-story"
          aria-label="Scroll to discover more"
          className="
            absolute bottom-8 right-6 z-10
            hidden items-center gap-3
            font-sans text-[10px] font-medium
            uppercase tracking-[0.24em]
            text-white/55
            transition-colors duration-300
            hover:text-dp-gold
            sm:flex
            lg:right-16
            xl:right-20
          "
        >
          Discover

          <span
            className="
              flex h-10 w-10
              items-center justify-center
              rounded-full
              border border-white/20
              bg-black/10
              backdrop-blur-sm
            "
          >
            <ArrowDown size={15} strokeWidth={1.5} />
          </span>
        </a>
      </section>

      {/* =====================================================
          BRAND STATEMENT
      ====================================================== */}
      <section
        id="brand-story"
        className="
          relative
          border-y border-dp-gold/10
          bg-[#f7f3ed]
          py-24
          sm:py-28
          lg:py-36
        "
      >
        {/* DECORATIVE NUMBER */}
        <span
          aria-hidden="true"
          className="
            pointer-events-none
            absolute right-4 top-4
            hidden
            font-serif text-[11rem]
            leading-none
            text-dp-gold/[0.055]
            lg:block
            xl:right-20
          "
        >
          DP
        </span>

        <PageContainer>
          <div
            className="
              relative
              mx-auto
              grid max-w-6xl
              gap-10
              lg:grid-cols-[0.85fr_1.5fr]
              lg:items-start
              lg:gap-20
            "
          >
            {/* LEFT LABEL */}
            <div>
              <div className="flex items-center gap-4">
                <span className="h-px w-9 bg-dp-gold" />

                <p
                  className="
                    font-sans
                    text-[10px] font-medium
                    uppercase tracking-[0.32em]
                    text-dp-gold
                  "
                >
                  Our Philosophy
                </p>
              </div>

              <p
                className="
                  mt-5 max-w-[270px]
                  font-sans text-sm
                  leading-7
                  text-dp-charcoal/55
                "
              >
                A celebration of distinctive design, skilled craftsmanship,
                and enduring personal style.
              </p>
            </div>

            {/* STATEMENT */}
            <div>
              <h2
                className="
                  max-w-4xl
                  font-serif
                  text-[2.8rem]
                  leading-[1.02]
                  tracking-[-0.04em]
                  text-dp-black
                  sm:text-[3.6rem]
                  lg:text-[4.3rem]
                "
              >
                Crafted with heritage.
                <span className="block text-dp-gold">
                  Worn with presence.
                </span>
              </h2>

              <div
                className="
                  mt-9
                  grid gap-6
                  border-t border-dp-gold/20
                  pt-8
                  md:grid-cols-2
                  md:gap-10
                "
              >
                <p
                  className="
                    font-sans text-[15px]
                    leading-7
                    text-dp-charcoal/70
                  "
                >
                  Dolly P celebrates African luxury through timeless
                  silhouettes, artisanal craftsmanship, and carefully selected
                  fabrics.
                </p>

                <p
                  className="
                    font-sans text-[15px]
                    leading-7
                    text-dp-charcoal/70
                  "
                >
                  Every piece is created to carry a story of identity,
                  confidence, elegance, and lasting personal expression.
                </p>
              </div>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* =====================================================
          FEATURED PRODUCTS
      ====================================================== */}
      <section className="bg-dp-white py-24 sm:py-28 lg:py-32">
        <PageContainer>
          {/* SECTION HEADER */}
          <div
            className="
              mb-12
              flex flex-col gap-7
              border-b border-dp-gold/15
              pb-8
              sm:flex-row
              sm:items-end
              sm:justify-between
              lg:mb-16
            "
          >
            <div>
              <div className="mb-4 flex items-center gap-4">
                <span className="h-px w-9 bg-dp-gold" />

                <p
                  className="
                    font-sans
                    text-[10px] font-medium
                    uppercase tracking-[0.32em]
                    text-dp-gold
                  "
                >
                  Curated for You
                </p>
              </div>

              <h2
                className="
                  font-serif
                  text-[2.8rem]
                  leading-none
                  tracking-[-0.035em]
                  text-dp-black
                  sm:text-[3.5rem]
                  lg:text-[4rem]
                "
              >
                Featured Pieces
              </h2>

              <p
                className="
                  mt-5 max-w-xl
                  font-sans text-[15px]
                  leading-7
                  text-dp-charcoal/60
                "
              >
                A considered selection of standout silhouettes and signature
                Dolly P designs.
              </p>
            </div>

            <Link
              to="/shop"
              className="
                group
                inline-flex w-fit
                items-center gap-2
                font-sans text-sm font-medium
                text-dp-charcoal
                transition-colors duration-300
                hover:text-dp-gold
              "
            >
              View all pieces

              <ArrowUpRight
                size={16}
                strokeWidth={1.6}
                className="
                  transition-transform duration-300
                  group-hover:translate-x-0.5
                  group-hover:-translate-y-0.5
                "
              />
            </Link>
          </div>

          {/* LOADING STATE */}
          {isLoading ? (
            <div
              className="
                grid grid-cols-1 gap-x-7 gap-y-12
                sm:grid-cols-2
                lg:grid-cols-3
              "
            >
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="aspect-[3/4] rounded-[1.75rem] bg-dp-gold/10" />
                  <div className="mt-5 h-4 w-2/3 rounded-full bg-dp-gold/10" />
                  <div className="mt-3 h-3 w-1/3 rounded-full bg-dp-gold/10" />
                </div>
              ))}
            </div>
          ) : featured.length > 0 ? (
            <div
              className="
                grid grid-cols-1
                gap-x-7 gap-y-14
                sm:grid-cols-2
                lg:grid-cols-3
                xl:gap-x-9
                xl:gap-y-16
              "
            >
              {featured.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            /* EMPTY STATE */
            <div
              className="
                flex min-h-[340px]
                items-center justify-center
                rounded-[2rem]
                border border-dashed border-dp-gold/30
                bg-[#f7f3ed]
                px-6 py-16
                text-center
              "
            >
              <div className="max-w-md">
                <p className="font-serif text-3xl text-dp-black">
                  New pieces are being curated
                </p>

                <p
                  className="
                    mt-4
                    font-sans text-sm
                    leading-7
                    text-dp-charcoal/60
                  "
                >
                  There are no featured products available right now. Explore
                  the full collection to discover every Dolly P design.
                </p>

                <Link
                  to="/shop"
                  className="
                    group
                    mt-7 inline-flex
                    items-center gap-3
                    rounded-full
                    bg-dp-black
                    px-7 py-4
                    font-sans text-sm font-medium
                    text-white
                    transition-all duration-300
                    hover:-translate-y-0.5
                    hover:bg-dp-gold
                    hover:text-dp-black
                  "
                >
                  Explore Collection
                  <ArrowUpRight size={16} />
                </Link>
              </div>
            </div>
          )}

          {/* BOTTOM CTA */}
          {featured.length > 0 && !isLoading && (
            <div className="mt-16 flex justify-center sm:mt-20">
              <Link
                to="/shop"
                className="
                  group
                  inline-flex items-center gap-3
                  rounded-full
                  border border-dp-black/20
                  bg-white
                  px-8 py-4
                  font-sans text-sm font-medium
                  text-dp-black

                  shadow-[0_10px_30px_rgba(28,24,19,0.06)]

                  transition-all duration-300

                  hover:-translate-y-0.5
                  hover:border-dp-black
                  hover:bg-dp-black
                  hover:text-white
                  hover:shadow-[0_18px_40px_rgba(28,24,19,0.16)]
                "
              >
                Explore Full Collection

                <ArrowUpRight
                  size={16}
                  strokeWidth={1.6}
                  className="
                    transition-transform duration-300
                    group-hover:translate-x-0.5
                    group-hover:-translate-y-0.5
                  "
                />
              </Link>
            </div>
          )}
        </PageContainer>
      </section>
    </main>
  );
};

export default Home;