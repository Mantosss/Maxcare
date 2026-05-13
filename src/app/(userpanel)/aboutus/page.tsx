"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Phone, Star, ChevronRight, Heart, X,
  Play, CheckCircle, Stethoscope, Users,
  ArrowRight, Shield, CreditCard, Activity, MapPin,
} from "lucide-react";

export default function AboutPage() {
  const [activeDoctor, setActiveDoctor] = useState(1);

  const doctors = [
    { name: "Jason Armstrong", role: "Head Of Operation", bg: "from-amber-100 to-orange-100" },
    { name: "Jenifer Olivia", role: "Chief Executive Officer", bg: "from-cyan-100 to-blue-100" },
    { name: "Arnold Maxwell", role: "Chief Financial Officer", bg: "from-blue-100 to-indigo-100" },
  ];

  const reasons = [
    {
      icon: <Shield className="w-4 h-4 text-white" />,
      title: "Hygienic & Safe Environment",
      desc: "Equipped with state-of-the-art technology and driven by a commitment to excellence.",
      color: "bg-cyan-500",
    },
    {
      icon: <CreditCard className="w-4 h-4 text-white" />,
      title: "Affordable & Transparent Billing",
      desc: "We strive not only to treat illness but to promote lifelong wellness for individuals and families.",
      color: "bg-blue-500",
    },
    {
      icon: <Activity className="w-4 h-4 text-white" />,
      title: "Focus on Recovery and Wellness",
      desc: "Our team of highly skilled doctors, nurses, and healthcare professionals work collaboratively.",
      color: "bg-blue-700",
    },
  ];

  return (
    <main className="font-sans">

      {/* ── HERO BREADCRUMB ────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 py-16 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/10 rounded-full blur-2xl" />
          <div className="absolute top-6 right-24 opacity-10 grid grid-cols-8 gap-2">
            {[...Array(40)].map((_, i) => (
              <div key={i} className="w-1 h-1 rounded-full bg-white" />
            ))}
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <h1 className="text-4xl font-bold text-white mb-3">About Us</h1>
          <div className="flex items-center gap-2 text-sm text-blue-200">
            <a href="#" className="hover:text-white transition-colors">Home</a>
            <ChevronRight className="w-3 h-3" />
            <span className="text-cyan-300">About Us</span>
          </div>
        </div>
      </section>

      {/* ── ABOUT INTRO ────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">

          {/* Left – image collage */}
          <div className="relative">
            <div className="absolute -top-4 -left-4 opacity-10 grid grid-cols-10 gap-1.5">
              {[...Array(80)].map((_, i) => (
                <div key={i} className="w-1 h-1 rounded-full bg-blue-400" />
              ))}
            </div>
            <div className="grid grid-cols-2 gap-3 relative z-10">
              <div className="row-span-2 rounded-2xl overflow-hidden bg-gradient-to-b from-blue-100 to-cyan-100 h-64 flex items-center justify-center">
                <Users className="w-16 h-16 text-blue-400 opacity-40" />
              </div>
              <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-cyan-200 to-blue-200 h-[120px] flex items-center justify-center">
                <Stethoscope className="w-10 h-10 text-blue-400 opacity-40" />
              </div>
              <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-blue-200 to-indigo-200 h-[120px] flex items-center justify-center">
                <Heart className="w-10 h-10 text-blue-400 opacity-40" />
              </div>
            </div>
          </div>

          {/* Right – content */}
          <div className="space-y-5">
            <div className="flex items-center gap-2 text-cyan-500 text-xs font-semibold">
              <Stethoscope className="w-4 h-4" /> ABOUT MAXCARE
            </div>
            <h2 className="text-3xl font-bold text-blue-900 leading-snug">
              Redefining Healthcare Standards with Experts Professionals
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              At Maxcare, we are dedicated to delivering exceptional healthcare with compassion,
              innovation, and integrity. For over 20 years, we have been a comprehensive
              medical services in USA.
            </p>

            <div className="flex gap-4 items-start">
              <div className="relative shrink-0">
                <div className="w-24 h-16 rounded-xl bg-gradient-to-br from-blue-800 to-blue-600 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center cursor-pointer hover:bg-white/30 transition">
                    <Play className="w-4 h-4 fill-white text-white" />
                  </div>
                </div>
              </div>
              <ul className="space-y-1.5">
                {[
                  "Expert Medical Professionals",
                  "Advanced Medical Technology",
                  "Comprehensive Care Services",
                  "24/7 Emergency Services",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-xs text-gray-600">
                    <CheckCircle className="w-3.5 h-3.5 text-cyan-500 shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center gap-5 pt-2">
              <Button className="bg-cyan-500 hover:bg-cyan-600 text-white rounded-full px-6 flex items-center gap-2">
                About Us <ArrowRight className="w-4 h-4" />
              </Button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-cyan-50 flex items-center justify-center">
                  <Phone className="w-3.5 h-3.5 text-cyan-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Emergency Contact</p>
                  <p className="text-sm font-bold text-blue-900">+020.098.456</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS / SCALE ──────────────────────────────────────────────── */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute top-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" className="w-full" preserveAspectRatio="none">
            <path d="M0,0 C480,80 960,0 1440,60 L1440,0 Z" fill="white" />
          </svg>
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950">
          <div className="absolute inset-0 opacity-10 flex items-center justify-center">
            <Users className="w-96 h-96 text-blue-300" />
          </div>
          <svg className="absolute bottom-0 left-0 w-full opacity-20" viewBox="0 0 1440 60" preserveAspectRatio="none">
            <path d="M0,30 C360,0 720,60 1440,20" stroke="#22d3ee" strokeWidth="2" fill="none" />
            <path d="M0,50 C360,20 720,80 1440,40" stroke="#22d3ee" strokeWidth="1" fill="none" />
          </svg>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 pt-8">
          <p className="text-white text-xl font-semibold mb-12">Our scale and reach to client Satisfaction</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "780K", sup: "number", label: "of Patients Served", icon: <Users className="w-6 h-6 text-cyan-300" /> },
              { value: "250+", sup: "number", label: "of Expert Pathologists", icon: <Stethoscope className="w-6 h-6 text-cyan-300" /> },
              { value: "90+", sup: "number", label: "of Premium Branches", icon: <MapPin className="w-6 h-6 text-cyan-300" /> },
              { value: "100%", sup: "assurance", label: "of Client Satisfaction", icon: <CheckCircle className="w-6 h-6 text-cyan-300" /> },
            ].map((stat, i) => (
              <div key={i} className="text-white">
                <div className="mb-3">{stat.icon}</div>
                <div className="flex items-start gap-1">
                  <p className="text-5xl font-extrabold text-white leading-none">{stat.value}</p>
                  <span className="text-xs text-cyan-300 mt-1">{stat.sup}</span>
                </div>
                <p className="text-blue-300 text-xs mt-3">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" className="w-full" preserveAspectRatio="none">
            <path d="M0,60 C480,0 960,60 1440,20 L1440,60 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ── WHY CHOOSE US ──────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 flex flex-col justify-center">
            <div className="flex items-center gap-2 text-cyan-500 text-xs font-semibold">
              <Stethoscope className="w-4 h-4" /> WHY CHOOSE US
            </div>
            <h2 className="text-3xl font-bold text-blue-900 leading-snug">
              The Reasons to Choose Maxcare Medical
            </h2>
            <div className="space-y-5">
              {reasons.map((reason, i) => (
                <div key={i} className="flex gap-4">
                  <div className={`w-8 h-8 rounded-full ${reason.color} flex items-center justify-center shrink-0 mt-0.5 shadow-sm`}>
                    {reason.icon}
                  </div>
                  <div>
                    <p className="font-semibold text-blue-900 text-sm mb-1">{reason.title}</p>
                    <p className="text-gray-500 text-xs leading-relaxed">{reason.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="h-96 bg-gradient-to-b from-blue-100 to-cyan-100 rounded-2xl overflow-hidden flex items-center justify-center">
              <Users className="w-32 h-32 text-blue-400 opacity-30" />
            </div>
            <div className="absolute -bottom-6 left-8 bg-white rounded-2xl shadow-xl px-8 py-4 border border-gray-100">
              <p className="text-5xl font-black text-blue-900 leading-none">16</p>
              <p className="text-xs text-gray-500 mt-1">Years of<br />Experience</p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 mt-16 flex justify-end">
          <p className="text-gray-400 text-xs leading-relaxed max-w-xs">
            At Maxcare, we are dedicated to delivering exceptional healthcare with compassion, innovation, and integrity. For over 20 years, we have been offering comprehensive medical services in USA.
          </p>
        </div>
      </section>

      {/* ── TEAM MEMBERS ───────────────────────────────────────────────── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 space-y-3">
            <div className="flex items-center justify-center gap-2 text-cyan-500 text-xs font-semibold">
              <Stethoscope className="w-4 h-4" /> OUR DOCTORS
            </div>
            <h2 className="text-3xl font-bold text-blue-900">Meet Our Amazing Team Members</h2>
            <p className="text-gray-500 text-sm max-w-lg mx-auto leading-relaxed">
              At Maxcare, we are dedicated to delivering exceptional healthcare with compassion, innovation, and integrity. For over 20 years, we have been offering comprehensive medical services in USA.
            </p>
          </div>

          <div className="relative">
            <div className="grid grid-cols-3 gap-6">
              {doctors.map((doc, i) => (
                <Card
                  key={i}
                  onClick={() => setActiveDoctor(i)}
                  className={`overflow-hidden cursor-pointer transition-all hover:shadow-xl ${activeDoctor === i ? "ring-2 ring-cyan-400 shadow-lg" : "shadow-md"}`}
                >
                  <div className={`h-64 bg-gradient-to-b ${doc.bg} flex items-center justify-center`}>
                    <Users className="w-24 h-24 text-blue-400 opacity-30" />
                  </div>
                  <CardContent className="p-4 text-center border-t border-gray-100">
                    <p className="font-bold text-blue-900 text-sm">{doc.name}</p>
                    <p className="text-cyan-500 text-xs mt-0.5">{doc.role}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <button className="absolute -right-4 top-1/2 -translate-y-8 w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center shadow-lg hover:bg-cyan-600 transition-colors">
              <ChevronRight className="w-5 h-5 text-white" />
            </button>

            <div className="flex justify-center gap-2 mt-6">
              {[0, 1, 2, 3].map((dot) => (
                <div key={dot} className={`rounded-full transition-all ${dot === 0 ? "w-6 h-2.5 bg-blue-900" : "w-2.5 h-2.5 bg-gray-300"}`} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ───────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-12">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-cyan-500 text-xs font-semibold">
                <Stethoscope className="w-4 h-4" /> TESTIMONIAL
              </div>
              <h2 className="text-3xl font-bold text-blue-900">
                What Happy Patients<br />Say About Us
              </h2>
            </div>
            <div className="md:max-w-xs space-y-4">
              <p className="text-gray-500 text-sm leading-relaxed">
                At Maxcare, we are dedicated to delivering exceptional healthcare with compassion, innovation, and integrity. For over 20 years, we have been offering comprehensive medical services in USA.
              </p>
              <div className="bg-cyan-500 rounded-xl px-5 py-3 text-white inline-flex flex-col items-center shadow-md">
                <p className="text-xs font-medium text-cyan-100">Average Rating</p>
                <p className="text-3xl font-extrabold leading-none">4.8</p>
                <div className="flex gap-0.5 mt-1">
                  {[...Array(4)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-yellow-300 text-yellow-300" />)}
                  <Star className="w-3.5 h-3.5 fill-yellow-300/50 text-yellow-300" />
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="relative">
              <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-blue-900 to-blue-700 h-72 flex items-center justify-center">
                <div className="w-40 h-56 bg-blue-800/50 rounded-xl flex items-center justify-center">
                  <Users className="w-16 h-16 text-blue-400 opacity-50" />
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-black rounded-full flex items-center justify-center shadow-lg">
                <X className="w-5 h-5 text-white" />
              </div>
            </div>

            <div className="space-y-5 pl-4">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                "From the moment I walked into the hospital, I felt reassured. The doctors were incredibly knowledgeable, and the nurses treated me with kindness and respect every step of the way. Thanks to their expert care and attention, I made a full recovery faster than expected!"
              </p>
              <div>
                <p className="font-bold text-blue-900 text-base">Johannes Times</p>
                <p className="text-cyan-500 text-xs font-medium">New York</p>
              </div>
              <div className="flex items-center gap-3 pt-2">
                <button className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center hover:border-cyan-500 hover:text-cyan-500 transition-colors">
                  <ChevronRight className="w-4 h-4 rotate-180" />
                </button>
                <button className="w-9 h-9 rounded-full bg-cyan-500 flex items-center justify-center hover:bg-cyan-600 transition-colors">
                  <ChevronRight className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
