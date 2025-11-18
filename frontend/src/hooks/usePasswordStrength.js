import { useMemo } from "react";

export function usePasswordStrength(password) {
  return useMemo(() => {
    if (!password) {
      return { strength: "", color: "", score: 0 };
    }

    let score = 0;

    // Length criteria
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (password.length >= 16) score++;

    // Character variety
    if (/[a-z]/.test(password)) score++; // lowercase
    if (/[A-Z]/.test(password)) score++; // uppercase
    if (/[0-9]/.test(password)) score++; // numbers
    if (/[^A-Za-z0-9]/.test(password)) score++; // special chars

    // Determine strength level
    let strength, color;

    if (score <= 2) {
      strength = "Weak";
      color = "#ef4444"; // red
    } else if (score <= 4) {
      strength = "Fair";
      color = "#f59e0b"; // orange
    } else if (score <= 6) {
      strength = "Good";
      color = "#eab308"; // yellow
    } else {
      strength = "Strong";
      color = "#10b981"; // green
    }

    return { strength, color, score: Math.min(score, 7) };
  }, [password]);
}
