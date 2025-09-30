import { useState } from "react";
import { User, FileText, CreditCard, Megaphone, LogOut, Upload, CheckCircle, Clock, AlertCircle, Bell, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import LogoMahardhika from "@/assets/Logo_Mahardhika.png";

const DashboardPendaftar = () => {
  const [, setActiveSection] = useState("home");
  const [userName] = useState("Ahmad Fadhil Rahman");
  const [statusKelulusan] = useState("lulus");

  // Progress steps data
  const steps = [
    { id: 1, name: "Registrasi Akun", status: "completed", icon: CheckCircle },
    { id: 2, name: "Login ke Sistem", status: "completed", icon: CheckCircle },
    { id: 3, name: "Verifikasi Administrasi", status: "current", icon: Clock },
    { id: 4, name: "Tes TPA/TOEFL", status: "pending", icon: AlertCircle },
    { id: 5, name: "Wawancara", status: "pending", icon: AlertCircle },
  ];

  // Menu cards data
  const menuCards = [
    {
      id: "profile",
      title: "Profil",
      description: "Edit data pribadi",
      icon: User,
      gradient: "from-[#207D96] to-[#1B3F6E]",
      action: () => setActiveSection("profile"),
    },
    {
      id: "documents",
      title: "Unggah Dokumen",
      description: "Upload / update dokumen",
      icon: FileText,
      gradient: "from-[#207D96] to-[#1B3F6E]",
      action: () => setActiveSection("documents"),
    },
    {
      id: "payment",
      title: "Bukti Pembayaran",
      description: "Upload & cek status verifikasi",
      icon: CreditCard,
      gradient: "from-[#207D96] to-[#1B3F6E]",
      action: () => setActiveSection("payment"),
    },
    {
      id: "announcement",
      title: "Pengumuman",
      description: "Melihat jadwal tes & hasil seleksi",
      icon: Megaphone,
      gradient: "from-[#207D96] to-[#1B3F6E]",
      action: () => setActiveSection("announcement"),
    },
  ];

  const notifications = [
    {
      id: 1,
      type: "warning",
      message: "Dokumen TOEFL belum sesuai, silakan upload ulang",
      time: "2 jam yang lalu",
      icon: Bell,
    },
    {
      id: 2,
      type: "info",
      message: "Pembayaran Anda telah diverifikasi",
      time: "1 hari yang lalu",
      icon: CheckCircle,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-[#207D96]/10 to-[#1B3F6E]/10">
      <motion.header className="bg-white/90 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-50 shadow-sm" initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.5 }}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <motion.div className="flex items-center gap-3" whileHover={{ scale: 1.02 }}>
              <div className="relative">
                <motion.img src={LogoMahardhika} alt="STIE Mahardhika Logo" className="w-[190px] relative object-contain" />
              </div>
            </motion.div>

            <motion.button
              className="flex items-center gap-2 bg-gradient-to-r from-[#207D96] to-[#1B3F6E] text-white px-6 py-2.5 rounded-lg hover:shadow-lg transition-all font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <LogOut className="h-4 w-4" />
              Logout
            </motion.button>
          </div>
        </div>
      </motion.header>

      <div className="container mx-auto px-4 py-8">
        <motion.div className="mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="bg-gradient-to-r from-[#207D96] to-[#1B3F6E] rounded-2xl p-8 text-white relative overflow-hidden">
            <motion.div
              className="absolute inset-0 opacity-20"
              animate={{
                backgroundImage: [
                  "radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.3) 0%, transparent 50%)",
                  "radial-gradient(circle at 80% 50%, rgba(255, 255, 255, 0.3) 0%, transparent 50%)",
                  "radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.3) 0%, transparent 50%)",
                ],
              }}
              transition={{ duration: 8, repeat: Infinity }}
            />
            <div className="relative z-10">
              <motion.h2 className="text-3xl font-bold mb-2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                Selamat Datang, {userName}!
              </motion.h2>
              <motion.p className="text-blue-100 text-lg" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                Status pendaftaran Anda dapat dipantau di bawah ini.
              </motion.p>
            </div>
          </div>
        </motion.div>

        {statusKelulusan && (
          <div className="mb-6" style={{ animation: "fadeInScale 0.6s ease-out" }}>
            {statusKelulusan === "lulus" ? (
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-5 text-white relative overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    background: "radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.3) 0%, transparent 50%)",
                    animation: "shimmer 3s ease-in-out infinite",
                  }}
                ></div>
                <div className="relative z-10 flex items-center gap-4">
                  <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl" style={{ animation: "bounce 2s ease-in-out infinite" }}>
                    <CheckCircle className="h-10 w-10 text-white" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-1.5" style={{ animation: "slideInRight 0.5s ease-out" }}>
                      🎉 Selamat! Anda DITERIMA
                    </h2>
                    <p className="text-green-50 text-sm mb-3" style={{ animation: "slideInRight 0.5s ease-out 0.1s both" }}>
                      Anda telah dinyatakan LULUS seleksi Program Studi S3 STIE Mahardhika
                    </p>
                    <div className="flex gap-2 flex-wrap" style={{ animation: "slideInRight 0.5s ease-out 0.2s both" }}>
                      <button className="bg-white text-green-600 px-4 py-2 rounded-lg text-sm font-bold hover:shadow-lg hover:scale-105 transition-all duration-300">Lihat Detail</button>
                      <button className="bg-white/20 backdrop-blur-sm border-2 border-white text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/30 hover:scale-105 transition-all duration-300">Download Surat</button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-r from-orange-500 to-amber-600 rounded-xl p-5 text-white relative overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    background: "radial-gradient(circle at 80% 50%, rgba(255, 255, 255, 0.3) 0%, transparent 50%)",
                    animation: "shimmer 3s ease-in-out infinite",
                  }}
                ></div>
                <div className="relative z-10 flex items-center gap-4">
                  <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl" style={{ animation: "shake 2s ease-in-out infinite" }}>
                    <AlertCircle className="h-10 w-10 text-white" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-1.5" style={{ animation: "slideInRight 0.5s ease-out" }}>
                      Pengumuman Hasil Seleksi
                    </h2>
                    <p className="text-orange-50 text-sm mb-3" style={{ animation: "slideInRight 0.5s ease-out 0.1s both" }}>
                      Mohon maaf, Anda belum berhasil pada seleksi kali ini. Jangan menyerah! Anda dapat mencoba lagi pada periode berikutnya.
                    </p>
                    <div className="flex gap-2 flex-wrap" style={{ animation: "slideInRight 0.5s ease-out 0.2s both" }}>
                      <button className="bg-white text-orange-600 px-4 py-2 rounded-lg text-sm font-bold hover:shadow-lg hover:scale-105 transition-all duration-300">Lihat Feedback</button>
                      <button className="bg-white/20 backdrop-blur-sm border-2 border-white text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/30 hover:scale-105 transition-all duration-300">Info Pendaftaran</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        <style>{`
          @keyframes fadeInScale {
            from {
              opacity: 0;
              transform: scale(0.95) translateY(-10px);
            }
            to {
              opacity: 1;
              transform: scale(1) translateY(0);
            }
          }
          @keyframes slideInRight {
            from {
              opacity: 0;
              transform: translateX(-20px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          @keyframes bounce {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-5px);
            }
          }
          @keyframes shake {
            0%, 100% {
              transform: translateX(0);
            }
            25% {
              transform: translateX(-3px);
            }
            75% {
              transform: translateX(3px);
            }
          }
          @keyframes shimmer {
            0%, 100% {
              opacity: 0.2;
              transform: translateX(0);
            }
            50% {
              opacity: 0.3;
              transform: translateX(20px);
            }
          }
        `}</style>

        {/* Progress Timeline */}
        <motion.div className="mb-8 bg-white rounded-2xl p-8 shadow-lg border border-gray-100" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Status Pendaftaran</h3>
          <div className="relative">
            <div className="absolute top-6 left-0 right-0 h-1 bg-gray-200">
              <motion.div className="h-full bg-gradient-to-r from-[#207D96] to-[#1B3F6E]" initial={{ width: 0 }} animate={{ width: "40%" }} transition={{ duration: 1, delay: 0.5 }} />
            </div>
            <div className="relative flex justify-between">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <motion.div key={step.id} className="flex flex-col items-center" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.1 + 0.3 }}>
                    <motion.div
                      className={`w-12 h-12 rounded-full flex items-center justify-center border-4 border-white shadow-lg mb-3 ${
                        step.status === "completed" ? "bg-gradient-to-br from-[#207D96] to-[#1B3F6E]" : step.status === "current" ? "bg-gradient-to-br from-[#207D96] to-[#1B3F6E]" : "bg-gray-300"
                      }`}
                      whileHover={{ scale: 1.1 }}
                      animate={step.status === "current" ? { scale: [1, 1.1, 1] } : {}}
                      transition={{ duration: 2, repeat: step.status === "current" ? Infinity : 0 }}
                    >
                      <Icon className="h-6 w-6 text-white" />
                    </motion.div>
                    <p className={`text-xs text-center max-w-[100px] font-medium ${step.status === "completed" || step.status === "current" ? "text-gray-800" : "text-gray-400"}`}>{step.name}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Menu Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {menuCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.id}
                className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 cursor-pointer overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
                whileHover={{ y: -10 }}
                onClick={card.action}
              >
                <motion.div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                <motion.div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${card.gradient} text-white mb-4`} whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }} transition={{ duration: 0.5 }}>
                  <Icon className="h-8 w-8" />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{card.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{card.description}</p>
                <motion.div className="flex items-center text-gray-400 group-hover:text-[#207D96] transition-colors" whileHover={{ x: 5 }}>
                  <span className="text-sm font-medium">Akses</span>
                  <ChevronRight className="h-4 w-4 ml-1" />
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Notifications & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-lg border border-gray-100" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.6 }}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Notifikasi</h3>
              <motion.div className="p-2 bg-gradient-to-br from-[#207D96] to-[#1B3F6E] rounded-lg" whileHover={{ rotate: [0, -10, 10, -10, 0] }}>
                <Bell className="h-5 w-5 text-white" />
              </motion.div>
            </div>
            <div className="space-y-4">
              {notifications.map((notif, index) => (
                <motion.div
                  key={notif.id}
                  className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-gray-50 to-[#207D96]/10 hover:shadow-md transition-all cursor-pointer border border-gray-100"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + 0.7 }}
                  whileHover={{ x: 5 }}
                >
                  <div className={`p-2 rounded-lg ${notif.type === "warning" ? "bg-gradient-to-br from-[#207D96] to-[#1B3F6E]" : "bg-gradient-to-br from-[#207D96] to-[#1B3F6E]"}`}>
                    <notif.icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-800 font-medium mb-1">{notif.message}</p>
                    <p className="text-gray-500 text-xs">{notif.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="bg-gradient-to-br from-[#207D96] to-[#1B3F6E] rounded-2xl p-6 text-white shadow-lg relative overflow-hidden"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <motion.div
              className="absolute inset-0 opacity-20"
              animate={{
                backgroundImage: [
                  "radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.3) 0%, transparent 50%)",
                  "radial-gradient(circle at 80% 50%, rgba(255, 255, 255, 0.3) 0%, transparent 50%)",
                  "radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.3) 0%, transparent 50%)",
                ],
              }}
              transition={{ duration: 8, repeat: Infinity }}
            />
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-6">Aksi Cepat</h3>
              <div className="space-y-3">
                <motion.button
                  className="w-full bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-4 py-3 rounded-xl font-medium transition-all flex items-center justify-between group border border-white/20"
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveSection("documents")}
                >
                  <span className="flex items-center gap-2">
                    <Upload className="h-5 w-5" />
                    Upload Dokumen
                  </span>
                  <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
                <motion.button
                  className="w-full bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-4 py-3 rounded-xl font-medium transition-all flex items-center justify-between group border border-white/20"
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveSection("announcement")}
                >
                  <span className="flex items-center gap-2">
                    <Megaphone className="h-5 w-5" />
                    Lihat Pengumuman
                  </span>
                  <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
                <motion.button
                  className="w-full bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-4 py-3 rounded-xl font-medium transition-all flex items-center justify-between group border border-white/20"
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Download Panduan
                  </span>
                  <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>
              <motion.div className="mt-6 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}>
                <p className="text-sm text-white/90 mb-2">💡 Tips:</p>
                <p className="text-xs text-white/70">Pastikan semua dokumen sudah diupload sebelum batas waktu yang ditentukan untuk menghindari keterlambatan proses verifikasi.</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPendaftar;
