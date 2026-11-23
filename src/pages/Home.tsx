import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Pause, Play } from "lucide-react";
import { Link } from "react-router-dom";

import { getProducts, type Product } from "../services/productService";
import ProductCard from "../components/products/ProductCard";
import PageContainer from "../components/layout/PageContainer";

const getProductImage = (product: Product): string | null => {
  const data = product as unknown as Record<string, unknown>;

  const directImageFields = [
    data.image,
    data.imageUrl,
    data.thumbnail,
    data.thumbnailUrl,
  ];

  for (const field of directImageFields) {
    if (typeof field === "string" && field.trim()) {
      return field;
    }
  }

  if (!Array.isArray(data.images) || data.images.length === 0) {
    return null;
  }

  const firstImage = data.images[0];

  if (typeof firstImage === "string" && firstImage.trim()) {
    return firstImage;
  }

  if (firstImage && typeof firstImage === "object") {
    const imageData = firstImage as Record<string, unknown>;

    const possibleUrls = [
      imageData.url,
      imageData.secure_url,
      imageData.imageUrl,
      imageData.src,
    ];

    for (const url of possibleUrls) {
      if (typeof url === "string" && url.trim()) {
        return url;
      }
    }
  }

  return null;
};

const getProductName = (product: Product): string => {
  const data = product as unknown as Record<string, unknown>;

  if (typeof data.name === "string" && data.name.trim()) {
    return data.name;
  }

  if (typeof data.title === "string" && data.title.trim()) {
    return data.title;
  }

  return "Dolly P Collection";
};

const getProductDescription = (product: Product): string | null => {
  const data = product as unknown as Record<string, unknown>;

  return typeof data.description === "string" && data.description.trim()
    ? data.description
    : null;
};

const getProductCategory = (product: Product): string => {
  const data = product as unknown as Record<string, unknown>;

  if (typeof data.category !== "string" || !data.category.trim()) {
    return "Dolly P";
  }

  return data.category.replace(/-/g, " ");
};

