import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, ChevronRight, User, MapPin, FileText, Trash2, RefreshCw, Eye, Info, CreditCard } from "lucide-react";
import { toast } from "sonner";

const StudentRegistrationForm = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        scan_ktp_url: null as File | null,
        ijazah_s2_url: null as File | null,
        jalur_daftar: "",
        kewarganegaraan: "Indonesia",
        nik: "",
        tempat_lahir: "",
        tanggal_lahir: "",
        jenis_kelamin: "",
        agama: "",
        provinsi: "",
        kabupaten: "",
        kecamatan: "",
        desa: "",
        dusun: "",
        alamat_jalan: "",
        // Step 2 Fields
        akreditasi_banpt_url: null as File | null,
        karya_ilmiah_url: null as File | null,
        rekomendasi_url: null as File | null,
        proposal_disertasi_url: null as File | null,
        toefl_url: null as File | null,
        pas_foto_url: null as File | null,
        scan_ijazah_sarjana_dan_magister_url: null as File | null,
        scan_nilai_sarjana_dan_magister_url: null as File | null,
        tpa_bappenas_url: null as File | null,
        transkrip_doktor_pindahan_url: null as File | null,
        surat_kesehatan_url: null as File | null,
        surat_izin_atasan_url: null as File | null,
        cv_url: null as File | null,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;
        if (files && files[0]) {
            setFormData((prev) => ({ ...prev, [name]: files[0] }));
        }
    };

    const handleRemoveFile = (fieldName: string) => {
        setFormData((prev) => ({ ...prev, [fieldName]: null }));
        const input = document.getElementById(fieldName) as HTMLInputElement;
        if (input) input.value = "";
    };

    const handleNext = () => {
        const requiredFields = [
            "jalur_daftar", "nik", "tempat_lahir", "tanggal_lahir",
            "jenis_kelamin", "agama", "provinsi", "kabupaten",
            "kecamatan", "desa", "alamat_jalan"
        ];

        const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);

        if (missingFields.length > 0) {
            toast.error("Please fill in all required fields.");
            return;
        }

        if (!formData.scan_ktp_url || !formData.ijazah_s2_url) {
            toast.error("Please upload both KTP and Ijazah.");
            return;
        }

        setCurrentStep(2);
    };

    const handleStep2Submit = () => {
        // In a real app, this would submit data to backend
        toast.success("Data berhasil disimpan!");
        setCurrentStep(3);
    };

    const renderFileField = (fieldName: string, label: string) => {
        const file = formData[fieldName as keyof typeof formData] as File | null;
        const objectUrl = file ? URL.createObjectURL(file) : null;
        const isImage = file?.type.startsWith("image/");

        return (
            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">{label}</label>

                <input
                    type="file"
                    name={fieldName}
                    onChange={handleFileChange}
                    accept="image/*,.pdf"
                    className="hidden"
                    id={fieldName}
                />

                {file && objectUrl ? (
                    <div className="relative group rounded-xl overflow-hidden border border-gray-200 hover:border-[#207D96] transition-all bg-gray-50 h-32">
                        <a href={objectUrl} target="_blank" rel="noreferrer" className="block h-full cursor-pointer">
                            {isImage ? (
                                <img src={objectUrl} alt={label} className="w-full h-full object-cover" />
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full p-4">
                                    <FileText className="w-8 h-8 text-[#207D96] mb-2" />
                                    <span className="text-sm text-gray-700 font-medium text-center line-clamp-1">{file.name}</span>
                                    <span className="text-xs text-gray-400">PDF Document</span>
                                </div>
                            )}
                        </a>

                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-[2px]">
                            <a
                                href={objectUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
                                title="Preview"
                            >
                                <Eye className="w-4 h-4" />
                            </a>

                            <label
                                htmlFor={fieldName}
                                className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors cursor-pointer"
                                title="Change File"
                            >
                                <RefreshCw className="w-4 h-4" />
                            </label>

                            <button
                                onClick={() => handleRemoveFile(fieldName)}
                                className="p-2 bg-red-500/80 hover:bg-red-500 text-white rounded-full transition-colors"
                                title="Remove"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="border-2 border-dashed border-gray-300 rounded-xl hover:border-[#207D96] transition-colors text-center cursor-pointer bg-gray-50 hover:bg-blue-50/50 group h-32 flex items-center justify-center">
                        <label htmlFor={fieldName} className="cursor-pointer flex flex-col items-center gap-2 w-full h-full justify-center">
                            <Upload className="w-8 h-8 text-gray-400 group-hover:text-[#207D96] transition-colors" />
                            <span className="text-sm text-gray-600 group-hover:text-[#207D96] transition-colors">
                                Upload {label}
                            </span>
                        </label>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            {/* Stepper Header */}
            <div className="bg-gray-50 border-b border-gray-200 p-6 overflow-x-auto">
                <div className="flex items-center justify-between max-w-4xl mx-auto min-w-[300px] md:min-w-0">
                    {/* Step 1 */}
                    <div className={`flex flex-col items-center ${currentStep >= 1 ? "text-[#207D96]" : "text-gray-400"}`}>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${currentStep >= 1 ? "bg-[#207D96] text-white" : "bg-gray-200"}`}>
                            <User className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-medium hidden md:block">Data Diri</span>
                    </div>
                    <div className={`flex-1 h-1 mx-2 md:mx-4 rounded-full ${currentStep >= 2 ? "bg-[#207D96]" : "bg-gray-200"}`} />

                    {/* Step 2 */}
                    <div className={`flex flex-col items-center ${currentStep >= 2 ? "text-[#207D96]" : "text-gray-400"}`}>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${currentStep >= 2 ? "bg-[#207D96] text-white" : "bg-gray-200"}`}>
                            <FileText className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-medium hidden md:block">Berkas</span>
                    </div>
                    <div className={`flex-1 h-1 mx-2 md:mx-4 rounded-full ${currentStep >= 3 ? "bg-[#207D96]" : "bg-gray-200"}`} />

                    {/* Step 3 */}
                    <div className={`flex flex-col items-center ${currentStep >= 3 ? "text-[#207D96]" : "text-gray-400"}`}>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${currentStep >= 3 ? "bg-[#207D96] text-white" : "bg-gray-200"}`}>
                            <CreditCard className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-medium hidden md:block">Cetak Kartu</span>
                    </div>
                    <div className={`flex-1 h-1 mx-2 md:mx-4 rounded-full ${currentStep >= 4 ? "bg-[#207D96]" : "bg-gray-200"}`} />

                    {/* Step 4 */}
                    <div className={`flex flex-col items-center ${currentStep >= 4 ? "text-[#207D96]" : "text-gray-400"}`}>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${currentStep >= 4 ? "bg-[#207D96] text-white" : "bg-gray-200"}`}>
                            <Info className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-medium hidden md:block">Pengumuman</span>
                    </div>
                </div>
            </div>

            <div className="p-6 md:p-8 overflow-hidden">
                <AnimatePresence mode="wait">
                    {currentStep === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-6 max-w-4xl mx-auto"
                        >
                            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                                <User className="text-[#207D96]" /> Lengkapi Data Diri
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {renderFileField("scan_ktp_url", "Scan KTP")}
                                {renderFileField("ijazah_s2_url", "Scan Ijazah S2")}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Jalur Daftar</label>
                                    <input
                                        type="text"
                                        name="jalur_daftar"
                                        value={formData.jalur_daftar}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#207D96]/20 focus:border-[#207D96] outline-none transition-all"
                                        placeholder="Contoh: Reguler"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Kewarganegaraan</label>
                                    <input
                                        type="text"
                                        name="kewarganegaraan"
                                        value={formData.kewarganegaraan}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#207D96]/20 focus:border-[#207D96] outline-none transition-all"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">NIK</label>
                                    <input
                                        type="text"
                                        name="nik"
                                        maxLength={16}
                                        value={formData.nik}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#207D96]/20 focus:border-[#207D96] outline-none transition-all"
                                        placeholder="16 digit NIK"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Jenis Kelamin</label>
                                    <select
                                        name="jenis_kelamin"
                                        value={formData.jenis_kelamin}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#207D96]/20 focus:border-[#207D96] outline-none transition-all"
                                    >
                                        <option value="">Pilih Jenis Kelamin</option>
                                        <option value="Laki-laki">Laki-laki</option>
                                        <option value="Perempuan">Perempuan</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Tempat Lahir</label>
                                    <input
                                        type="text"
                                        name="tempat_lahir"
                                        value={formData.tempat_lahir}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#207D96]/20 focus:border-[#207D96] outline-none transition-all"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Tanggal Lahir</label>
                                    
                                    <div className="relative w-full h-[46px]"> 
                                        <input
                                            type="date"
                                            name="tanggal_lahir"
                                            value={formData.tanggal_lahir}
                                            onChange={handleInputChange}
                                            className="absolute inset-0 w-full h-full px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#207D96]/20 focus:border-[#207D96] outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Agama</label>
                                    <select
                                        name="agama"
                                        value={formData.agama}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#207D96]/20 focus:border-[#207D96] outline-none transition-all"
                                    >
                                        <option value="">Pilih Agama</option>
                                        <option value="Islam">Islam</option>
                                        <option value="Kristen">Kristen</option>
                                        <option value="Katolik">Katolik</option>
                                        <option value="Hindu">Hindu</option>
                                        <option value="Buddha">Buddha</option>
                                        <option value="Konghucu">Konghucu</option>
                                        <option value="Lainnya">Lainnya</option>
                                    </select>
                                </div>
                            </div>

                            <div className="border-t border-gray-200 pt-6 mt-6">
                                <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                    <MapPin className="text-[#207D96]" /> Alamat Lengkap
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">Provinsi</label>
                                        <input
                                            type="text"
                                            name="provinsi"
                                            value={formData.provinsi}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#207D96]/20 focus:border-[#207D96] outline-none transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">Kabupaten/Kota</label>
                                        <input
                                            type="text"
                                            name="kabupaten"
                                            value={formData.kabupaten}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#207D96]/20 focus:border-[#207D96] outline-none transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">Kecamatan</label>
                                        <input
                                            type="text"
                                            name="kecamatan"
                                            value={formData.kecamatan}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#207D96]/20 focus:border-[#207D96] outline-none transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">Desa/Kelurahan</label>
                                        <input
                                            type="text"
                                            name="desa"
                                            value={formData.desa}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#207D96]/20 focus:border-[#207D96] outline-none transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">Dusun/Lingkungan</label>
                                        <input
                                            type="text"
                                            name="dusun"
                                            value={formData.dusun}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#207D96]/20 focus:border-[#207D96] outline-none transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <label className="text-sm font-medium text-gray-700">Alamat Jalan</label>
                                        <input
                                            type="text"
                                            name="alamat_jalan"
                                            value={formData.alamat_jalan}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#207D96]/20 focus:border-[#207D96] outline-none transition-all"
                                            placeholder="Nama jalan, nomor rumah, RT/RW"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end pt-6">
                                <button
                                    onClick={handleNext}
                                    className="bg-gradient-to-r from-[#207D96] to-[#1B3F6E] text-white px-8 py-3 rounded-xl hover:shadow-lg transition-all font-semibold flex items-center gap-2"
                                >
                                    Lanjut ke Step 2 <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {currentStep === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-6 max-w-4xl mx-auto"
                        >
                            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                                <FileText className="text-[#207D96]" /> Lengkapi Berkas
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[
                                    { name: "akreditasi_banpt_url", label: "Akreditasi BAN-PT" },
                                    { name: "karya_ilmiah_url", label: "Karya Ilmiah" },
                                    { name: "rekomendasi_url", label: "Surat Rekomendasi" },
                                    { name: "proposal_disertasi_url", label: "Proposal Disertasi" },
                                    { name: "toefl_url", label: "Sertifikat TOEFL" },
                                    { name: "pas_foto_url", label: "Pas Foto" },
                                    { name: "scan_ijazah_sarjana_dan_magister_url", label: "Scan Ijazah S1 & S2" },
                                    { name: "scan_nilai_sarjana_dan_magister_url", label: "Scan Nilai S1 & S2" },
                                    { name: "tpa_bappenas_url", label: "TPA Bappenas" },
                                    { name: "transkrip_doktor_pindahan_url", label: "Transkrip Doktor Pindahan" },
                                    { name: "surat_kesehatan_url", label: "Surat Kesehatan" },
                                    { name: "surat_izin_atasan_url", label: "Surat Izin Atasan" },
                                    { name: "cv_url", label: "Curriculum Vitae (CV)" },
                                ].map((field) => (
                                    <div key={field.name}>
                                        {renderFileField(field.name, field.label)}
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-between pt-6 border-t border-gray-200 mt-6">
                                <button
                                    onClick={() => setCurrentStep(1)}
                                    className="text-gray-500 hover:text-[#207D96] font-medium transition-colors"
                                >
                                    Kembali ke Step 1
                                </button>
                                <button
                                    onClick={handleStep2Submit}
                                    className="bg-gradient-to-r from-[#207D96] to-[#1B3F6E] text-white px-8 py-3 rounded-xl hover:shadow-lg transition-all font-semibold flex items-center gap-2"
                                >
                                    Simpan & Lanjut <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {currentStep === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-6 max-w-4xl mx-auto"
                        >
                            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                                <CreditCard className="text-[#207D96]" /> Cetak Kartu Peserta
                            </h3>

                            <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center space-y-6 shadow-sm">
                                <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <CreditCard className="w-12 h-12 text-[#207D96]" />
                                </div>
                                <div>
                                    <h4 className="text-2xl font-bold text-gray-800 mb-2">Pendaftaran Berhasil!</h4>
                                    <p className="text-gray-600 max-w-md mx-auto">
                                        Data Anda telah berhasil disimpan. Silakan unduh dan cetak Kartu Tanda Peserta Ujian Anda sebagai bukti pendaftaran.
                                    </p>
                                </div>

                                <div className="flex justify-center gap-4">
                                    <button className="bg-white border-2 border-[#207D96] text-[#207D96] px-8 py-3 rounded-xl hover:bg-blue-50 transition-all font-semibold flex items-center gap-2">
                                        Preview Kartu
                                    </button>
                                    <button className="bg-gradient-to-r from-[#207D96] to-[#1B3F6E] text-white px-8 py-3 rounded-xl hover:shadow-lg transition-all font-semibold flex items-center gap-2">
                                        <CreditCard className="w-4 h-4" /> Cetak Kartu
                                    </button>
                                </div>
                            </div>

                            <div className="flex justify-end pt-6">
                                <button
                                    onClick={() => setCurrentStep(4)}
                                    className="bg-gradient-to-r from-[#207D96] to-[#1B3F6E] text-white px-8 py-3 rounded-xl hover:shadow-lg transition-all font-semibold flex items-center gap-2"
                                >
                                    Lanjut ke Pengumuman <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {currentStep === 4 && (
                        <motion.div
                            key="step4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-6 max-w-4xl mx-auto"
                        >
                            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                                <Info className="text-[#207D96]" /> Pengumuman Seleksi
                            </h3>

                            <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center space-y-6 shadow-sm">
                                <div className="w-24 h-24 bg-yellow-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Info className="w-12 h-12 text-yellow-600" />
                                </div>
                                <div>
                                    <h4 className="text-2xl font-bold text-gray-800 mb-2">Menunggu Hasil Seleksi</h4>
                                    <p className="text-gray-600 max-w-md mx-auto">
                                        Berkas Anda sedang dalam proses verifikasi oleh panitia PMB. Pengumuman hasil seleksi akan diinformasikan melalui halaman ini.
                                    </p>
                                </div>

                                <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-4 max-w-lg mx-auto text-left flex gap-4">
                                    <div className="shrink-0">
                                        <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2" />
                                    </div>
                                    <div>
                                        <h5 className="font-semibold text-gray-800">Jadwal Pengumuman</h5>
                                        <p className="text-sm text-gray-600 mt-1">
                                            Pengumuman hasil seleksi tahap 1 akan dilaksanakan pada tanggal <strong>25 Desember 2025</strong>.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-start pt-6">
                                <button
                                    onClick={() => setCurrentStep(3)}
                                    className="text-gray-500 hover:text-[#207D96] font-medium transition-colors"
                                >
                                    Kembali ke Cetak Kartu
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default StudentRegistrationForm;
