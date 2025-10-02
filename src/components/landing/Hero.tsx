import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

import BackgroundImage1 from "@/assets/foto/mh-12.webp";
import BackgroundImage2 from "@/assets/foto/mh07.webp";
import BackgroundImage3 from "@/assets/foto/VICL1712.webp";
import BackgroundImage4 from "@/assets/foto/VICL2600.webp";
import { ModalRegisOnline } from "./ModalRegisOnline";

const Hero = () => {
  const backgroundImages = [BackgroundImage1, BackgroundImage2, BackgroundImage3, BackgroundImage4];
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const imageVariants = {
    active: { opacity: 1, transition: { duration: 1 } },
    inactive: { opacity: 0, transition: { duration: 1 } },
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  return (
    <section className="relative h-screen flex items-center justify-center text-center text-white overflow-hidden">
      {backgroundImages.map((image, index) => (
        <motion.div
          key={index}
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          variants={imageVariants}
          initial="inactive"
          animate={index === activeImageIndex ? "active" : "inactive"}
        />
      ))}

      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-transparent" />

      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, rgba(32, 125, 150, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 50%, rgba(27, 63, 110, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 50%, rgba(32, 125, 150, 0.1) 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <motion.div className="relative z-10 p-4 max-w-4xl mx-auto" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: "easeOut" }}>
        <motion.h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }}>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ccf4ff] via-[#8eb6eb] to-[#4ad8ff]">Pendaftaran Program Doktor (S3)</span>
          <br />
          <span className="text-3xl md:text-5xl">Ilmu Manajemen</span>
        </motion.h1>

        <motion.p className="mt-6 text-xl md:text-2xl font-light text-gray-200" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.8 }}>
          Sekolah Tinggi Ilmu Ekonomi Mahardhika Surabaya
        </motion.p>

        <motion.div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.8 }}>
          <motion.button
            className="group bg-gradient-to-r from-[#207D96] to-[#1B3F6E] text-white px-8 py-4 rounded-xl hover:shadow-2xl hover:shadow-[#207D96]/50 transition-all font-semibold text-lg flex items-center gap-2 w-full sm:w-auto justify-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsModalOpen(true)}
          >
            Daftar Sekarang
            <ChevronRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>
      </motion.div>
      <ModalRegisOnline isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
};

export default Hero;
