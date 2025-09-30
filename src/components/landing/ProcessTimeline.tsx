import { motion } from "framer-motion";
import React from "react";

const ProcessTimeline = () => {
  const steps = ["Pendaftaran", "Seleksi Administrasi", "Tes", "Wawancara"];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/30 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Alur <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">Pendaftaran</span>
          </h2>
          <p className="text-gray-600 text-lg">Proses mudah dalam 4 tahap</p>
        </motion.div>

        <motion.div className="flex flex-col md:flex-row items-center justify-between max-w-5xl mx-auto" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          {steps.map((step, index) => (
            <React.Fragment key={step}>
              <motion.div
                className="flex flex-col items-center text-center relative"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                whileHover={{ scale: 1.1 }}
              >
                <motion.div className="relative" whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }}>
                  <motion.div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-xl opacity-50" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }} />
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 border-4 border-white shadow-2xl flex items-center justify-center relative z-10">
                    <span className="text-white font-bold text-xl">{index + 1}</span>
                  </div>
                </motion.div>
                <motion.p className="mt-4 font-bold text-gray-800 text-base md:text-lg max-w-[120px]" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.2 + 0.3 }}>
                  {step}
                </motion.p>
              </motion.div>
              {index < steps.length - 1 && (
                <motion.div
                  className="hidden md:block flex-1 h-1 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 mx-4 relative overflow-hidden"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 + 0.4, duration: 0.6 }}
                >
                  <motion.div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600" animate={{ x: ["-100%", "100%"] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} />
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
