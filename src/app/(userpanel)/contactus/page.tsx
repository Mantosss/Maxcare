"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Phone, Mail, MapPin, ChevronRight, Star, Stethoscope, Loader2
} from "lucide-react";
import { useSubmitContact } from "@/hooks/contactQuery"; // Path to the hook file above
import { toast } from "sonner"; // Or your preferred toast library
import { useRouter } from "next/router";


const branches = [
  { name: "Washington Branch", phone: "+211 567 811", email: "maxcare3456mail@gmail.com", address: "20/A Washington DC, USA" },
  { name: "Utah Branch", phone: "+211 567 822", email: "maxcare3456mail@gmail.com", address: "231 Utah City Centre, Utah, USA" },
  { name: "Miami Branch", phone: "+211 567 813", email: "maxcare3456mail@gmail.com", address: "112 Beach Valley Road, Miami, USA" },
];

const hours = [
  { day: "Monday", time: "9am–9pm" },
  { day: "Tuesday", time: "9am–9pm" },
  { day: "Wednesday", time: "9am–9pm" },
  { day: "Thursday", time: "9am–9pm" },
  { day: "Friday", time: "9am–9pm" },
  { day: "Saturday", time: "9am–9pm" },
  { day: "Sunday", time: "Closed" },
];

export default function ContactUsPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", text: "" });
  
  const { mutate, isPending } = useSubmitContact();

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.text) {
      toast.error("Please fill in all required fields");
      return;
    }

    mutate(form, {
      onSuccess: () => {
        toast.success("Message sent successfully!");
        setForm({ name: "", email: "", subject: "", text: "" }); // Reset form
      },
      onError: (error) => {
        toast.error(`Error: ${error.message}`);
      },
    });
  };

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
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <h1 className="text-4xl font-bold text-white mb-3">Contact Us</h1>
          <div className="flex items-center gap-2 text-sm text-blue-200">
            <a href="#" className="hover:text-white transition-colors">Home</a>
            <ChevronRight className="w-3 h-3 text-cyan-400" />
            <span className="text-cyan-300">Contact Us</span>
          </div>
        </div>
      </section>

      {/* ── BRANCH CARDS & MAP (Kept same as your original) ───────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200 border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
            {branches.map((branch, i) => (
              <div key={i} className="p-8 flex flex-col gap-6 hover:bg-gray-50 transition-colors">
                <h3 className="text-base font-bold text-blue-900 text-center">{branch.name}</h3>
                <div className="border-t border-gray-100" />
                <div className="text-center space-y-1">
                  <p className="text-[10px] font-semibold tracking-widest text-gray-400 uppercase">Call Us Any Time</p>
                  <div className="flex items-center justify-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-cyan-500" />
                    <p className="text-blue-900 font-bold text-base">{branch.phone}</p>
                  </div>
                </div>
                <div className="border-t border-gray-100" />
                <div className="text-center space-y-1">
                  <p className="text-[10px] font-semibold tracking-widest text-gray-400 uppercase">Send Us Mail</p>
                  <div className="flex items-center justify-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-cyan-500" />
                    <p className="text-cyan-600 font-semibold text-sm">{branch.email}</p>
                  </div>
                </div>
                <div className="border-t border-gray-100" />
                <div className="text-center space-y-1">
                  <p className="text-[10px] font-semibold tracking-widest text-gray-400 uppercase">Visit Our Workshop</p>
                  <div className="flex items-center justify-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                    <p className="text-blue-900 font-bold text-sm">{branch.address}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MAP + HOURS SECTION (Your original logic) ── */}

      {/* ── CONTACT FORM ───────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-16 items-start">
          <div className="space-y-4 pt-4">
            <div className="inline-flex items-center gap-2 border border-gray-200 rounded-full px-3 py-1.5 text-xs text-gray-500">
              <Stethoscope className="w-3.5 h-3.5 text-cyan-500" /> WHAT WE OFFER FOR YOU
            </div>
            <h2 className="text-3xl font-bold text-blue-900 leading-snug">
              Get 10% Flat Discount<br />
              For <span className="text-cyan-500">First Appointment!</span>
            </h2>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                placeholder="Name*"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="rounded-xl border-gray-200 text-sm h-12"
              />
              <Input
                placeholder="Email*"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="rounded-xl border-gray-200 text-sm h-12"
              />
            </div>
            <Input
              placeholder="Subject"
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              className="rounded-xl border-gray-200 text-sm h-12"
            />
            <Textarea
              placeholder="Text"
              rows={5}
              value={form.text}
              onChange={(e) => setForm({ ...form, text: e.target.value })}
              className="rounded-xl border-gray-200 text-sm resize-none"
            />
            <Button 
              onClick={handleSubmit}
              disabled={isPending}
              className="bg-cyan-500 hover:bg-cyan-600 text-white rounded-full px-8 h-11 font-semibold text-sm min-w-[140px]"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send Mail"
              )}
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}