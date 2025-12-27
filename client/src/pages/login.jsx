import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

export default function Login() {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const validateForm = () => {
    const newErrors = {};

    if (isRegister && !form.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (isRegister && form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (isRegister && !form.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (isRegister && form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");
    try {
      if (isRegister) {
        await axios.post(`${API_URL}/auth/register`, form);
        setSuccessMessage("Registration successful! Check your email to verify your account.");
        localStorage.setItem("userName", form.name);
        localStorage.setItem("userEmail", form.email);
        setTimeout(() => {
          setIsRegister(false);
          setForm({ name: "", email: "", password: "", confirmPassword: "" });
          setSuccessMessage("");
        }, 3000);
      } else {
        const res = await axios.post(`${API_URL}/auth/login`, form);
        localStorage.setItem("token", res.data.token);
        setSuccessMessage("Login successful! Redirecting...");

        try {
          const token = localStorage.getItem("token");
          const response = await axios.get(`${API_URL}/users/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!response.data.profileCompleted) {
            navigate("/create-profile");
          } else {
            navigate("/home");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          navigate("/login");
        }
      }
    } catch (err) {
      setErrorMessage(err.response?.data?.msg || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = () => {
    setIsRegister(!isRegister);
    setErrors({});
    setSuccessMessage("");
    setErrorMessage("");
    setForm({ name: "", email: "", password: "", confirmPassword: "" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-400 opacity-20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500 opacity-20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-400 opacity-20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="absolute inset-0 bg-black opacity-20"></div>

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl shadow-2xl overflow-hidden backdrop-blur-sm border-2 border-cyan-400 neon-glow">
          {/* Header */}
          <div className="bg-gradient-to-r from-cyan-600 to-blue-600 p-8 text-white relative overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full -ml-12 -mb-12"></div>
            
            <div className="relative">
              <div className="flex items-center justify-center mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-1">
                    <img
                      src="/playX-tab-logo.png"
                      alt="PlayX Logo"
                      className="h-12 w-auto"
                    />
                  </div>
                  <span className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-pink-500 to-yellow-400 bg-clip-text text-transparent transform hover:scale-105 transition-transform duration-300">PlayX</span>
                </div>
              </div>
              <p className="text-center text-cyan-100 text-sm font-medium">
                🎯 Book grounds & find players nearby
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8">
            {/* Success Message */}
            {successMessage && (
              <div className="mb-6 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-2 border-cyan-400/50 rounded-xl p-4 animate-fade-in">
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-cyan-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <p className="text-cyan-400 font-semibold text-sm">{successMessage}</p>
                </div>
              </div>
            )}

            {/* Error Message */}
            {errorMessage && (
              <div className="mb-6 bg-gradient-to-r from-pink-500/20 to-red-500/20 border-2 border-pink-400/50 rounded-xl p-4 animate-fade-in">
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-pink-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <p className="text-pink-400 font-semibold text-sm">{errorMessage}</p>
                </div>
              </div>
            )}

            {/* Tab-like Header */}
            <div className="flex mb-8">
              <button
                type="button"
                onClick={() => !isRegister && handleToggle()}
                className={`flex-1 py-3 text-center font-semibold transition-all duration-300 ${
                  isRegister
                    ? "text-white border-b-2 border-cyan-400"
                    : "text-gray-500 border-b-2 border-gray-700"
                }`}
              >
                Create Account
              </button>
              <button
                type="button"
                onClick={() => isRegister && handleToggle()}
                className={`flex-1 py-3 text-center font-semibold transition-all duration-300 ${
                  !isRegister
                    ? "text-white border-b-2 border-cyan-400"
                    : "text-gray-500 border-b-2 border-gray-700"
                }`}
              >
                Sign In
              </button>
            </div>

            {/* Name Field */}
            {isRegister && (
              <div className="mb-5 transform transition-all duration-300">
                <label className="block text-gray-300 text-sm font-semibold mb-2 flex items-center">
                  <svg className="w-4 h-4 mr-2 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className={`w-full px-4 py-3 bg-gray-700 border-2 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all ${
                    errors.name ? "border-pink-500 shake" : "border-gray-600"
                  }`}
                  value={form.name}
                  onChange={(e) => {
                    setForm({ ...form, name: e.target.value });
                    setErrors({ ...errors, name: "" });
                  }}
                />
                {errors.name && (
                  <p className="text-pink-400 text-xs mt-1 flex items-center">
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.name}
                  </p>
                )}
              </div>
            )}

            {/* Email Field */}
            <div className="mb-5">
              <label className="block text-gray-300 text-sm font-semibold mb-2 flex items-center">
                <svg className="w-4 h-4 mr-2 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className={`w-full px-4 py-3 bg-gray-700 border-2 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all ${
                  errors.email ? "border-pink-500 shake" : "border-gray-600"
                }`}
                value={form.email}
                onChange={(e) => {
                  setForm({ ...form, email: e.target.value });
                  setErrors({ ...errors, email: "" });
                }}
              />
              {errors.email && (
                <p className="text-pink-400 text-xs mt-1 flex items-center">
                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="mb-6">
              <label className="block text-gray-300 text-sm font-semibold mb-2 flex items-center">
                <svg className="w-4 h-4 mr-2 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className={`w-full px-4 py-3 pr-12 bg-gray-700 border-2 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all ${
                    errors.password ? "border-pink-500 shake" : "border-gray-600"
                  }`}
                  value={form.password}
                  onChange={(e) => {
                    setForm({ ...form, password: e.target.value });
                    setErrors({ ...errors, password: "" });
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-cyan-400 transition"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                      <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-pink-400 text-xs mt-1 flex items-center">
                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.password}
                </p>
              )}
            </div>

            {/* Confirm Password Field - Only for Registration */}
            {isRegister && (
              <div className="mb-6 transform transition-all duration-300">
                <label className="block text-gray-300 text-sm font-semibold mb-2 flex items-center">
                  <svg className="w-4 h-4 mr-2 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    className={`w-full px-4 py-3 pr-12 bg-gray-700 border-2 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all ${
                      errors.confirmPassword ? "border-pink-500 shake" : "border-gray-600"
                    }`}
                    value={form.confirmPassword}
                    onChange={(e) => {
                      setForm({ ...form, confirmPassword: e.target.value });
                      setErrors({ ...errors, confirmPassword: "" });
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-cyan-400 transition"
                  >
                    {showConfirmPassword ? (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                        <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                      </svg>
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-pink-400 text-xs mt-1 flex items-center">
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold py-4 rounded-xl hover:from-cyan-400 hover:to-blue-400 transition-all duration-300 shadow-lg shadow-cyan-500/50 hover:shadow-cyan-400/70 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none border-2 border-cyan-300"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Processing...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  {isRegister ? (
                    <>
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                      </svg>
                      Create Account
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Sign In
                    </>
                  )}
                </span>
              )}
            </button>

            {/* Forgot Password */}
            {!isRegister && (
              <div className="mt-4 text-center">
                <a href="#" className="text-sm text-cyan-400 hover:text-cyan-300 font-medium transition">
                  Forgot password?
                </a>
              </div>
            )}
          </form>

          {/* Footer */}
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-8 py-5 text-center border-t-2 border-cyan-400/30">
            <p className="text-xs text-gray-400">
              By continuing, you agree to our{" "}
              <a href="#" className="text-cyan-400 hover:underline">Terms</a>
              {" & "}
              <a href="#" className="text-cyan-400 hover:underline">Privacy Policy</a>
            </p>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-6 flex justify-center items-center space-x-6 text-white text-sm">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Secure
          </div>
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Verified
          </div>
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
              <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
            </svg>
            24/7 Support
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .shake {
          animation: shake 0.3s ease-in-out;
        }
        .animate-fade-in {
          animation: fade-in 0.4s ease-out;
        }
        .neon-glow {
          box-shadow: 0 0 20px rgba(34, 211, 238, 0.5), 0 0 40px rgba(34, 211, 238, 0.3);
        }
      `}</style>
    </div>
  );
}