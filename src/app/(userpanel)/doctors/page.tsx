"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { ChevronRight, Stethoscope, Users, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAllDoctors } from "@/hooks/doctor.details";

const CARD_GRADIENTS = [
  "from-red-400 to-rose-300",
  "from-teal-300 to-cyan-400",
  "from-blue-300 to-blue-400",
  "from-blue-200 to-cyan-200",
  "from-red-200 to-orange-100",
  "from-green-100 to-teal-100",
  "from-blue-100 to-indigo-100",
  "from-pink-100 to-rose-100",
  "from-slate-200 to-blue-100",
];

export default function OurDoctorsPage() {
  const [form, setForm] = useState({
    fullName: "", email: "", treatment: "", doctor: "", phone: "", date: "",
  });
  const router = useRouter();
  const { data: doctors, isLoading } = useAllDoctors();

  return (
    <main className="font-sans">

      {/* ── HERO BREADCRUMB ────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 py-16 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
          <svg className="absolute right-0 top-0 h-full opacity-20" viewBox="0 0 300 200" preserveAspectRatio="none">
            <path d="M300,0 Q200,100 300,200" stroke="#22d3ee" strokeWidth="1.5" fill="none" />
            <path d="M300,20 Q180,110 300,180" stroke="#22d3ee" strokeWidth="1" fill="none" />
            <path d="M300,40 Q160,120 300,160" stroke="#3b82f6" strokeWidth="0.8" fill="none" />
          </svg>
          <div className="absolute top-6 right-32 opacity-10 grid grid-cols-8 gap-2">
            {[...Array(40)].map((_, i) => (
              <div key={i} className="w-1 h-1 rounded-full bg-white" />
            ))}
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <h1 className="text-4xl font-bold text-white mb-3">Our Doctors</h1>
          <div className="flex items-center gap-2 text-sm text-blue-200">
            <a href="#" className="hover:text-white transition-colors">Home</a>
            <ChevronRight className="w-3 h-3 text-cyan-400" />
            <span className="text-cyan-300">Our Doctors</span>
          </div>
        </div>
      </section>

      {/* ── DOCTORS GRID ───────────────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">

          {/* Heading */}
          <div className="mb-10 space-y-2">
            <div className="inline-flex items-center gap-2 border border-gray-200 rounded-full px-3 py-1.5 text-xs text-gray-500">
              <Stethoscope className="w-3.5 h-3.5 text-cyan-500" /> OUR MAXCARE TEAM
            </div>
            <h2 className="text-3xl font-bold text-blue-900">
              Meet Our <span className="text-cyan-500">Maxcare Doctors</span>
            </h2>
          </div>

          {/* 3-column grid */}
          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-cyan-500" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {(doctors ?? []).map((doc: any, i: number) => (
                <div
                  key={doc.id}
                  className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100"
                  onClick={() => router.push(`/DoctorDetails/${doc.id}`)}
                >
                  <div className={`h-64 bg-gradient-to-b ${CARD_GRADIENTS[i % CARD_GRADIENTS.length]} flex items-end justify-center relative overflow-hidden`}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Users className="w-24 h-24 text-white/20" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl px-5 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] group-hover:bg-blue-50 transition-colors">
                    <p className="font-bold text-blue-900 text-sm text-center">{doc.name}</p>
                    <p className="text-cyan-500 text-xs text-center mt-0.5">{doc.designation || "—"}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── MAKE AN APPOINTMENT FORM ───────────────────────────────────── */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4">

          {/* Heading */}
          <div className="text-center mb-8 space-y-2">
            <div className="inline-flex items-center gap-2 border border-gray-200 bg-white rounded-full px-3 py-1.5 text-xs text-gray-500">
              <Stethoscope className="w-3.5 h-3.5 text-cyan-500" /> Trusted Care. Proven Excellence.
            </div>
            <h2 className="text-3xl font-bold text-blue-900">
              Make an <span className="text-cyan-500">Appointment!</span>
            </h2>
          </div>

          {/* Form grid */}
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <Input
                placeholder="Full Name*"
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                className="rounded-xl border-gray-200 h-12 text-sm bg-white"
              />
              <Input
                placeholder="E-Mail*"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="rounded-xl border-gray-200 h-12 text-sm bg-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Select onValueChange={(v) => setForm({ ...form, treatment: v })}>
                <SelectTrigger className="rounded-xl border-gray-200 h-12 text-sm bg-white text-gray-400">
                  <SelectValue placeholder="Select Treatment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cardiology">Cardiology</SelectItem>
                  <SelectItem value="neurology">Neurology</SelectItem>
                  <SelectItem value="orthopedics">Orthopaedics & Trauma</SelectItem>
                  <SelectItem value="paediatrics">Paediatrics</SelectItem>
                  <SelectItem value="ent">ENT</SelectItem>
                  <SelectItem value="ophthalmology">Ophthalmology</SelectItem>
                  <SelectItem value="dermatology">Dermatology</SelectItem>
                  <SelectItem value="general">General Surgery</SelectItem>
                </SelectContent>
              </Select>

              <Select onValueChange={(v) => setForm({ ...form, doctor: v })}>
                <SelectTrigger className="rounded-xl border-gray-200 h-12 text-sm bg-white text-gray-400">
                  <SelectValue placeholder="Choose Doctor" />
                </SelectTrigger>
                <SelectContent>
                  {(doctors ?? []).map((doc: any) => (
                    <SelectItem key={doc.id} value={doc.name}>
                      {doc.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Input
                placeholder="Phone Number*"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="rounded-xl border-gray-200 h-12 text-sm bg-white"
              />
              <Input
                type="date"
                placeholder="Select Date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="rounded-xl border-gray-200 h-12 text-sm bg-white text-gray-400"
              />
            </div>

            <Button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white rounded-full h-12 font-semibold text-sm tracking-wide mt-2 shadow-lg shadow-cyan-200 transition-all">
              Book an Appointment
            </Button>
          </div>
        </div>
      </section>

    </main>
  );
}
