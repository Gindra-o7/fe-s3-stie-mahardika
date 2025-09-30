import { Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LogoMahardhika from "@/assets/Logo_Mahardhika.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navItems = ["Beranda", "Profil Prodi", "Kurikulum", "Tata Cara Pendaftaran"];

  return (
    <motion.header className="bg-white/90 backdrop-blur-lg sticky top-0 z-50 border-b border-gray-200 shadow-sm" style={{ color: "#207D96" }} initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.5 }}>
      <div className="container mx-auto px-4 flex justify-between items-center h-20">
        <motion.div className="flex items-center gap-3" whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400 }}>
          <motion.img src={LogoMahardhika} alt="STIE Mahardhika Logo" className="w-[190px] relative object-contain" />
        </motion.div>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item, index) => (
            <motion.a key={item} href="#" className="text-[#207D96] hover:text-[#1B3F6E] transition-colors relative group" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
              {item}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#207D96] to-[#1B3F6E] group-hover:w-full transition-all duration-300" />
            </motion.a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <motion.button
            className="hidden md:block bg-gradient-to-r from-[#207D96] to-[#1B3F6E] text-white px-6 py-2.5 rounded-lg hover:shadow-lg transition-all font-semibold relative overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">Daftar Sekarang</span>
            <motion.div className="absolute inset-0 bg-gradient-to-r from-[#207D96] to-[#1B3F6E]" initial={{ x: "-100%" }} whileHover={{ x: 0 }} transition={{ duration: 0.3 }} />
          </motion.button>

          <button className="md:hidden text-[#207D96]" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div className="md:hidden bg-white border-t" style={{ borderColor: "#207D96" }} initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
            <nav className="flex flex-col p-4 gap-3">
              {navItems.map((item) => (
                <a key={item} href="#" className="text-[#207D96] hover:text-[#1B3F6E] py-2 px-4 hover:bg-gray-50 rounded-md transition-colors">
                  {item}
                </a>
              ))}
              <button className="bg-gradient-to-r from-[#207D96] to-[#1B3F6E] text-white px-4 py-2.5 rounded-lg hover:shadow-lg transition-all font-semibold mt-2">Daftar Sekarang</button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
