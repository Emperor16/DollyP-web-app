import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import { useAdminAuth } from "../../context/AdminAuthContext";

// Upload system components
import { useImageUpload } from "./components/useImageUpload";
import ImageUploadZone from "./components/ImageUploadZone";
import ImagePreviewGrid from "./components/ImagePreviewGrid";
import { useUploadProgress } from "./components/useUploadProgress";
import UploadProgressBar from "./components/UploadProgressBar";

const AdminCreate = () => {
  const navigate = useNavigate();
  const { token } = useAdminAuth();

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "dress",
    sizes: "",
    stock: "",
    isFeatured: false,
  });

  // Upload system hook
  const {
    files,
    preview,
    dragActive,
    setDragActive,
    error,
    addFiles,
    removeImage,
  } = useImageUpload();

 //progress bar
  const { progress, uploading, start, update, finish } = useUploadProgress();

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("category", form.category);
    formData.append("stock", form.stock);
    formData.append("isFeatured", String(form.isFeatured));

    // Sizes array
    form.sizes
      .split(",")
      .map((s) => s.trim())
      .forEach((size) => formData.append("sizes[]", size));

    // Cloudinary images
    files.forEach((file) => {
      formData.append("images", file);
    });

    try {
      start();

      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/products`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (event) => {
            const percent = event.total
              ? Math.round((event.loaded * 100) / event.total)
              : 0;
            update(percent);
          },
        }
      );

      finish();
      alert("Product created successfully!");
      navigate("/admin/products");
    } catch (error: any) {
  finish();

  const backendMessage =
    error.response?.data?.message ||
    error.response?.data?.error ||
    "Failed to create product.";

  alert(backendMessage);

  console.error("Full error:", error);
}

  };

  return (
    <AdminLayout>
      <h1 className="font-serif text-3xl text-dp-black mb-10 tracking-wide">
        Add New Product
      </h1>

      <form
        className="space-y-8 max-w-2xl"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        {/* NAME */}
        <div>
          <label className="block mb-2 font-sans">Product Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border px-4 py-3"
            required
          />
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="block mb-2 font-sans">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            className="w-full border px-4 py-3"
            required
          />
        </div>

        {/* PRICE */}
        <div>
          <label className="block mb-2 font-sans">Price (₦)</label>
          <input
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            className="w-full border px-4 py-3"
            required
          />
        </div>

        {/* CATEGORY */}
        <div>
          <label className="block mb-2 font-sans">Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border px-4 py-3 bg-white"
          >
            <option value="dress">Dress</option>
            <option value="gown">Gown</option>
            <option value="kaftan">Kaftan</option>
            <option value="two-piece">Two-Piece</option>
            <option value="outerwear">Outerwear</option>
          </select>
        </div>

        {/* SIZES */}
        <div>
          <label className="block mb-2 font-sans">Sizes (comma separated)</label>
          <input
            name="sizes"
            value={form.sizes}
            onChange={handleChange}
            placeholder="e.g. S, M, L, XL"
            className="w-full border px-4 py-3"
            required
          />
        </div>

        {/* STOCK */}
        <div>
          <label className="block mb-2 font-sans">Stock</label>
          <input
            name="stock"
            type="number"
            value={form.stock}
            onChange={handleChange}
            className="w-full border px-4 py-3"
            required
          />
        </div>

        {/* IMAGE UPLOAD */}
        <div>
          <label className="block mb-2 font-sans">Upload Images</label>

          <ImageUploadZone
            dragActive={dragActive}
            setDragActive={setDragActive}
            addFiles={addFiles}
            error={error}
          />

          <ImagePreviewGrid preview={preview} removeImage={removeImage} />
        </div>

        {/* PROGRESS BAR */}
        <UploadProgressBar progress={progress} uploading={uploading} />

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={uploading}
          className="bg-dp-gold text-dp-black px-10 py-3 hover:bg-dp-velvet hover:text-white transition disabled:opacity-50"
        >
          {uploading ? "Creating Product..." : "Create Product"}
        </button>
      </form>
    </AdminLayout>
  );
};

export default AdminCreate;
