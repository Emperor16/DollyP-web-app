import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Pause,
  Play,
} from "lucide-react";
import { Link } from "react-router-dom";

import { getProducts, type Product } from "../services/productService";
import ProductCard from "../components/products/ProductCard";
import PageContainer from "../components/layout/PageContainer";

/* =====================================================
   HERO PRODUCT TYPE
====================================================== */

type HeroProduct = Product & {
  image?: string;
  imageUrl?: string;
  images?: Array<
    string | {
      url?: string;
      secure_url?: string;
    }
  >;
  description?: string;
  name?: string;
  title?: string;
  category?: string;
  price?: number;
};

/* =====================================================
   HELPERS
====================================================== */

const getProductImage = (product: HeroProduct): string | null => {
  if (typeof product.image === "string" && product.image.trim()) {
    return product.image;
  }

  if (typeof product.imageUrl === "string" && product.imageUrl.trim()) {
    return product.imageUrl;
  }

  if (Array.isArray(product.images) && product.images.length > 0) {
    const firstImage = product.images[0];

    if (typeof firstImage === "string") {
      return firstImage;
    }

    if (firstImage?.secure_url) {
      return firstImage.secure_url;
    }

    if (firstImage?.url) {
      return firstImage.url;
    }
  }

  return null;
};

const getProductName = (product: HeroProduct): string => {
  return product.name || product.title || "Dolly P Signature Piece";
};

const formatCategory = (category?: string): string => {
  if (!category) {
    return "The Dolly P Collection";
  }

  return category.replace(/-/g, " ");
};

/* =====================================================
   HOME
====================================================== */

