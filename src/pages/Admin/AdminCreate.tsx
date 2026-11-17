import {
  type ChangeEvent,
  type FormEvent,
  useState,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Check,
  ImagePlus,
  PackagePlus,
  Sparkles,
} from "lucide-react";

import AdminLayout from "./AdminLayout";
import { useAdminAuth } from "../../context/AdminAuthContext";

import { useImageUpload } from "./components/useImageUpload";
import ImageUploadZone from "./components/ImageUploadZone";
import ImagePreviewGrid from "./components/ImagePreviewGrid";
import { useUploadProgress } from "./components/useUploadProgress";
import UploadProgressBar from "./components/UploadProgressBar";

import api from "../../services/api";

type ProductForm = {
  name: string;
  description: string;
  price: string;
  category: string;
  sizes: string;
  stock: string;
  isFeatured: boolean;
};

const AdminCreate = () => {
  const navigate = useNavigate();
  const { token } = useAdminAuth();

  const [form, setForm] = useState<ProductForm>({
    name: "",
    description: "",
    price: "",
    category: "dress",
    sizes: "",
    stock: "",
    isFeatured: false,
  });

  const [submitError, setSubmitError] = useState<string | null>(
    null
  );

  const {
    files,
    preview,
    dragActive,
    setDragActive,
    error: uploadError,
    addFiles,
    removeImage,
  } = useImageUpload();

  const {
    progress,
    uploading,
    start,
    update,
    finish,
  } = useUploadProgress();

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ) => {
    const { name, value, type } = event.target;

    const nextValue =
      type === "checkbox"
        ? (event.target as HTMLInputElement).checked
        : value;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: nextValue,
    }));

    if (submitError) {
      setSubmitError(null);
    }
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setSubmitError(null);

    const normalizedSizes = form.sizes
      .split(",")
      .map((size) => size.trim())
      .filter(Boolean);

    if (normalizedSizes.length === 0) {
      setSubmitError(
        "Enter at least one available product size."
      );
      return;
    }

    if (Number(form.price) <= 0) {
      setSubmitError(
        "Product price must be greater than zero."
      );
      return;
    }

    if (Number(form.stock) < 0) {
      setSubmitError("Product stock cannot be negative.");
      return;
    }

    const formData = new FormData();

    formData.append("name", form.name.trim());
    formData.append(
      "description",
      form.description.trim()
    );
    formData.append("price", form.price);
    formData.append("category", form.category);
    formData.append("stock", form.stock);
    formData.append(
      "isFeatured"