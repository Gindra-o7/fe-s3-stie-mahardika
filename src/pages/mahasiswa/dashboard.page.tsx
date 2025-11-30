import { LogOut, BookOpen, Calendar, GraduationCap, User } from "lucide-react";
import { motion } from "framer-motion";
import LogoMahardhika from "@/assets/Logo_Mahardhika.png";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSelector from "@/components/ui/language-selector";
import { authClient } from "@/lib/auth-client";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

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

    const menuCards = [
        {
            id: "academic",
            title: "Academic Record",
            description: "View your grades and transcripts",
            icon: GraduationCap,
            gradient: "from-[#207D96] to-[#1B3F6E]",
        },
        {
            id: "schedule",
            title: "Class Schedule",
            description: "Check your upcoming classes",
            icon: Calendar,
            gradient: "from-[#207D96] to-[#1B3F6E]",
        },
        {
            id: "courses",
            title: "My Courses",
            description: "Access course materials",
            icon: BookOpen,
            gradient: "from-[#207D96] to-[#1B3F6E]",
        },
        {
            id: "profile",
            title: "Student Profile",
            description: "Update your personal information",
            icon: User,
            gradient: "from-[#207D96] to-[#1B3F6E]",
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-[#207D96]/10 to-[#1B3F6E]/10 font-sans">
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
                                Welcome back, {userName}
                            </motion.h2>
                            <motion.p className="text-blue-100 text-lg" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                                Student Dashboard
                            </motion.p>
                        </div>
                    </div>
                </motion.div>

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
                            >
                                <motion.div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                                <motion.div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${card.gradient} text-white mb-4`} whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }} transition={{ duration: 0.5 }}>
                                    <Icon className="h-8 w-8" />
                                </motion.div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">{card.title}</h3>
                                <p className="text-gray-600 text-sm mb-4">{card.description}</p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default DashboardMahasiswa;
