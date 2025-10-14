import { ModalRegisOnline as ModalRegisOnline} from "./ModalRegisOnline"
import {motion} from "framer-motion"
import { Award, BookOpen, FileText, Globe, GraduationCap, Mail } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const Requirements = () => {
  const { t } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const documents = [
    { name: t('requirements.documents'), icon: FileText, color: "from-blue-500 to-cyan-500", desc: t('requirements.documents.desc') },
    { name: t('requirements.academic'), icon: GraduationCap, color: "from-purple-500 to-pink-500", desc: t('requirements.academic.desc') },
    { name: t('requirements.photo'), icon: Award, color: "from-orange-500 to-red-500", desc: t('requirements.photo.desc') },
    { name: t('requirements.toefl'), icon: Globe, color: "from-green-500 to-emerald-500", desc: t('requirements.toefl.desc') },
    { name: t('requirements.recommendation'), icon: Mail, color: "from-indigo-500 to-blue-500", desc: t('requirements.recommendation.desc') },
    { name: t('requirements.proposal'), icon: BookOpen, color: "from-amber-500 to-yellow-500", desc: t('requirements.proposal.desc') }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('requirements.title')}
          </h2>
          <p className="text-gray-600 text-lg">{t('requirements.documents.desc')}</p>
        </motion.div>

        <div className="bg-white/80 backdrop-blur-sm p-8 md:p-12 rounded-3xl shadow-2xl border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {documents.map((doc, index) => {
              const Icon = doc.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onHoverStart={() => setHoveredIndex(index)}
                  onHoverEnd={() => setHoveredIndex(null)}
                  className="relative group"
                >
                  <motion.div
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-gray-100 cursor-pointer h-full"
                  >
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${doc.color} flex items-center justify-center mb-4 relative overflow-hidden`}>
                      <motion.div
                        className="absolute inset-0 bg-white"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={hoveredIndex === index ? { scale: 1, opacity: 0.2 } : { scale: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                      <Icon className="w-8 h-8 text-white relative z-10" />
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#207D96] transition-colors">
                      {doc.name}
                    </h3>

                    <p className="text-gray-600 text-sm mb-3">{doc.desc}</p>

                    <motion.div
                      className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${doc.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                    />
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[#207D96] to-[#1B3F6E] rounded-2xl p-8 md:p-10 text-white relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-16 -mb-16" />

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-bold mb-2">
                  {t('hero.cta')}
                </h3>
                <p className="text-white/90 text-lg">
                  {t('hero.description')}
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsModalOpen(true)}
                className="bg-white text-[#207D96] px-8 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 whitespace-nowrap flex items-center gap-2 group"
              >
                <span>{t('button.register')}</span>
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      <ModalRegisOnline isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
};

export default Requirements;