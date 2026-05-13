"use client";
 
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuthStore } from "@/zustand/useAuth";
import { Heart, Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";
 
type LoginFormValues = {
  email: string;
  password: string;
};
 
const loginSchema = yup.object({
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});
 
const Login = () => {
  const router = useRouter();
  const { loading, loginUser, error } = useAuthStore();
  const [showPassword, setShowPassword] = React.useState(false);
 
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });
 
  const onSubmit = async (data: LoginFormValues) => {
    try {
      const response = await loginUser(data);
      if (response.success) {
        const userRole = useAuthStore.getState().role;
        if (userRole === "doctor") {
          router.push("/doctor/dashboard");
        } else if (userRole === "admin") {
          router.push("/admin/dashboard");
        } else {
          router.push("/");
        }
      } else {
        console.error(response.message);
      }
    } catch (error) {
      console.log("Login error:", error);
    }
  };
 
  return (
    <div className="min-h-screen grid md:grid-cols-2 font-sans">
 
      {/* ── LEFT PANEL ─────────────────────────────────────────────────── */}
      <div className="hidden md:flex flex-col justify-between bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 relative overflow-hidden p-12">
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/10 rounded-full blur-2xl" />
        {/* Dot grid */}
        <div className="absolute top-10 right-10 opacity-10 grid grid-cols-8 gap-2">
          {[...Array(64)].map((_, i) => (
            <div key={i} className="w-1 h-1 rounded-full bg-white" />
          ))}
        </div>
        {/* Abstract lines */}
        <svg className="absolute right-0 bottom-0 opacity-10 h-64" viewBox="0 0 200 300" preserveAspectRatio="none">
          <path d="M200,0 Q100,150 200,300" stroke="#22d3ee" strokeWidth="1.5" fill="none" />
          <path d="M200,30 Q80,160 200,270" stroke="#22d3ee" strokeWidth="1" fill="none" />
        </svg>
 
        {/* Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500 flex items-center justify-center shadow-lg shadow-cyan-500/30">
            <Heart className="w-5 h-5 text-white fill-white" />
          </div>
          <div>
            <p className="text-white font-bold text-xl leading-none">Maxcare</p>
            <p className="text-cyan-300 text-xs leading-none mt-0.5">Medical Care</p>
          </div>
        </div>
 
        {/* Center content */}
        <div className="relative z-10 space-y-6">
          <div className="space-y-3">
            <h2 className="text-4xl font-bold text-white leading-tight">
              Welcome Back to<br />
              <span className="text-cyan-400">Maxcare Portal</span>
            </h2>
            <p className="text-blue-200 text-sm leading-relaxed max-w-xs">
              Sign in to access your dashboard, manage appointments, and deliver world-class healthcare.
            </p>
          </div>
 
          {/* Stats row */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { value: "780K+", label: "Patients" },
              { value: "250+", label: "Doctors" },
              { value: "20+", label: "Years" },
            ].map((s) => (
              <div key={s.label} className="bg-white/10 rounded-xl p-3 text-center backdrop-blur-sm border border-white/10">
                <p className="text-cyan-300 font-extrabold text-lg leading-none">{s.value}</p>
                <p className="text-blue-200 text-xs mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
 
        {/* Bottom */}
        <p className="relative z-10 text-blue-400 text-xs">
          © 2025 Maxcare. All rights reserved.
        </p>
      </div>
 
      {/* ── RIGHT PANEL ────────────────────────────────────────────────── */}
      <div className="flex flex-col justify-center items-center px-6 py-12 bg-gray-50">
        <div className="w-full max-w-sm space-y-8">
 
          {/* Mobile logo */}
          <div className="flex md:hidden items-center gap-3 justify-center">
            <div className="w-9 h-9 rounded-xl bg-cyan-500 flex items-center justify-center">
              <Heart className="w-4 h-4 text-white fill-white" />
            </div>
            <p className="text-blue-900 font-bold text-xl">Maxcare</p>
          </div>
 
          {/* Heading */}
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-blue-900">Sign in to your account</h1>
            <p className="text-gray-400 text-sm">Enter your credentials to continue</p>
          </div>
 
          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
 
            {/* Email */}
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  {...register("email")}
                  className={`pl-10 h-12 rounded-xl border-gray-200 bg-white text-sm focus:border-cyan-400 focus:ring-cyan-400/20 transition-all
                    ${errors.email ? "border-red-300 focus:border-red-400" : ""}`}
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-500 flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-red-500 shrink-0" />
                  {errors.email.message}
                </p>
              )}
            </div>
 
            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  Password
                </Label>
                {/* <button
                  type="button"
                  className="text-xs text-cyan-500 hover:text-cyan-600 font-medium transition-colors"
                >
                  Forgot password?
                </button> */}
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("password")}
                  className={`pl-10 pr-10 h-12 rounded-xl border-gray-200 bg-white text-sm focus:border-cyan-400 focus:ring-cyan-400/20 transition-all
                    ${errors.password ? "border-red-300 focus:border-red-400" : ""}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-500 flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-red-500 shrink-0" />
                  {errors.password.message}
                </p>
              )}
            </div>
 
            {/* Server error */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                <p className="text-xs text-red-600 font-medium">{error}</p>
              </div>
            )}
 
            {/* Submit */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-200 transition-all disabled:opacity-60"
            >
              {loading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="3" strokeOpacity="0.3" />
                    <path d="M12 2a10 10 0 0 1 10 10" stroke="white" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </form>
 
          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400">or</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>
 
          {/* Register */}
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/signup")}
            className="w-full h-12 rounded-xl border-gray-200 text-blue-900 font-semibold text-sm hover:bg-blue-50 hover:border-blue-200 transition-all"
          >
            Create a new account
          </Button>
 
          {/* Footer */}
          <p className="text-center text-xs text-gray-400">
            By signing in you agree to our{" "}
            <a href="#" className="text-cyan-500 hover:underline">Terms of Service</a>
            {" "}and{" "}
            <a href="#" className="text-cyan-500 hover:underline">Privacy Policy</a>
          </p>
        </div>
      </div>
 
    </div>
  );
};
 
export default Login;