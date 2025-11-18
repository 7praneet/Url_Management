import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import API from "../api/api";
import { usePasswordStrength } from "../hooks/usePasswordStrength";
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
import { PasswordStrengthMeter } from "../components/ui/PasswordStrengthMeter";
import {
  ShieldAlert,
  Mail,
  Lock,
  User,
  Sparkles,
  Zap,
  BarChart3,
  Shield,
} from "lucide-react";
import CosmosBackground from "../components/CosmosBackground";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const nav = useNavigate();

  const { strength, color, score } = usePasswordStrength(formData.password);

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = "Full name is required";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
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
      const res = await API.post("/auth/signup", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      localStorage.setItem("sw_token", res.data.token);
      localStorage.setItem("sw_user", JSON.stringify(res.data.user));
      nav("/dashboard");
    } catch (err) {
      setError(
        err?.response?.data?.message || "Signup failed. Please try again."
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
        <div className="w-full max-w-7xl grid lg:grid-cols-[1.2fr,1fr] gap-12 items-center">
          {/* Left side - Hero section */}
          <motion.div
            className="hidden lg:flex flex-col justify-center space-y-8 px-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full glass border-cosmos-indigo-500/20 w-fit"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cosmos-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-cosmos-indigo-500"></span>
              </div>
              <span className="text-sm text-cosmos-indigo-300 font-medium tracking-wide">
                Join 10,000+ users
              </span>
            </motion.div>

            {/* Heading */}
            <div className="space-y-4">
              <motion.h1
                className="text-6xl lg:text-7xl font-display font-bold leading-[1.1] tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <span className="bg-gradient-to-br from-white via-white to-white/60 bg-clip-text text-transparent">
                  Transform Your
                </span>
                <br />
                <span className="bg-gradient-to-r from-cosmos-indigo-400 via-purple-400 to-cosmos-indigo-500 bg-clip-text text-transparent animate-shimmer">
                  Link Strategy
                </span>
              </motion.h1>

              <motion.p
                className="text-xl text-slate-400 leading-relaxed max-w-lg font-light"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Create, track, and optimize your short links with
                enterprise-grade analytics and blazing-fast performance.
              </motion.p>
            </div>

            {/* Features */}
            <div className="space-y-5 pt-4">
              {[
                {
                  icon: Zap,
                  text: "Instant link generation",
                  color: "text-yellow-400",
                },
                {
                  icon: BarChart3,
                  text: "Advanced analytics dashboard",
                  color: "text-cosmos-indigo-400",
                },
                {
                  icon: Shield,
                  text: "Enterprise-grade security",
                  color: "text-emerald-400",
                },
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-4 group"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl glass border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <span className="text-slate-300 text-lg font-medium">
                    {feature.text}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Social Proof */}
            <motion.div
              className="flex items-center gap-6 pt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full glass border-2 border-black bg-gradient-to-br from-cosmos-indigo-500 to-purple-600"
                  />
                ))}
              </div>
              <div className="text-sm">
                <div className="text-white font-semibold">10,000+ users</div>
                <div className="text-slate-400">Already transforming links</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right side - Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="w-full"
          >
            <div className="glass-strong p-8 lg:p-10 rounded-3xl shadow-2xl relative overflow-hidden glow-indigo-sm">
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-cosmos-indigo-500/10 via-transparent to-purple-500/10 pointer-events-none" />

              <div className="relative z-10">
                {/* Header */}
                <div className="text-center mb-8">
                  <motion.div
                    className="inline-flex items-center gap-2 mb-4"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", duration: 0.6, delay: 0.2 }}
                  >
                    <Sparkles className="w-6 h-6 text-cosmos-indigo-400" />
                  </motion.div>

                  <motion.h2
                    className="text-3xl lg:text-4xl font-display font-bold mb-3 bg-gradient-to-br from-white to-white/70 bg-clip-text text-transparent"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    Create Your Account
                  </motion.h2>
                  <motion.p
                    className="text-slate-400 text-base"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    Start your journey in seconds
                  </motion.p>
                </div>

                {/* Error Alert */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Alert
                      variant="destructive"
                      className="mb-6 bg-red-500/10 border-red-500/20"
                    >
                      <ShieldAlert className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  </motion.div>
                )}

                {/* Form */}
                <Form onSubmit={handleSubmit}>
                  <div className="space-y-5">
                    {/* Name Field */}
                    <FormField>
                      <FormItem>
                        <FormLabel htmlFor="name" className="text-slate-200">
                          Full Name
                        </FormLabel>
                        <FormControl>
                          <div className="relative group">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-cosmos-indigo-400 transition-colors" />
                            <Input
                              id="name"
                              type="text"
                              placeholder="John Doe"
                              value={formData.name}
                              onChange={handleInputChange("name")}
                              className="pl-12 bg-white/5 border-white/10 focus:border-cosmos-indigo-500/50 focus:ring-cosmos-indigo-500/20"
                              required
                              aria-required="true"
                              aria-invalid={!!validationErrors.name}
                            />
                          </div>
                        </FormControl>
                        <FormMessage>{validationErrors.name}</FormMessage>
                      </FormItem>
                    </FormField>

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
                        <FormLabel
                          htmlFor="password"
                          className="text-slate-200"
                        >
                          Password
                        </FormLabel>
                        <FormControl>
                          <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-cosmos-indigo-400 transition-colors" />
                            <Input
                              id="password"
                              type="password"
                              placeholder="Create a strong password"
                              value={formData.password}
                              onChange={handleInputChange("password")}
                              className="pl-12 bg-white/5 border-white/10 focus:border-cosmos-indigo-500/50 focus:ring-cosmos-indigo-500/20"
                              required
                            />
                          </div>
                        </FormControl>
                        {formData.password && (
                          <PasswordStrengthMeter
                            strength={strength}
                            color={color}
                            score={score}
                          />
                        )}
                        <FormMessage>{validationErrors.password}</FormMessage>
                      </FormItem>
                    </FormField>

                    {/* Confirm Password */}
                    <FormField>
                      <FormItem>
                        <FormLabel
                          htmlFor="confirmPassword"
                          className="text-slate-200"
                        >
                          Confirm Password
                        </FormLabel>
                        <FormControl>
                          <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-cosmos-indigo-400 transition-colors" />
                            <Input
                              id="confirmPassword"
                              type="password"
                              placeholder="Confirm your password"
                              value={formData.confirmPassword}
                              onChange={handleInputChange("confirmPassword")}
                              className="pl-12 bg-white/5 border-white/10 focus:border-cosmos-indigo-500/50 focus:ring-cosmos-indigo-500/20"
                              required
                            />
                          </div>
                        </FormControl>
                        <FormMessage>
                          {validationErrors.confirmPassword}
                        </FormMessage>
                      </FormItem>
                    </FormField>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      className="w-full mt-6 bg-gradient-to-r from-cosmos-indigo-600 to-cosmos-indigo-500 hover:from-cosmos-indigo-500 hover:to-cosmos-indigo-400 text-white font-semibold glow-indigo-sm hover:glow-indigo transition-all duration-300"
                      disabled={loading}
                      size="lg"
                    >
                      {loading ? (
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Creating your account...
                        </div>
                      ) : (
                        "Create Account →"
                      )}
                    </Button>
                  </div>
                </Form>

                {/* Footer */}
                <div className="mt-8 text-center">
                  <p className="text-sm text-slate-400">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="text-cosmos-indigo-400 hover:text-cosmos-indigo-300 font-semibold transition-colors duration-200 hover:underline"
                    >
                      Sign in
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
