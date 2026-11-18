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

type HeroProduct = Product & {
  image?: string;
  imageUrl?: string;
  images?: Array<string | { url?: string; secure_url?: string }>;
  description?: string;
  name?: string;
  title?: string;
  category?: string;
  price?: number;
};

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

const Home = () => {
  const [featured, setFeatured] = useState<Product[]>([]);
  const [heroProducts, setHeroProducts] = useState<HeroProduct[]>([]);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isHeroPaused, setIsHeroPaused] = useState(false);
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

        const products = data as HeroProduct[];

        const featuredProducts = products
          .filter((product) => product.isFeatured)
          .slice(0, 6);

        setFeatured(featuredProducts);

        /*
         * First use featured products that have images.
         * If there are not enough, fill the carousel with other
         * products that also have valid images.
         */
        const featuredWithImages = products.filter(
          (product) => product.isFeatured && getProductImage(product),
        );

        const otherProductsWithImages = products.filter(
          (product) => !product.isFeatured && getProductImage(product),
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

  useEffect(() => {
    if (heroProducts.length <= 1 || isHeroPaused) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveSlide((currentSlide) =>
        currentSlide === heroProducts.length - 1
          ? 0
          : currentSlide + 1,
      );
    }, 5500);

    return () => window.clearInterval(interval);
  }, [heroProducts.length, isHeroPaused]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsHeroPaused(document.hidden);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange,
      );
    };
  }, []);

  const showPreviousSlide = () => {
    setActiveSlide((currentSlide) =>
      currentSlide === 0
        ? heroProducts.length - 1
        : currentSlide - 1,
    );
  };

  const showNextSlide = () => {
    setActiveSlide((currentSlide) =>
      currentSlide === heroProducts.length - 1
        ? 0
        : currentSlide + 1,
    );
  };;

export default Home;
