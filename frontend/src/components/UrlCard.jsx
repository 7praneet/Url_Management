import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import API from "../api/api";
import QRCode from "react-qr-code";
import {
  Copy,
  ExternalLink,
  Trash2,
  Eye,
  Check,
  TrendingUp,
  Download,
  X,
  QrCode as QrIcon,
} from "lucide-react";

export default function UrlCard({ url, onViewAnalytics, onDelete }) {
  // Safety checks
  if (!url || !url.shortId) {
    return null;
  }

  const apiBase = (import.meta.env.VITE_API_BASE || "").replace(
    /\/?api\/?$/i,
    ""
  );
  const defaultOrigin = window.location.origin;
  const base = apiBase || defaultOrigin;
  const shortUrl = `${base.replace(/\/$/, "")}/${url.shortId}`;

  const [qrOpen, setQrOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const longUrl = url.longUrl || url.originalUrl || url.original || "";
  const displayUrl = longUrl ? longUrl.replace(/^https?:\/\//, "") : "No URL";

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error("Copy failed:", e);
    }
  };

  const del = async () => {
    if (!confirm("Are you sure you want to delete this URL?")) return;

    setDeleting(true);
    try {
      await API.delete(`/url/${url._id}`);
      onDelete();
    } catch (e) {
      console.error("Delete failed:", e);
      setDeleting(false);
    }
  };

  const downloadQr = () => {
    try {
      const svgEl = document
        .getElementById(`qr-${url._id}`)
        ?.querySelector("svg");
      if (!svgEl) return alert("QR code not loaded");

      const svgData = new XMLSerializer().serializeToString(svgEl);
      const svgBlob = new Blob([svgData], {
        type: "image/svg+xml;charset=utf-8",
      });
      const urlBlob = URL.createObjectURL(svgBlob);
      const img = new Image();

      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);

        canvas.toBlob((blob) => {
          const link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          link.download = `shortwave-${url.shortId}.png`;
          document.body.appendChild(link);
          link.click();
          link.remove();
        });
        URL.revokeObjectURL(urlBlob);
      };

      img.onerror = () => alert("Could not convert QR to image");
      img.src = urlBlob;
    } catch (e) {
      console.error("Download failed:", e);
      alert("Download failed");
    }
  };

  return (
    <>
      <motion.div
        className="glass-strong p-6 rounded-2xl border border-white/10 relative overflow-hidden group h-full flex flex-col"
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Hover gradient effect */}
        <motion.div className="absolute inset-0 bg-gradient-to-br from-cosmos-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="relative z-10 flex-1 flex flex-col">
          {/* Header with clicks badge */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cosmos-indigo-600 to-purple-600 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-4 h-4 text-white" />
                </div>
                <a
                  href={shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-semibold bg-gradient-to-r from-cosmos-indigo-300 via-purple-300 to-cosmos-indigo-400 bg-clip-text text-transparent hover:from-cosmos-indigo-200 hover:to-purple-200 transition-all truncate group/link"
                >
                  /{url.shortId}
                  <ExternalLink className="w-3 h-3 inline ml-1 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                </a>
              </div>
              {longUrl ? (
                <a
                  href={longUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-slate-400 hover:text-cosmos-indigo-400 transition-colors truncate block"
                >
                  {displayUrl}
                </a>
              ) : (
                <span className="text-sm text-slate-500 truncate block">
                  No URL provided
                </span>
              )}
            </div>

            {/* Clicks badge */}
            <motion.div
              className="glass px-3 py-1.5 rounded-lg border border-cosmos-indigo-500/20"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-xs text-slate-400">Clicks</div>
              <div className="text-lg font-bold text-cosmos-indigo-400">
                {url.clicks || 0}
              </div>
            </motion.div>
          </div>

          {/* Short URL display */}
          <div className="glass p-3 rounded-xl mb-4 group/url">
            <span className="text-sm text-slate-300 font-mono truncate block">
              {shortUrl}
            </span>
          </div>

          {/* Action buttons */}
          <div className="grid grid-cols-4 gap-2 mt-auto">
            <motion.button
              onClick={copy}
              className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl glass border-white/10 hover:border-cosmos-indigo-500/30 text-sm font-medium text-slate-300 hover:text-white transition-all group/btn"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              title="Copy link"
            >
              {copied ? (
                <Check className="w-4 h-4 text-emerald-400" />
              ) : (
                <Copy className="w-4 h-4 group-hover/btn:text-cosmos-indigo-400 transition-colors" />
              )}
            </motion.button>

            <motion.button
              onClick={() => setQrOpen(true)}
              className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl glass border-white/10 hover:border-purple-500/30 text-sm font-medium text-slate-300 hover:text-purple-400 transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              title="Show QR code"
            >
              <QrIcon className="w-4 h-4" />
            </motion.button>

            <motion.button
              onClick={onViewAnalytics}
              className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-cosmos-indigo-500/20 border border-cosmos-indigo-500/30 text-sm font-medium text-cosmos-indigo-300 hover:bg-cosmos-indigo-500/30 transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              title="View analytics"
            >
              <Eye className="w-4 h-4" />
            </motion.button>

            <motion.button
              onClick={del}
              disabled={deleting}
              className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl glass border-white/10 hover:border-red-500/30 hover:bg-red-500/10 text-sm font-medium text-slate-300 hover:text-red-400 transition-all disabled:opacity-50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              title="Delete link"
            >
              {deleting ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Trash2 className="w-4 h-4" />
              )}
            </motion.button>
          </div>

          {/* Created date */}
          {url.createdAt && (
            <div className="text-xs text-slate-500 mt-3 text-center">
              Created{" "}
              {new Date(url.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </div>
          )}
        </div>

        {/* Shimmer effect on hover */}
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

      {/* QR Code Modal */}
      <AnimatePresence>
        {qrOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md"
              onClick={() => setQrOpen(false)}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            >
              <div className="glass-strong rounded-3xl shadow-2xl p-8 w-full max-w-sm border border-white/20 pointer-events-auto relative overflow-hidden">
                {/* Background accent */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-cosmos-indigo-500/20 to-transparent rounded-full blur-3xl" />

                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cosmos-indigo-600 to-purple-600 flex items-center justify-center">
                        <QrIcon className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="text-xl font-bold text-white">QR Code</h4>
                    </div>
                    <motion.button
                      onClick={() => setQrOpen(false)}
                      className="w-8 h-8 rounded-lg glass border-white/10 hover:border-white/20 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <X className="w-4 h-4" />
                    </motion.button>
                  </div>

                  {/* QR Code */}
                  <div
                    id={`qr-${url._id}`}
                    className="flex justify-center p-6 bg-white rounded-2xl mb-6 shadow-lg"
                  >
                    <QRCode value={shortUrl} size={200} />
                  </div>

                  {/* URL Display */}
                  <div className="glass p-3 rounded-xl mb-6 text-center">
                    <div className="text-xs text-slate-400 mb-1">
                      Scan to visit
                    </div>
                    <div className="text-sm font-mono text-slate-300 truncate">
                      {shortUrl}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-3">
                    <motion.button
                      onClick={downloadQr}
                      className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl glass border-white/10 hover:border-white/20 text-white font-medium transition-all"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </motion.button>
                    <motion.a
                      href={shortUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-cosmos-indigo-600 to-purple-600 text-white font-medium shadow-lg"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <ExternalLink className="w-4 h-4" />
                      Open Link
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
