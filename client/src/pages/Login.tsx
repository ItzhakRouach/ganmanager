import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import api from "../api/axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await api.post("auth/login", { email, password });
      const { token, user } = response.data;
      login(token, user);
      navigate("/dashboard");
    } catch (err: unknown) {
      const axiosError = err as { response?: { data?: { message?: string } } };
      setError(axiosError.response?.data?.message || "שגיאה בהתחברות");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <img
            src="/brand_logo.jpg"
            alt="הארוחים של אילנית"
            className="w-28 h-28 rounded-2xl object-cover mx-auto mb-4 shadow-xl"
          />
          <h1 className="text-white font-bold text-2xl leading-tight">
            הארוחים של אילנית
          </h1>
          <p className="text-primary-100 text-sm mt-1">לגדול בכיף</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-primary font-bold text-xl mb-6 text-right">
            התחברות למערכת
          </h2>

          {/* Error banner */}
          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 rounded-xl p-3 text-sm mb-5 text-right">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5 text-right">
                אימייל
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-right focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all duration-150 text-gray-800 placeholder:text-gray-400"
                placeholder="הכניסי כתובת אימייל"
                required
                dir="ltr"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5 text-right">
                סיסמה
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-right focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all duration-150 text-gray-800 placeholder:text-gray-400"
                placeholder="הכניסי סיסמה"
                required
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary-light text-white font-semibold py-3 rounded-xl transition-all duration-150 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "מתחברת..." : "התחברות"}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-primary-100/60 text-xs mt-6">
          הארוחים של אילנית © {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
};

export default Login;
