import { CheckCircle, Clock, Handshake } from "lucide-react";
import { motion } from "framer-motion";

const Features = () => {
  const featureData = [
    {
      icon: <CheckCircle className="h-12 w-12" />,
      title: "Keunggulan Prodi",
      description: "Program studi unggulan dengan akreditasi terbaik.",
      gradient: "from-[#207D96] to-[#1B3F6E]", // ORACAL Light Blue to Cobalt Blue
    },
    {
      icon: <Clock className="h-12 w-12" />,
      title: "Durasi Studi",
      description: "3-5 tahun, meraih gelar doktor.",
      gradient: "from-[#207D96] to-[#1B3F6E]", // ORACAL Light Blue to Cobalt Blue
    },
    {
      icon: <Handshake className="h-12 w-12" />,
      title: "Kerjasama Riset",
      description: "Jaringan riset luas dengan industri dan universitas partner.",
      gradient: "from-[#207D96] to-[#1B3F6E]", // ORACAL Light Blue to Cobalt Blue
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          backgroundImage: [
            "radial-gradient(circle at 0% 0%, rgba(32, 125, 150, 0.1) 0%, transparent 50%)", // ORACAL Light Blue
            "radial-gradient(circle at 100% 100%, rgba(27, 63, 110, 0.1) 0%, transparent 50%)", // ORACAL Cobalt Blue
            "radial-gradient(circle at 0% 0%, rgba(32, 125, 150, 0.1) 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4" style={{ fontFamily: "DIN Bold" }}>
            Mengapa Memilih <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#207D96] to-[#1B3F6E]">STIE Mahardhika?</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto" style={{ fontFamily: "DIN Medium" }}>
            Program doktor dengan standar internasional dan fasilitas terbaik
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featureData.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{ y: -10 }}
            >
              <motion.div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

              <motion.div
                className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.gradient} text-white mb-6`}
                style={{ fontFamily: "DIN Light" }}
                whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                {feature.icon}
              </motion.div>

              <h3 className="text-2xl font-bold text-gray-800 mb-3" style={{ fontFamily: "DIN Bold" }}>
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "DIN Medium" }}>
                {feature.description}
              </p>

              <motion.div
                className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${feature.gradient}`}
                style={{ backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))` }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
