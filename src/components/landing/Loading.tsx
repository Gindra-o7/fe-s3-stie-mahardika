import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

export const LoadingScreen = () => {
  return (
    <motion.div
      className="fixed inset-0 bg-gradient-to-br from-[#207D96] via-[#1B3F6E] to-[#0F2947] flex items-center justify-center z-[100]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative">
        {/* Rotating Circle Background */}
        <motion.div className="absolute inset-0 -m-20" animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }}>
          <div className="w-40 h-40 border-4 border-white/20 rounded-full border-t-white/60" />
        </motion.div>

        {/* Pulsing Circle */}
        <motion.div className="absolute inset-0 -m-16" animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.2, 0.5] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
          <div className="w-32 h-32 bg-white/10 rounded-full" />
        </motion.div>

        {/* Logo Container */}
        <motion.div className="relative bg-white rounded-3xl p-8 shadow-2xl" initial={{ scale: 0.5, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}>
          {/* University Logo */}
          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <GraduationCap className="w-24 h-24 text-[#207D96]" strokeWidth={1.5} />
          </motion.div>
        </motion.div>

        {/* Loading Text */}
        <motion.div className="absolute -bottom-16 left-1/2 -translate-x-1/2 whitespace-nowrap" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <p className="text-white text-lg font-semibold mb-2">Memuat Data...</p>
          <div className="flex gap-1 justify-center">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-white rounded-full"
                animate={{
                  y: [0, -8, 0],
                  opacity: [1, 0.5, 1],
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export const MiniLoading = () => {
  return (
    <div className="flex items-center justify-center gap-2">
      <motion.div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} />
      <span>Mengirim...</span>
    </div>
  );
};

export const InlineLoading = () => {
  return (
    <div className="flex items-center gap-2 px-4 py-2 text-gray-500">
      <motion.div className="w-4 h-4 border-2 border-[#207D96] border-t-transparent rounded-full" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} />
      <span className="text-sm">Mencari universitas...</span>
    </div>
  );
};
