import { useState, useEffect, useRef, FormEvent } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { Lock, Eye, EyeOff, ArrowLeft, ArrowRight, GraduationCap, CheckCircle } from "lucide-react";
import Logo from "@/assets/Logo_Mahardhika.png";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSelector from "@/components/ui/language-selector";

interface MousePosition {
  x: number;
  y: number;
}

interface Particle {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  opacity: number;
}

export default function ResetPasswordPage() {
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [mousePos, setMousePos] = useState<MousePosition>({ x: 0, y: 0 });
  const [loading, setLoading] = useState(false);
  const [passwordReset, setPasswordReset] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [tokenError, setTokenError] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get token from URL query parameter
    const tokenParam = searchParams.get("token");
    const errorParam = searchParams.get("error");

    if (errorParam === "INVALID_TOKEN") {
      setTokenError(t("resetPassword.invalidToken.message"));
    } else if (tokenParam) {
      setToken(tokenParam);
    } else {
      setTokenError(t("resetPassword.invalidToken.noToken"));
    }
  }, [searchParams, t]);

  useEffect(() => {
    const handleMouseMove = (e: globalThis.MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Particle[] = [];
    const particleCount = 80;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        vx: Math.random() * 0.5 - 0.25,
        vy: Math.random() * 0.5 - 0.25,
        opacity: Math.random() * 0.5 + 0.3,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139, 92, 246, ${p.opacity})`;
        ctx.fill();

        particles.forEach((p2, j) => {
          if (i === j) return;
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(167, 139, 250, ${0.15 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const validatePassword = (): boolean => {
    if (password.length < 8) {
      toast.error(t("resetPassword.toast.passwordTooShort"));
      return false;
    }
    if (password !== confirmPassword) {
      toast.error(t("resetPassword.toast.passwordMismatch"));
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validatePassword()) {
      return;
    }

    if (!token) {
      toast.error(t("resetPassword.toast.invalidToken"));
      return;
    }

    setLoading(true);

    try {
      await authClient.resetPassword(
        {
          newPassword: password,
          token,
        },
        {
          onRequest: () => {
            toast.loading(t("resetPassword.toast.resetting"));
          },
          onSuccess: () => {
            toast.dismiss();
            toast.success(t("resetPassword.toast.success"));
            setPasswordReset(true);
            setLoading(false);

            // Redirect to login after 3 seconds
            setTimeout(() => {
              navigate("/login");
            }, 3000);
          },
          onError: (ctx: { error: { message: string } }) => {
            toast.dismiss();
            toast.error(ctx.error.message || t("resetPassword.toast.error"));
            setLoading(false);
          },
        }
      );
    } catch {
      toast.dismiss();
      toast.error(t("resetPassword.toast.errorGeneric"));
      setLoading(false);
    }
  };

  if (tokenError) {
    return (
      <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-gray-100 via-slate-200 to-gray-50">
        <canvas ref={canvasRef} className="absolute inset-0 z-0" />
        <div className="relative z-10 flex min-h-screen items-center justify-center p-4">
          <div className="w-full max-w-md">
            <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-red-100 flex items-center justify-center mb-4">
                <Lock className="w-8 h-8 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{t("resetPassword.invalidToken.title")}</h2>
              <p className="text-gray-600 mb-6">{tokenError}</p>
              <button
                onClick={() => navigate("/forgot-password")}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{t("resetPassword.invalidToken.requestNew")}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-gray-100 via-slate-200 to-gray-50">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      <div
        className="absolute w-96 h-96 rounded-full blur-3xl opacity-20 bg-gradient-to-r from-cyan-400 to-blue-400 animate-pulse"
        style={{
          top: "10%",
          left: "15%",
          animation: "float 8s ease-in-out infinite",
        }}
      />
      <div
        className="absolute w-80 h-80 rounded-full blur-3xl opacity-15 bg-gradient-to-r from-blue-500 to-cyan-500"
        style={{
          bottom: "15%",
          right: "10%",
          animation: "float 10s ease-in-out infinite reverse",
        }}
      />

      <div
        className="absolute w-64 h-64 rounded-full blur-3xl opacity-10 bg-cyan-400 pointer-events-none transition-all duration-300"
        style={{
          left: mousePos.x - 128,
          top: mousePos.y - 128,
        }}
      />

      {/* Header with Language Selector */}
      <div className="fixed z-20 top-4 right-4">
        <div className="bg-white/80 backdrop-blur-sm rounded-lg border border-gray-200">
          <LanguageSelector />
        </div>
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
          <div className="hidden lg:flex flex-col space-y-6 text-gray-800">
            <div className="flex items-center space-x-3">
              <img src={Logo} alt="Logo" className="h-24 w-auto object-contain" />
            </div>

            <h1 className="text-6xl font-bold leading-tight bg-gradient-to-r from-gray-800 via-cyan-600 to-blue-600 bg-clip-text text-transparent">{t("resetPassword.title")}</h1>

            <p className="text-xl text-gray-600 font-light max-w-md">{t("resetPassword.description")}</p>

            <div className="flex items-center space-x-2 text-cyan-700">
              <GraduationCap className="w-5 h-5" />
              <span className="text-sm">{t("resetPassword.accreditation")}</span>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full blur-3xl opacity-20 animate-pulse" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full blur-2xl opacity-20" />

            <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 blur-2xl -z-10" />

              {!passwordReset ? (
                <>
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-2">
                      <h2 className="text-3xl font-bold text-gray-800">{t("resetPassword.signin.title")}</h2>
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                        <Lock className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm">{t("resetPassword.signin.subtitle")}</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative group">
                      <label className="block text-sm font-medium text-gray-700 mb-2">{t("resetPassword.newPassword.label")}</label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-cyan-600 transition-colors" />
                        <input
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full pl-12 pr-12 py-4 bg-white border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:bg-white transition-all"
                          placeholder={t("resetPassword.newPassword.placeholder")}
                          required
                          minLength={8}
                        />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-cyan-600 transition-colors">
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                      <div className="absolute inset-0 rounded-xl bg-cyan-500/0 group-focus-within:bg-cyan-500/5 blur-xl transition-all -z-10" />
                      <p className="text-xs text-gray-500 mt-1">{t("resetPassword.password.minLength")}</p>
                    </div>

                    <div className="relative group">
                      <label className="block text-sm font-medium text-gray-700 mb-2">{t("resetPassword.confirmPassword.label")}</label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-cyan-600 transition-colors" />
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="w-full pl-12 pr-12 py-4 bg-white border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:bg-white transition-all"
                          placeholder={t("resetPassword.confirmPassword.placeholder")}
                          required
                          minLength={8}
                        />
                        <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-cyan-600 transition-colors">
                          {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                      <div className="absolute inset-0 rounded-xl bg-cyan-500/0 group-focus-within:bg-cyan-500/5 blur-xl transition-all -z-10" />
                    </div>

                    <button
                      type="submit"
                      disabled={loading || !token}
                      className="relative w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold overflow-hidden group hover:shadow-lg hover:shadow-cyan-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="relative z-10 flex items-center justify-center space-x-2">
                        <span>{t("resetPassword.reset.button")}</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  </form>

                  <button onClick={() => navigate("/login")} className="mt-6 w-full flex items-center justify-center gap-2 text-gray-600 hover:text-cyan-600 transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    <span>{t("resetPassword.back.to.login")}</span>
                  </button>
                </>
              ) : (
                <div className="text-center space-y-6">
                  <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                    <CheckCircle className="w-10 h-10 text-white" />
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">{t("resetPassword.success.title")}</h2>
                    <p className="text-gray-600">{t("resetPassword.success.message")}</p>
                  </div>

                  <button
                    onClick={() => navigate("/login")}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all flex items-center justify-center gap-2"
                  >
                    <ArrowRight className="w-4 h-4" />
                    <span>{t("resetPassword.success.goToLogin")}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) translateX(0px);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(-10px) translateX(-10px);
          }
          75% {
            transform: translateY(-30px) translateX(5px);
          }
        }
      `}</style>
    </div>
  );
}
