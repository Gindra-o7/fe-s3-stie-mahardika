import { ChevronRight, User, Mail, Phone, X, ChevronLeft, CreditCard, CheckCircle, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRegisterMutation } from "@/hooks/use-register";
import { toast } from "sonner";

export const ModalRegisOnline = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  const [paymentUrl, setPaymentUrl] = useState<string | null>(() => {
    return localStorage.getItem("pmb_payment_url");
  });

  useEffect(() => {
    if (paymentUrl) {
      localStorage.setItem("pmb_payment_url", paymentUrl);
    } else {
      localStorage.removeItem("pmb_payment_url");
    }
  }, [paymentUrl]);

  const { mutateAsync: register, isPending } = useRegisterMutation();

  const totalSteps = 2;

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = t("validation.fullname.required");
    }

    if (!formData.email.trim()) {
      newErrors.email = t("validation.email.required");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t("validation.email.invalid");
    }

    if (!formData.phone.trim()) {
      newErrors.phone = t("validation.phone.required");
    } else if (!/^08[0-9]{8,11}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must start with '08' and contain 10-13 digits.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setErrors({});
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handlePay = async () => {
    if (currentStep === 2) {
      try {
        const result = await register({
          nama: formData.fullName,
          email: formData.email,
          no_wa: formData.phone,
        });

        if (result.response) {
          toast.success(result.message);
          setPaymentUrl(result.data.redirect_url);
        } else {
          toast.error(result.message || "Registration failed");
        }
      } catch (error: any) {
        toast.error(error.response?.data?.message || "An error occurred during registration");
        console.error("Registration error:", error);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleClose = () => {
    // Don't clear paymentUrl here to allow persistence
    if (!paymentUrl) {
      setCurrentStep(1);
      setErrors({});
    }
    onClose();
  };

  const handleResetPayment = () => {
    setPaymentUrl(null);
    setCurrentStep(1);
    setErrors({});
  };

  if (!isOpen) return null;

  const stepVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  return createPortal(
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

        <motion.h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center text-gray-800 mb-3 sm:mb-4">{t("modal.registration.title")}</motion.h2>

        {paymentUrl ? (
          <div className="flex flex-col h-full items-center justify-center p-6 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>

            <h3 className="text-2xl font-bold text-gray-800 mb-2">Registration Successful!</h3>
            <p className="text-gray-600 mb-8 max-w-md">
              Your registration data has been saved. Please complete the payment to finalize your registration.
            </p>

            <div className="flex flex-col gap-4 w-full max-w-xs">
              <a
                href={paymentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-[#207D96] to-[#1B3F6E] text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all font-semibold flex items-center justify-center gap-2"
              >
                Pay Now <ExternalLink className="w-4 h-4" />
              </a>

              <button
                onClick={handleResetPayment}
                className="text-gray-500 hover:text-red-500 text-sm font-medium transition-colors"
              >
                Cancel & Restart
              </button>
            </div>

            <p className="text-xs text-gray-400 mt-8">
              The payment page will open in a new tab.
            </p>
          </div>
        ) : (
          <>
            <div className="w-full mb-4 sm:mb-6 lg:mb-8">
              <p className="text-center text-gray-500 text-sm sm:text-base">
                {t("modal.registration.step")} {currentStep} {t("modal.registration.of")} {totalSteps}
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
                          <User className="h-4 w-4 sm:h-5 sm:w-5 text-[#207D96]" /> {t("modal.registration.personal.info")}
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
                                placeholder={t("modal.registration.fullname.placeholder")}
                                className={`w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 border rounded-lg sm:rounded-xl focus:border-[#207D96] focus:ring-2 focus:ring-[#207D96]/20 outline-none transition-colors text-sm sm:text-base ${errors.fullName ? "border-red-500" : "border-gray-300"
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
                                placeholder={t("modal.registration.email.placeholder")}
                                className={`w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 border rounded-lg sm:rounded-xl focus:border-[#207D96] focus:ring-2 focus:ring-[#207D96]/20 outline-none transition-colors text-sm sm:text-base ${errors.email ? "border-red-500" : "border-gray-300"
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
                                placeholder={t("modal.registration.phone.placeholder")}
                                className={`w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 border rounded-lg sm:rounded-xl focus:border-[#207D96] focus:ring-2 focus:ring-[#207D96]/20 outline-none transition-colors text-sm sm:text-base ${errors.phone ? "border-red-500" : "border-gray-300"
                                  }`}
                              />
                            </div>
                            {errors.phone && <p className="text-red-500 text-xs sm:text-sm mt-1 ml-1">{errors.phone}</p>}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {currentStep === 2 && (
                    <motion.div key="step2" variants={stepVariants} initial="hidden" animate="visible" exit="exit" transition={{ duration: 0.3 }}>
                      <div className="bg-gradient-to-br from-gray-50 to-[#207D96]/5 p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl text-center">
                        <div className="mb-6 flex justify-center">
                          <div className="p-4 bg-white rounded-full shadow-lg">
                            <CreditCard className="h-12 w-12 text-[#207D96]" />
                          </div>
                        </div>

                        <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
                          {t("modal.registration.payment.info")}
                        </h3>

                        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-6">
                          <p className="text-gray-600 mb-2">{t("modal.registration.fee")}</p>
                          <p className="text-3xl font-bold text-[#207D96] mb-4">IDR 1,500,000</p>
                          <div className="h-px bg-gray-100 my-4" />
                          <p className="text-gray-600 text-sm leading-relaxed">
                            {t("modal.registration.payment.desc.prefix")} <span className="font-semibold text-gray-800">{formData.email}</span>{t("modal.registration.payment.desc.suffix")}
                          </p>
                        </div>

                        <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>{t("modal.registration.secure")}</span>
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
                  {t("modal.registration.back")}
                </motion.button>

                {currentStep < totalSteps ? (
                  <motion.button
                    type="button"
                    onClick={handleNext}
                    className="bg-gradient-to-r from-[#207D96] to-[#1B3F6E] text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl hover:shadow-lg hover:shadow-[#207D96]/50 font-semibold transition-all flex items-center justify-center gap-2 text-sm sm:text-base order-1 sm:order-2"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {t("modal.registration.next")}
                    <ChevronRight className="w-4 h-4" />
                  </motion.button>
                ) : (
                  <motion.button
                    type="button"
                    onClick={handlePay}
                    disabled={isPending}
                    className="bg-gradient-to-r from-[#207D96] to-[#1B3F6E] text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl hover:shadow-lg hover:shadow-[#207D96]/50 font-semibold transition-all flex items-center justify-center gap-2 text-sm sm:text-base order-1 sm:order-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isPending ? t("modal.registration.processing") : t("modal.registration.pay.now")}
                    <CreditCard className="w-4 h-4 sm:w-5 sm:h-5" />
                  </motion.button>
                )}
              </div>
            </form>
          </>
        )}
      </motion.div>
    </div>,
    document.body
  );
};
