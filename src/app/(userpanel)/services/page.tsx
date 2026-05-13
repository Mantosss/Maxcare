"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Phone, ChevronRight, Stethoscope, Users, Heart,
  ArrowRight, Ambulance, ClipboardList, UserCheck,
  Baby, Activity, Plus,
} from "lucide-react";

const serviceCategories = [
  { icon: <ClipboardList className="w-6 h-6" />, label: "Specialized Medicine & Surgery", active: true },
  { icon: <Ambulance className="w-6 h-6" />, label: "Emergency & Critical Care", active: false },
  { icon: <ClipboardList className="w-6 h-6" />, label: "Laboratory Services", active: false },
  { icon: <UserCheck className="w-6 h-6" />, label: "Rehabilitation Services", active: false },
  { icon: <Baby className="w-6 h-6" />, label: "Women & Child Care", active: false },
];

const serviceCards = [
  {
    title: "General Surgery",
    desc: "Our neurology department provides expert care for conditions affecting the brain, spine, and nervous system",
    bg: "from-blue-100 to-cyan-100",
  },
  {
    title: "Internal Medicine",
    desc: "Our neurology department provides expert care for conditions affecting the brain, spine, and nervous system",
    bg: "from-amber-100 to-orange-100",
  },
  {
    title: "Obstetrics & Gynecology",
    desc: "Our neurology department provides expert care for conditions affecting the brain, spine, and nervous system",
    bg: "from-cyan-100 to-teal-100",
  },
  {
    title: "Cardiothoracic Surgery",
    desc: "Our neurology department provides expert care for conditions affecting the brain, spine, and nervous system",
    bg: "from-blue-200 to-indigo-100",
  },
  {
    title: "Urology Surgery",
    desc: "Our neurology department provides expert care for conditions affecting the brain, spine, and nervous system",
    bg: "from-blue-100 to-blue-200",
  },
  {
    title: "Endocrinology",
    desc: "Our neurology department provides expert care for conditions affecting the brain, spine, and nervous system",
    bg: "from-purple-100 to-pink-100",
  },
];

const steps = [
  {
    num: "01",
    title: "Book an Appointment",
    desc: "Select your preferred date, time, and doctor using our easy online booking system or by calling our help desk.",
  },
  {
    num: "02",
    title: "Confirm Your Schedule",
    desc: "Receive confirmation via SMS or email with details of your consultation, including doctor's profile and location.",
  },
  {
    num: "03",
    title: "Meet Your Doctor",
    desc: "Visit the hospital or join a secure video call at your scheduled time. Our specialists will assess your health condition thoroughly.",
  },
  {
    num: "04",
    title: "Get Diagnosis & Advice",
    desc: "Receive a proper diagnosis, treatment plan, and prescription if needed — with clear explanations and care instructions.",
  },
  {
    num: "05",
    title: "Follow-Up Support",
    desc: "Our team will guide you with aftercare, test results, and follow-up appointments for ongoing support and peace of mind.",
  },
];

