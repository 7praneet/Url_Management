import { motion } from "framer-motion";

export default function CosmosBackground({ children }) {
  return (
    <div className="min-h-screen w-full relative bg-black">
      {/* Indigo Cosmos Background with Top Glow */}
      <div
        className="fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(99, 102, 241, 0.25), transparent 70%), #000000",
        }}
      />

      {/* Animated particles */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cosmos-indigo-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Radial gradient orbs */}
      <motion.div
        className="fixed top-20 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-20"
        style={{
          background:
            "radial-gradient(circle, rgba(99, 102, 241, 0.4), transparent 70%)",
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="fixed bottom-20 left-1/4 w-[500px] h-[500px] rounded-full blur-3xl opacity-20"
        style={{
          background:
            "radial-gradient(circle, rgba(139, 92, 246, 0.3), transparent 70%)",
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
