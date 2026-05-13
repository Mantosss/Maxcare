"use client";
 
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuthStore } from '@/zustand/useAuth';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import {
  Heart, Mail, Lock, User, ArrowRight,
  Eye, EyeOff, Stethoscope, UserRound, Phone, MapPin, Briefcase,
} from "lucide-react";
 
// ── Types ──────────────────────────────────────────────────────────────────
type PatientFormValues = {
  name: string;
  email: string;
  password: string;
  // phone: string;
  // specialization: string;
};
 
type DoctorFormValues = {
  name: string;
  email: string;
  password: string;
  // phone: string;
  // specialization: string;
  // licenseNumber: string;
};
 
// ── Schemas ────────────────────────────────────────────────────────────────
const patientSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Min 6 characters").required("Password is required"),
  // phone: yup.string().required("Phone is required"),
  // specialization: yup.string().required("Please select a specialization"),
});
 
const doctorSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Min 6 characters").required("Password is required"),
  // phone: yup.string().required("Phone is required"),
  // specialization: yup.string().required("Please select a specialization"),
  // licenseNumber: yup.string().required("License number is required"),
});
 
// ── Shared field component ─────────────────────────────────────────────────
const Field = ({
  id, label, icon: Icon, error, children,
}: {
  id: string; label: string; icon: React.ElementType; error?: string; children: React.ReactNode;
}) => (
  <div className="space-y-1.5">
    <Label htmlFor={id} className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
      {label}
    </Label>
    <div className="relative">
      <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
      {children}
    </div>
    {error && (
      <p className="text-xs text-red-500 flex items-center gap-1">
        <span className="w-1 h-1 rounded-full bg-red-500 shrink-0" />
        {error}
      </p>
    )}
  </div>
);
 
// ── Patient Form ───────────────────────────────────────────────────────────
const PatientForm = ({ loading, onSubmit }: { loading: boolean; onSubmit: (d: PatientFormValues) => void }) => {
  const [showPw, setShowPw] = React.useState(false);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<PatientFormValues>({
    resolver: yupResolver(patientSchema),
  });
 
  const inputCls = (err?: string) =>
    `pl-10 h-11 rounded-xl border-gray-200 bg-white text-sm focus:border-cyan-400 focus:ring-cyan-400/20 transition-all w-full ${err ? "border-red-300" : ""}`;
 
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Field id="name" label="Full Name" icon={User} error={errors.name?.message}>
        <Input id="name" placeholder="John Doe" {...register("name")} className={inputCls(errors.name?.message)} />
      </Field>
 
      <Field id="email" label="Email Address" icon={Mail} error={errors.email?.message}>
        <Input id="email" type="email" placeholder="you@example.com" {...register("email")} className={inputCls(errors.email?.message)} />
      </Field>
 
      {/* <Field id="phone" label="Phone Number" icon={Phone} error={errors.phone?.message}>
        <Input id="phone" placeholder="+1 234 567 8900" {...register("phone")} className={inputCls(errors.phone?.message)} />
      </Field> */}
 
      {/* <div className="space-y-1.5">
        <Label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Specialization</Label>
        <Select onValueChange={(val) => setValue("specialization", val, { shouldValidate: true })}>
          <SelectTrigger className={`h-11 rounded-xl border-gray-200 bg-white text-sm focus:border-cyan-400 transition-all ${errors.specialization ? "border-red-300" : ""}`}>
            <SelectValue placeholder="Select specialization" />
          </SelectTrigger>
          <SelectContent>
            {["General Medicine", "Cardiology", "Dermatology", "Pediatrics", "Neurology", "Orthopedics"].map(s => (
              <SelectItem key={s} value={s.toLowerCase().replace(" ", "-")}>{s}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.specialization && (
          <p className="text-xs text-red-500 flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-red-500 shrink-0" />{errors.specialization.message}
          </p>
        )}
      </div> */}
 
      <Field id="password" label="Password" icon={Lock} error={errors.password?.message}>
        <Input
          id="password"
          type={showPw ? "text" : "password"}
          placeholder="••••••••"
          {...register("password")}
          className={`${inputCls(errors.password?.message)} pr-10`}
        />
        <button type="button" onClick={() => setShowPw(!showPw)}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
          {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </Field>
 
      <SubmitButton loading={loading} label="Register as Patient" />
    </form>
  );
};
 
