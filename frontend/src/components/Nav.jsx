import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  LayoutDashboard,
  LogOut,
  Menu,
  X,
  Zap,
  ChevronRight,
} from "lucide-react";

export default function Nav() {
  const user =
    typeof window !== "undefined" && localStorage.getItem("sw_user")
      ? JSON.parse(localStorage.getItem("sw_user"))
      : null;
  const nav = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change or escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    setOpen(false);
    return () => window.removeEventListener("keydown", onKey);
  }, [location.pathname]);

  const logout = () => {
    localStorage.removeItem("sw_token");
    localStorage.removeItem("sw_user");
    setOpen(false);
    nav("/");
  };

  // Don't show nav on auth pages
  if (location.pathname === "/signup" || location.pathname === "/login") {
    return null;
  }

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "glass-strong border-b border-white/20"
            : "bg-transparent border-b border-white/5"
        }`}
      >
        {/* Backdrop blur effect */}
        {scrolled && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 -z-10 backdrop-blur-xl bg-black/40"
          />
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo with animated elements */}
            <Link to="/" className="flex items-center gap-3 group relative">
              {/* Glow effect on hover */}
              <motion.div
                className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cosmos-indigo-500 to-purple-500 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"
                whileHover={{ scale: 1.2 }}
              />

              {/* Logo icon with multi-layer design */}
              <div className="relative">
                {/* Background layers */}
                <motion.div
                  className="absolute inset-0 rounded-xl bg-gradient-to-br from-cosmos-indigo-600 to-purple-600 blur-md opacity-60"
                  animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.6, 0.8, 0.6],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                {/* Main icon container */}
                <motion.div
                  className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-cosmos-indigo-500 to-purple-600 flex items-center justify-center shadow-lg overflow-hidden"
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  {/* Animated shimmer overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{
                      x: ["-100%", "200%"],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                      repeatDelay: 1,
                    }}
                  />

                  {/* Zap icon */}
                  <Zap
                    className="w-5 h-5 text-white relative z-10 drop-shadow-lg"
                    fill="currentColor"
                  />
                </motion.div>
              </div>

              {/* Brand name with gradient */}
              <div className="relative">
                <motion.span
                  className="font-display font-bold text-xl bg-gradient-to-r from-white via-cosmos-indigo-200 to-white bg-clip-text text-transparent"
                  style={{
                    backgroundSize: "200% auto",
                  }}
                  animate={{
                    backgroundPosition: [
                      "0% center",
                      "200% center",
                      "0% center",
                    ],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  ShortWave
                </motion.span>

                {/* Underline accent */}
                <motion.div
                  className="h-0.5 bg-gradient-to-r from-cosmos-indigo-500 to-purple-500 rounded-full"
                  initial={{ width: 0, opacity: 0 }}
                  whileHover={{ width: "100%", opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-2">
              <NavLink
                to="/"
                icon={<Home className="w-4 h-4" />}
                active={isActive("/")}
              >
                Home
              </NavLink>
              <NavLink
                to="/dashboard"
                icon={<LayoutDashboard className="w-4 h-4" />}
                active={isActive("/dashboard")}
              >
                Dashboard
              </NavLink>
            </nav>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center gap-3">
              {user ? (
                <>
                  {/* User profile card */}
                  <motion.div
                    className="flex items-center gap-3 px-4 py-2 rounded-xl glass border-white/10 group cursor-default"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    {/* Avatar with animated border */}
                    <div className="relative">
                      <motion.div
                        className="absolute -inset-1 rounded-lg bg-gradient-to-r from-cosmos-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 blur"
                        animate={{
                          rotate: [0, 360],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                      <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-cosmos-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                        {user.name?.charAt(0)?.toUpperCase() || "U"}
                      </div>
                    </div>

                    <span className="text-slate-200 text-sm font-medium hidden lg:block group-hover:text-white transition-colors">
                      {user.name?.split(" ")[0] || "User"}
                    </span>
                  </motion.div>

                  {/* Logout button with micro-interaction */}
                  <motion.button
                    onClick={logout}
                    className="relative flex items-center gap-2 px-5 py-2 rounded-xl overflow-hidden group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Animated gradient background */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-red-500 via-pink-500 to-red-500"
                      style={{ backgroundSize: "200% 100%" }}
                      animate={{
                        backgroundPosition: ["0% 0%", "200% 0%"],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />

                    {/* Shimmer effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100"
                      animate={{
                        x: ["-100%", "200%"],
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />

                    <LogOut className="w-4 h-4 text-white relative z-10" />
                    <span className="hidden lg:inline text-white font-semibold relative z-10">
                      Logout
                    </span>
                  </motion.button>
                </>
              ) : (
                <>
                  {/* Login button */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to="/login"
                      className="px-5 py-2 rounded-xl text-slate-200 hover:text-white glass border-white/10 hover:border-white/20 font-medium transition-all group relative overflow-hidden"
                    >
                      <span className="relative z-10">Login</span>
                      <motion.div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </motion.div>

                  {/* Sign up button with glow */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative"
                  >
                    {/* Glow effect */}
                    <motion.div
                      className="absolute -inset-1 rounded-xl bg-gradient-to-r from-cosmos-indigo-500 to-purple-500 opacity-60 blur group-hover:opacity-100"
                      animate={{
                        opacity: [0.6, 0.8, 0.6],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    />

                    <Link
                      to="/signup"
                      className="relative flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-cosmos-indigo-600 to-purple-600 text-white font-semibold shadow-lg group overflow-hidden"
                    >
                      {/* Animated background */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-cosmos-indigo-500 to-purple-500"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      />

                      <span className="relative z-10">Sign Up</span>
                      <ChevronRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </motion.div>
                </>
              )}
            </div>

            {/* Mobile Menu Button with animation */}
            <motion.button
              onClick={() => setOpen(!open)}
              className="md:hidden relative w-11 h-11 rounded-xl glass border-white/10 flex items-center justify-center text-slate-200 group"
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              aria-label="Toggle menu"
            >
              {/* Glow on active */}
              {open && (
                <motion.div
                  className="absolute inset-0 rounded-xl bg-cosmos-indigo-500/20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              )}

              <AnimatePresence mode="wait">
                {open ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Bottom glow line */}
        {scrolled && (
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cosmos-indigo-500/50 to-transparent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </motion.header>

      {/* Spacer */}
      <div className="h-16" aria-hidden="true" />

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop with blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-md z-40 md:hidden"
              onClick={() => setOpen(false)}
            />

            {/* Menu panel */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-20 left-4 right-4 z-50 md:hidden"
            >
              <div className="glass-strong rounded-3xl shadow-2xl overflow-hidden border border-white/20">
                {/* Gradient accent at top */}
                <div className="h-1 bg-gradient-to-r from-cosmos-indigo-500 via-purple-500 to-cosmos-indigo-500" />

                <div className="p-6 space-y-6">
                  {/* User Info (Mobile) */}
                  {user && (
                    <motion.div
                      className="flex items-center gap-4 pb-6 border-b border-white/10"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <div className="relative">
                        {/* Animated ring */}
                        <motion.div
                          className="absolute -inset-2 rounded-xl bg-gradient-to-r from-cosmos-indigo-500 to-purple-500 opacity-50 blur"
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        />
                        <div className="relative w-14 h-14 rounded-xl bg-gradient-to-br from-cosmos-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-xl">
                          {user.name?.charAt(0)?.toUpperCase() || "U"}
                        </div>
                      </div>
                      <div>
                        <p className="text-white font-semibold text-lg">
                          {user.name || "User"}
                        </p>
                        <p className="text-slate-400 text-sm">{user.email}</p>
                      </div>
                    </motion.div>
                  )}

                  {/* Navigation Links */}
                  <motion.nav
                    className="space-y-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <MobileNavLink
                      to="/"
                      icon={<Home className="w-5 h-5" />}
                      onClick={() => setOpen(false)}
                      active={isActive("/")}
                    >
                      Home
                    </MobileNavLink>
                    <MobileNavLink
                      to="/dashboard"
                      icon={<LayoutDashboard className="w-5 h-5" />}
                      onClick={() => setOpen(false)}
                      active={isActive("/dashboard")}
                    >
                      Dashboard
                    </MobileNavLink>
                  </motion.nav>

                  {/* Auth Buttons (Mobile) */}
                  <motion.div
                    className="pt-6 border-t border-white/10 space-y-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {user ? (
                      <motion.button
                        onClick={logout}
                        className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-gradient-to-r from-red-500 to-pink-600 text-white font-semibold shadow-lg relative overflow-hidden group"
                        whileTap={{ scale: 0.97 }}
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                          animate={{ x: ["-100%", "200%"] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        <LogOut className="w-5 h-5 relative z-10" />
                        <span className="relative z-10">Logout</span>
                      </motion.button>
                    ) : (
                      <>
                        <Link
                          to="/login"
                          onClick={() => setOpen(false)}
                          className="block w-full px-5 py-3.5 text-center rounded-xl glass border-white/10 text-slate-200 font-semibold hover:border-white/20 transition-all"
                        >
                          Login
                        </Link>
                        <Link
                          to="/signup"
                          onClick={() => setOpen(false)}
                          className="block w-full px-5 py-3.5 text-center rounded-xl bg-gradient-to-r from-cosmos-indigo-600 to-purple-600 text-white font-semibold shadow-lg glow-indigo-sm"
                        >
                          Sign Up →
                        </Link>
                      </>
                    )}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

// Desktop Nav Link Component with micro-interactions
function NavLink({ to, icon, active, children }) {
  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Link
        to={to}
        className={`relative flex items-center gap-2.5 px-4 py-2.5 rounded-xl font-medium transition-all group overflow-hidden ${
          active ? "text-white" : "text-slate-300 hover:text-white"
        }`}
      >
        {/* Background with gradient on active */}
        {active ? (
          <>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-cosmos-indigo-600/20 to-purple-600/20 rounded-xl"
              layoutId="activeNavLink"
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            />
            <motion.div
              className="absolute inset-0 border border-cosmos-indigo-500/30 rounded-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            />
          </>
        ) : (
          <motion.div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity" />
        )}

        <span
          className={`relative z-10 ${active ? "text-cosmos-indigo-400" : ""}`}
        >
          {icon}
        </span>
        <span className="relative z-10">{children}</span>

        {/* Hover indicator */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cosmos-indigo-500 to-purple-500 rounded-full"
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: active ? 0 : 1 }}
          transition={{ duration: 0.2 }}
        />
      </Link>
    </motion.div>
  );
}

// Mobile Nav Link Component
function MobileNavLink({ to, icon, onClick, active, children }) {
  return (
    <motion.div whileTap={{ scale: 0.97 }}>
      <Link
        to={to}
        onClick={onClick}
        className={`relative flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all group overflow-hidden ${
          active
            ? "text-white bg-cosmos-indigo-500/20 border border-cosmos-indigo-500/30"
            : "text-slate-300 hover:text-white glass border-white/5 hover:border-white/10"
        }`}
      >
        {/* Animated background on hover */}
        {!active && (
          <motion.div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
        )}

        <div
          className={`relative z-10 ${
            active
              ? "text-cosmos-indigo-400"
              : "group-hover:text-cosmos-indigo-400"
          } transition-colors`}
        >
          {icon}
        </div>
        <span className="font-medium relative z-10">{children}</span>

        {active && (
          <motion.div
            className="ml-auto"
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            <ChevronRight className="w-4 h-4 text-cosmos-indigo-400" />
          </motion.div>
        )}
      </Link>
    </motion.div>
  );
}
