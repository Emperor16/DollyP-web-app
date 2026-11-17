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
      "isFeatured",
      String(form.isFeatured)
    );

    normalizedSizes.forEach((size) => {
      formData.append("sizes[]", size);
    });

    files.forEach((file) => {
      formData.append("images", file);
    });

    try {
      start();

      await api.post("/api/products", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },

        onUploadProgress: (uploadEvent) => {
          const percent = uploadEvent.total
            ? Math.round(
                (uploadEvent.loaded * 100) /
                  uploadEvent.total
              )
            : 0;

          update(percent);
        },
      });

      finish();
      window.alert("Product created successfully!");
      navigate("/admin/products");
    } catch (requestError: any) {
      finish();

      const backendMessage =
        requestError.response?.data?.message ||
        requestError.response?.data?.error ||
        "Failed to create product.";

      setSubmitError(backendMessage);
      console.error(
        "Failed to create product:",
        requestError
      );
    }
  };

  const fieldClassName = `
    w-full
    rounded-xl
    border border-dp-gold/20
    bg-white
    px-4 py-3.5
    font-sans text-sm text-dp-black
    outline-none
    transition-all duration-200
    placeholder:text-dp-charcoal/35
    hover:border-dp-gold/40
    focus:border-dp-gold
    focus:ring-4
    focus:ring-dp-gold/10
    disabled:cursor-not-allowed
    disabled:opacity-60
  `;

  const labelClassName = `
    mb-2
    block
    font-sans text-xs
    font-medium
    text-dp-charcoal
  `;

  return (
    <AdminLayout>
      <div className="mx-auto max-w-7xl space-y-8">
        {/* PAGE HEADER */}
        <section className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Link
              to="/admin/products"
              className="
                mb-5
                inline-flex items-center gap-2
                font-sans text-xs
                text-dp-charcoal/55
                transition-colors
                hover:text-dp-gold
              "
            >
              <ArrowLeft size={15} />
              Back to product inventory
            </Link>

            <p className="mb-3 font-sans text-[10px] uppercase tracking-[0.3em] text-dp-gold">
              Catalogue management
            </p>

            <h1 className="font-serif text-4xl tracking-tight text-dp-black md:text-5xl">
              Create a new product
            </h1>

            <p className="mt-3 max-w-2xl font-sans text-sm leading-7 text-dp-charcoal/60">
              Add product details, inventory information,
              available sizes, and imagery to the Dolly P
              catalogue.
            </p>
          </div>

          <div className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-full bg-dp-gold/10 text-dp-gold lg:flex">
            <PackagePlus size={23} strokeWidth={1.5} />
          </div>
        </section>

        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(340px,0.65fr)]">
            {/* LEFT COLUMN */}
            <div className="space-y-6">
              {/* PRODUCT DETAILS */}
              <section
                className="
                  rounded-3xl
                  border border-dp-gold/20
                  bg-white/75
                  p-6 md:p-8
                  backdrop-blur-sm
                "
              >
                <div className="mb-8">
                  <p className="mb-2 font-sans text-[10px] uppercase tracking-[0.28em] text-dp-gold">
                    Product information
                  </p>

                  <h2 className="font-serif text-2xl text-dp-black">
                    Product Details
                  </h2>

                  <p className="mt-2 font-sans text-xs leading-5 text-dp-charcoal/50">
                    Enter the main information customers will
                    see in the catalogue.
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className={labelClassName}
                    >
                      Product name
                    </label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="e.g. Monochrome Statement Kimono"
                      className={fieldClassName}
                      disabled={uploading}
                      required
                    />
                  </div>

