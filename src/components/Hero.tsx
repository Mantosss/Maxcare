"use client"
import { Button } from "./ui/button";
import { Calendar, MapPin, Clock, Phone, Play, CheckCircle, Star } from "lucide-react";
import { Badge } from "./ui/badge";
import BannerImg from "../../public/Banner.png"; // adjust path if needed
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/zustand/useAuth";
import { useState } from "react";


const Hero = () => {
    const navigate = useRouter();
    const imgSrc = typeof BannerImg === "string" ? BannerImg : BannerImg.src;
    
      const [menuOpen, setMenuOpen] = useState(false);
      
      // Get auth state and logout function from Zustand
      const { token, role, logoutUser } = useAuthStore();
    
      const handleAppointmentClick = () => {
        if (token) {
          role === "doctor" ? navigate.push("/doctor/dashboard") : navigate.push("/appointment");
        } else {
          navigate.push("/login");
        }
      };
    
      const handleLogout = () => {
        logoutUser();
        navigate.push("/");
      };
    
      const navItems = [
        { name: "Home", path: "/" },
        { name: "About", path: "/aboutus" },
        { name: "Services", path: "/services" },
        { name: "Doctors", path: "/doctors" },
        { name: "Blog", path: "/blog" },
        { name: "Contact", path: "/contactus" },
      ];
 
    return (
        <div>
            {/* ── HERO ───────────────────────────────────────────────────────── */}
            <section className="relative min-h-screen overflow-hidden flex items-center pt-16">
 
                {/* Full-width background image */}
                <img
                    src={imgSrc}
                    alt="Medical team"
                    className="absolute inset-0 w-full h-full object-cover object-center"
                />
 
                {/* Dark blue gradient overlay — strong on the left, fades to transparent on right */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-950 via-blue-900/80 to-transparent" />
 
                {/* Subtle dot pattern on left for depth */}
                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
                        backgroundSize: "28px 28px",
                    }}
                />
 
                {/* ── Content ── */}
                <div className="relative z-10 max-w-7xl mx-auto px-6 w-full py-28">
                    <div className="max-w-xl space-y-6">
 
                        <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-400/30 text-xs px-3 py-1">
                            🏥 Trusted Healthcare
                        </Badge>
 
                        <h1 className="text-4xl md:text-5xl font-bold leading-tight text-white">
                            Maximum Care For{" "}
                            <span className="text-cyan-400">Patient Health Issues</span>{" "}
                            and Wellbeing
                        </h1>
 
                        <p className="text-blue-200 text-sm leading-relaxed max-w-md">
                            We provide comprehensive medical care with a team of experienced professionals
                            dedicated to your health and wellness journey.
                        </p>
 
                        <div className="flex items-center gap-4 pt-2">
                            <Button onClick={handleAppointmentClick}className="bg-cyan-500 hover:bg-cyan-600 text-white rounded-full px-7 py-3 font-semibold shadow-lg shadow-cyan-500/30">
                                Book Appointment
                            </Button>
                            <button className="flex items-center gap-2 text-white text-sm hover:text-cyan-300 transition-colors">
                                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition">
                                    <Play className="w-4 h-4 fill-white" />
                                </div>
                                Watch Video
                            </button>
                        </div>
 
                        {/* Floating trust badges */}
                        <div className="flex items-center gap-3 pt-4">
                            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-2 text-xs font-semibold text-white flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-green-400" /> 100% Certified
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-2 text-xs font-semibold text-white flex items-center gap-2">
                                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" /> 4.9 Patient Rating
                            </div>
                        </div>
                    </div>
                </div>
 
                {/* ── Bottom info strip ── */}
                <div className="absolute bottom-0 left-0 right-0 z-10">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-blue-950/70 backdrop-blur-md rounded-t-2xl p-5 border-t border-white/10">
                            {[
                                { icon: <Calendar className="w-5 h-5 text-cyan-400" />, label: "Our Appointment", sub: "Schedule Now" },
                                { icon: <MapPin className="w-5 h-5 text-cyan-400" />,   label: "Find A Doctor",   sub: "Search Specialist" },
                                { icon: <Clock className="w-5 h-5 text-cyan-400" />,    label: "Set The Date",    sub: "Pick a Slot" },
                                { icon: <Phone className="w-5 h-5 text-cyan-400" />,    label: "Opening Hours",   sub: "Mon–Sat 8am–8pm" },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3 text-white">
                                    <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center shrink-0">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold">{item.label}</p>
                                        <p className="text-xs text-blue-300">{item.sub}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
 
export default Hero;