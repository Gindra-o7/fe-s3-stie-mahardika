import { ChevronRight, FileText, GraduationCap, X, User, Mail, Phone, IdCard, School, Upload, ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import UniversityService from "@/services/api/public/universitas.service";

export const DocumentList = ({ documents }: { documents: string[] }) => {
  return (
    <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
      <h2 className="text-4xl font-bold text-gray-800 mb-2">
        Persyaratan & Dokumen <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#207D96] to-[#1B3F6E]">Wajib</span>
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
            <div className="p-2 rounded-lg bg-gradient-to-br from-[#207D96] to-[#1B3F6E] text-white group-hover:scale-110 transition-transform">
              <FileText className="h-5 w-5" />
            </div>
            <span className="text-gray-700 font-medium">{doc}</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

export const CTACard = ({ onOpenModal }: { onOpenModal: () => void }) => {
  return (
    <motion.div
      className="bg-gradient-to-br from-gray-50 to-[#207D96]/10 p-10 rounded-2xl text-center border border-[#207D96]/20"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      <motion.div className="inline-block p-4 bg-gradient-to-br from-[#207D96] to-[#1B3F6E] rounded-2xl mb-6" whileHover={{ rotate: [0, -10, 10, -10, 0] }} transition={{ duration: 0.5 }}>
        <GraduationCap className="h-12 w-12 text-white" />
      </motion.div>

      <h3 className="text-3xl font-bold text-gray-800 mb-3">Sudah siap mendaftar?</h3>
      <p className="text-gray-600 mb-8 leading-relaxed">Lengkapi dokumen Anda dan mulailah proses pendaftaran sekarang.</p>

      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <motion.button
          className="bg-gradient-to-r from-[#207D96] to-[#1B3F6E] text-white px-6 py-3 rounded-xl hover:shadow-lg hover:shadow-[#207D96]/50 font-semibold transition-all flex items-center justify-center gap-2"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={onOpenModal}
        >
          Isi Formulir Online
          <ChevronRight className="w-4 h-4" />
        </motion.button>
        <motion.button className="bg-white border-2 border-[#207D96] text-[#207D96] px-6 py-3 rounded-xl hover:bg-[#207D96] hover:text-white font-semibold transition-all" whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
          Lihat Pendaftaran
        </motion.button>
      </div>
    </motion.div>
  );
};

export const ModalRegisOnline = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    ktp: "",
    photo: null as File | null,
    s1University: "",
    s1Gpa: "",
    s2University: "",
    s2Gpa: "",
  });
  const [s1Search, setS1Search] = useState<string>("");
  const [s2Search, setS2Search] = useState<string>("");
  interface University {
    kode: string;
    nama: string;
  }
  const [filteredUniversities, setFilteredUniversities] = useState<University[]>([]);
  const [activeSearchField, setActiveSearchField] = useState<"s1University" | "s2University" | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const fetchUniversities = async (query: string) => {
    setIsLoading(true);
    try {
      const data = await UniversityService.searchUniversity({ query });
      setFilteredUniversities(data);
    } catch (error) {
      console.error("Error fetching universities:", error);
      setErrors((prev) => ({ ...prev, api: "Gagal memuat data universitas" }));
      setFilteredUniversities([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      if (activeSearchField) {
        const searchQuery = activeSearchField === "s1University" ? s1Search : s2Search;
        if (searchQuery.trim()) {
          fetchUniversities(searchQuery);
        }
      }
    }, 300);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [s1Search, s2Search, activeSearchField]);

  const totalSteps = 2;

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Nama lengkap wajib diisi";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email wajib diisi";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Format email tidak valid";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Nomor HP wajib diisi";
    } else if (!/^[0-9]{10,13}$/.test(formData.phone)) {
      newErrors.phone = "Nomor HP harus 10-13 digit";
    }

    if (!formData.ktp.trim()) {
      newErrors.ktp = "Nomor KTP wajib diisi";
    } else if (!/^[0-9]{16}$/.test(formData.ktp)) {
      newErrors.ktp = "Nomor KTP harus 16 digit";
    }

    if (!formData.photo) {
      newErrors.photo = "Foto wajib diunggah";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.s1University.trim()) {
      newErrors.s1University = "Asal perguruan tinggi S1 wajib diisi";
    }

    if (!formData.s1Gpa.trim()) {
      newErrors.s1Gpa = "IPK S1 wajib diisi";
    } else {
      const gpa = parseFloat(formData.s1Gpa);
      if (isNaN(gpa) || gpa < 0 || gpa > 4) {
        newErrors.s1Gpa = "IPK harus antara 0-4";
      }
    }

    if (!formData.s2University.trim()) {
      newErrors.s2University = "Asal perguruan tinggi S2 wajib diisi";
    }

    if (!formData.s2Gpa.trim()) {
      newErrors.s2Gpa = "IPK S2 wajib diisi";
    } else {
      const gpa = parseFloat(formData.s2Gpa);
      if (isNaN(gpa) || gpa < 0 || gpa > 4) {
        newErrors.s2Gpa = "IPK harus antara 0-4";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
      setFilteredUniversities([]);
      setActiveSearchField(null);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setErrors({});
      setFilteredUniversities([]);
      setActiveSearchField(null);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));

    if (name === "s1University") {
      setS1Search(value);
      setActiveSearchField("s1University");
    } else if (name === "s2University") {
      setS2Search(value);
      setActiveSearchField("s2University");
    }

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleUniversitySelect = (university: string, field: "s1University" | "s2University") => {
    setFormData((prev) => ({
      ...prev,
      [field]: university,
    }));
    if (field === "s1University") {
      setS1Search(university);
    } else {
      setS2Search(university);
    }
    setFilteredUniversities([]);
    setActiveSearchField(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateStep2()) {
      console.log("Form Submitted:", formData);
      alert("Formulir berhasil dikirim!");
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        ktp: "",
        photo: null,
        s1University: "",
        s1Gpa: "",
        s2University: "",
        s2Gpa: "",
      });
      setS1Search("");
      setS2Search("");
      setCurrentStep(1);
      setErrors({});
      setFilteredUniversities([]);
      setActiveSearchField(null);
      onClose();
    }
  };

  const handleClose = () => {
    setCurrentStep(1);
    setErrors({});
    setS1Search("");
    setS2Search("");
    setFilteredUniversities([]);
    setActiveSearchField(null);
    onClose();
  };

  if (!isOpen) return null;

  const stepVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-2 sm:p-4">
      <motion.div
        className="bg-white p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-2xl relative border border-[#207D96]/20 flex flex-col max-h-[95vh] sm:max-h-[90vh]"
        initial={{ scale: 0.95, y: 50, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.95, y: 50, opacity: 0 }}
        transition={{ duration: 0.3, type: "spring" }}
      >
        <button className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-500 hover:text-[#207D96] transition-colors z-10" onClick={handleClose}>
          <X className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>

        <motion.h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center text-gray-800 mb-3 sm:mb-4 pr-8">
          Formulir <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#207D96] to-[#1B3F6E]">Pendaftaran Online</span>
        </motion.h2>

        <div className="w-full mb-4 sm:mb-6 lg:mb-8">
          <p className="text-center text-gray-500 text-sm sm:text-base">
            Langkah {currentStep} dari {totalSteps}
          </p>
          <div className="flex w-full sm:w-2/3 lg:w-1/2 mx-auto mt-2 h-2 bg-gray-200 rounded-full">
            <motion.div className="bg-gradient-to-r from-[#207D96] to-[#1B3F6E] rounded-full" animate={{ width: `${(currentStep / totalSteps) * 100}%` }} transition={{ duration: 0.5, type: "spring" }} />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col flex-grow overflow-hidden min-h-0">
          <div className="flex-grow overflow-y-auto pr-1 sm:pr-2 -mr-1 sm:-mr-2">
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div key="step1" variants={stepVariants} initial="hidden" animate="visible" exit="exit" transition={{ duration: 0.3 }}>
                  <div className="bg-gradient-to-br from-gray-50 to-[#207D96]/5 p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
                      <User className="h-4 w-4 sm:h-5 sm:w-5 text-[#207D96]" /> Data Pribadi
                    </h3>
                    <div className="space-y-3 sm:space-y-4">
                      <div>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 text-[#207D96]/60" size={18} />
                          <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="Nama Lengkap"
                            className={`w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 border rounded-lg sm:rounded-xl focus:border-[#207D96] focus:ring-2 focus:ring-[#207D96]/20 outline-none transition-colors text-sm sm:text-base ${
                              errors.fullName ? "border-red-500" : "border-gray-300"
                            }`}
                          />
                        </div>
                        {errors.fullName && <p className="text-red-500 text-xs sm:text-sm mt-1 ml-1">{errors.fullName}</p>}
                      </div>

                      <div>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#207D96]/60" size={18} />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                            className={`w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 border rounded-lg sm:rounded-xl focus:border-[#207D96] focus:ring-2 focus:ring-[#207D96]/20 outline-none transition-colors text-sm sm:text-base ${
                              errors.email ? "border-red-500" : "border-gray-300"
                            }`}
                          />
                        </div>
                        {errors.email && <p className="text-red-500 text-xs sm:text-sm mt-1 ml-1">{errors.email}</p>}
                      </div>

                      <div>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-[#207D96]/60" size={18} />
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Nomor HP (10-13 digit)"
                            className={`w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 border rounded-lg sm:rounded-xl focus:border-[#207D96] focus:ring-2 focus:ring-[#207D96]/20 outline-none transition-colors text-sm sm:text-base ${
                              errors.phone ? "border-red-500" : "border-gray-300"
                            }`}
                          />
                        </div>
                        {errors.phone && <p className="text-red-500 text-xs sm:text-sm mt-1 ml-1">{errors.phone}</p>}
                      </div>

                      <div>
                        <div className="relative">
                          <IdCard className="absolute left-3 top-1/2 -translate-y-1/2 text-[#207D96]/60" size={18} />
                          <input
                            type="text"
                            name="ktp"
                            value={formData.ktp}
                            onChange={handleChange}
                            placeholder="Nomor KTP (16 digit)"
                            maxLength={16}
                            className={`w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 border rounded-lg sm:rounded-xl focus:border-[#207D96] focus:ring-2 focus:ring-[#207D96]/20 outline-none transition-colors text-sm sm:text-base ${
                              errors.ktp ? "border-red-500" : "border-gray-300"
                            }`}
                          />
                        </div>
                        {errors.ktp && <p className="text-red-500 text-xs sm:text-sm mt-1 ml-1">{errors.ktp}</p>}
                      </div>

                      <div>
                        <label className="block text-gray-700 font-medium mb-2 flex items-center gap-2 text-sm sm:text-base">
                          <Upload className="h-4 w-4 sm:h-5 sm:w-5 text-[#207D96]" /> Upload Foto
                        </label>
                        <input
                          type="file"
                          name="photo"
                          onChange={handleChange}
                          accept="image/*"
                          className={`w-full border rounded-lg sm:rounded-xl p-2 sm:p-3 text-xs sm:text-sm file:mr-2 sm:file:mr-4 file:py-1.5 sm:file:py-2 file:px-3 sm:file:px-4 file:rounded-full file:border-0 file:text-xs sm:file:text-sm file:font-semibold file:bg-[#207D96] file:text-white hover:file:bg-[#1B3F6E] transition-colors ${
                            errors.photo ? "border-red-500" : "border-gray-300"
                          }`}
                        />
                        {errors.photo && <p className="text-red-500 text-xs sm:text-sm mt-1 ml-1">{errors.photo}</p>}
                        {formData.photo && <p className="text-green-600 text-xs sm:text-sm mt-1 ml-1">✓ File terpilih: {formData.photo.name}</p>}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div key="step2" variants={stepVariants} initial="hidden" animate="visible" exit="exit" transition={{ duration: 0.3 }}>
                  <div className="bg-gradient-to-br from-gray-50 to-[#207D96]/5 p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
                      <School className="h-4 w-4 sm:h-5 sm:w-5 text-[#207D96]" /> Data Akademik
                    </h3>
                    {errors.api && <p className="text-red-500 text-xs sm:text-sm mb-4">{errors.api}</p>}
                    <div className="space-y-3 sm:space-y-4">
                      <div className="relative">
                        <div className="relative">
                          <School className="absolute left-3 top-1/2 -translate-y-1/2 text-[#207D96]/60 z-10" size={18} />
                          <input
                            type="text"
                            name="s1University"
                            value={s1Search}
                            onChange={handleChange}
                            placeholder="Cari Asal Perguruan Tinggi S1"
                            className={`w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 border rounded-lg sm:rounded-xl focus:border-[#207D96] focus:ring-2 focus:ring-[#207D96]/20 outline-none transition-colors text-sm sm:text-base ${
                              errors.s1University ? "border-red-500" : "border-gray-300"
                            }`}
                          />
                        </div>
                        {isLoading && activeSearchField === "s1University" && <p className="text-gray-500 text-xs sm:text-sm mt-1 ml-1">Memuat universitas...</p>}
                        {filteredUniversities.length > 0 && activeSearchField === "s1University" && (
                          <motion.ul
                            className="absolute z-20 w-full bg-white border border-gray-200 rounded-lg sm:rounded-xl mt-1 max-h-48 sm:max-h-60 overflow-y-auto shadow-lg"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                          >
                            {filteredUniversities.map((uni) => (
                              <li key={uni.kode} className="px-3 sm:px-4 py-2 hover:bg-[#207D96]/10 cursor-pointer text-gray-700 text-xs sm:text-sm" onClick={() => handleUniversitySelect(uni.nama, "s1University")}>
                                {uni.nama}
                              </li>
                            ))}
                          </motion.ul>
                        )}
                        {errors.s1University && <p className="text-red-500 text-xs sm:text-sm mt-1 ml-1">{errors.s1University}</p>}
                      </div>

                      <div>
                        <div className="relative">
                          <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 text-[#207D96]/60" size={18} />
                          <input
                            type="number"
                            name="s1Gpa"
                            value={formData.s1Gpa}
                            onChange={handleChange}
                            step="0.01"
                            placeholder="IPK S1 (0-4)"
                            className={`w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 border rounded-lg sm:rounded-xl focus:border-[#207D96] focus:ring-2 focus:ring-[#207D96]/20 outline-none transition-colors text-sm sm:text-base ${
                              errors.s1Gpa ? "border-red-500" : "border-gray-300"
                            }`}
                          />
                        </div>
                        {errors.s1Gpa && <p className="text-red-500 text-xs sm:text-sm mt-1 ml-1">{errors.s1Gpa}</p>}
                      </div>

                      <div className="relative">
                        <div className="relative">
                          <School className="absolute left-3 top-1/2 -translate-y-1/2 text-[#207D96]/60 z-10" size={18} />
                          <input
                            type="text"
                            name="s2University"
                            value={s2Search}
                            onChange={handleChange}
                            placeholder="Cari Asal Perguruan Tinggi S2"
                            className={`w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 border rounded-lg sm:rounded-xl focus:border-[#207D96] focus:ring-2 focus:ring-[#207D96]/20 outline-none transition-colors text-sm sm:text-base ${
                              errors.s2University ? "border-red-500" : "border-gray-300"
                            }`}
                          />
                        </div>
                        {isLoading && activeSearchField === "s2University" && <p className="text-gray-500 text-xs sm:text-sm mt-1 ml-1">Memuat universitas...</p>}
                        {filteredUniversities.length > 0 && activeSearchField === "s2University" && (
                          <motion.ul
                            className="absolute z-20 w-full bg-white border border-gray-200 rounded-lg sm:rounded-xl mt-1 max-h-48 sm:max-h-60 overflow-y-auto shadow-lg"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                          >
                            {filteredUniversities.map((uni) => (
                              <li key={uni.kode} className="px-3 sm:px-4 py-2 hover:bg-[#207D96]/10 cursor-pointer text-gray-700 text-xs sm:text-sm" onClick={() => handleUniversitySelect(uni.nama, "s2University")}>
                                {uni.nama}
                              </li>
                            ))}
                          </motion.ul>
                        )}
                        {errors.s2University && <p className="text-red-500 text-xs sm:text-sm mt-1 ml-1">{errors.s2University}</p>}
                      </div>

                      <div>
                        <div className="relative">
                          <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 text-[#207D96]/60" size={18} />
                          <input
                            type="number"
                            name="s2Gpa"
                            value={formData.s2Gpa}
                            onChange={handleChange}
                            step="0.01"
                            placeholder="IPK S2 (0-4)"
                            className={`w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 border rounded-lg sm:rounded-xl focus:border-[#207D96] focus:ring-2 focus:ring-[#207D96]/20 outline-none transition-colors text-sm sm:text-base ${
                              errors.s2Gpa ? "border-red-500" : "border-gray-300"
                            }`}
                          />
                        </div>
                        {errors.s2Gpa && <p className="text-red-500 text-xs sm:text-sm mt-1 ml-1">{errors.s2Gpa}</p>}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="mt-4 sm:mt-6 lg:mt-8 pt-4 sm:pt-6 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 sm:gap-4">
            <motion.button
              type="button"
              onClick={handleBack}
              className="bg-white border-2 border-gray-300 text-gray-700 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl hover:bg-gray-100 font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base order-2 sm:order-1"
              whileHover={{ scale: currentStep === 1 ? 1 : 1.05, y: currentStep === 1 ? 0 : -2 }}
              whileTap={{ scale: currentStep === 1 ? 1 : 0.95 }}
              disabled={currentStep === 1}
            >
              <ChevronLeft className="w-4 h-4" />
              Kembali
            </motion.button>

            {currentStep < totalSteps ? (
              <motion.button
                type="button"
                onClick={handleNext}
                className="bg-gradient-to-r from-[#207D96] to-[#1B3F6E] text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl hover:shadow-lg hover:shadow-[#207D96]/50 font-semibold transition-all flex items-center justify-center gap-2 text-sm sm:text-base order-1 sm:order-2"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Selanjutnya
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            ) : (
              <motion.button
                type="submit"
                className="bg-gradient-to-r from-[#207D96] to-[#1B3F6E] text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl hover:shadow-lg hover:shadow-[#207D96]/50 font-semibold transition-all flex items-center justify-center gap-2 text-sm sm:text-base order-1 sm:order-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Submit Formulir
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.button>
            )}
          </div>
        </form>
      </motion.div>
    </div>
  );
};
