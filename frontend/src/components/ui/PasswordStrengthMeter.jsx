import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

export const PasswordStrengthMeter = ({ strength, color, score }) => {
  const maxScore = 7;
  const percentage = (score / maxScore) * 100;

  return (
    <div
      className="space-y-2 mt-3"
      id="password-strength"
      role="status"
      aria-live="polite"
    >
      <div className="flex items-center gap-2">
        <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: color }}
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </div>
        {score >= 5 && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Check className="w-4 h-4 text-green-400" />
          </motion.div>
        )}
      </div>
      <p
        className="text-xs font-medium"
        style={{ color }}
        aria-label={`Password strength: ${strength}`}
      >
        Password strength: {strength}
      </p>
      <div className="text-xs text-slate-500 space-y-0.5">
        <p className={score >= 1 ? "text-slate-400" : ""}>
          • At least 8 characters
        </p>
        <p className={score >= 3 ? "text-slate-400" : ""}>
          • Mix of uppercase & lowercase
        </p>
        <p className={score >= 4 ? "text-slate-400" : ""}>• Include numbers</p>
        <p className={score >= 6 ? "text-slate-400" : ""}>
          • Special characters (!@#$%)
        </p>
      </div>
    </div>
  );
};
