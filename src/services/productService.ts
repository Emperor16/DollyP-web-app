import { api } from "./api";

// Based on backend data
export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  sizes: string[];
  stock: number;
  images: string[];
  isFeatured: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

// Fetch all products
export const getProducts = async (): Promise<Product[]> => {
  const response = await api.get("/api/products");
  return response.data.products;   // ✅ FIXED
};

// Fetch a single product by ID
export const getProductById = async (id: string): Promise<Product> => {
  const response = await api.get(`/api/products/${id}`);
  return response.data.product;    // ✅ FIXED
};

// Create a new product (Admin Dashboard)
export const createProduct = async (formData: FormData): Promise<Product> => {
  const response = await api.post("/api/products", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data.product;    // ✅ FIXED
};

// Delete a product (Admin Dashboard)
export const deleteProduct = async (id: string): Promise<void> => {
  await api.delete(`/api/products/${id}`);
};
