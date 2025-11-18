import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ShortenForm from "../components/ShortenForm";
import CosmosBackground from "../components/CosmosBackground";
import {
  Zap,
  BarChart3,
  QrCode,
  Shield,
  TrendingUp,
  Globe,
  ArrowRight,
  Sparkles,
  Link2,
  Eye,
  Lock,
} from "lucide-react";

export default function Home() {
  return (
    <CosmosBackground>
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-20"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-cosmos-indigo-500/30 mb-8"
            >
              <motion.div
                className="relative flex h-2 w-2"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cosmos-indigo-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cosmos-indigo-500" />
              </motion.div>
              <span className="text-sm text-cosmos-indigo-300 font-medium">
                The smartest way to shorten URLs
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[1.1] tracking-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <span className="block bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
                Transform Links
              </span>
              <span className="block bg-gradient-to-r from-cosmos-indigo-400 via-purple-400 to-cosmos-indigo-500 bg-clip-text text-transparent">
                Track Everything
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Create powerful short links with{" "}
              <span className="text-cosmos-indigo-400 font-semibold">
                advanced analytics
              </span>
              , <span className="text-purple-400 font-semibold">QR codes</span>,
              and{" "}
              <span className="text-emerald-400 font-semibold">
                real-time tracking
              </span>
            </motion.p>

            {/* Shorten Form Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="max-w-4xl mx-auto mb-12"
            >
              <div className="glass-strong p-8 md:p-10 rounded-3xl border border-white/20 relative overflow-hidden">
                {/* Background accent */}
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-cosmos-indigo-500/10 to-transparent pointer-events-none" />

                <div className="relative z-10">
                  <ShortenForm />
                </div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <Link to="/signup">
                <motion.button
                  className="relative group px-8 py-4 rounded-xl bg-gradient-to-r from-cosmos-indigo-600 to-purple-600 text-white font-semibold shadow-lg overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Hover glow effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-cosmos-indigo-400 to-purple-400 opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.3 }}
                  />

                  <span className="relative z-10 flex items-center gap-2">
                    Get Started Free
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>

                  {/* Glow ring */}
                  <motion.div
                    className="absolute -inset-1 bg-gradient-to-r from-cosmos-indigo-500 to-purple-500 rounded-xl opacity-0 group-hover:opacity-50 blur-lg -z-10"
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              </Link>

              <Link to="/dashboard">
                <motion.button
                  className="px-8 py-4 rounded-xl glass border-white/20 text-white font-semibold hover:border-white/30 transition-all group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="flex items-center gap-2">
                    View Dashboard
                    <BarChart3 className="w-5 h-5 group-hover:text-cosmos-indigo-400 transition-colors" />
                  </span>
                </motion.button>
              </Link>
            </motion.div>
          </motion.section>

          {/* Stats Section */}
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-20"
          >
            {[
              { label: "Active Users", value: "10,000+", icon: Globe },
              { label: "Links Created", value: "1M+", icon: Link2 },
              { label: "Uptime", value: "99.9%", icon: TrendingUp },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.1 }}
                whileHover={{ y: -4 }}
                className="glass-strong p-6 rounded-2xl border border-white/10 text-center group cursor-default relative overflow-hidden"
              >
                {/* Subtle gradient on hover */}
                <motion.div className="absolute inset-0 bg-gradient-to-br from-cosmos-indigo-500/0 to-purple-500/0 group-hover:from-cosmos-indigo-500/5 group-hover:to-purple-500/5 transition-all duration-500" />

                <div className="relative z-10">
                  <stat.icon className="w-8 h-8 mx-auto mb-3 text-cosmos-indigo-400" />
                  <div className="text-3xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-400">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.section>

          {/* Features Section */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <motion.h2
                className="text-3xl md:text-4xl font-display font-bold text-white mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
              >
                Everything you need to{" "}
                <span className="bg-gradient-to-r from-cosmos-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  succeed
                </span>
              </motion.h2>
              <motion.p
                className="text-lg text-slate-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1, duration: 0.6 }}
              >
                Powerful features for modern link management
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, i) => (
                <FeatureCard key={feature.title} feature={feature} index={i} />
              ))}
            </div>
          </motion.section>

          {/* CTA Section */}
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="text-center"
          >
            <div className="glass-strong p-12 md:p-16 rounded-3xl border border-white/20 relative overflow-hidden">
              {/* Gradient accents */}
              <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-cosmos-indigo-500/10 to-transparent" />
              <div className="absolute bottom-0 right-0 w-1/3 h-full bg-gradient-to-l from-purple-500/10 to-transparent" />

              <div className="relative z-10">
                <motion.div
                  className="inline-flex items-center gap-2 mb-6"
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Sparkles className="w-8 h-8 text-cosmos-indigo-400" />
                </motion.div>

                <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
                  Ready to transform your links?
                </h3>
                <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto">
                  Join thousands of users who trust ShortWave for their link
                  management needs
                </p>

                <Link to="/signup">
                  <motion.button
                    className="px-10 py-5 rounded-xl bg-gradient-to-r from-cosmos-indigo-600 to-purple-600 text-white text-lg font-semibold shadow-xl relative overflow-hidden group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-cosmos-indigo-500 to-purple-500"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <span className="relative z-10 flex items-center gap-2">
                      Start Shortening Now
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ArrowRight className="w-6 h-6" />
                      </motion.div>
                    </span>
                  </motion.button>
                </Link>

                {/* Animated dots */}
                <div className="flex justify-center gap-3 mt-8">
                  {[0, 0.2, 0.4].map((delay, i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 rounded-full bg-cosmos-indigo-400"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </CosmosBackground>
  );
}

// Features data
const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Generate short links instantly with our optimized infrastructure",
    color: "from-yellow-500 to-orange-500",
    benefits: ["Instant generation", "Custom aliases", "Bulk creation"],
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description:
      "Track every click with detailed insights and beautiful visualizations",
    color: "from-cosmos-indigo-500 to-purple-500",
    benefits: ["Real-time tracking", "Click history", "Geographic data"],
  },
  {
    icon: QrCode,
    title: "QR Code Generator",
    description: "Automatically generate QR codes for all your shortened links",
    color: "from-purple-500 to-pink-500",
    benefits: ["Auto-generated", "Downloadable", "High quality"],
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Enterprise-grade security to keep your data safe and private",
    color: "from-emerald-500 to-teal-500",
    benefits: ["Encrypted", "GDPR compliant", "Secure API"],
  },
  {
    icon: Eye,
    title: "User Dashboard",
    description: "Manage all your links in one beautiful, intuitive dashboard",
    color: "from-cyan-500 to-blue-500",
    benefits: ["Easy management", "Search & filter", "Bulk actions"],
  },
  {
    icon: Lock,
    title: "Access Control",
    description: "Control who can access your links with user authentication",
    color: "from-rose-500 to-red-500",
    benefits: ["User accounts", "Private links", "Team sharing"],
  },
];

