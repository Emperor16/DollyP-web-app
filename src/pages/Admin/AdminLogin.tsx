import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "../../context/AdminAuthContext";
import api from "../../services/api";

const AdminLogin = () => {
  const { login } = useAdminAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post(
        `${import.meta.env.VITE_API_URL}/api/admin/login`,
        form
      );

      if (res.data.success && res.data.token) {
        login(res.data.token);
        navigate("/admin/dashboard");
      } else {
        setError("Invalid credentials");
      }
    } catch (err: any) {
      setError(
        err?.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen bg-dp-offwhite flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-10 w-full max-w-md">
        <h1 className="font-serif text-2xl text-dp-black mb-6">
          Admin Login
        </h1>

        {error && (
          <p className="text-red-600 font-sans text-sm mb-4">{error}</p>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block font-sans text-sm text-dp-charcoal/80 mb-2">
              Email
            </label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border px-4 py-3 font-sans text-sm"
              required
            />
          </div>

          <div>
            <label className="block font-sans text-sm text-dp-charcoal/80 mb-2">
              Password
            </label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              className="w-full border px-4 py-3 font-sans text-sm"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-dp-black text-white py-3 font-sans tracking-wide hover:bg-dp-gold hover:text-dp-black transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
