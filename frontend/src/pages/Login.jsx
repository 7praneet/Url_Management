import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import API from "../api/api";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../components/ui/Form";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { Alert, AlertDescription } from "../components/ui/Alert";
import {
  ShieldAlert,
  Mail,
  Lock,
  ArrowRight,
  TrendingUp,
  Users,
  Gauge,
} from "lucide-react";
import CosmosBackground from "../components/CosmosBackground";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const nav = useNavigate();

  const validateForm = () => {
    const errors = {};

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    setLoading(true);
    try {
      const res = await API.post("/auth/login", {
        email: formData.email,
        password: formData.password,
      });
      localStorage.setItem("sw_token", res.data.token);
      localStorage.setItem("sw_user", JSON.stringify(res.data.user));
      nav("/dashboard");
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    if (validationErrors[field]) {
      setValidationErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  return (
    <CosmosBackground>
      <div className="min-h-screen flex items-center justify-center p-4 lg:p-6">
        <div className="w-full max-w-7xl grid lg:grid-cols-[1fr,1fr] gap-12 items-center">
          {/* Left side - Hero */}
          <motion.div
            className="hidden lg:flex flex-col justify-center space-y-8 px-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="space-y-4">
              <motion.h1
                className="text-6xl lg:text-7xl font-display font-bold leading-[1.1] tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <span className="bg-gradient-to-br from-white via-white to-white/60 bg-clip-text text-transparent">
                  Welcome
                </span>
                <br />
                <span className="bg-gradient-to-r from-cosmos-indigo-400 via-purple-400 to-cosmos-indigo-500 bg-clip-text text-transparent">
                  Back
                </span>
              </motion.h1>

              <motion.p
                className="text-xl text-slate-400 leading-relaxed max-w-lg font-light"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Sign in to access your dashboard and manage your short links.
              </motion.p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 pt-8">
              {[
                {
                  icon: TrendingUp,
                  value: "10K+",
                  label: "Users",
                  color: "text-cosmos-indigo-400",
                },
                {
                  icon: Users,
                  value: "1M+",
                  label: "Links",
                  color: "text-purple-400",
                },
                {
                  icon: Gauge,
                  value: "99.9%",
                  label: "Uptime",
                  color: "text-emerald-400",
                },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  className="glass p-5 rounded-2xl text-center group hover:scale-105 transition-transform duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                >
                  <stat.icon className={`w-6 h-6 ${stat.color} mx-auto mb-2`} />
                  <div className="text-2xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs text-slate-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right side - Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-md mx-auto"
          >
            <div className="glass-strong p-8 lg:p-10 rounded-3xl shadow-2xl relative overflow-hidden glow-indigo-sm">
              <div className="absolute inset-0 bg-gradient-to-br from-cosmos-indigo-500/10 via-transparent to-purple-500/10 pointer-events-none" />

              <div className="relative z-10">
                {/* Header */}
                <div className="text-center mb-8">
                  <motion.h2
                    className="text-3xl lg:text-4xl font-display font-bold mb-3 bg-gradient-to-br from-white to-white/70 bg-clip-text text-transparent"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    Sign In
                  </motion.h2>
                  <motion.p
                    className="text-slate-400 text-base"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    Continue your journey
                  </motion.p>
                </div>

                {/* Error Alert */}
                {error && (
                  <Alert
                    variant="destructive"
                    className="mb-6 bg-red-500/10 border-red-500/20"
                  >
                    <ShieldAlert className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {/* Form */}
                <Form onSubmit={handleSubmit}>
                  <div className="space-y-5">
                    {/* Email Field */}
                    <FormField>
                      <FormItem>
                        <FormLabel htmlFor="email" className="text-slate-200">
                          Email Address
                        </FormLabel>
                        <FormControl>
                          <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-cosmos-indigo-400 transition-colors" />
                            <Input
                              id="email"
                              type="email"
                              placeholder="you@example.com"
                              value={formData.email}
                              onChange={handleInputChange("email")}
                              className="pl-12 bg-white/5 border-white/10 focus:border-cosmos-indigo-500/50 focus:ring-cosmos-indigo-500/20"
                              required
                            />
                          </div>
                        </FormControl>
                        <FormMessage>{validationErrors.email}</FormMessage>
                      </FormItem>
                    </FormField>

                    {/* Password Field */}
                    <FormField>
                      <FormItem>
                        <div className="flex items-center justify-between mb-2">
                          <FormLabel
                            htmlFor="password"
                            className="text-slate-200"
                          >
                            Password
                          </FormLabel>
                          <Link
                            to="/forgot-password"
                            className="text-xs text-cosmos-indigo-400 hover:text-cosmos-indigo-300 transition-colors"
                          >
                            Forgot?
                          </Link>
                        </div>
                        <FormControl>
                          <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-cosmos-indigo-400 transition-colors" />
                            <Input
                              id="password"
                              type="password"
                              placeholder="Enter your password"
                              value={formData.password}
                              onChange={handleInputChange("password")}
                              className="pl-12 bg-white/5 border-white/10 focus:border-cosmos-indigo-500/50 focus:ring-cosmos-indigo-500/20"
                              required
                            />
                          </div>
                        </FormControl>
                        <FormMessage>{validationErrors.password}</FormMessage>
                      </FormItem>
                    </FormField>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      className="w-full mt-6 bg-gradient-to-r from-cosmos-indigo-600 to-cosmos-indigo-500 hover:from-cosmos-indigo-500 hover:to-cosmos-indigo-400 text-white font-semibold glow-indigo-sm hover:glow-indigo transition-all duration-300 group"
                      disabled={loading}
                      size="lg"
                    >
                      {loading ? (
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Signing you in...
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          Sign In
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      )}
                    </Button>
                  </div>
                </Form>

                {/* Footer */}
                <div className="mt-8 text-center">
                  <p className="text-sm text-slate-400">
                    Don't have an account?{" "}
                    <Link
                      to="/signup"
                      className="text-cosmos-indigo-400 hover:text-cosmos-indigo-300 font-semibold transition-colors duration-200 hover:underline"
                    >
                      Sign up for free
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </CosmosBackground>
  );
}
