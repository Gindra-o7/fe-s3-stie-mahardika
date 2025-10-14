import { motion } from "framer-motion";
import LogoMahardhika from "@/assets/Logo_Mahardhika.png";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-[#1B3F6E] to-[#207D96] text-white py-12 relative overflow-hidden">
      <motion.div
        className="absolute inset-0 opacity-10"
        animate={{
          backgroundImage: [
            "radial-gradient(circle at 20% 50%, rgba(32, 125, 150, 0.3) 0%, transparent 50%)", // ORACAL Light Blue
            "radial-gradient(circle at 80% 50%, rgba(27, 63, 110, 0.3) 0%, transparent 50%)", // ORACAL Cobalt Blue
            "radial-gradient(circle at 20% 50%, rgba(32, 125, 150, 0.3) 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div className="flex flex-col items-center text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <motion.div className="flex items-center gap-3 mb-6" whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400 }}>
            <motion.img src={LogoMahardhika} alt="STIE Mahardhika Logo" className="w-[200px] relative object-contain" />
          </motion.div>

          <div className="border-t border-[#207D96]/30 pt-8 w-full">
            <p className="text-gray-400 mb-2">{t('footer.copyright').replace('2024', new Date().getFullYear().toString())}</p>
            <p className="text-sm text-gray-500">{t('hero.title')}</p>
          </div>

          <motion.div className="mt-8 flex gap-6" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
            {["Facebook", "Instagram", "LinkedIn"].map((social, index) => (
              <motion.a
                key={social}
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
              >
                {social}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <motion.div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#207D96] via-[#1B3F6E] to-[#207D96]" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1 }} />
    </footer>
  );
};

export default Footer;
