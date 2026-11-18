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