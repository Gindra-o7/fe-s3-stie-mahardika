import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

const Hero = () => {
  return (
    <section
      className="relative h-[70vh] bg-cover bg-center flex items-center justify-center text-center text-white overflow-hidden"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1591123120675-6f7f1aae0e5b?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-transparent" />

      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, rgba(32, 125, 150, 0.1) 0%, transparent 50%)", // ORACAL Light Blue
            "radial-gradient(circle at 80% 50%, rgba(27, 63, 110, 0.1) 0%, transparent 50%)", // ORACAL Cobalt Blue
            "radial-gradient(circle at 20% 50%, rgba(32, 125, 150, 0.1) 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <motion.div className="relative z-10 p-4 max-w-4xl mx-auto" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: "easeOut" }}>
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2, duration: 0.8 }}>
          <motion.span
            className="inline-block bg-white/10 backdrop-blur-md text-white px-6 py-2 rounded-full text-sm font-medium mb-6 border border-white/20"
            style={{ fontFamily: "DIN Light" }}
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
          >
            ✨ Program Doktor S3
          </motion.span>
        </motion.div>

        <motion.h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4" style={{ fontFamily: "DIN Bold" }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }}>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ccf4ff] via-[#8eb6eb] to-[#4ad8ff]">Pendaftaran Program Doktor (S3)</span>
          <br />
          <span className="text-3xl md:text-5xl" style={{ fontFamily: "DIN Medium" }}>
            Ilmu Manajemen
          </span>
        </motion.h1>

        <motion.p className="mt-6 text-xl md:text-2xl font-light text-gray-200" style={{ fontFamily: "DIN Medium" }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.8 }}>
          Sekolah Tinggi Ilmu Ekonomi Mahardhika Surabaya
        </motion.p>

        <motion.div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.8 }}>
          <motion.button
            className="group bg-gradient-to-r from-[#207D96] to-[#1B3F6E] text-white px-8 py-4 rounded-xl hover:shadow-2xl hover:shadow-[#207D96]/50 transition-all font-semibold text-lg flex items-center gap-2 w-full sm:w-auto justify-center"
            style={{ fontFamily: "DIN Bold" }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Daftar Sekarang
            <ChevronRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
