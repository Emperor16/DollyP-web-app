import { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import { useAdminAuth } from "../../context/AdminAuthContext";

const MAX_FILE_SIZE_MB = 2; // limit per image
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

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
    imagesUrl: "",
  });

  const [files, setFiles] = useState<File[]>([]);
  const [preview, setPreview] = useState<string[]>([]);
  const dropRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleFiles = (selectedFiles: FileList) => {
    const validFiles: File[] = [];
    const previews: string[] = [];

    Array.from(selectedFiles).forEach((file) => {
      if (file.size > MAX_FILE_SIZE_BYTES) {
        alert(`File "${file.name}" is too large. Max size is ${MAX_FILE_SIZE_MB}MB.`);
        return;
      }

      validFiles.push(file);
      previews.push(URL.createObjectURL(file));
    });

    setFiles((prev) => [...prev, ...validFiles]);
    setPreview((prev) => [...prev, ...previews]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("category", form.category);
    formData.append("sizes", form.sizes);
    formData.append("stock", form.stock);
    formData.append("isFeatured", String(form.isFeatured));

    // Add uploaded files
    files.forEach((file) => {
      formData.append("images", file);
    });

    // Add URL images
    if (form.imagesUrl.trim() !== "") {
      formData.append("images", form.imagesUrl);
    }

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/products`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Product created successfully!");
      navigate("/admin/products");
    } catch (error: any) {
      console.error(error);
      alert("Failed to create product. Check console for details.");
    }
  };

  return (
    <AdminLayout>
      <h1 className="font-serif text-3xl text-dp-black mb-10 tracking-wide">
        Add New Product
      </h1>

      <form className="space-y-8 max-w-2xl" onSubmit={handleSubmit} encType="multipart/form-data">
        
        {/* NAME */}
        <div>
          <label className="block mb-2">Product Name</label>
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
          <label className="block mb-2">Description</label>
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
          <label className="block mb-2">Price (₦)</label>
          <input
            name="price"
            value={form.price}
            onChange={handleChange}
            className="w-full border px-4 py-3"
            required
          />
        </div>

        {/* CATEGORY */}
        <div>
          <label className="block mb-2">Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border px-4 py-3"
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
          <label className="block mb-2">Sizes (comma separated)</label>
          <input
            name="sizes"
            value={form.sizes}
            onChange={handleChange}
            className="w-full border px-4 py-3"
            required
          />
        </div>

        {/* STOCK */}
        <div>
          <label className="block mb-2">Stock</label>
          <input
            name="stock"
            value={form.stock}
            onChange={handleChange}
            className="w-full border px-4 py-3"
            required
          />
        </div>

        {/* IMAGE UPLOAD */}
        <div>
          <label className="block mb-2">Upload Images</label>

          {/* Drag & Drop Zone */}
          <div
            ref={dropRef}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className="border-2 border-dashed border-gray-400 p-6 text-center rounded-lg mb-4"
          >
            Drag & Drop images here  
            <br />
            <span className="text-sm text-gray-500">Max size: {MAX_FILE_SIZE_MB}MB per image</span>
          </div>

          {/* File Input */}
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => handleFiles(e.target.files!)}
            className="w-full border px-4 py-3"
          />

          {/* Preview */}
          {preview.length > 0 && (
            <div className="grid grid-cols-3 gap-4 mt-4">
              {preview.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  className="w-full h-32 object-cover rounded"
                />
              ))}
            </div>
          )}
        </div>

        {/* URL IMAGES */}
        <div>
          <label className="block mb-2">Image URLs (optional)</label>
          <textarea
            name="imagesUrl"
            value={form.imagesUrl}
            onChange={handleChange}
            rows={3}
            className="w-full border px-4 py-3"
          />
        </div>

        {/* FEATURED */}
        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            name="isFeatured"
            checked={form.isFeatured}
            onChange={handleChange}
          />
          Featured Product
        </label>

        {/* SUBMIT */}
        <button
          type="submit"
          className="bg-dp-gold text-dp-black px-10 py-3 hover:bg-dp-velvet hover:text-white transition"
        >
          Create Product
        </button>
      </form>
    </AdminLayout>
  );
};

export default AdminCreate;
