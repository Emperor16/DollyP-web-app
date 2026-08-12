import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "../../pages/Admin/AdminLayout";
import { getProductById, type Product } from "../../services/productService";
import axios from "axios";

const AdminEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    sizes: "",
    stock: "",
    isFeatured: false,
    images: "",
  });

  useEffect(() => {
    if (id) {
      getProductById(id).then((data) => {
        setProduct(data);

        // Pre-fill form
        setForm({
          name: data.name,
          description: data.description,
          price: String(data.price),
          category: data.category,
          sizes: data.sizes.join(", "),
          stock: String(data.stock),
          isFeatured: data.isFeatured,
          images: data.images.join(", "),
        });
      });
    }
  }, [id]);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const payload = {
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
      sizes: form.sizes.split(",").map((s) => s.trim()),
      images: form.images.split(",").map((i) => i.trim()),
    };

    await axios.put(`${import.meta.env.VITE_API_URL}/api/products/${id}`, payload);

    alert("Product updated successfully!");
    navigate("/admin/products");
  };

  if (!product) {
    return (
      <AdminLayout>
        <p className="font-sans text-dp-charcoal/70">Loading product...</p>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <h1 className="font-serif text-3xl text-dp-black mb-10 tracking-wide">
        Edit Product
      </h1>

      <form className="space-y-8 max-w-2xl" onSubmit={handleSubmit}>
        {/* NAME */}
        <div>
          <label className="block font-sans text-sm text-dp-charcoal/80 mb-2">
            Product Name
          </label>
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
          <label className="block font-sans text-sm text-dp-charcoal/80 mb-2">
            Description
          </label>
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
          <label className="block font-sans text-sm text-dp-charcoal/80 mb-2">
            Price (₦)
          </label>
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
          <label className="block font-sans text-sm text-dp-charcoal/80 mb-2">
            Category
          </label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border px-4 py-3"
            required
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
          <label className="block font-sans text-sm text-dp-charcoal/80 mb-2">
            Sizes (seperated by comma)
          </label>
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
          <label className="block font-sans text-sm text-dp-charcoal/80 mb-2">
            Stock
          </label>
          <input
            name="stock"
            value={form.stock}
            onChange={handleChange}
            className="w-full border px-4 py-3"
            required
          />
        </div>

        {/* IMAGES */}
        <div>
          <label className="block font-sans text-sm text-dp-charcoal/80 mb-2">
            Image URLs (seperated by comma)
          </label>
          <textarea
            name="images"
            value={form.images}
            onChange={handleChange}
            rows={3}
            className="w-full border px-4 py-3"
            required
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
          Save Changes
        </button>
      </form>
    </AdminLayout>
  );
};

export default AdminEdit;
