import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, ChevronRight, User, MapPin, FileText, Trash2, RefreshCw, Eye, Info, CreditCard, Loader2, X } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import DaftarService from "@/services/api/mahasiswa/daftar.service";
import { FileData } from "@/interfaces/services/daftar.interface";

const STORAGE_KEY = "student_registration_form_data";

const StudentRegistrationForm = () => {
  const { t } = useLanguage();

  // Load initial data from localStorage
  const loadSavedData = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          currentStep: parsed.currentStep || 1,
          formData: parsed.formData || getInitialFormData(),
        };
      }
    } catch (error) {
      console.error("Error loading saved data:", error);
    }
    return {
      currentStep: 1,
      formData: getInitialFormData(),
    };
  };

  const getInitialFormData = () => ({
    scan_ktp_url: null as FileData | null,
    ijazah_s2_url: null as FileData | null,
    jalur_daftar: "",
    kewarganegaraan: "",
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
    akreditasi_banpt_url: null as FileData | null,
    karya_ilmiah_url: null as FileData | null,
    rekomendasi_url: null as FileData | null,
    proposal_disertasi_url: null as FileData | null,
    toefl_url: null as FileData | null,
    pas_foto_url: null as FileData | null,
    scan_ijazah_sarjana_dan_magister_url: null as FileData | null,
    scan_nilai_sarjana_dan_magister_url: null as FileData | null,
    tpa_bappenas_url: null as FileData | null,
    transkrip_doktor_pindahan_url: null as FileData | null,
    surat_kesehatan_url: null as FileData | null,
    surat_izin_atasan_url: null as FileData | null,
    cv_url: null as FileData | null,
  });

  const savedData = loadSavedData();
  const [currentStep, setCurrentStep] = useState(savedData.currentStep);
  const [uploadingFiles, setUploadingFiles] = useState<Set<string>>(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingPreviewKartu, setIsLoadingPreviewKartu] = useState(false);
  const [isLoadingCetakKartu, setIsLoadingCetakKartu] = useState(false);
  const [previewFile, setPreviewFile] = useState<{ url: string; filename: string; mimeType: string } | null>(null);
  const [previewKartuUrl, setPreviewKartuUrl] = useState<string | null>(null);
  type FormDataState = ReturnType<typeof getInitialFormData>;
  const [formData, setFormData] = useState<FormDataState>(savedData.formData);

  // Extract field name from filename (remove file extension)
  const extractFieldNameFromFilename = (filename: string): string | null => {
    // Remove file extension (e.g., "scan_ktp_url.pdf" -> "scan_ktp_url")
    const withoutExtension = filename.replace(/\.[^/.]+$/, "");
    return withoutExtension || null;
  };

  // Get mime type from filename extension
  const getMimeTypeFromFilename = (filename: string): string => {
    const extension = filename.split(".").pop()?.toLowerCase();
    const mimeTypes: Record<string, string> = {
      pdf: "application/pdf",
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      png: "image/png",
      gif: "image/gif",
      webp: "image/webp",
    };
    return mimeTypes[extension || ""] || "application/octet-stream";
  };

  // Fetch uploaded files from backend on component mount
  useEffect(() => {
    const fetchUploadedFiles = async () => {
      try {
        const response = await DaftarService.getUploadedFiles();

        if (response.response && response.data && response.data.files && Array.isArray(response.data.files)) {
          const uploadedFiles = response.data.files;

          // Get all field names from initial form data that are file fields
          const fileFieldNames = Object.keys(getInitialFormData()).filter((key) => key.endsWith("_url")) as Array<keyof FormDataState>;

          // Map uploaded files to form data based on filename
          setFormData((prev: FormDataState) => {
            const updated = { ...prev };

            uploadedFiles.forEach((file) => {
              // Extract field name from filename (e.g., "scan_ktp_url.pdf" -> "scan_ktp_url")
              const fieldName = extractFieldNameFromFilename(file.filename);

              if (fieldName && fileFieldNames.includes(fieldName as keyof FormDataState)) {
                // Match file with form field based on filename
                const fieldKey = fieldName as keyof FormDataState;
                const currentValue = updated[fieldKey];

                // Check if current value is a FileData object or null
                const currentFile = currentValue && typeof currentValue === "object" && "key" in currentValue ? (currentValue as FileData) : null;

                // Convert UploadedFile to FileData format
                const fileData: FileData = {
                  filename: file.filename,
                  url: file.url,
                  key: file.key,
                  mime_type: getMimeTypeFromFilename(file.filename),
                  size: file.size,
                  last_modified: file.last_modified,
                  etag: file.etag,
                };

                // Only update if:
                // 1. Field is empty, OR
                // 2. Current file exists and has same key (to refresh data)
                if (!currentFile || currentFile.key === file.key) {
                  // Update the field with the file data
                  Object.assign(updated, { [fieldKey]: fileData });
                }
              }
            });

            return updated;
          });
        }
      } catch (error) {
        console.error("Error fetching uploaded files:", error);
        // Don't show error toast as this is a background operation
      }
    };

    fetchUploadedFiles();
  }, []); // Only run once on mount

  // Save to localStorage whenever formData or currentStep changes
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          currentStep,
          formData,
        })
      );
    } catch (error) {
      console.error("Error saving data to localStorage:", error);
    }
  }, [formData, currentStep]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev: FormDataState) => ({ ...prev, [name]: value }));
  };

  const uploadFile = async (file: File, fieldName: string, existingKey?: string): Promise<FileData | null> => {
    try {
      if (existingKey) {
        return await DaftarService.updateFile(file, fieldName, existingKey);
      } else {
        return await DaftarService.uploadFile(file, fieldName);
      }
    } catch (error) {
      console.error("Upload error:", error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Upload failed");
    }
  };

  const handlePreview = (fileData: FileData) => {
    // Use direct URL from response for preview (not GET endpoint which returns JSON)
    setPreviewFile({
      url: fileData.url,
      filename: fileData.filename,
      mimeType: fileData.mime_type,
    });
  };

  const deleteFile = async (key: string): Promise<void> => {
    try {
      await DaftarService.deleteFile(key);
    } catch (error) {
      console.error("Delete error:", error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Delete failed");
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (!files || !files[0]) return;

    const file = files[0];
    const fieldName = name;
    const existingFile = formData[fieldName as keyof typeof formData] as FileData | null;

    // Set uploading state
    setUploadingFiles((prev) => new Set(prev).add(fieldName));

    try {
      // If there's an existing file, use PUT, otherwise POST
      // Pass fieldName as identifier for the file
      const fileData = await uploadFile(file, fieldName, existingFile?.key);

      if (fileData) {
        setFormData((prev: FormDataState) => ({ ...prev, [fieldName]: fileData }));
        toast.success(existingFile ? t("form.toast.file.update.success") : t("form.toast.file.upload.success"));
      }
    } catch (error) {
      const errorMessage = (error as { response?: { data?: { message?: string } } })?.response?.data?.message || (error instanceof Error ? error.message : t("form.toast.file.upload.error"));
      toast.error(errorMessage);
      // Reset input
      const input = document.getElementById(fieldName) as HTMLInputElement;
      if (input) input.value = "";
    } finally {
      setUploadingFiles((prev) => {
        const next = new Set(prev);
        next.delete(fieldName);
        return next;
      });
    }
  };

  const handleRemoveFile = async (fieldName: string) => {
    const fileData = formData[fieldName as keyof typeof formData] as FileData | null;

    if (!fileData) {
      setFormData((prev: FormDataState) => ({ ...prev, [fieldName]: null }));
      const input = document.getElementById(fieldName) as HTMLInputElement;
      if (input) input.value = "";
      return;
    }

    // Set uploading state
    setUploadingFiles((prev) => new Set(prev).add(fieldName));

    try {
      await deleteFile(fileData.key);
      setFormData((prev: FormDataState) => ({ ...prev, [fieldName]: null }));
      toast.success(t("form.toast.file.delete.success"));

      const input = document.getElementById(fieldName) as HTMLInputElement;
      if (input) input.value = "";
    } catch (error) {
      const errorMessage = (error as { response?: { data?: { message?: string } } })?.response?.data?.message || (error instanceof Error ? error.message : t("form.toast.file.delete.error"));
      toast.error(errorMessage);
    } finally {
      setUploadingFiles((prev) => {
        const next = new Set(prev);
        next.delete(fieldName);
        return next;
      });
    }
  };

  const handleNext = () => {
    const requiredFields = ["jalur_daftar", "nik", "tempat_lahir", "tanggal_lahir", "jenis_kelamin", "agama", "provinsi", "kabupaten", "kecamatan", "desa", "alamat_jalan"];

    const missingFields = requiredFields.filter((field) => !formData[field as keyof typeof formData]);

    if (missingFields.length > 0) {
      toast.error(t("form.toast.validation.required"));
      return;
    }

    if (!formData.scan_ktp_url || !formData.ijazah_s2_url) {
      toast.error(t("form.toast.validation.ktp.ijazah"));
      return;
    }

    // Check if any files are still uploading
    if (uploadingFiles.size > 0) {
      toast.error(t("form.toast.validation.upload.wait"));
      return;
    }

    setCurrentStep(2);
  };

  // Convert jenis_kelamin from form format to Prisma enum format
  const convertJenisKelaminToEnum = (value: string): string | null => {
    if (!value) return null;

    const mapping: Record<string, string> = {
      "Laki-laki": "LAKI_LAKI",
      Perempuan: "PEREMPUAN",
    };

    return mapping[value] || null;
  };

  const handleStep2Submit = async () => {
    // Check if any files are still uploading
    if (uploadingFiles.size > 0) {
      toast.error(t("form.toast.validation.upload.wait"));
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare data payload
      const payload = {
        scan_ktp_url: formData.scan_ktp_url,
        ijazah_s2_url: formData.ijazah_s2_url,
        jalur_daftar: formData.jalur_daftar,
        kewarganegaraan: formData.kewarganegaraan,
        nik: formData.nik,
        tempat_lahir: formData.tempat_lahir,
        tanggal_lahir: formData.tanggal_lahir,
        jenis_kelamin: convertJenisKelaminToEnum(formData.jenis_kelamin),
        agama: formData.agama,
        provinsi: formData.provinsi,
        kabupaten: formData.kabupaten,
        kecamatan: formData.kecamatan,
        desa: formData.desa,
        dusun: formData.dusun,
        alamat_jalan: formData.alamat_jalan,
        // Step 2 Fields
        akreditasi_banpt_url: formData.akreditasi_banpt_url,
        karya_ilmiah_url: formData.karya_ilmiah_url,
        rekomendasi_url: formData.rekomendasi_url,
        proposal_disertasi_url: formData.proposal_disertasi_url,
        toefl_url: formData.toefl_url,
        pas_foto_url: formData.pas_foto_url,
        scan_ijazah_sarjana_dan_magister_url: formData.scan_ijazah_sarjana_dan_magister_url,
        scan_nilai_sarjana_dan_magister_url: formData.scan_nilai_sarjana_dan_magister_url,
        tpa_bappenas_url: formData.tpa_bappenas_url,
        transkrip_doktor_pindahan_url: formData.transkrip_doktor_pindahan_url,
        surat_kesehatan_url: formData.surat_kesehatan_url,
        surat_izin_atasan_url: formData.surat_izin_atasan_url,
        cv_url: formData.cv_url,
      };

      // Send data to backend
      const response = await DaftarService.submitForm(payload);

      if (response.response) {
        toast.success(response.message || t("form.toast.submit.success"));
        setCurrentStep(3);
      } else {
        throw new Error(response.message || t("form.toast.submit.error"));
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      const errorMessage = (error as { response?: { data?: { message?: string } } })?.response?.data?.message || (error instanceof Error ? error.message : t("form.toast.submit.error"));
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePreviewKartu = async () => {
    setIsLoadingPreviewKartu(true);
    try {
      const { blob, contentType } = await DaftarService.getKartuPeserta();

      // Create blob URL dengan content-type yang benar untuk preview PDF
      const url = window.URL.createObjectURL(new Blob([blob], { type: contentType }));

      // Set preview URL untuk ditampilkan di modal
      setPreviewKartuUrl(url);
    } catch (error) {
      console.error("Error previewing kartu:", error);
      const errorMessage = (error as { response?: { data?: { message?: string } } })?.response?.data?.message || (error instanceof Error ? error.message : t("form.toast.kartu.preview.error"));
      toast.error(errorMessage);
    } finally {
      setIsLoadingPreviewKartu(false);
    }
  };

  const handleCetakKartu = async () => {
    setIsLoadingCetakKartu(true);
    try {
      const { blob, contentType } = await DaftarService.getKartuPeserta();

      // Create blob URL untuk download/print
      const url = window.URL.createObjectURL(blob);

      // Get extension from content type
      const extension = contentType.includes("pdf") ? "pdf" : contentType.includes("image") ? "png" : "pdf";

      // Create download link
      const link = document.createElement("a");
      link.href = url;
      link.download = `kartu-peserta.${extension}`;
      document.body.appendChild(link);
      link.click();

      // Cleanup
      document.body.removeChild(link);
      setTimeout(() => {
        window.URL.revokeObjectURL(url);
      }, 1000);

      toast.success(t("form.toast.kartu.download.success"));
    } catch (error) {
      console.error("Error downloading kartu:", error);
      const errorMessage = (error as { response?: { data?: { message?: string } } })?.response?.data?.message || (error instanceof Error ? error.message : t("form.toast.kartu.download.error"));
      toast.error(errorMessage);
    } finally {
      setIsLoadingCetakKartu(false);
    }
  };

  const renderFileField = (fieldName: string, label: string) => {
    const fileData = formData[fieldName as keyof typeof formData] as FileData | null;
    const isUploading = uploadingFiles.has(fieldName);
    const isImage = fileData?.mime_type.startsWith("image/");

    // Use direct URL from response for display (not GET endpoint which returns JSON metadata)
    const fileUrl = fileData?.url || "";

    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">{label}</label>

        <input type="file" name={fieldName} onChange={handleFileChange} accept="image/*,.pdf" className="hidden" id={fieldName} disabled={isUploading} />

        {isUploading ? (
          <div className="border-2 border-dashed border-[#207D96] rounded-xl text-center bg-blue-50/50 h-32 flex items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="w-8 h-8 text-[#207D96] animate-spin" />
              <span className="text-sm text-[#207D96] font-medium">{fileData ? t("form.button.updating") : t("form.button.uploading")}</span>
            </div>
          </div>
        ) : fileData ? (
          <div className="relative group rounded-xl overflow-hidden border border-gray-200 hover:border-[#207D96] transition-all bg-gray-50 h-32">
            <a href={fileUrl} target="_blank" rel="noreferrer" className="block h-full cursor-pointer">
              {isImage ? (
                <img
                  src={fileUrl}
                  alt={label}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    console.error("Image load error:", e);
                    // Fallback to direct URL if GET endpoint fails
                    if (fileData.url && fileData.url !== fileUrl) {
                      (e.target as HTMLImageElement).src = fileData.url;
                    }
                  }}
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full p-4">
                  <FileText className="w-8 h-8 text-[#207D96] mb-2" />
                  <span className="text-sm text-gray-700 font-medium text-center line-clamp-1">{fileData.filename}</span>
                  <span className="text-xs text-gray-400">{fileData.mime_type === "application/pdf" ? t("form.file.type.pdf") : fileData.mime_type}</span>
                </div>
              )}
            </a>

            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-[2px]">
              <button onClick={() => fileData && handlePreview(fileData)} className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors" title={t("form.button.preview")}>
                <Eye className="w-4 h-4" />
              </button>

              <label htmlFor={fieldName} className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors cursor-pointer" title={t("form.button.change.file")}>
                <RefreshCw className="w-4 h-4" />
              </label>

              <button onClick={() => handleRemoveFile(fieldName)} className="p-2 bg-red-500/80 hover:bg-red-500 text-white rounded-full transition-colors" title={t("form.button.remove")}>
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="border-2 border-dashed border-gray-300 rounded-xl hover:border-[#207D96] transition-colors text-center cursor-pointer bg-gray-50 hover:bg-blue-50/50 group h-32 flex items-center justify-center">
            <label htmlFor={fieldName} className="cursor-pointer flex flex-col items-center gap-2 w-full h-full justify-center">
              <Upload className="w-8 h-8 text-gray-400 group-hover:text-[#207D96] transition-colors" />
              <span className="text-sm text-gray-600 group-hover:text-[#207D96] transition-colors">{t("form.button.upload").replace("{label}", label)}</span>
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
            <span className="text-sm font-medium hidden md:block">{t("form.step.data.diri")}</span>
          </div>
          <div className={`flex-1 h-1 mx-2 md:mx-4 rounded-full ${currentStep >= 2 ? "bg-[#207D96]" : "bg-gray-200"}`} />

          {/* Step 2 */}
          <div className={`flex flex-col items-center ${currentStep >= 2 ? "text-[#207D96]" : "text-gray-400"}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${currentStep >= 2 ? "bg-[#207D96] text-white" : "bg-gray-200"}`}>
              <FileText className="w-5 h-5" />
            </div>
            <span className="text-sm font-medium hidden md:block">{t("form.step.berkas")}</span>
          </div>
          <div className={`flex-1 h-1 mx-2 md:mx-4 rounded-full ${currentStep >= 3 ? "bg-[#207D96]" : "bg-gray-200"}`} />

          {/* Step 3 */}
          <div className={`flex flex-col items-center ${currentStep >= 3 ? "text-[#207D96]" : "text-gray-400"}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${currentStep >= 3 ? "bg-[#207D96] text-white" : "bg-gray-200"}`}>
              <CreditCard className="w-5 h-5" />
            </div>
            <span className="text-sm font-medium hidden md:block">{t("form.step.cetak.kartu")}</span>
          </div>
          <div className={`flex-1 h-1 mx-2 md:mx-4 rounded-full ${currentStep >= 4 ? "bg-[#207D96]" : "bg-gray-200"}`} />

          {/* Step 4 */}
          <div className={`flex flex-col items-center ${currentStep >= 4 ? "text-[#207D96]" : "text-gray-400"}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${currentStep >= 4 ? "bg-[#207D96] text-white" : "bg-gray-200"}`}>
              <Info className="w-5 h-5" />
            </div>
            <span className="text-sm font-medium hidden md:block">{t("form.step.pengumuman")}</span>
          </div>
        </div>
      </div>

      <div className="p-6 md:p-8 overflow-hidden">
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6 max-w-4xl mx-auto">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <User className="text-[#207D96]" /> {t("form.step1.title")}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {renderFileField("scan_ktp_url", t("form.file.scan.ktp"))}
                {renderFileField("ijazah_s2_url", t("form.file.ijazah.s2"))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">{t("form.field.jalur.daftar")}</label>
                  <input
                    type="text"
                    name="jalur_daftar"
                    value={formData.jalur_daftar}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#207D96]/20 focus:border-[#207D96] outline-none transition-all"
                    placeholder={t("form.placeholder.jalur.daftar")}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">{t("form.field.kewarganegaraan")}</label>
                  <input
                    type="text"
                    name="kewarganegaraan"
                    value={formData.kewarganegaraan}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#207D96]/20 focus:border-[#207D96] outline-none transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">{t("form.field.nik")}</label>
                  <input
                    type="text"
                    name="nik"
                    maxLength={16}
                    value={formData.nik}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#207D96]/20 focus:border-[#207D96] outline-none transition-all"
                    placeholder={t("form.placeholder.nik")}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">{t("form.field.jenis.kelamin")}</label>
                  <select
                    name="jenis_kelamin"
                    value={formData.jenis_kelamin}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#207D96]/20 focus:border-[#207D96] outline-none transition-all"
                  >
                    <option value="">{t("form.select.jenis.kelamin")}</option>
                    <option value="Laki-laki">{t("form.select.jenis.kelamin.laki")}</option>
                    <option value="Perempuan">{t("form.select.jenis.kelamin.perempuan")}</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">{t("form.field.tempat.lahir")}</label>
                  <input
                    type="text"
                    name="tempat_lahir"
                    value={formData.tempat_lahir}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#207D96]/20 focus:border-[#207D96] outline-none transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">{t("form.field.tanggal.lahir")}</label>

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
                  <label className="text-sm font-medium text-gray-700">{t("form.field.agama")}</label>
                  <select
                    name="agama"
                    value={formData.agama}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#207D96]/20 focus:border-[#207D96] outline-none transition-all"
                  >
                    <option value="">{t("form.select.agama")}</option>
                    <option value="Islam">{t("form.select.agama.islam")}</option>
                    <option value="Kristen">{t("form.select.agama.kristen")}</option>
                    <option value="Katolik">{t("form.select.agama.katolik")}</option>
                    <option value="Hindu">{t("form.select.agama.hindu")}</option>
                    <option value="Buddha">{t("form.select.agama.buddha")}</option>
                    <option value="Konghucu">{t("form.select.agama.konghucu")}</option>
                    <option value="Lainnya">{t("form.select.agama.lainnya")}</option>
                  </select>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6 mt-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <MapPin className="text-[#207D96]" /> {t("form.address.title")}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">{t("form.field.provinsi")}</label>
                    <input
                      type="text"
                      name="provinsi"
                      value={formData.provinsi}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#207D96]/20 focus:border-[#207D96] outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">{t("form.field.kabupaten")}</label>
                    <input
                      type="text"
                      name="kabupaten"
                      value={formData.kabupaten}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#207D96]/20 focus:border-[#207D96] outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">{t("form.field.kecamatan")}</label>
                    <input
                      type="text"
                      name="kecamatan"
                      value={formData.kecamatan}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#207D96]/20 focus:border-[#207D96] outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">{t("form.field.desa")}</label>
                    <input
                      type="text"
                      name="desa"
                      value={formData.desa}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#207D96]/20 focus:border-[#207D96] outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">{t("form.field.dusun")}</label>
                    <input
                      type="text"
                      name="dusun"
                      value={formData.dusun}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#207D96]/20 focus:border-[#207D96] outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium text-gray-700">{t("form.field.alamat.jalan")}</label>
                    <input
                      type="text"
                      name="alamat_jalan"
                      value={formData.alamat_jalan}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#207D96]/20 focus:border-[#207D96] outline-none transition-all"
                      placeholder={t("form.placeholder.alamat.jalan")}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-6">
                <button onClick={handleNext} className="bg-gradient-to-r from-[#207D96] to-[#1B3F6E] text-white px-8 py-3 rounded-xl hover:shadow-lg transition-all font-semibold flex items-center gap-2">
                  {t("form.button.next.step2")} <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6 max-w-4xl mx-auto">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <FileText className="text-[#207D96]" /> {t("form.step2.title")}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { name: "akreditasi_banpt_url", label: t("form.file.akreditasi.banpt") },
                  { name: "karya_ilmiah_url", label: t("form.file.karya.ilmiah") },
                  { name: "rekomendasi_url", label: t("form.file.rekomendasi") },
                  { name: "proposal_disertasi_url", label: t("form.file.proposal.disertasi") },
                  { name: "toefl_url", label: t("form.file.toefl") },
                  { name: "pas_foto_url", label: t("form.file.pas.foto") },
                  { name: "scan_ijazah_sarjana_dan_magister_url", label: t("form.file.scan.ijazah.s1.s2") },
                  { name: "scan_nilai_sarjana_dan_magister_url", label: t("form.file.scan.nilai.s1.s2") },
                  { name: "tpa_bappenas_url", label: t("form.file.tpa.bappenas") },
                  { name: "transkrip_doktor_pindahan_url", label: t("form.file.transkrip.doktor.pindahan") },
                  { name: "surat_kesehatan_url", label: t("form.file.surat.kesehatan") },
                  { name: "surat_izin_atasan_url", label: t("form.file.surat.izin.atasan") },
                  { name: "cv_url", label: t("form.file.cv") },
                ].map((field) => (
                  <div key={field.name}>{renderFileField(field.name, field.label)}</div>
                ))}
              </div>

              <div className="flex justify-between pt-6 border-t border-gray-200 mt-6">
                <button onClick={() => setCurrentStep(1)} className="text-gray-500 hover:text-[#207D96] font-medium transition-colors">
                  {t("form.button.back.step1")}
                </button>
                <button
                  onClick={handleStep2Submit}
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-[#207D96] to-[#1B3F6E] text-white px-8 py-3 rounded-xl hover:shadow-lg transition-all font-semibold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {t("form.button.saving")}
                    </>
                  ) : (
                    <>
                      {t("form.button.save.next")} <ChevronRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6 max-w-4xl mx-auto">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <CreditCard className="text-[#207D96]" /> {t("form.step3.title")}
              </h3>

              <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center space-y-6 shadow-sm">
                <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CreditCard className="w-12 h-12 text-[#207D96]" />
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-gray-800 mb-2">{t("form.step3.success.title")}</h4>
                  <p className="text-gray-600 max-w-md mx-auto">{t("form.step3.success.message")}</p>
                </div>

                <div className="flex justify-center gap-4">
                  <button
                    onClick={handlePreviewKartu}
                    disabled={isLoadingPreviewKartu || isLoadingCetakKartu}
                    className="bg-white border-2 border-[#207D96] text-[#207D96] px-8 py-3 rounded-xl hover:bg-blue-50 transition-all font-semibold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoadingPreviewKartu ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        {t("form.button.loading")}
                      </>
                    ) : (
                      t("form.button.preview.kartu")
                    )}
                  </button>
                  <button
                    onClick={handleCetakKartu}
                    disabled={isLoadingPreviewKartu || isLoadingCetakKartu}
                    className="bg-gradient-to-r from-[#207D96] to-[#1B3F6E] text-white px-8 py-3 rounded-xl hover:shadow-lg transition-all font-semibold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoadingCetakKartu ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        {t("form.button.loading")}
                      </>
                    ) : (
                      <>
                        <CreditCard className="w-4 h-4" /> {t("form.button.cetak.kartu")}
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="flex justify-end pt-6">
                <button onClick={() => setCurrentStep(4)} className="bg-gradient-to-r from-[#207D96] to-[#1B3F6E] text-white px-8 py-3 rounded-xl hover:shadow-lg transition-all font-semibold flex items-center gap-2">
                  {t("form.button.next.announcement")} <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {currentStep === 4 && (
            <motion.div key="step4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6 max-w-4xl mx-auto">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Info className="text-[#207D96]" /> {t("form.step4.title")}
              </h3>

              <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center space-y-6 shadow-sm">
                <div className="w-24 h-24 bg-yellow-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Info className="w-12 h-12 text-yellow-600" />
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-gray-800 mb-2">{t("form.step4.waiting.title")}</h4>
                  <p className="text-gray-600 max-w-md mx-auto">{t("form.step4.waiting.message")}</p>
                </div>

                <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-4 max-w-lg mx-auto text-left flex gap-4">
                  <div className="shrink-0">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-800">{t("form.step4.schedule.title")}</h5>
                    <p className="text-sm text-gray-600 mt-1" dangerouslySetInnerHTML={{ __html: t("form.step4.schedule.message") }} />
                  </div>
                </div>
              </div>

              <div className="flex justify-start pt-6">
                <button onClick={() => setCurrentStep(3)} className="text-gray-500 hover:text-[#207D96] font-medium transition-colors">
                  {t("form.button.back.kartu")}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Preview Kartu Modal */}
      {previewKartuUrl && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => {
            setPreviewKartuUrl(null);
            // Cleanup URL saat modal ditutup
            if (previewKartuUrl) {
              window.URL.revokeObjectURL(previewKartuUrl);
            }
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <CreditCard className="w-5 h-5 text-[#207D96]" />
                <h3 className="text-lg font-semibold text-gray-800">{t("form.modal.kartu.title")}</h3>
              </div>
              <div className="flex items-center gap-2">
                <a href={previewKartuUrl} target="_blank" rel="noreferrer" className="px-4 py-2 text-sm font-medium text-[#207D96] hover:bg-blue-50 rounded-lg transition-colors">
                  {t("form.modal.kartu.open.new.tab")}
                </a>
                <button
                  onClick={() => {
                    setPreviewKartuUrl(null);
                    if (previewKartuUrl) {
                      window.URL.revokeObjectURL(previewKartuUrl);
                    }
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  title={t("form.modal.kartu.close")}
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Modal Content - PDF Preview */}
            <div className="flex-1 overflow-hidden">
              <iframe src={previewKartuUrl} className="w-full h-full border-0" title="Kartu Peserta Ujian" style={{ minHeight: "600px" }} />
            </div>
          </motion.div>
        </div>
      )}

      {/* Preview File Modal */}
      {previewFile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" onClick={() => setPreviewFile(null)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-[#207D96]" />
                <h3 className="text-lg font-semibold text-gray-800">{previewFile.filename}</h3>
              </div>
              <div className="flex items-center gap-2">
                <a href={previewFile.url} target="_blank" rel="noreferrer" className="px-4 py-2 text-sm font-medium text-[#207D96] hover:bg-blue-50 rounded-lg transition-colors">
                  {t("form.modal.file.open.new.tab")}
                </a>
                <button onClick={() => setPreviewFile(null)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title={t("form.modal.file.close")}>
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto overflow-x-auto min-h-0">
              {previewFile.mimeType === "application/pdf" ? (
                <iframe src={previewFile.url} className="w-full h-full border-0" title={previewFile.filename} style={{ minHeight: "600px" }} />
              ) : previewFile.mimeType.startsWith("image/") ? (
                <div className="flex items-center justify-center min-h-full p-4">
                  <img src={previewFile.url} alt={previewFile.filename} className="max-w-full max-h-full object-contain" />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center min-h-full p-8">
                  <FileText className="w-16 h-16 text-gray-400 mb-4" />
                  <p className="text-gray-600 mb-4">{t("form.modal.file.preview.unavailable")}</p>
                  <a href={previewFile.url} target="_blank" rel="noreferrer" className="px-6 py-2 bg-[#207D96] text-white rounded-lg hover:bg-[#1B3F6E] transition-colors">
                    {t("form.modal.file.download")}
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default StudentRegistrationForm;
