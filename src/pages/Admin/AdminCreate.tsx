import { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import { useAdminAuth } from "../../context/AdminAuthContext";
import { useUploadProgress } from "./components/useUploadProgress";
import UploadProgressBar from "./components/UploadProgressBar";

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

  const { progress, uploading, start, update, finish } = useUploadProgress();

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
    formData.append("stock", form.stock);
    formData.append("isFeatured", String(form.isFeatured));

    // Convert comma-separated sizes string into array format if your backend expects it
    const sizesArray = form.sizes.split(",").map((s) => s.trim());
    sizesArray.forEach((size) => {
      formData.append("sizes[]", size);
    });

    // Add uploaded files
    files.forEach((file) => {
      formData.append("images", file);
    });

    // Add URL images
    if (form.imagesUrl.trim() !== "") {
      formData.append("images", form.imagesUrl);
    }

    try {
      start(); // Start the progress bar animation

      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/products`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const percent = progressEvent.total
              ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
              : 0;
            update(percent);
          },
        }
      );

      finish(); // Complete the progress bar
      alert("Product created successfully!");
      navigate("/admin/products");
    } catch (error: any) {
      console.error(error);
      finish();
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

          <div
            ref={dropRef}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className="border-2 border-dashed border-gray-400 p-6 text-center rounded-lg mb-4 cursor-pointer"
          >
            Drag & Drop images here  
            <br />
            <span className="text-sm text-gray-500">Max size: {MAX_FILE_SIZE_MB}MB per image</span>
          </div>

          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => handleFiles(e.target.files!)}
            className="w-full border px-4 py-3"
          />

          {preview.length > 0 && (
            <div className="grid grid-cols-3 gap-4 mt-4">
              {preview.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt={`Preview ${idx}`}
                  className="w-full h-32 object-cover rounded"
                />
              ))}
            </div>
          )}
        </div>

        {/* URL IMAGES */}
        <div>
          <label className="block mb-2 font-sans">Image URLs (optional)</label>
          <textarea
            name="imagesUrl"
            value={form.imagesUrl}
            onChange={handleChange}
            rows={2}
            className="w-full border px-4 py-3"
          />
        </div>

        {/* FEATURED */}
        <label className="flex items-center gap-3 font-sans">
          <input
            type="checkbox"
            name="isFeatured"
            checked={form.isFeatured}
            onChange={handleChange}
          />
          Featured Product
        </label>

        {/* UPLOAD PROGRESS BAR */}
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