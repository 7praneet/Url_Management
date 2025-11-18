import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import API from "../api/api";
import UrlCard from "../components/UrlCard";
import CosmosBackground from "../components/CosmosBackground";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import {
  Link2,
  TrendingUp,
  Eye,
  Clock,
  Zap,
  BarChart3,
  Calendar,
  Award,
  Sparkles,
} from "lucide-react";

export default function Dashboard() {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedHistory, setSelectedHistory] = useState([]);
  const [selectedUrl, setSelectedUrl] = useState(null);
  const [stats, setStats] = useState({
    totalClicks: 0,
    totalUrls: 0,
    todayClicks: 0,
    avgClickRate: 0,
  });

  useEffect(() => {
    const load = async () => {
      try {
        const res = await API.get("/url/me");
        setUrls(res.data);
        calculateStats(res.data);
      } catch (err) {
        console.error(err);
      }
      setTimeout(() => setLoading(false), 300);
    };
    load();
  }, []);

  const calculateStats = (urlData) => {
    const totalClicks = urlData.reduce(
      (sum, url) => sum + (url.clicks || 0),
      0
    );
    const today = new Date().toDateString();
    const todayClicks = urlData.reduce((sum, url) => {
      const todayHistory = (url.clickHistory || []).filter(
        (h) => new Date(h.date).toDateString() === today
      );
      return sum + todayHistory.reduce((s, h) => s + h.count, 0);
    }, 0);

    setStats({
      totalClicks,
      totalUrls: urlData.length,
      todayClicks,
      avgClickRate:
        urlData.length > 0 ? (totalClicks / urlData.length).toFixed(1) : 0,
    });
  };

  const onViewAnalytics = (history, url) => {
    const chart = (history || []).map((h) => ({
      date: new Date(h.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      clicks: h.count,
    }));
    setSelectedHistory(chart);
    setSelectedUrl(url);
  };

  const onDelete = (urlId) => {
    setUrls((prev) => {
      const updated = prev.filter((x) => x._id !== urlId);
      calculateStats(updated);
      return updated;
    });
  };

  const skeletons = new Array(6).fill(0);

  return (
    <CosmosBackground>
      <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div>
              <motion.div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border-cosmos-indigo-500/20 mb-3"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cosmos-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cosmos-indigo-500"></span>
                </div>
                <span className="text-xs text-cosmos-indigo-300 font-medium">
                  Real-time Analytics
                </span>
              </motion.div>

              <h1 className="text-4xl md:text-5xl font-display font-bold mb-2">
                <span className="bg-gradient-to-r from-white via-cosmos-indigo-200 to-white bg-clip-text text-transparent">
                  Dashboard
                </span>
              </h1>
              <p className="text-slate-400 text-lg">
                Track your links and monitor performance
              </p>
            </div>

            {/* Quick Action */}
            <motion.a
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cosmos-indigo-600 to-purple-600 text-white font-semibold shadow-lg glow-indigo-sm group relative overflow-hidden"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cosmos-indigo-500 to-purple-500"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.5 }}
              />
              <Zap className="w-5 h-5 relative z-10" />
              <span className="relative z-10">Create New Link</span>
            </motion.a>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              icon={Link2}
              label="Total Links"
              value={stats.totalUrls}
              color="from-cosmos-indigo-500 to-purple-500"
              delay={0.1}
            />
            <StatCard
              icon={Eye}
              label="Total Clicks"
              value={stats.totalClicks}
              color="from-cyan-500 to-blue-500"
              delay={0.2}
            />
            <StatCard
              icon={TrendingUp}
              label="Today's Clicks"
              value={stats.todayClicks}
              color="from-emerald-500 to-teal-500"
              delay={0.3}
              trend="+12%"
            />
            <StatCard
              icon={BarChart3}
              label="Avg. Click Rate"
              value={stats.avgClickRate}
              color="from-purple-500 to-pink-500"
              delay={0.4}
              suffix="/link"
            />
          </div>

          {/* Analytics Chart */}
          <AnimatePresence mode="wait">
            {selectedHistory.length > 0 && (
              <motion.div
                key="analytics"
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="glass-strong p-6 lg:p-8 rounded-3xl border border-white/20 relative overflow-hidden"
              >
                {/* Background gradient accent */}
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-cosmos-indigo-500/10 to-transparent pointer-events-none" />

                <div className="relative z-10">
                  {/* Chart Header */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <motion.div
                          className="absolute -inset-1 rounded-xl bg-gradient-to-r from-cosmos-indigo-500 to-purple-500 opacity-50 blur"
                          animate={{
                            rotate: [0, 360],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        />
                        <div className="relative w-12 h-12 bg-gradient-to-br from-cosmos-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
                          <BarChart3 className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">
                          Click Analytics
                        </h3>
                        <p className="text-sm text-slate-400">
                          {selectedUrl?.shortCode
                            ? `/${selectedUrl.shortCode}`
                            : "Performance over time"}
                        </p>
                      </div>
                    </div>

                    {/* View toggles */}
                    <div className="flex items-center gap-2 glass rounded-xl p-1">
                      <button className="px-4 py-2 rounded-lg bg-cosmos-indigo-500/20 text-cosmos-indigo-300 text-sm font-medium">
                        <Calendar className="w-4 h-4 inline mr-2" />7 Days
                      </button>
                      <button className="px-4 py-2 rounded-lg text-slate-400 text-sm font-medium hover:text-white transition-colors">
                        30 Days
                      </button>
                    </div>
                  </div>

                  {/* Chart */}
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={selectedHistory}>
                        <defs>
                          <linearGradient
                            id="colorClicks"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor="#6366f1"
                              stopOpacity={0.3}
                            />
                            <stop
                              offset="95%"
                              stopColor="#6366f1"
                              stopOpacity={0}
                            />
                          </linearGradient>
                        </defs>
                        <XAxis
                          dataKey="date"
                          stroke="#64748b"
                          style={{ fontSize: "12px" }}
                          tickLine={false}
                        />
                        <YAxis
                          stroke="#64748b"
                          style={{ fontSize: "12px" }}
                          tickLine={false}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "rgba(15, 23, 42, 0.95)",
                            border: "1px solid rgba(99, 102, 241, 0.3)",
                            borderRadius: "12px",
                            boxShadow: "0 10px 40px rgba(0, 0, 0, 0.5)",
                          }}
                          labelStyle={{ color: "#e2e8f0", fontWeight: "bold" }}
                          itemStyle={{ color: "#6366f1" }}
                        />
                        <Area
                          type="monotone"
                          dataKey="clicks"
                          stroke="#6366f1"
                          strokeWidth={3}
                          fill="url(#colorClicks)"
                          animationDuration={1000}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Chart Footer Stats */}
                  <div className="mt-6 grid grid-cols-3 gap-4">
                    <div className="text-center p-3 glass rounded-xl">
                      <div className="text-2xl font-bold text-white">
                        {selectedHistory.reduce((sum, d) => sum + d.clicks, 0)}
                      </div>
                      <div className="text-xs text-slate-400 mt-1">
                        Total Clicks
                      </div>
                    </div>
                    <div className="text-center p-3 glass rounded-xl">
                      <div className="text-2xl font-bold text-cosmos-indigo-400">
                        {Math.max(...selectedHistory.map((d) => d.clicks))}
                      </div>
                      <div className="text-xs text-slate-400 mt-1">Peak</div>
                    </div>
                    <div className="text-center p-3 glass rounded-xl">
                      <div className="text-2xl font-bold text-emerald-400">
                        {(
                          selectedHistory.reduce(
                            (sum, d) => sum + d.clicks,
                            0
                          ) / selectedHistory.length
                        ).toFixed(1)}
                      </div>
                      <div className="text-xs text-slate-400 mt-1">Avg/Day</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* URLs Section */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-between mb-6"
            >
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="w-1 h-8 bg-gradient-to-b from-cosmos-indigo-500 to-purple-500 rounded-full" />
                Your Links
              </h2>
              {urls.length > 0 && (
                <span className="text-sm text-slate-400">
                  {urls.length} {urls.length === 1 ? "link" : "links"}
                </span>
              )}
            </motion.div>

            {/* URLs Grid */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
            >
              {loading ? (
                skeletons.map((_, i) => <UrlSkeleton key={i} />)
              ) : urls.length === 0 ? (
                <EmptyState />
              ) : (
                urls.map((url, index) => (
                  <motion.div
                    key={url._id}
                    variants={{
                      hidden: { opacity: 0, y: 20, scale: 0.95 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        transition: {
                          duration: 0.5,
                          ease: [0.22, 1, 0.36, 1],
                        },
                      },
                    }}
                  >
                    <UrlCard
                      url={url}
                      onViewAnalytics={() =>
                        onViewAnalytics(url.clickHistory, url)
                      }
                      onDelete={() => onDelete(url._id)}
                    />
                  </motion.div>
                ))
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </CosmosBackground>
  );
}

// Stat Card Component
function StatCard({
  icon: Icon,
  label,
  value,
  color,
  delay,
  trend,
  suffix = "",
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.02, y: -4 }}
      className="glass-strong p-6 rounded-2xl border border-white/10 relative overflow-hidden group cursor-default"
    >
      {/* Background gradient on hover */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(135deg, ${color
            .split(" ")[1]
            .replace("to-", "rgba(")}0.1), transparent)`,
        }}
      />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div
            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg`}
          >
            <Icon className="w-6 h-6 text-white" />
          </div>

          {trend && (
            <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <TrendingUp className="w-3 h-3 text-emerald-400" />
              <span className="text-xs font-semibold text-emerald-400">
                {trend}
              </span>
            </div>
          )}
        </div>

        <div className="text-3xl font-bold text-white mb-1 flex items-baseline gap-1">
          <motion.span
            key={value}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {value}
          </motion.span>
          {suffix && <span className="text-lg text-slate-400">{suffix}</span>}
        </div>

        <div className="text-sm text-slate-400 font-medium">{label}</div>
      </div>

      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100"
        animate={{
          x: ["-100%", "200%"],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatDelay: 1,
        }}
      />
    </motion.div>
  );
}