// ── Doctor Form ────────────────────────────────────────────────────────────
const DoctorForm = ({ loading, onSubmit }: { loading: boolean; onSubmit: (d: DoctorFormValues) => void }) => {
  const [showPw, setShowPw] = React.useState(false);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<DoctorFormValues>({
    resolver: yupResolver(doctorSchema),
  });
 
  const inputCls = (err?: string) =>
    `pl-10 h-11 rounded-xl border-gray-200 bg-white text-sm focus:border-cyan-400 focus:ring-cyan-400/20 transition-all w-full ${err ? "border-red-300" : ""}`;
 
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Field id="doc-name" label="Full Name" icon={User} error={errors.name?.message}>
        <Input id="doc-name" placeholder="Dr. Jane Smith" {...register("name")} className={inputCls(errors.name?.message)} />
      </Field>
 
      <Field id="doc-email" label="Email Address" icon={Mail} error={errors.email?.message}>
        <Input id="doc-email" type="email" placeholder="doctor@hospital.com" {...register("email")} className={inputCls(errors.email?.message)} />
      </Field>
 
      {/* <Field id="license" label="License Number" icon={Briefcase} error={errors.licenseNumber?.message}>
        <Input id="license" placeholder="MED-XXXX-XXXX" {...register("licenseNumber")} className={inputCls(errors.licenseNumber?.message)} />
      </Field> */}
 
      {/* <Field id="doc-phone" label="Phone Number" icon={Phone} error={errors.phone?.message}>
        <Input id="doc-phone" placeholder="+1 234 567 8900" {...register("phone")} className={inputCls(errors.phone?.message)} />
      </Field> */}
 
      {/* <div className="space-y-1.5">
        <Label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Specialization</Label>
        <Select onValueChange={(val) => setValue("specialization", val, { shouldValidate: true })}>
          <SelectTrigger className={`h-11 rounded-xl border-gray-200 bg-white text-sm focus:border-cyan-400 transition-all ${errors.specialization ? "border-red-300" : ""}`}>
            <SelectValue placeholder="Select specialization" />
          </SelectTrigger>
          <SelectContent>
            {["General Medicine", "Cardiology", "Dermatology", "Pediatrics", "Neurology", "Orthopedics"].map(s => (
              <SelectItem key={s} value={s.toLowerCase().replace(" ", "-")}>{s}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.specialization && (
          <p className="text-xs text-red-500 flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-red-500 shrink-0" />{errors.specialization.message}
          </p>
        )}
      </div>
  */}
      <Field id="doc-password" label="Password" icon={Lock} error={errors.password?.message}>
        <Input
          id="doc-password"
          type={showPw ? "text" : "password"}
          placeholder="••••••••"
          {...register("password")}
          className={`${inputCls(errors.password?.message)} pr-10`}
        />
        <button type="button" onClick={() => setShowPw(!showPw)}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
          {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </Field>
 
      <SubmitButton loading={loading} label="Register as Doctor" />
    </form>
  );
};
 
// ── Submit Button ──────────────────────────────────────────────────────────
const SubmitButton = ({ loading, label }: { loading: boolean; label: string }) => (
  <Button
    type="submit"
    disabled={loading}
    className="w-full h-12 bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-200 transition-all disabled:opacity-60 mt-2"
  >
    {loading ? (
      <>
        <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="3" strokeOpacity="0.3" />
          <path d="M12 2a10 10 0 0 1 10 10" stroke="white" strokeWidth="3" strokeLinecap="round" />
        </svg>
        Registering...
      </>
    ) : (
      <>
        {label}
        <ArrowRight className="w-4 h-4" />
      </>
    )}
  </Button>
);
 
// ── Main Register Page ─────────────────────────────────────────────────────
type ActiveTab = "patient" | "doctor";
 
