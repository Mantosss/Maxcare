"use client";

import React, { useState } from "react";
import { useCreateAppointment } from "@/hooks/appoinment";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Phone,
  Mail,
  Clock,
  Star,
  ChevronRight,
  Plus,
  Minus,
  ExternalLink,
  ArrowRight,
  Stethoscope,
  Users,
  Loader2,
  X,
} from "lucide-react";
import { useAllDoctors } from "@/hooks/doctor.details";
import { useAuthStore } from "@/zustand/useAuth";
import { useRazorpay } from "@/hooks/useRazorpay";
import { toast } from "sonner";

export default function AppointmentPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { user } = useAuthStore(); // Get user from Zustand
  const { data: doctors, isLoading: loadingDoctors } = useAllDoctors();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    doctor: "",
    treatment: "",
    date: "",
    message: "",
  });

  const mutation = useCreateAppointment();
  const { initiatePayment, loading: paymentLoading } = useRazorpay();

  // ── SMOOTH SCROLL LOGIC ──────────────────────────────────────────
  const scrollToForm = () => {
    const element = document.getElementById("booking-form-section");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  // ── DATABASE SUBMISSION ──────────────────────────────────────────
  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(
      { ...form, auth_id: user?.auth_id },
      {
        onSuccess: (data: any) => {
          const appointmentId = data?.id;
          const fees = selectedDoctor?.fees ?? 500;

          if (!appointmentId) {
            toast.success("Appointment booked!");
            return;
          }

          // Trigger Razorpay payment after booking
          initiatePayment({
            appointmentId,
            amount: fees,
            name: form.fullName,
            email: form.email,
            phone: form.phone,
            description: `Appointment with ${form.doctor}`,
            onSuccess: (paymentId) => {
              toast.success("Payment successful! Appointment confirmed.");
              setForm({ fullName: "", email: "", phone: "", doctor: "", treatment: "", date: "", message: "" });
            },
            onFailure: (err) => {
              toast.error(`Payment failed: ${err}. Your appointment is saved — pay later from dashboard.`);
              setForm({ fullName: "", email: "", phone: "", doctor: "", treatment: "", date: "", message: "" });
            },
          });
        },
        onError: (error: any) => {
          toast.error("Error: " + error.message);
        },
      },
    );
  };

  // Find the doctor object that matches the name selected in the form
  const selectedDoctor = doctors?.find((doc) => doc.name === form.doctor);

  // We treat the designation as the available "treatment"
  const availableTreatment = selectedDoctor?.designation;

  const faqs = [
    "What papers needed for hospital admission?",
    "How to get appointment of a specialized doctor?",
    "What papers needed for hospital admission?",
    "How much time it takes for a test result?",
    "What is the payment methods on your hospital?",
  ];

  return (
    <main className="font-sans">
      {/* ── HERO BREADCRUMB ────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 py-16 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/10 rounded-full blur-2xl" />
          <svg
            className="absolute bottom-0 left-0 w-full opacity-10"
            viewBox="0 0 1440 80"
            preserveAspectRatio="none"
          >
            <path
              d="M0,40 C360,80 720,0 1440,40 L1440,80 L0,80 Z"
              fill="white"
            />
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <h1 className="text-4xl font-bold text-white mb-3">
            Make Appointment
          </h1>
          <div className="flex items-center gap-2 text-sm text-blue-200">
            <a href="/" className="hover:text-white transition-colors">
              Home
            </a>
            <ChevronRight className="w-3 h-3" />
            <span className="text-cyan-300">Make Appointment</span>
          </div>
        </div>
      </section>

      {/* ── THREE INFO CARDS ───────────────────────────────────────────── */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <Card className="overflow-hidden shadow-md hover:shadow-lg transition-shadow">
            <div className="bg-gradient-to-br from-blue-800 to-blue-600 p-5 text-white h-36 flex flex-col justify-between">
              <Badge className="bg-white/20 text-white border-white/30 text-xs w-fit">
                Welcome to Maxcare
              </Badge>
              <h3 className="text-xl font-bold leading-snug">
                Committed to Ensure Quality Healthcare
              </h3>
            </div>
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-blue-900 text-base">
                  Get Appointment
                </h4>
                <div
                  onClick={scrollToForm}
                  className="w-7 h-7 rounded-full bg-cyan-500 flex items-center justify-center cursor-pointer hover:bg-cyan-600 transition"
                >
                  <Plus className="w-3.5 h-3.5 text-white" />
                </div>
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">
                Call us 24/7 with any emergency or to schedule an appointment &
                check your health.
              </p>
              <button
                onClick={scrollToForm}
                className="flex items-center gap-2 text-cyan-600 text-xs font-semibold hover:gap-3 transition-all"
              >
                Request An Appointment <ArrowRight className="w-3 h-3" />
              </button>
            </CardContent>
          </Card>

          {/* Card 2 */}
          <Card className="shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-blue-900 text-base">
                  Visit Our Center
                </h4>
                <ExternalLink className="w-4 h-4 text-cyan-500" />
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">
                With more than twenty one locations across the country, we are
                confident in providing the best care.
              </p>
              <button
                onClick={scrollToForm}
                className="flex items-center gap-2 text-cyan-600 text-xs font-semibold hover:gap-3 transition-all"
              >
                Request An Appointment <ArrowRight className="w-3 h-3" />
              </button>
            </CardContent>
          </Card>

          {/* Card 3 */}
          <Card className="bg-gradient-to-br from-cyan-500 to-cyan-400 shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6 space-y-4 text-white">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-white text-base">
                  Opening Hours
                </h4>
                <Clock className="w-4 h-4 text-white/70" />
              </div>
              <div className="space-y-2 text-sm">
                {[
                  { day: "Monday – Thursday", time: "08:00 – 18:00" },
                  { day: "Friday", time: "08:00 – 18:00" },
                  { day: "Saturday", time: "08:00 – 18:00" },
                  { day: "Sunday", time: "08:00 – 18:00" },
                ].map((row) => (
                  <div
                    key={row.day}
                    className="flex justify-between text-xs border-b border-white/20 pb-1"
                  >
                    <span className="text-white/80">{row.day}</span>
                    <span className="font-semibold">{row.time}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={scrollToForm}
                className="flex items-center gap-2 text-white text-xs font-semibold hover:gap-3 transition-all"
              >
                Request An Appointment <ArrowRight className="w-3 h-3" />
              </button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ── TESTIMONIALS ───────────────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-12">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-cyan-500 text-xs font-semibold">
                <Stethoscope className="w-4 h-4" /> TESTIMONIAL
              </div>
              <h2 className="text-3xl font-bold text-blue-900">
                What Happy Patients Say About Us
              </h2>
            </div>
            <div className="md:max-w-xs text-gray-500 text-sm leading-relaxed">
              <p>
                At Maxcare, we are dedicated to delivering exceptional
                healthcare with compassion and integrity.
              </p>
            </div>
          </div>
          {/* (Testimonial UI omitted here for code length, but remains in your file) */}
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────── */}
      <section className="py-16 bg-gradient-to-br from-cyan-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center">
            <div className="w-80 h-96 bg-cyan-200/40 rounded-full flex items-center justify-center overflow-hidden">
              <Stethoscope className="w-20 h-20 text-blue-400 opacity-40" />
            </div>
          </div>
          <div className="space-y-5">
            <h2 className="text-3xl font-bold text-blue-900">
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="border rounded-xl bg-white overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-4 text-left"
                  >
                    <span className="text-sm font-medium text-gray-700">
                      {faq}
                    </span>
                    {openFaq === i ? (
                      <Minus className="w-4 h-4 text-cyan-500" />
                    ) : (
                      <Plus className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                  {openFaq === i && (
                    <div className="px-4 pb-4 text-xs text-gray-500">
                      Contact our reception desk for detailed guidance.
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── BOOK APPOINTMENT FORM ──────────────────────────────────────── */}
      <section
        id="booking-form-section"
        className="relative min-h-[600px] flex items-center scroll-mt-20"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700">
          <div className="absolute inset-0 bg-blue-950/60" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 w-full flex justify-end">
          <Card className="w-full max-w-lg shadow-2xl">
            <CardContent className="p-8 space-y-5">
              <div className="text-center space-y-1">
                <h2 className="text-2xl font-bold text-blue-900">
                  Book An Appointment
                </h2>
                <p className="text-xs text-gray-500">
                  Submit this form to schedule your session.
                </p>
              </div>

              <form onSubmit={handleBooking} className="space-y-5">
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    required
                    placeholder="*Full Name"
                    value={form.fullName}
                    onChange={(e) =>
                      setForm({ ...form, fullName: e.target.value })
                    }
                  />
                  <Input
                    required
                    placeholder="*Email Address"
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                  />
                  <Input
                    required
                    placeholder="*Phone Number"
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                  />

                  {/* DYNAMIC DOCTOR SELECT */}
                  <Select
                    onValueChange={(v) => setForm({ ...form, doctor: v })}
                    value={form.doctor}
                    required
                  >
                    <SelectTrigger className="text-sm text-gray-400">
                      <SelectValue
                        placeholder={
                          loadingDoctors
                            ? "Loading doctors..."
                            : "Choose Doctor"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {doctors?.map((doc) => (
                        <SelectItem key={doc.id} value={doc.name}>
                          {doc.name}
                        </SelectItem>
                      ))}
                      {doctors?.length === 0 && (
                        <div className="p-2 text-xs text-gray-400">
                          No doctors available
                        </div>
                      )}
                    </SelectContent>
                  </Select>

                  {/* DYNAMIC TREATMENT SELECT */}
                  <Select
                    onValueChange={(v) => setForm({ ...form, treatment: v })}
                    value={form.treatment}
                    required
                    disabled={!form.doctor}
                  >
                    <SelectTrigger className="text-sm text-gray-400">
                      <SelectValue
                        placeholder={
                          form.doctor
                            ? "Select Specialist Treatment"
                            : "Choose a doctor first"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {availableTreatment ? (
                        <SelectItem value={availableTreatment}>
                          {availableTreatment}
                        </SelectItem>
                      ) : (
                        <div className="p-2 text-xs text-gray-400">
                          No treatment data for this doctor
                        </div>
                      )}
                    </SelectContent>
                  </Select>

                  <Input
                    required
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                  />
                </div>

                {/* MESSAGE TEXTAREA */}
                <Textarea
                  placeholder="Your Message (Optional)"
                  rows={3}
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                />

                {/* BOOK APPOINTMENT BUTTON */}
                <Button
                  type="submit"
                  disabled={mutation.isPending || paymentLoading}
                  className="w-full bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl font-semibold py-6 flex items-center justify-center gap-2"
                >
                  {mutation.isPending ? (
                    <><Loader2 className="animate-spin w-5 h-5" /> Booking...</>
                  ) : paymentLoading ? (
                    <><Loader2 className="animate-spin w-5 h-5" /> Processing Payment...</>
                  ) : (
                    <>Book &amp; Pay <ArrowRight className="w-4 h-4" /></>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