const Home = () => {
  const [featured, setFeatured] = useState<Product[]>([]);
  const [heroProducts, setHeroProducts] = useState<Product[]>([]);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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

        const featuredProducts = data
          .filter((product) => product.isFeatured)
          .slice(0, 6);

        const productsWithImages = data.filter((product) =>
          Boolean(getProductImage(product)),
        );

        const featuredWithImages = productsWithImages.filter(
          (product) => product.isFeatured,
        );

        const otherProductsWithImages = productsWithImages.filter(
          (product) => !product.isFeatured,
        );

        setFeatured(featuredProducts);
        setHeroProducts(
          [...featuredWithImages, ...otherProductsWithImages].slice(0, 5),
        );
        setActiveSlide(0);
      } catch (error) {
        console.error("Failed to load products:", error);
        setFeatured([]);
        setHeroProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  useEffect(() => {
    if (heroProducts.length <= 1 || isPaused) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroProducts.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, [heroProducts.length, isPaused]);

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

  const activeProduct = heroProducts[activeSlide];

  return (
    <main className="overflow-hidden bg-dp-white">
      <section className="relative h-[80vh] min-h-[620px] w-full overflow-hidden bg-dp-black lg:h-[86vh] lg:min-h-[700px]">
        {isLoading && (
          <div className="absolute inset-0 animate-pulse bg-dp-black">
            <div className="absolute inset-0 bg-gradient-to-r from-black via-dp-charcoal to-black" />

            <div className="relative z-10 flex h-full items-center px-6 sm:px-10 lg:px-20">
              <div className="w-full max-w-xl">
                <div className="h-3 w-36 rounded-full bg-white/10" />
                <div className="mt-6 h-16 w-full rounded-xl bg-white/10" />
                <div className="mt-3 h-16 w-3/4 rounded-xl bg-white/10" />
                <div className="mt-7 h-4 w-2/3 rounded-full bg-white/10" />
                <div className="mt-8 h-14 w-40 rounded-full bg-dp-gold/20" />
              </div>
            </div>
          </div>
        )}

        {!isLoading &&
          heroProducts.map((product, index) => {
            const image = getProductImage(product);
            const isActive = index === activeSlide;

            if (!image) {
              return null;
            }

            return (
              <div
                key={product._id}
                aria-hidden={!isActive}
                className={`absolute inset-0 transition-all duration-1000 ease-out ${
                  isActive
                    ? "scale-100 opacity-100"
                    : "pointer-events-none scale-[1.03] opacity-0"
                }`}
              >
                <img
                  src={image}
                  alt={isActive ? getProductName(product) : ""}
                  loading={index === 0 ? "eager" : "lazy"}
                  className="h-full w-full object-cover object-center"
                />
              </div>
            );
          })}

        {!isLoading && activeProduct && (
          <>
            <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-black/85 via-black/45 to-black/5" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-1/2 bg-gradient-to-t from-black/70 to-transparent" />

            <div className="relative z-20 mx-auto flex h-full w-full max-w-[1600px] items-center px-6 sm:px-10 lg:px-16 xl:px-20">
              <div
                key={activeProduct._id}
                className="max-w-[680px] animate-[fadeIn_600ms_ease-out]"
              >
                <div className="mb-5 flex items-center gap-4">
                  <span className="h-px w-9 bg-dp-gold" />

                  <p className="font-sans text-[10px] font-medium uppercase tracking-[0.3em] text-dp-gold sm:text-[11px]">
                    {getProductCategory(activeProduct)}
                  </p>
                </div>

                <h1 className="font-serif text-[3.3rem] leading-[0.95] tracking-[-0.04em] text-white sm:text-[4.3rem] md:text-[5rem] lg:text-[5.6rem]">
                  {getProductName(activeProduct)}
                </h1>

                {getProductDescription(activeProduct) && (
                  <p className="mt-6 max-w-[540px] font-sans text-base leading-7 text-white/75 sm:text-lg">
                    {getProductDescription(activeProduct)}
                  </p>
                )}

                <div className="mt-8 flex flex-wrap items-center gap-5">
                  <Link
                    to={`/product/${activeProduct._id}`}
                    className="group inline-flex items-center gap-3 rounded-full bg-dp-gold px-7 py-4 font-sans text-sm font-medium text-dp-black shadow-[0_14px_35px_rgba(198,157,93,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white"
                  >
                    View Piece
                    <ArrowUpRight
                      size={16}
                      strokeWidth={1.6}
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </Link>

                  <Link
                    to="/shop"
                    className="group inline-flex items-center gap-2 py-3 font-sans text-sm font-medium text-white/80 transition-colors duration-300 hover:text-dp-gold"
                  >
                    Shop Collection
                    <ArrowUpRight
                      size={15}
                      strokeWidth={1.6}
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </Link>
                </div>
              </div>
            </div>

            {heroProducts.length > 1 && (
              <div className="absolute bottom-7 left-6 right-6 z-30 mx-auto flex max-w-[1480px] items-center justify-between sm:left-10 sm:right-10 lg:bottom-10 lg:left-16 lg:right-16">
                <div className="flex w-full max-w-[370px] items-center gap-2">
                  {heroProducts.map((product, index) => {
                    const isActive = index === activeSlide;

                    return (
                      <button
                        key={product._id}
                        type="button"
                        onClick={() => setActiveSlide(index)}
                        aria-label={`Show ${getProductName(product)}`}
                        aria-current={isActive ? "true" : undefined}
                        className="relative h-8 flex-1"
                      >
                        <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-white/25" />

                        <span
                          className={`absolute left-0 top-1/2 h-[2px] -translate-y-1/2 bg-dp-gold transition-all duration-500 ${
                            isActive ? "w-full opacity-100" : "w-0 opacity-0"
                          }`}
                        />
                      </button>
                    );
                  })}

                  <span className="ml-2 whitespace-nowrap font-sans text-[10px] tracking-[0.16em] text-white/60">
                    {String(activeSlide + 1).padStart(2, "0")} /{" "}
                    {String(heroProducts.length).padStart(2, "0")}
                  </span>
                </div>

                <div className="ml-6 hidden items-center gap-2 sm:flex">
                  <button
                    type="button"
                    onClick={showPreviousSlide}
                    aria-label="Previous product"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-black/20 text-white backdrop-blur-md transition hover:border-dp-gold hover:bg-dp-gold hover:text-dp-black"
                  >
                    <ArrowLeft size={17} strokeWidth={1.6} />
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsPaused((current) => !current)}
                    aria-label={isPaused ? "Play carousel" : "Pause carousel"}
                    aria-pressed={isPaused}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-black/20 text-white backdrop-blur-md transition hover:border-dp-gold hover:text-dp-gold"
                  >
                    {isPaused ? (
                      <Play size={15} strokeWidth={1.7} />
                    ) : (
                      <Pause size={15} strokeWidth={1.7} />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={showNextSlide}
                    aria-label="Next product"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-black/20 text-white backdrop-blur-md transition hover:border-dp-gold hover:bg-dp-gold hover:text-dp-black"
                  >
                    <ArrowRight size={17} strokeWidth={1.6} />
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {!isLoading && !activeProduct && (
          <div className="flex items-center bg-dp-black px-6 sm:px-10 lg:px-20">
            <div>
              <h1 className="font-serif text-5xl text-white sm:text-6xl">
                Dolly P
              </h1>

              <Link
                to="/shop"
                className="mt-7 inline-flex items-center gap-3 rounded-full bg-dp-gold px-7 py-4 font-sans text-sm font-medium text-dp-black"
              >
                Shop Collection
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        )}
      </section>

      <section className=" mt-20 bg-[#ffffff] ">
        <div className="mx-auto max-w-4xl text-center">
          <p className="font-sans text-[10px] font-medium uppercase tracking-[0.3em] text-dp-gold">
            Dolly P
          </p>

          <h2 className="mt-5 font-serif text-[2.6rem] leading-[1.05] tracking-[-0.035em] text-dp-black sm:text-[3.4rem] lg:text-[4rem]">
            Crafted for modern African royalty.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl font-sans text-[15px] leading-7 text-dp-charcoal/65">
            Timeless silhouettes, considered craftsmanship, and premium fabrics
            created for confidence and elegance.
          </p>
        </div>
      </section>

      <section className="bg-dp-white py-16 sm:py-20 lg:py-24">
        <PageContainer>
          <div className="mb-10 flex flex-col gap-5 border-b border-dp-gold/15 pb-7 sm:flex-row sm:items-end sm:justify-between lg:mb-12">
            <div>
              <p className="font-sans text-[10px] font-medium uppercase tracking-[0.3em] text-dp-gold">
                Featured
              </p>

              <h2 className="mt-3 font-serif text-[2.6rem] leading-none tracking-[-0.035em] text-dp-black sm:text-[3.3rem]">
                Selected Pieces
              </h2>
            </div>

            <Link
              to="/shop"
              className="group inline-flex w-fit items-center gap-2 font-sans text-sm font-medium text-dp-charcoal transition-colors hover:text-dp-gold"
            >
              View all pieces
              <ArrowUpRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="aspect-[3/4] rounded-3xl bg-dp-gold/10" />
                  <div className="mt-4 h-4 w-2/3 rounded-full bg-dp-gold/10" />
                  <div className="mt-3 h-3 w-1/3 rounded-full bg-dp-gold/10" />
                </div>
              ))}
            </div>
          ) : featured.length > 0 ? (
            <div className="grid grid-cols-1 gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="border border-dashed border-dp-gold/30 px-6 py-16 text-center">
              <p className="font-serif text-2xl text-dp-black">
                No featured products available.
              </p>

              <Link
                to="/shop"
                className="mt-6 inline-flex items-center gap-2 font-sans text-sm font-medium text-dp-gold"
              >
                View all products
                <ArrowUpRight size={15} />
              </Link>
            </div>
          )}

          {!isLoading && featured.length > 0 && (
            <div className="mt-14 flex justify-center">
              <Link
                to="/shop"
                className="group inline-flex items-center gap-3 rounded-full border border-dp-black/20 px-8 py-4 font-sans text-sm font-medium text-dp-black transition-all duration-300 hover:border-dp-black hover:bg-dp-black hover:text-white"
              >
                Explore Full Collection
                <ArrowUpRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
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