export default function OurServicesPage() {
  const [activeCategory, setActiveCategory] = useState(0);

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
          <h1 className="text-4xl font-bold text-white mb-3">Our Services</h1>
          <div className="flex items-center gap-2 text-sm text-blue-200">
            <a href="#" className="hover:text-white transition-colors">Home</a>
            <ChevronRight className="w-3 h-3 text-cyan-400" />
            <span className="text-cyan-300">Our Services</span>
          </div>
        </div>
      </section>

      {/* ── SERVICES SECTION ───────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">

          {/* Section heading */}
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-2 text-cyan-500 text-xs font-semibold mb-3">
              <Stethoscope className="w-4 h-4" /> WHAT WE OFFER FOR YOU
            </div>
            <h2 className="text-3xl font-bold text-blue-900">
              Have a Look on Our Amazing<br />Medical Services
            </h2>
          </div>

          {/* Category tabs */}
          <div className="flex flex-wrap gap-4 justify-center mb-8">
            {serviceCategories.map((cat, i) => (
              <button
                key={i}
                onClick={() => setActiveCategory(i)}
                className={`flex flex-col items-center gap-2 px-5 py-4 rounded-2xl w-36 transition-all text-center
                  ${activeCategory === i
                    ? "bg-cyan-500 text-white shadow-lg shadow-cyan-200"
                    : "bg-white border border-gray-200 text-gray-600 hover:border-cyan-300 hover:shadow-sm"
                  }`}
              >
                <div className={activeCategory === i ? "text-white" : "text-blue-700"}>{cat.icon}</div>
                <span className="text-xs font-semibold leading-snug">{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Service cards grid — light blue tinted container */}
          <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-3xl p-8 border border-blue-100">
            <div className="grid md:grid-cols-3 gap-6">
              {serviceCards.map((card, i) => (
                <Card key={i} className="bg-white hover:shadow-lg transition-all group overflow-hidden border-0 shadow-sm">
                  {/* Image placeholder */}
                  <div className={`h-44 bg-gradient-to-br ${card.bg} flex items-center justify-center relative overflow-hidden`}>
                    <Users className="w-16 h-16 text-blue-400 opacity-30" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent" />
                  </div>
                  <CardContent className="p-5 space-y-3">
                    <h3 className="font-bold text-blue-900 text-base">{card.title}</h3>
                    <p className="text-gray-500 text-xs leading-relaxed">{card.desc}</p>
                    <button className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 hover:text-cyan-500 group-hover:gap-2.5 transition-all pt-1">
                      Read More <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS / STEPS ───────────────────────────────────────── */}
      <section className="py-20 bg-blue-950">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-4 relative">
                {/* Connector line */}
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-14 left-[60%] w-full h-px border-t border-dashed border-blue-700 z-0" />
                )}
                {/* Circle avatar */}
                <div className="relative shrink-0 z-10">
                  <div className="w-28 h-28 rounded-full overflow-hidden bg-gradient-to-br from-blue-700 to-cyan-600 border-4 border-blue-900 flex items-center justify-center shadow-lg">
                    <Users className="w-12 h-12 text-white opacity-40" />
                  </div>
                  {/* Step number badge */}
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-cyan-500 flex items-center justify-center shadow-md border-2 border-blue-950">
                    <span className="text-white text-[9px] font-bold">{step.num}</span>
                  </div>
                </div>
                <div className="space-y-1.5 mt-2">
                  <p className="text-white font-semibold text-sm">{step.title}</p>
                  <p className="text-blue-300 text-xs leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GET APPOINTMENT BANNER ─────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="rounded-3xl overflow-hidden grid md:grid-cols-2 min-h-[280px] shadow-xl">

            {/* Left – blue gradient with text */}
            <div className="bg-gradient-to-br from-blue-800 to-blue-600 p-10 flex flex-col justify-end relative overflow-hidden">
              {/* Background image silhouette */}
              <div className="absolute inset-0 opacity-20 flex items-center justify-center">
                <Users className="w-64 h-64 text-blue-300" />
              </div>
              <div className="relative z-10 space-y-2">
                <p className="text-cyan-300 text-xs font-semibold">Trusted Care, Proven Excellence.</p>
                <h3 className="text-2xl font-bold text-white leading-snug">
                  Committed to ensure<br />Quality Healthcare
                </h3>
              </div>
            </div>

            {/* Right – appointment card */}
            <div className="bg-white p-8 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-blue-900">Get Appointment</h3>
                <div className="w-7 h-7 rounded-full bg-cyan-500 flex items-center justify-center cursor-pointer hover:bg-cyan-600 transition">
                  <Plus className="w-3.5 h-3.5 text-white" />
                </div>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                Call us 24/7 with any emergency or to schedule an appointment & check your health.
              </p>

              {/* Phone numbers */}
              <div className="space-y-1 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-cyan-500 flex items-center justify-center shrink-0 shadow-md shadow-cyan-200">
                    <Phone className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium">Call Us</p>
                    <p className="text-lg font-bold text-blue-900">+811.2311.785</p>
                  </div>
                </div>
                <p className="text-sm font-semibold text-blue-900 pl-12">+811.2311.657</p>
              </div>

              {/* CTA */}
              <button className="flex items-center gap-2 text-sm font-semibold text-blue-900 border-t border-gray-100 pt-4 hover:text-cyan-500 transition-colors group">
                Request An Appointment
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}
