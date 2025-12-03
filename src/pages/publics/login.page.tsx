import { useState, useEffect, useRef, FormEvent, MouseEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { Eye, EyeOff, Mail, Lock, ArrowRight, GraduationCap, ArrowLeft } from "lucide-react";
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

export default function FuturisticLogin() {
  const { t } = useLanguage();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [mousePos, setMousePos] = useState<MousePosition>({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rememberMe, setRememberMe] = useState(false);

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

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await authClient.signIn.email(
      {
        email,
        password,
        rememberMe: rememberMe,
        callbackURL: `/mahasiswa`,
      },
      {
        onRequest: () => {
          toast.loading("Signing in...");
        },
        onSuccess: () => {
          toast.dismiss();
          toast.success("Login successful");
          navigate("/");
        },
        onError: (ctx) => {
          toast.dismiss();
          toast.error(ctx.error.message);
          setLoading(false);
        },
      }
    );
  };

  const toggleShowPassword = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowPassword((prev) => !prev);
  };

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

            <h1 className="text-6xl font-bold leading-tight bg-gradient-to-r from-gray-800 via-cyan-600 to-blue-600 bg-clip-text text-transparent">{t("login.title")}</h1>

            <p className="text-xl text-gray-600 font-light max-w-md">{t("login.description")}</p>

            <div className="flex items-center space-x-2 text-cyan-700">
              <GraduationCap className="w-5 h-5" />
              <span className="text-sm">{t("login.accreditation")}</span>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full blur-3xl opacity-20 animate-pulse" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full blur-2xl opacity-20" />

            <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 blur-2xl -z-10" />

              {/* Back to Home Button */}
              <Link to="/" className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-lg bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-700 hover:bg-white hover:shadow-md transition-all duration-200 group">
                <ArrowLeft className="w-4 h-4 group-hover:text-[#207D96] transition-colors" />
                <span className="text-sm font-medium group-hover:text-[#207D96] transition-colors">{t("login.back.to.home")}</span>
              </Link>

              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-3xl font-bold text-gray-800">{t("login.signin.title")}</h2>
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                    <Lock className="w-6 h-6 text-white" />
                  </div>
                </div>
                <p className="text-gray-600 text-sm">{t("login.signin.subtitle")}</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t("login.email.label")}</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-cyan-600 transition-colors" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:bg-white transition-all"
                      placeholder={t("login.email.placeholder")}
                      required
                    />
                  </div>
                  <div className="absolute inset-0 rounded-xl bg-cyan-500/0 group-focus-within:bg-cyan-500/5 blur-xl transition-all -z-10" />
                </div>

                <div className="relative group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t("login.password.label")}</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-cyan-600 transition-colors" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-12 pr-12 py-4 bg-white border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:bg-white transition-all"
                      placeholder={t("login.password.placeholder")}
                      required
                    />
                    <button type="button" onClick={toggleShowPassword} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-cyan-600 transition-colors">
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  <div className="absolute inset-0 rounded-xl bg-cyan-500/0 group-focus-within:bg-cyan-500/5 blur-xl transition-all -z-10" />
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center space-x-2 cursor-pointer group">
                    <input
                      id="remember"
                      onChange={(e) => setRememberMe(e.target.checked)}
                      checked={rememberMe}
                      type="checkbox"
                      className="w-4 h-4 rounded border-gray-300 bg-white checked:bg-cyan-500 focus:ring-cyan-500 focus:ring-offset-0"
                    />
                    <span className="text-gray-600 group-hover:text-gray-800 transition-colors">{t("login.remember")}</span>
                  </label>
                  <Link to="/forgot-password" className="text-cyan-600 hover:text-cyan-700 transition-colors">
                    {t("login.forgot")}
                  </Link>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="relative w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold overflow-hidden group hover:shadow-lg hover:shadow-cyan-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="relative z-10 flex items-center justify-center space-x-2">
                    <span>{t("login.signin.button")}</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </form>

              <p className="mt-8 text-center text-sm text-gray-600">
                {t("login.no.account")}{" "}
                <a href="#" className="text-cyan-600 hover:text-cyan-700 font-medium transition-colors">
                  {t("login.create.account")}
                </a>
              </p>
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
