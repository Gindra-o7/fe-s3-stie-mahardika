import { UserPlus, LogIn, FileCheck, CircleCheck, Download, Edit, FileText } from "lucide-react";
import { motion } from "framer-motion";
import { ModalRegisOnline } from "./ModalRegisOnline";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const RegistrationSteps = () => {
  const { t } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const stepsData = [
    {
      icon: <UserPlus className="w-12 h-12" />,
      title: t('registration.online'),
      points: [t('registration.online.desc'), t('registration.payment.desc'), t('registration.test.desc')],
      gradient: "from-[#207D96] to-[#1B3F6E]",
    },
    {
      icon: <LogIn className="w-12 h-12" />,
      title: t('registration.payment'),
      points: [t('registration.payment.desc'), t('registration.test.desc'), t('registration.result.desc')],
      gradient: "from-[#207D96] to-[#1B3F6E]",
    },
    {
      icon: <FileCheck className="w-12 h-12" />,
      title: t('registration.test'),
      points: [t('registration.test.desc'), t('registration.result.desc')],
      gradient: "from-[#207D96] to-[#1B3F6E]",
    },
    {
      icon: <CircleCheck className="w-12 h-12" />,
      title: t('registration.result'),
      points: [t('registration.result.desc'), t('registration.online.desc')],
      gradient: "from-[#207D96] to-[#1B3F6E]",
    },
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-[#207D96]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-[#1B3F6E]/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            {t('registration.title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t('registration.online.desc')}</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stepsData.map((step, index) => (
            <motion.div
              key={step.title}
              className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.1, delay: 0.1 }}
              whileHover={{ y: -10 }}
            >
              <motion.div className={`absolute inset-0 bg-gradient-to-br ${step.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`} />

              <motion.div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${step.gradient} text-white mb-6`} whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }} transition={{ duration: 0.5 }}>
                {step.icon}
              </motion.div>

              <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-400 text-lg">{index + 1}</div>

              <h3 className="text-xl font-bold text-gray-800 mb-4">{step.title}</h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                {step.points.map((point, i) => (
                  <motion.li key={i} className="flex items-start gap-2" initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 + i * 0.05 }}>
                    <span className="text-gray-400 mt-1">•</span>
                    <span>{point}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-16" initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.1 }}>
          <motion.button
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-[#207D96] to-[#1B3F6E] text-white px-8 py-4 rounded-xl hover:shadow-lg hover:shadow-[#207D96]/50 font-semibold transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsModalOpen(true)}
          >
            <Edit className="w-5 h-5" />
            {t('button.register')}
          </motion.button>
          <motion.button
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white border-2 border-[#207D96] text-[#207D96] px-8 py-4 rounded-xl hover:bg-[#207D96] hover:text-white font-semibold transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download className="w-5 h-5" />
            {t('registration.result.desc')}
          </motion.button>
        </motion.div>

        <motion.div className="text-center max-w-3xl mx-auto" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
          <div className="border-t-2 border-[#207D96]/30 pt-12">
            <motion.div className="inline-block p-4 bg-gradient-to-br from-[#207D96] to-[#1B3F6E] rounded-2xl mb-6" whileHover={{ rotate: [0, -10, 10, -10, 0] }} transition={{ duration: 0.5 }}>
              <FileText className="h-10 w-10 text-white" />
            </motion.div>

            <h3 className="text-3xl font-bold text-gray-800 mb-6">{t('registration.payment')}</h3>
            <div className="bg-gradient-to-br from-gray-50 to-[#207D96]/10 p-8 rounded-2xl border border-[#207D96]/20">
              <ul className="space-y-4 text-lg text-gray-700">
                <motion.li className="flex items-center justify-center gap-3" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#207D96] to-[#1B3F6E]" />
                  <span>{t('registration.payment.desc')}</span>
                </motion.li>
                <motion.li className="flex items-center justify-center gap-3" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#207D96] to-[#1B3F6E]" />
                  <span>{t('registration.test.desc')}</span>
                </motion.li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
      <ModalRegisOnline isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
};

export default RegistrationSteps;