// Empty State Component
function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="col-span-full glass-strong p-12 rounded-3xl border border-white/10 text-center relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-cosmos-indigo-500/5 to-purple-500/5" />

      <div className="relative z-10">
        <motion.div
          className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-cosmos-indigo-600 to-purple-600 flex items-center justify-center shadow-xl"
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Link2 className="w-10 h-10 text-white" />
        </motion.div>

        <h3 className="text-2xl font-bold text-white mb-2">No links yet</h3>
        <p className="text-slate-400 mb-6 max-w-md mx-auto">
          Create your first shortened link and start tracking clicks with
          powerful analytics.
        </p>

        <motion.a
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cosmos-indigo-600 to-purple-600 text-white font-semibold shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Sparkles className="w-5 h-5" />
          Create Your First Link
        </motion.a>
      </div>
    </motion.div>
  );
}

// Skeleton Component
function UrlSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="glass p-6 rounded-2xl border border-white/10"
    >
      <div className="space-y-4">
        <div className="h-6 bg-white/5 rounded-lg animate-pulse" />
        <div className="h-4 bg-white/5 rounded-lg animate-pulse w-3/4" />
        <div className="flex gap-2">
          <div className="h-8 bg-white/5 rounded-lg animate-pulse flex-1" />
          <div className="h-8 bg-white/5 rounded-lg animate-pulse flex-1" />
        </div>
      </div>
    </motion.div>
  );
}
