"use client";

import { use } from "react";
import { Button } from "@/components/ui/button";
import {
  Mail, MapPin, ChevronRight, CheckCircle,
  Stethoscope, Users, ArrowRight,
  Facebook, Instagram, Youtube, Linkedin, Twitter,
  Loader2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useDoctorById } from "@/hooks/doctor.details";

export default function DoctorDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { data: doctor, isLoading, isError } = useDoctorById(id);

  if (isLoading)
    return (
      <div className="flex h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-cyan-500" />
      </div>
    );

  if (isError || !doctor)
    return (
      <div className="flex h-[400px] flex-col items-center justify-center text-slate-500 gap-3">
        <Stethoscope className="h-10 w-10 opacity-30" />
        <p>Doctor not found.</p>
        <Button variant="outline" onClick={() => router.push("/doctors")}>Back to Doctors</Button>
      </div>
    );

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
          <h1 className="text-4xl font-bold text-white mb-3">Doctor Details</h1>
          <div className="flex items-center gap-2 text-sm text-blue-200">
            <button onClick={() => router.push("/")} className="hover:text-white transition-colors">Home</button>
            <ChevronRight className="w-3 h-3 text-cyan-400" />
            <button onClick={() => router.push("/doctors")} className="hover:text-white transition-colors">Doctors</button>
            <ChevronRight className="w-3 h-3 text-cyan-400" />
            <span className="text-cyan-300">{doctor.name}</span>
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT ───────────────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-[340px_1fr] gap-12 items-start">

          {/* ── LEFT PROFILE CARD ──────────────────────────────────────── */}
          <div className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm">

            {/* Photo */}
            <div className="h-72 bg-gradient-to-b from-cyan-400 to-blue-500 flex items-center justify-center relative overflow-hidden">
              <Users className="w-28 h-28 text-white/20" />
            </div>

            {/* Name + designation */}
            <div className="px-6 pt-5 pb-2">
              <h2 className="text-xl font-bold text-blue-900">{doctor.name}</h2>
              <p className="text-cyan-500 text-sm mt-0.5">{doctor.designation || "—"}</p>
            </div>

            <div className="mx-6 border-t border-gray-100 my-4" />

            {/* Email */}
            {doctor.email && (
              <>
                <div className="px-6 space-y-1">
                  <p className="text-xs text-gray-400 font-medium">Email Address</p>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                    <p className="text-blue-900 font-semibold text-sm">{doctor.email}</p>
                  </div>
                </div>
                <div className="mx-6 border-t border-gray-100 my-4" />
              </>
            )}

            {/* Fees */}
            {doctor.fees && (
              <>
                <div className="px-6 space-y-1">
                  <p className="text-xs text-gray-400 font-medium">Consultation Fees</p>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                    <p className="text-blue-900 font-semibold text-sm">${doctor.fees} USD</p>
                  </div>
                </div>
                <div className="mx-6 border-t border-gray-100 my-4" />
              </>
            )}

            {/* Availability */}
            {doctor.availability?.days?.length > 0 && (
              <>
                <div className="px-6 space-y-1">
                  <p className="text-xs text-gray-400 font-medium">Available Days</p>
                  <p className="text-blue-900 font-semibold text-sm">
                    {doctor.availability.days.join(", ")}
                  </p>
                  <p className="text-gray-500 text-xs">
                    {doctor.availability.startTime} – {doctor.availability.endTime}
                  </p>
                </div>
                <div className="mx-6 border-t border-gray-100 my-4" />
              </>
            )}

            {/* Social icons */}
            <div className="px-6 pb-4 flex items-center gap-2">
              {[Facebook, Instagram, Twitter, Youtube, Linkedin].map((Icon, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-cyan-500 transition-colors flex items-center justify-center cursor-pointer group"
                >
                  <Icon className="w-3.5 h-3.5 text-gray-500 group-hover:text-white transition-colors" />
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="px-5 pb-5">
              <Button
                className="w-full bg-cyan-500 hover:bg-cyan-600 text-white rounded-full h-12 font-semibold text-sm flex items-center justify-between px-5 shadow-lg shadow-cyan-100"
                onClick={() => router.push("/appointment")}
              >
                <span>Get an Appointment</span>
                <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                  <ArrowRight className="w-3.5 h-3.5 text-white" />
                </div>
              </Button>
            </div>
          </div>

          {/* ── RIGHT CONTENT ──────────────────────────────────────────── */}
          <div className="space-y-10">

            <div className="space-y-5">
              <div>
                <h2 className="text-2xl font-bold text-blue-900 mb-2">About {doctor.name}</h2>
                <div className="w-10 h-0.5 bg-cyan-500 rounded-full" />
              </div>

              <ul className="space-y-2.5">
                {[
                  { label: "Name", value: doctor.name },
                  { label: "Speciality", value: doctor.designation || "—" },
                  { label: "Consultation Fee", value: doctor.fees ? `$${doctor.fees} USD` : "—" },
                ].map(({ label, value }) => (
                  <li key={label} className="flex items-start gap-3 text-sm">
                    <div className="w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle className="w-3 h-3 text-white" />
                    </div>
                    <span>
                      <span className="font-bold text-blue-900">{label}: </span>
                      <span className="text-gray-600">{value}</span>
                    </span>
                  </li>
                ))}
              </ul>

              {doctor.description && (
                <p className="text-gray-500 text-sm leading-relaxed bg-slate-50 p-4 rounded-lg">
                  {doctor.description}
                </p>
              )}
            </div>

            {/* Availability section */}
            {doctor.availability?.days?.length > 0 && (
              <div className="space-y-4">
                <div>
                  <h2 className="text-2xl font-bold text-blue-900 mb-2">Availability</h2>
                  <div className="w-10 h-0.5 bg-cyan-500 rounded-full" />
                </div>
                <div className="flex flex-wrap gap-2">
                  {doctor.availability.days.map((day: string) => (
                    <span key={day} className="px-3 py-1 bg-cyan-50 text-cyan-700 rounded-full text-sm font-medium border border-cyan-200">
                      {day}
                    </span>
                  ))}
                </div>
                <p className="text-gray-500 text-sm">
                  Hours: {doctor.availability.startTime} – {doctor.availability.endTime}
                </p>
              </div>
            )}

          </div>
        </div>
      </section>

    </main>
  );
}
