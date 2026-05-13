"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Phone, Heart, Menu, X, User, LayoutDashboard, LogOut, Clock, AlertCircle, Facebook, Instagram, Linkedin, Mail, MapPin, Twitter } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/zustand/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function HomePage() {
  const navigate = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  
  // Get auth state and logout function from Zustand
  const { token, role, logoutUser } = useAuthStore();

  const handleAppointmentClick = () => {
    if (token) {
      role === "doctor" ? navigate.push("/dashboard") : navigate.push("/appointment");
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
    <main className="font-sans">
      {/* ── TOP INFO BAR ───────────────────────────────────────────────── */}
      <div className="bg-blue-950 text-blue-200 text-xs py-2 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-cyan-400" /> Mon–Fri: 8:00–16:00</span>
            <span className="flex items-center gap-1"><Mail className="w-3 h-3 text-cyan-400" /> maxcareservices@email.com</span>
            <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-cyan-400" /> 28 Street, New York, USA</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1 transition-colors">
              <AlertCircle className="w-3 h-3" /> 24-Hour Emergency Aid
            </button>
            <div className="flex items-center gap-2">
              {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
                <div key={i} className="w-5 h-5 flex items-center justify-center hover:text-cyan-400 cursor-pointer transition-colors">
                  <Icon className="w-3 h-3" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <header className=" top-0 left-0 right-0 z-50 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center">
              <Heart className="w-4 h-4 text-white fill-white" />
            </div>
            <span className="text-xl font-bold text-blue-900">Maxcare</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
            {navItems.map((item) => (
              <Link key={item.name} href={item.path} className="hover:text-cyan-500 transition-colors">
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <span className="text-sm text-gray-500 flex items-center gap-1">
              <Phone className="w-3 h-3 text-cyan-500" /> +123-456-7890
            </span>

            {token ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="h-9 w-9 cursor-pointer border border-gray-200 hover:opacity-80 transition">
                    <AvatarImage src="" alt="User" />
                    <AvatarFallback className="bg-cyan-100 text-cyan-700">
                      <User className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate.push('/dashboard')}>
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </DropdownMenuItem>

                  <DropdownMenuItem onClick={() => navigate.push('/profile')}>
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>

                  <DropdownMenuItem onClick={() => navigate.push(role === 'doctor' ? '/dashboard' : '/appointment')} className="text-black ">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    <span>Appointment</span>
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                className="bg-cyan-500 hover:bg-cyan-600 text-white text-sm rounded-full px-5"
                onClick={handleAppointmentClick}
              >
                Book Appointment
              </Button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t px-4 pb-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className="block py-2 text-sm text-gray-600 hover:text-cyan-500"
                onClick={() => setMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Button
              className="w-full mt-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-full"
              onClick={handleAppointmentClick}
            >
              {token ? "Go to Dashboard" : "Book Appointment"}
            </Button>
            {token && (
               <Button
               variant="outline"
               className="w-full mt-2 rounded-full border-red-200 text-red-600"
               onClick={handleLogout}
             >
               Logout
             </Button>
            )}
          </div>
        )}
      </header>
    </main>
  );
} 