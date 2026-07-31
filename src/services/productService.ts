import { api } from "./api";

//baseed on my backend data
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
  const response = await api.get("/products");
  return response.data;
};

// Fetch a single product by ID
export const getProductById = async (id: string): Promise<Product> => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

// Create a new product (Admin Dashboard)
export const createProduct = async (formData: FormData): Promise<Product> => {
  const response = await api.post("/products", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

// Delete a product (Admin Dashboard)
export const deleteProduct = async (id: string): Promise<void> => {
  await api.delete(`/products/${id}`);
};
