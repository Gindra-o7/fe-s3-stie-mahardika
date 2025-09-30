import { ChevronRight, FileText, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";

const Requirements = () => {
  const documents = ["KTP", "Ijazah S1 & S2", "Sertifikat TPA", "TOEFL/IELTS", "Surat Rekomendasi", "Proposal Disertasi"];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      <motion.div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-purple-600/10 rounded-full blur-3xl" animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }} transition={{ duration: 20, repeat: Infinity }} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="bg-white p-10 rounded-3xl shadow-2xl border border-gray-100">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <h2 className="text-4xl font-bold text-gray-800 mb-2">
                Persyaratan & Dokumen <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">Wajib</span>
              </h2>
              <p className="text-gray-600 mb-8">Siapkan dokumen berikut untuk proses pendaftaran</p>

              <ul className="space-y-4">
                {documents.map((doc, index) => (
                  <motion.li
                    key={doc}
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 10 }}
                  >
                    <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white group-hover:scale-110 transition-transform">
                      <FileText className="h-5 w-5" />
                    </div>
                    <span className="text-gray-700 font-medium">{doc}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-gray-50 to-blue-50/50 p-10 rounded-2xl text-center border border-gray-200"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <motion.div className="inline-block p-4 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-6" whileHover={{ rotate: [0, -10, 10, -10, 0] }} transition={{ duration: 0.5 }}>
                <GraduationCap className="h-12 w-12 text-white" />
              </motion.div>

              <h3 className="text-3xl font-bold text-gray-800 mb-3">Sudah siap mendaftar?</h3>
              <p className="text-gray-600 mb-8 leading-relaxed">Lengkapi dokumen Anda dan mulailah proses pendaftaran sekarang.</p>

              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <motion.button
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:shadow-lg hover:shadow-purple-500/50 font-semibold transition-all flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Isi Formulir Online
                  <ChevronRight className="w-4 h-4" />
                </motion.button>
                <motion.button className="bg-white border-2 border-gray-800 text-gray-800 px-6 py-3 rounded-xl hover:bg-gray-800 hover:text-white font-semibold transition-all" whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                  Lihat Pendaftaran
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Requirements;
