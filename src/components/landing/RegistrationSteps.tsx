import { UserPlus, LogIn, FileCheck, CircleCheck, Download, Edit, FileText } from "lucide-react";
import { motion } from "framer-motion";

const RegistrationSteps = () => {
  const stepsData = [
    {
      icon: <UserPlus className="w-12 h-12" />,
      title: "Registrasi Akun",
      points: ["Isi nama lengkap, email, nomor HP", "Buat username & password", "Verifikasi via email"],
      gradient: "from-[#207D96] to-[#1B3F6E]",
    },
    {
      icon: <LogIn className="w-12 h-12" />,
      title: "Login Sistem",
      points: ["Masukkan username & password", "Akses dashboard pendaftar", "Upload foto"],
      gradient: "from-[#207D96] to-[#1B3F6E]",
    },
    {
      icon: <FileCheck className="w-12 h-12" />,
      title: "Konfirmasi Submit",
      points: ["Review data & dokumen", "Klik tombol Submit Pendaftaran"],
      gradient: "from-[#207D96] to-[#1B3F6E]",
    },
    {
      icon: <CircleCheck className="w-12 h-12" />,
      title: "Cek Status Pendaftaran",
      points: ["Login ke dashboard", "Pantau progres (Verifikasi → Tes → Wawancara → Hasil)"],
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
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4" style={{ fontFamily: "DIN Bold" }}>
            Tata Cara <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#207D96] to-[#1B3F6E]">Pendaftaran</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto" style={{ fontFamily: "DIN Medium" }}>
            Ikuti langkah-langkah berikut untuk mendaftar secara online.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stepsData.map((step, index) => (
            <motion.div
              key={step.title}
              className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <motion.div className={`absolute inset-0 bg-gradient-to-br ${step.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`} />

              <motion.div
                className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${step.gradient} text-white mb-6`}
                style={{ fontFamily: "DIN Light" }}
                whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                {step.icon}
              </motion.div>

              <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-400 text-lg" style={{ fontFamily: "DIN Bold" }}>
                {index + 1}
              </div>

              <h3 className="text-xl font-bold text-gray-800 mb-4" style={{ fontFamily: "DIN Bold" }}>
                {step.title}
              </h3>
              <ul className="space-y-2 text-gray-600 text-sm" style={{ fontFamily: "DIN Medium" }}>
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

        <motion.div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-16" initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <motion.button
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-[#207D96] to-[#1B3F6E] text-white px-8 py-4 rounded-xl hover:shadow-lg hover:shadow-[#207D96]/50 font-semibold transition-all"
            style={{ fontFamily: "DIN Bold" }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Edit className="w-5 h-5" />
            Isi Formulir Sekarang
          </motion.button>
          <motion.button
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white border-2 border-[#207D96] text-[#207D96] px-8 py-4 rounded-xl hover:bg-[#207D96] hover:text-white font-semibold transition-all"
            style={{ fontFamily: "DIN Bold" }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download className="w-5 h-5" />
            Download Panduan PDF
          </motion.button>
        </motion.div>

        <motion.div className="text-center max-w-3xl mx-auto" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
          <div className="border-t-2 border-[#207D96]/30 pt-12">
            <motion.div className="inline-block p-4 bg-gradient-to-br from-[#207D96] to-[#1B3F6E] rounded-2xl mb-6" style={{ fontFamily: "DIN Light" }} whileHover={{ rotate: [0, -10, 10, -10, 0] }} transition={{ duration: 0.5 }}>
              <FileText className="h-10 w-10 text-white" />
            </motion.div>

            <h3 className="text-3xl font-bold text-gray-800 mb-6" style={{ fontFamily: "DIN Bold" }}>
              Pembayaran Biaya Pendaftaran
            </h3>
            <div className="bg-gradient-to-br from-gray-50 to-[#207D96]/10 p-8 rounded-2xl border border-[#207D96]/20">
              <ul className="space-y-4 text-lg text-gray-700" style={{ fontFamily: "DIN Medium" }}>
                <motion.li className="flex items-center justify-center gap-3" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#207D96] to-[#1B3F6E]" />
                  <span>Transfer ke rekening resmi</span>
                </motion.li>
                <motion.li className="flex items-center justify-center gap-3" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#207D96] to-[#1B3F6E]" />
                  <span>Upload bukti bayar</span>
                </motion.li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default RegistrationSteps;
