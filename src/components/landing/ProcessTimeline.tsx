import { motion } from "framer-motion";
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const ProcessTimeline = () => {
  const { t } = useLanguage();
  const steps = [
    { key: 'process.step1', title: t('process.step1') },
    { key: 'process.step2', title: t('process.step2') },
    { key: 'process.step3', title: t('process.step3') },
    { key: 'process.step4', title: t('process.step4') }
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#207D96]/30 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4" >
            {t('process.title')}
          </h2>
          <p className="text-gray-600 text-lg" >
            {t('process.step1.desc')}
          </p>
        </motion.div>

        <motion.div className="flex flex-col md:flex-row items-center justify-between max-w-5xl mx-auto" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          {steps.map((step, index) => (
            <React.Fragment key={step.key}>
              <motion.div
                className="flex flex-col items-center text-center relative"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.1 }}
              >
                <motion.div className="relative">
                  <motion.div className="absolute inset-0 bg-gradient-to-r from-[#207D96] to-[#1B3F6E] rounded-full blur-xl opacity-50" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }} />
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#207D96] to-[#1B3F6E] border-4 border-white shadow-2xl flex items-center justify-center relative z-10">
                    <span className="text-white font-bold text-xl" >
                      {index + 1}
                    </span>
                  </div>
                </motion.div>
                <motion.p
                  className="mt-4 font-bold text-gray-800 text-base md:text-lg max-w-[120px]"
                  
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 + 0.3 }}
                >
                  {step.title}
                </motion.p>
              </motion.div>
              {index < steps.length - 1 && (
                <motion.div
                  className="hidden md:block flex-1 h-1 bg-gradient-to-r from-[#207D96]/30 via-[#1B3F6E]/30 to-[#207D96]/30 mx-4 relative overflow-hidden"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 + 0.4, duration: 0.6 }}
                >
                  <motion.div className="absolute inset-0 bg-gradient-to-r from-[#207D96] to-[#1B3F6E]" animate={{ x: ["-100%", "100%"] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} />
                </motion.div>
              )}
            </React.Fragment>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessTimeline;
