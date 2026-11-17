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
  border border-dp-gold/25
  bg-white
  px-4 py-4
  font-sans text-base font-medium text-dp-black
  outline-none
  transition-all duration-200
  placeholder:font-normal
  placeholder:text-dp-charcoal/50
  hover:border-dp-gold/50
  focus:border-dp-gold
  focus:ring-4
  focus:ring-dp-gold/10
  disabled:cursor-not-allowed
  disabled:opacity-60
`;

const labelClassName = `
  mb-2.5
  block
  font-sans text-base font-semibold
  text-dp-black
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
    font-sans text-sm font-semibold
    text-dp-charcoal/70
    transition-colors
    hover:text-dp-gold
  "
>
  <ArrowLeft size={17} strokeWidth={2} />
  Back to product inventory
</Link>

<p className="mb-3 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-dp-gold">
  Dolly P Admin · Catalogue Management
</p>

<h1 className="font-serif text-4xl font-semibold tracking-tight text-dp-black md:text-5xl">
  Create a new product
</h1>

<p className="mt-4 max-w-2xl font-sans text-sm font-normal leading-7 text-dp-charcoal/70 md:text-base">
  Add product details, inventory information, available sizes,
  and imagery to the Dolly P catalogue.
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

                  <div>
                    <div className="mb-2 flex items-center justify-between gap-4">
                      <label
                        htmlFor="description"
                        className="font-sans text-xs font-medium text-dp-charcoal"
                      >
                        Description
                      </label>

                      <span className="font-sans text-[10px] text-dp-charcoal/40">
                        {form.description.length} characters
                      </span>
                    </div>

                    <textarea
                      id="description"
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      rows={6}
                      placeholder="Describe the product, material, fit, and defining details."
                      className={`${fieldClassName} resize-y leading-6`}
                      disabled={uploading}
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="category"
                      className={labelClassName}
                    >
                      Category
                    </label>

                    <select
                      id="category"
                      name="category"
                      value={form.category}
                      onChange={handleChange}
                      className={fieldClassName}
                      disabled={uploading}
                    >
                      <option value="dress">Dress</option>
                      <option value="gown">Gown</option>
                      <option value="kaftan">Kaftan</option>
                      <option value="two-piece">
                        Two-Piece
                      </option>
                      <option value="outerwear">
                        Outerwear
                      </option>
                    </select>
                  </div>
                </div>
              </section>

              {/* PRICING AND INVENTORY */}
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
                    Availability
                  </p>

                  <h2 className="font-serif text-2xl text-dp-black">
                    Pricing &amp; Inventory
                  </h2>
           <p className="mt-2 font-sans text-xs leading-5 text-dp-charcoal/50">
                    Set the selling price, quantity, and
                    available product sizes.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="price"
                        className={labelClassName}
                      >
                        Price
                      </label>

                      <div className="relative">
                        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 font-sans text-sm text-dp-charcoal/45">
                          ₦
                        </span>

                        <input
                          id="price"
                          name="price"
                          type="number"
                          value={form.price}
                          onChange={handleChange}
                          placeholder="60000"
                          min="0"
                          step="0.01"
                          className={`${fieldClassName} pl-9`}
                          disabled={uploading}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="stock"
                        className={labelClassName}
                      >
                        Stock quantity
                      </label>

                      <input
                        id="stock"
                        name="stock"
                        type="number"
                        value={form.stock}
                        onChange={handleChange}
                        placeholder="10"
                        min="0"
                        step="1"
                        className={fieldClassName}
                        disabled={uploading}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="sizes"
                      className={labelClassName}
                    >
                      Available sizes
                    </label>

                    <input
                      id="sizes"
                      name="sizes"
                      type="text"
                      value={form.sizes}
                      onChange={handleChange}
                      placeholder="S, M, L, XL"
                      className={fieldClassName}
                      disabled={uploading}
                      required
                    />

                    <p className="mt-2 font-sans text-[11px] leading-5 text-dp-charcoal/45">
                      Separate each size with a comma. Example:
                      S, M, L, XL.
                    </p>
                  </div>
                </div>
              </section>
            </div>

            {/* RIGHT COLUMN */}
            <aside className="space-y-6">
              {/* PRODUCT MEDIA */}
              <section
                className="
                  rounded-3xl
                  border border-dp-gold/20
                  bg-white/75
                  p-6 md:p-7
                  backdrop-blur-sm
                  xl:sticky xl:top-6
                "
              >
                <div className="mb-7 flex items-start justify-between gap-4">
                  <div>
                    <p className="mb-2 font-sans text-[10px] uppercase tracking-[0.28em] text-dp-gold">
                      Product media
                    </p>

                    <h2 className="font-serif text-2xl text-dp-black">
                      Product Images
                    </h2>

                    <p className="mt-2 font-sans text-xs leading-5 text-dp-charcoal/50">
                      Add clear images that represent the
                      product accurately.
                    </p>
                  </div>

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-dp-gold/10 text-dp-gold">
                    <ImagePlus
                      size={19}
                      strokeWidth={1.5}
                    />
                  </div>
                </div>

                <ImageUploadZone
                  dragActive={dragActive}
                  setDragActive={setDragActive}
                  addFiles={addFiles}
                  error={uploadError}
                />

                {preview.length > 0 && (
                  <div className="mt-6">
                    <div className="mb-3 flex items-center justify-between">
                      <p className="font-sans text-xs font-medium text-dp-charcoal">
                        Selected images
                      </p>

                      <span className="rounded-full bg-dp-gold/10 px-2.5 py-1 font-sans text-[10px] text-dp-charcoal/60">
                        {preview.length}{" "}
                        {preview.length === 1
                          ? "image"
                          : "images"}
                      </span>
                    </div>

                    <ImagePreviewGrid
                      preview={preview}
                      removeImage={removeImage}
                    />
                  </div>
                )}

                {/* FEATURED CONTROL */}
                <div className="mt-7 border-t border-dp-gold/15 pt-6">
                  <label
                    htmlFor="isFeatured"
                    className="
                      flex cursor-pointer
                      items-start gap-4
                      rounded-2xl
                      border border-dp-gold/20
                      p-4
                      transition-all duration-200
                      hover:border-dp-gold/45
                      hover:bg-dp-gold/5
                    "
                  >
                    <span
                      className={`
                        mt-0.5
                        flex h-5 w-5 shrink-0
                        items-center justify-center
                        rounded-md border
                        transition-all duration-200
                        ${
                          form.isFeatured
                            ? "border-dp-black bg-dp-black text-white"
                            : "border-dp-gold/40 bg-white text-transparent"
                        }
                      `}
                    >
                      <Check size={13} strokeWidth={2.5} />
                    </span>

                    <span className="min-w-0">
                      <span className="flex items-center gap-2 font-sans text-sm font-medium text-dp-black">
                        <Sparkles
                          size={15}
                          className="text-dp-gold"
                        />
                        Featured product
                      </span>

                      <span className="mt-1 block font-sans text-[11px] leading-5 text-dp-charcoal/50">
                        Highlight this item in the featured
                        catalogue collection.
                      </span>
                    </span>

                    <input
                      id="isFeatured"
                      name="isFeatured"
                      type="checkbox"
                      checked={form.isFeatured}
                      onChange={handleChange}
                      disabled={uploading}
                      className="sr-only"
                    />
                  </label>
                </div>

                {/* UPLOAD PROGRESS */}
                <div className="mt-6">
                  <UploadProgressBar
                    progress={progress}
                    uploading={uploading}
                  />
                </div>

                {/* SUBMISSION ERROR */}
                {submitError && (
                  <div
                    role="alert"
                    className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 font-sans text-xs leading-5 text-red-700"
                  >
                    {submitError}
                  </div>
                )}

                {/* ACTIONS */}
                <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row">
                  <Link
                    to="/admin/products"
                    aria-disabled={uploading}
                    onClick={(event) => {
                      if (uploading) {
                        event.preventDefault();
                      }
                    }}
                    className={`
                      inline-flex flex-1
                      items-center justify-center
                      rounded-full
                      border border-dp-gold/25
                      px-5 py-3.5
                      font-sans text-sm
                      text-dp-charcoal
                      transition-all duration-200
                      hover:border-dp-gold
                      hover:bg-dp-gold/10
                      ${
                        uploading
                          ? "pointer-events-none opacity-50"
                          : ""
                      }
                    `}
                  >
                    Cancel
                  </Link>

                  <button
                    type="submit"
                    disabled={uploading}
                    className="
                      inline-flex flex-[1.4]
                      items-center justify-center gap-2
                      rounded-full
                      bg-dp-black
                      px-5 py-3.5
                      font-sans text-sm text-white
                      transition-all duration-300
                      hover:bg-dp-gold
                      hover:text-dp-black
                      disabled:cursor-not-allowed
                      disabled:opacity-50
                    "
                  >
                    <PackagePlus
                      size={17}
                      strokeWidth={1.7}
                    />

                    {uploading
                      ? `Creating ${progress}%`
                      : "Create Product"}
                  </button>
                </div>
              </section>
            </aside>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AdminCreate;