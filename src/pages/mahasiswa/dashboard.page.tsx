import { LogOut } from "lucide-react";
import { motion } from "framer-motion";
import LogoMahardhika from "@/assets/Logo_Mahardhika.png";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSelector from "@/components/ui/language-selector";
import { authClient } from "@/lib/auth-client";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import StudentRegistrationForm from "@/components/mahasiswa/StudentRegistrationForm";

const DashboardMahasiswa = () => {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const { data: session } = authClient.useSession();
    const userName = session?.user?.name || "Mahasiswa";

    const handleLogout = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    toast.success("Logged out successfully");
                    navigate("/");
                },
            },
        });
    };

    return (
        <div className="min-h-screen overflow-x-hidden bg-gradient-to-br from-gray-50 via-[#207D96]/10 to-[#1B3F6E]/10 font-sans">
            <motion.header className="bg-white/90 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-50 shadow-sm" initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.5 }}>
                <div className="container mx-auto px-4 py-4">
                    <div className="flex justify-between items-center">
                        <motion.div className="flex items-center gap-3" whileHover={{ scale: 1.02 }}>
                            <div className="relative">
                                <motion.img src={LogoMahardhika} alt="STIE Mahardhika Logo" className="w-[190px] relative object-contain" />
                            </div>
                        </motion.div>

                        <div className="flex items-center gap-4">
                            <LanguageSelector />

                            <motion.button
                                onClick={handleLogout}
                                className="flex items-center gap-2 bg-gradient-to-r from-[#207D96] to-[#1B3F6E] text-white px-6 py-2.5 rounded-lg hover:shadow-lg transition-all font-medium"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <LogOut className="h-4 w-4" />
                                {t('button.logout') || "Logout"}
                            </motion.button>
                        </div>
                    </div>
                </div>
            </motion.header>

            <div className="container overflow-x-hidden mx-auto px-4 py-4">
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
                                Welcome back, {userName}
                            </motion.h2>
                            <motion.p className="text-blue-100 text-lg" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                                Student Dashboard
                            </motion.p>
                        </div>
                    </div>
                </motion.div>

                <StudentRegistrationForm />
            </div>

            <div className="text-white flex items-center justify-center w-full h-[40px] bg-gradient-to-r from-[#207D96] to-[#1B3F6E]">
                <span>Copyright © 2025 PMB S3 STIE Mahardhika. All rights reserved.</span>
            </div>
        </div>
    );
};

export default DashboardMahasiswa;