const Register = () => {
  const router = useRouter();
  const { loading, registerUser } = useAuthStore();
  const [activeTab, setActiveTab] = React.useState<ActiveTab>("patient");
 
  const handlePatientSubmit = async (data: PatientFormValues) => {
    try {
      const response = await registerUser({ ...data, role: "patient" });
      if (response.success) router.push("/login");
    } catch (error) {
      console.error(error);
    }
  };
 
  const handleDoctorSubmit = async (data: DoctorFormValues) => {
    try {
      const response = await registerUser({ ...data, role: "doctor" });
      if (response.success) router.push("/login");
    } catch (error) {
      console.error(error);
    }
  };
 
  return (
    <div className="min-h-screen grid md:grid-cols-2 font-sans">
 
      {/* ── LEFT PANEL ─────────────────────────────────────────────────── */}
      <div className="hidden md:flex flex-col justify-between bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 relative overflow-hidden p-12">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/10 rounded-full blur-2xl" />
        <div className="absolute top-10 right-10 opacity-10 grid grid-cols-8 gap-2">
          {[...Array(64)].map((_, i) => <div key={i} className="w-1 h-1 rounded-full bg-white" />)}
        </div>
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
              Join the<br />
              <span className="text-cyan-400">Maxcare Family</span>
            </h2>
            <p className="text-blue-200 text-sm leading-relaxed max-w-xs">
              Create your account and become part of a healthcare community trusted by thousands of patients and professionals.
            </p>
          </div>
 
          {/* Role cards — highlight based on active tab */}
          <div className="space-y-3">
            <p className="text-blue-300 text-xs font-semibold uppercase tracking-wider">Who are you joining as?</p>
            <div className="grid grid-cols-2 gap-3">
              <div className={`rounded-xl p-4 border transition-all cursor-pointer ${activeTab === "doctor" ? "bg-cyan-500/20 border-cyan-400" : "bg-white/5 border-white/10"}`}
                onClick={() => setActiveTab("doctor")}>
                <Stethoscope className="w-5 h-5 text-cyan-300 mb-2" />
                <p className="text-white text-sm font-semibold">Doctor</p>
                <p className="text-blue-300 text-xs mt-0.5">Manage patients & appointments</p>
              </div>
              <div className={`rounded-xl p-4 border transition-all cursor-pointer ${activeTab === "patient" ? "bg-cyan-500/20 border-cyan-400" : "bg-white/5 border-white/10"}`}
                onClick={() => setActiveTab("patient")}>
                <UserRound className="w-5 h-5 text-cyan-300 mb-2" />
                <p className="text-white text-sm font-semibold">Patient</p>
                <p className="text-blue-300 text-xs mt-0.5">Book & track appointments</p>
              </div>
            </div>
          </div>
 
          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            {[{ value: "780K+", label: "Patients" }, { value: "250+", label: "Doctors" }, { value: "20+", label: "Years" }].map((s) => (
              <div key={s.label} className="bg-white/10 rounded-xl p-3 text-center backdrop-blur-sm border border-white/10">
                <p className="text-cyan-300 font-extrabold text-lg leading-none">{s.value}</p>
                <p className="text-blue-200 text-xs mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
 
        <p className="relative z-10 text-blue-400 text-xs">© 2025 Maxcare. All rights reserved.</p>
      </div>
 
      {/* ── RIGHT PANEL ────────────────────────────────────────────────── */}
      <div className="flex flex-col justify-center items-center px-6 py-12 bg-gray-50 overflow-y-auto">
        <div className="w-full max-w-sm space-y-6">
 
          {/* Mobile logo */}
          <div className="flex md:hidden items-center gap-3 justify-center">
            <div className="w-9 h-9 rounded-xl bg-cyan-500 flex items-center justify-center">
              <Heart className="w-4 h-4 text-white fill-white" />
            </div>
            <p className="text-blue-900 font-bold text-xl">Maxcare</p>
          </div>
 
          {/* Heading — changes with tab */}
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-blue-900">
              {activeTab === "patient" ? "Register as Patient" : "Register as Doctor"}
            </h1>
            <p className="text-gray-400 text-sm">Fill in the details below to get started</p>
          </div>
 
          {/* ── TAB SWITCHER ── */}
          <div className="relative flex bg-red-50 rounded-full p-1 border border-red-100">
            {/* sliding pill */}
            <div
              className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full bg-white shadow-sm border border-gray-100 transition-transform duration-300 ease-in-out ${activeTab === "doctor" ? "translate-x-[calc(100%+4px)]" : "translate-x-0"}`}
            />
            <button
              type="button"
              onClick={() => setActiveTab("patient")}
              className={`relative z-10 flex-1 flex items-center justify-center gap-2 py-2 text-sm font-semibold rounded-full transition-colors duration-200 ${activeTab === "patient" ? "text-blue-900" : "text-gray-400 hover:text-gray-600"}`}
            >
              <UserRound className="w-4 h-4" />
              Patient
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("doctor")}
              className={`relative z-10 flex-1 flex items-center justify-center gap-2 py-2 text-sm font-semibold rounded-full transition-colors duration-200 ${activeTab === "doctor" ? "text-blue-900" : "text-gray-400 hover:text-gray-600"}`}
            >
              <Stethoscope className="w-4 h-4" />
              Doctor
            </button>
          </div>
 
          {/* ── FORM (switches on tab) ── */}
          <div key={activeTab} className="animate-in fade-in slide-in-from-bottom-2 duration-200">
            {activeTab === "patient"
              ? <PatientForm loading={loading} onSubmit={handlePatientSubmit} />
              : <DoctorForm loading={loading} onSubmit={handleDoctorSubmit} />
            }
          </div>
 
          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400">already have an account?</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>
 
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/login")}
            className="w-full h-11 rounded-xl border-gray-200 text-blue-900 font-semibold text-sm hover:bg-blue-50 hover:border-blue-200 transition-all"
          >
            Sign in to existing account
          </Button>
 
          <p className="text-center text-xs text-gray-400">
            By registering you agree to our{" "}
            <a href="#" className="text-cyan-500 hover:underline">Terms of Service</a>
            {" "}and{" "}
            <a href="#" className="text-cyan-500 hover:underline">Privacy Policy</a>
          </p>
        </div>
      </div>
 
    </div>
  );
};
 
export default Register;