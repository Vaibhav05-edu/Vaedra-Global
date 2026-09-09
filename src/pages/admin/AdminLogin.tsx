import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, Mail, Eye, EyeOff, ShieldCheck, ArrowLeft } from "lucide-react";
import logo from "@/assets/logo.webp";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || "/admin";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      toast.error("Please enter both email and password.");
      return;
    }

    setLoading(true);
    try {
      const result = await login(email, password);
      if (result.success) {
        toast.success("Welcome back! Redirecting to dashboard...");
        navigate(from, { replace: true });
      } else {
        toast.error(result.error || "Invalid email or password. Please try again.");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Authentication error";
      toast.error("Login failed: " + msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[hsl(0,0%,5%)] text-foreground flex flex-col justify-center items-center px-4 relative overflow-hidden">
      {/* Background glow accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-highlight/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Back to site link */}
      <div className="absolute top-6 left-6 sm:top-8 sm:left-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-body"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Website
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Logo and Brand */}
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="flex items-center gap-3 mb-3">
            <img src={logo} alt="Vaedra Global" className="w-10 h-10 object-contain" />
            <span className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-wider text-foreground">
              Vaedra Global
            </span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/15 border border-primary/30 text-primary text-xs font-mono uppercase tracking-widest">
            <ShieldCheck className="w-3.5 h-3.5" />
            Admin Portal
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-card border border-border/80 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-md relative">
          <h1 className="font-display text-2xl font-bold uppercase text-foreground mb-1">
            Sign In
          </h1>
          <p className="font-body text-sm text-muted-foreground mb-6">
            Enter your credentials to access the agency control center.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase text-muted-foreground mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
                <Input
                  type="email"
                  placeholder="admin@vaedra.global"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-background/60 border-border text-foreground placeholder:text-muted-foreground/50 focus-visible:ring-primary h-11"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-muted-foreground mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 bg-background/60 border-border text-foreground placeholder:text-muted-foreground/50 focus-visible:ring-primary h-11"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full font-display uppercase tracking-wider text-base py-5 mt-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              {loading ? "Authenticating..." : "Access Dashboard"}
            </Button>

            <div className="pt-2 border-t border-border/40 text-center">
              <p className="text-[11px] text-muted-foreground font-mono">
                Admin: <span className="text-primary font-semibold">admin@vaedra.global</span> / Password: <span className="text-primary font-semibold">vaedra2026</span>
              </p>
            </div>
          </form>
        </div>

        <p className="text-center text-xs text-muted-foreground/60 mt-6 font-mono">
          © {new Date().getFullYear()} Vaedra Global. All administrative rights reserved.
        </p>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
