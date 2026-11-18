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

  // The return function
  return (
    <div className="bg-dp-white">

      {/* HERO SECTION */}
      <section className="relative h-[85vh] w-full overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=800"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 h-full flex flex-col justify-center items-start px-10 lg:px-20">
          <h1 className="font-serif text-5xl lg:text-6xl text-white tracking-wide leading-tight">
            Luxury African Fashion<br />Redefined
          </h1>

          <p className="text-white/90 font-sans text-lg max-w-xl mt-6">
            Discover handcrafted gowns, kaftans, and couture pieces inspired by
            African heritage designed for modern elegance.
          </p>

          <Link
            to="/shop"
            className="mt-8 inline-block bg-dp-gold text-dp-black px-8 py-3 font-sans text-sm tracking-wide hover:bg-dp-velvet hover:text-white transition"
          >
            Shop Collection
          </Link>
        </div>
      </section>

      {/* BRAND STATEMENT */}
      <PageContainer>
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="font-serif text-3xl text-dp-black tracking-wide">
            Crafted for the Modern African Royalty
          </h2>
          <p className="font-sans text-dp-charcoal/70 mt-4 leading-relaxed">
            Dolly P celebrates African luxury through timeless silhouettes,
            artisanal craftsmanship, and premium fabrics sourced across the
            continent. Every piece tells a story of heritage, elegance, and
            identity.
          </p>
        </div>

        {/* FEATURED PRODUCTS */}
        <h3 className="font-serif text-2xl text-dp-black mb-10 tracking-wide">
          Featured Pieces
        </h3>

        {featured.length === 0 ? (
          <p className="text-dp-charcoal/70 font-sans">Loading featured products...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {featured.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="text-center mt-20">
          <Link
            to="/shop"
            className="inline-block border border-dp-black px-10 py-3 font-sans text-sm tracking-wide hover:bg-dp-black hover:text-white transition"
          >
            Explore Full Collection
          </Link>
        </div>
      </PageContainer>
    </div>
  );
};

export default Home;