const Home = () => {
  const [featured, setFeatured] = useState<Product[]>([]);
  const [heroProducts, setHeroProducts] = useState<HeroProduct[]>([]);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isHeroPaused, setIsHeroPaused] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  /* =====================================================
     LOAD PRODUCTS
  ====================================================== */

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true);

        const data = await getProducts();

        if (!Array.isArray(data)) {
          console.error("Products response is not an array:", data);

          setFeatured([]);
          setHeroProducts([]);
          return;
        }

        const products = data as HeroProduct[];

        /*
         * Featured products section
         */
        const featuredProducts = products
          .filter((product) => product.isFeatured)
          .slice(0, 6);

        setFeatured(featuredProducts);

        /*
         * Hero carousel:
         * featured products with usable images get priority.
         */
        const featuredWithImages = products.filter(
          (product) =>
            product.isFeatured && Boolean(getProductImage(product)),
        );

        /*
         * Other products can fill remaining carousel spaces.
         */
        const otherProductsWithImages = products.filter(
          (product) =>
            !product.isFeatured && Boolean(getProductImage(product)),
        );

        const carouselProducts = [
          ...featuredWithImages,
          ...otherProductsWithImages,
        ].slice(0, 5);

        setHeroProducts(carouselProducts);
        setActiveSlide(0);
      } catch (error) {
        console.error(
          "Failed to load products. Check your server log:",
          error,
        );

        setFeatured([]);
        setHeroProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  /* =====================================================
     AUTO-PLAY HERO CAROUSEL
  ====================================================== */

  useEffect(() => {
    if (heroProducts.length <= 1 || isHeroPaused) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveSlide((current) => {
        return (current + 1) % heroProducts.length;
      });
    }, 5500);

    return () => window.clearInterval(interval);
  }, [heroProducts.length, isHeroPaused]);

  /* =====================================================
     CAROUSEL CONTROLS
  ====================================================== */

  const showPreviousSlide = () => {
    if (heroProducts.length === 0) {
      return;
    }

    setActiveSlide((current) =>
      current === 0 ? heroProducts.length - 1 : current - 1,
    );
  };

  const showNextSlide = () => {
    if (heroProducts.length === 0) {
      return;
    }

    setActiveSlide((current) => (current + 1) % heroProducts.length);
  };

  /* =====================================================
     RETURN
  ====================================================== */

  return (
    <div className="bg-dp-white">
      {/* =====================================================
          HERO PRODUCT CAROUSEL
      ====================================================== */}

      <section
        aria-label="Featured products"
        className="
          relative
          h-[82vh]
          min-h-[680px]
          w-full
          overflow-hidden
          bg-dp-black
          lg:h-[88vh]
          lg:min-h-[760px]
        "
      >
        {/* ===================================================
            LOADING STATE
        ==================================================== */}

        {isLoading && (
          <div className="absolute inset-0 z-50 bg-dp-black">
            <div
              className="
                absolute inset-0
                animate-pulse
                bg-gradient-to-r
                from-dp-black
                via-dp-charcoal
                to-dp-black
              "
            />

            <div
              className="
                relative z-10
                flex h-full items-center
                px-7
                sm:px-10
                lg:px-20
              "
            >
              <div className="w-full max-w-xl animate-pulse">
                <div className="h-2 w-40 rounded-full bg-white/10" />

                <div className="mt-7 h-16 w-full rounded-xl bg-white/10" />

                <div className="mt-3 h-16 w-3/4 rounded-xl bg-white/10" />

                <div className="mt-8 h-4 w-2/3 rounded-full bg-white/10" />

                <div className="mt-4 h-4 w-1/2 rounded-full bg-white/10" />

                <div className="mt-9 h-14 w-44 rounded-full bg-dp-gold/20" />
              </div>
            </div>
          </div>
        )}

        {/* ===================================================
            BACKEND PRODUCT IMAGES
        ==================================================== */}

        {!isLoading &&
          heroProducts.map((product, index) => {
            const image = getProductImage(product);
            const isActive = activeSlide === index;

            if (!image) {
              return null;
            }

            return (
              <div
                key={product._id}
                aria-hidden={!isActive}
                className={`
                  absolute inset-0
                  transition-all
                  duration-[1400ms]
                  ease-out

                  ${
                    isActive
                      ? "scale-100 opacity-100"
                      : "pointer-events-none scale-[1.04] opacity-0"
                  }
                `}
              >
                <img
                  src={image}
                  alt={isActive ? getProductName(product) : ""}
                  loading={index === 0 ? "eager" : "lazy"}
                  className="
                    h-full
                    w-full
                    object-cover
                    object-center
                  "
                />
              </div>
            );
          })}

        {/* ===================================================
            CINEMATIC OVERLAYS
        ==================================================== */}

        {!isLoading && heroProducts.length > 0 && (
          <>
            {/* LEFT-SIDE TEXT CONTRAST */}
            <div
              className="
                pointer-events-none
                absolute inset-0 z-10
                bg-gradient-to-r
                from-black/85
                via-black/45
                to-black/5
              "
            />

            {/* BOTTOM VIGNETTE */}
            <div
              className="
                pointer-events-none
                absolute inset-x-0 bottom-0 z-10
                h-[45%]
                bg-gradient-to-t
                from-black/65
                via-black/15
                to-transparent
              "
            />

            {/* TOP VIGNETTE */}
            <div
              className="
                pointer-events-none
                absolute inset-x-0 top-0 z-10
                h-[25%]
                bg-gradient-to-b
                from-black/30
                to-transparent
              "
            />
          </>
        )}

        {/* ===================================================
            PRODUCT CONTENT
        ==================================================== */}

        {!isLoading &&
          heroProducts.map((product, index) => {
            const isActive = activeSlide === index;

            return (
              <div
                key={`content-${product._id}`}
                aria-hidden={!isActive}
                className={`
                  absolute
                  left-7
                  top-1/2
                  z-20

                  max-w-[650px]
                  -translate-y-1/2

                  transition-all
                  duration-700

                  sm:left-10
                  lg:left-20
                  xl:left-[8%]

                  ${
                    isActive
                      ? "translate-x-0 opacity-100"
                      : "pointer-events-none translate-x-8 opacity-0"
                  }
                `}
              >
                {/* CATEGORY */}

                <div className="mb-5 flex items-center gap-4">
                  <span className="h-px w-9 bg-dp-gold" />

                  <span
                    className="
                      font-sans
                      text-[10px]
                      font-medium
                      uppercase
                      tracking-[0.32em]
                      text-dp-gold
                    "
                  >
                    {formatCategory(product.category)}
                  </span>
                </div>

                {/* PRODUCT NAME */}

                <h1
                  className="
                    max-w-[650px]
                    font-serif
                    text-[3.4rem]
                    leading-[0.94]
                    tracking-[-0.04em]
                    text-white

                    sm:text-[4.25rem]
                    lg:text-[5.3rem]
                  "
                >
                  {getProductName(product)}
                </h1>

                {/* DESCRIPTION */}

                <p
                  className="
                    mt-6
                    max-w-[500px]
                    font-sans
                    text-[15px]
                    leading-7
                    text-white/75
                    sm:text-base
                  "
                >
                  {product.description ||
                    "Discover a signature Dolly P piece shaped by considered craftsmanship, timeless form, and distinctive detail."}
                </p>

                {/* ACTIONS */}

                <div className="mt-8 flex flex-wrap items-center gap-5">
                  <Link
                    to={`/product/${product._id}`}
                    tabIndex={isActive ? 0 : -1}
                    className="
                      group
                      inline-flex
                      items-center gap-3

                      rounded-full
                      bg-dp-gold

                      px-7 py-4

                      font-sans
                      text-sm
                      font-medium
                      text-dp-black

                      shadow-[0_14px_35px_rgba(198,157,93,0.25)]

                      transition-all
                      duration-300

                      hover:-translate-y-0.5
                      hover:bg-white
                      hover:shadow-[0_20px_45px_rgba(0,0,0,0.25)]
                    "
                  >
                    View Piece

                    <ArrowUpRight
                      size={16}
                      strokeWidth={1.6}
                      className="
                        transition-transform
                        duration-300

                        group-hover:translate-x-0.5
                        group-hover:-translate-y-0.5
                      "
                    />
                  </Link>

                  <Link
                    to="/shop"
                    tabIndex={isActive ? 0 : -1}
                    className="
                      group
                      inline-flex
                      items-center gap-2

                      font-sans
                      text-sm
                      font-medium
                      text-white/80

                      transition-colors
                      duration-300

                      hover:text-dp-gold
                    "
                  >
                    Shop Collection

                    <ArrowUpRight
                      size={15}
                      strokeWidth={1.6}
                      className="
                        transition-transform
                        duration-300

                        group-hover:translate-x-0.5
                        group-hover:-translate-y-0.5
                      "
                    />
                  </Link>
                </div>
              </div>
            );
          })}

        {/* ===================================================
            CAROUSEL CONTROLS
        ==================================================== */}

        {!isLoading && heroProducts.length > 1 && (
          <div
            className="
              absolute
              bottom-8
              left-7 right-7
              z-30

              flex
              items-end
              justify-between

              sm:left-10
              sm:right-10

              lg:bottom-10
              lg:left-20
              lg:right-20

              xl:left-[8%]
              xl:right-[8%]
            "
          >
            {/* PROGRESS INDICATORS */}

            <div className="flex w-full max-w-[370px] items-center gap-2">
              {heroProducts.map((product, index) => {
                const isActive = activeSlide === index;

                return (
                  <button
                    key={`indicator-${product._id}`}
                    type="button"
                    onClick={() => setActiveSlide(index)}
                    aria-label={`View ${getProductName(product)}`}
                    aria-current={isActive ? "true" : undefined}
                    className="
                      group
                      relative
                      h-8
                      flex-1
                      cursor-pointer
                    "
                  >
                    <span
                      className="
                        absolute
                        left-0
                        top-1/2
                        h-px
                        w-full
                        -translate-y-1/2
                        bg-white/25
                      "
                    />

                    <span
                      className={`
                        absolute
                        left-0
                        top-1/2
                        h-[2px]
                        -translate-y-1/2
                        bg-dp-gold

                        transition-all
                        duration-500

                        ${
                          isActive
                            ? "w-full opacity-100"
                            : "w-0 opacity-0"
                        }
                      `}
                    />
                  </button>
                );
              })}

              <span
                className="
                  ml-2
                  whitespace-nowrap
                  font-sans
                  text-[10px]
                  font-medium
                  tracking-[0.18em]
                  text-white/60
                "
              >
                {String(activeSlide + 1).padStart(2, "0")}
                {" / "}
                {String(heroProducts.length).padStart(2, "0")}
              </span>
            </div>

            {/* PREVIOUS / PAUSE / NEXT */}

            <div className="ml-8 hidden items-center gap-2 sm:flex">
              <button
                type="button"
                onClick={showPreviousSlide}
                aria-label="Previous product"
                className="
                  flex
                  h-11 w-11
                  items-center
                  justify-center

                  rounded-full
                  border
                  border-white/20
                  bg-black/15
                  text-white

                  backdrop-blur-md

                  transition-all
                  duration-300

                  hover:border-dp-gold
                  hover:bg-dp-gold
                  hover:text-dp-black
                "
              >
                <ArrowLeft size={17} strokeWidth={1.5} />
              </button>

              <button
                type="button"
                onClick={() => setIsHeroPaused((current) => !current)}
                aria-label={
                  isHeroPaused
                    ? "Resume carousel"
                    : "Pause carousel"
                }
                aria-pressed={isHeroPaused}
                className="
                  flex
                  h-11 w-11
                  items-center
                  justify-center

                  rounded-full
                  border
                  border-white/20
                  bg-black/15
                  text-white

                  backdrop-blur-md

                  transition-all
                  duration-300

                  hover:border-dp-gold
                  hover:text-dp-gold
                "
              >
                {isHeroPaused ? (
                  <Play size={15} strokeWidth={1.7} />
                ) : (
                  <Pause size={15} strokeWidth={1.7} />
                )}
              </button>

              <button
                type="button"
                onClick={showNextSlide}
                aria-label="Next product"
                className="
                  flex
                  h-11 w-11
                  items-center
                  justify-center

                  rounded-full
                  border
                  border-white/20
                  bg-black/15
                  text-white

                  backdrop-blur-md

                  transition-all
                  duration-300

                  hover:border-dp-gold
                  hover:bg-dp-gold
                  hover:text-dp-black
                "
              >
                <ArrowRight size={17} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        )}

        {/* ===================================================
            NO BACKEND IMAGES FALLBACK
        ==================================================== */}

        {!isLoading && heroProducts.length === 0 && (
          <div
            className="
              flex
              h-full
              items-center
              px-7
              sm:px-10
              lg:px-20
            "
          >
            <div className="max-w-xl">
              <div className="flex items-center gap-4">
                <span className="h-px w-9