// Feature Card Component
function FeatureCard({ feature, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2 + index * 0.1, duration: 0.6 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="glass-strong p-6 rounded-2xl border border-white/10 relative overflow-hidden group cursor-default"
    >
      {/* Gradient accent on hover */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(135deg, ${feature.color
            .split(" ")[1]
            .replace("to-", "rgba(")}0.05), transparent)`,
        }}
      />

      <div className="relative z-10">
        {/* Icon */}
        <motion.div
          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
          whileHover={{ rotate: [0, -10, 10, -10, 0] }}
          transition={{ duration: 0.5 }}
        >
          <feature.icon className="w-6 h-6 text-white" />
        </motion.div>

        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cosmos-indigo-300 transition-colors">
          {feature.title}
        </h3>

        {/* Description */}
        <p className="text-slate-400 text-sm mb-4 leading-relaxed">
          {feature.description}
        </p>

        {/* Benefits */}
        <ul className="space-y-2">
          {feature.benefits.map((benefit, i) => (
            <motion.li
              key={benefit}
              className="flex items-center text-sm text-slate-300"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.3 + index * 0.1 + i * 0.05 }}
            >
              <motion.div
                className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${feature.color} mr-2 flex-shrink-0`}
                whileHover={{ scale: 1.5 }}
              />
              {benefit}
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Bottom gradient line */}
      <motion.div
        className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}
