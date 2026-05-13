"use client";
import {
  LayoutDashboard,
  Stethoscope,
  CalendarDays,
  Users,
  Settings,
  ShieldCheck,
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils"; // adjust if your utils path differs
 
type Section = "doctors" | "appointments";
 
interface AdminSidebarProps {
  /** Called when a same-page anchor link is clicked */
  onScrollTo?: (section: Section) => void;
}
 
const navItems = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/admin/dashboard",
  },
  {
    label: "Doctors",
    icon: Stethoscope,
    href: "/doctors",
  },
 
];
 
/** Links that scroll to a section on the current dashboard page */
const anchorItems: { label: string; icon: any; section: Section }[] = [
  { label: "Doctors List", icon: Stethoscope, section: "doctors" },
  { label: "Recent Appointments", icon: CalendarDays, section: "appointments" },
];
 
const AdminSidebar = ({ onScrollTo }: AdminSidebarProps) => {
  const router = useRouter();
  const pathname = usePathname();
 
  return (
    <aside className="fixed top-0 left-0 h-screen w-64 bg-white border-r border-slate-100 flex flex-col shadow-sm z-40">
      {/* Brand */}
      <div className="flex items-center gap-2 px-5 py-5 border-b border-slate-100">
        <div className="h-8 w-8 rounded-lg bg-cyan-500 flex items-center justify-center">
          <ShieldCheck className="h-4 w-4 text-white" />
        </div>
        <span className="font-bold text-blue-900 text-base tracking-tight">
          Admin Panel
        </span>
      </div>
 
      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {/* Regular route links */}
        {navItems.map(({ label, icon: Icon, href }) => {
          const active = pathname === href;
          return (
            <button
              key={href}
              onClick={() => router.push(href)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                active
                  ? "bg-cyan-50 text-cyan-700"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <Icon
                className={cn(
                  "h-4 w-4 shrink-0",
                  active ? "text-cyan-600" : "text-slate-400"
                )}
              />
              {label}
            </button>
          );
        })}
 
        {/* Divider + section label */}
        <div className="pt-4 pb-1 px-3">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">
            On this page
          </p>
        </div>
 
        {/* Scroll-to anchor links */}
        {anchorItems.map(({ label, icon: Icon, section }) => (
          <button
            key={section}
            onClick={() => onScrollTo?.(section)}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-cyan-50 hover:text-cyan-700 transition-all group"
          >
            <Icon className="h-4 w-4 shrink-0 text-slate-400 group-hover:text-cyan-500 transition-colors" />
            {label}
          </button>
        ))}
      </nav>
 
      {/* Footer */}
      <div className="px-5 py-4 border-t border-slate-100">
        <p className="text-xs text-slate-400">Admin · v1.0</p>
      </div>
    </aside>
  );
};
 
export default AdminSidebar;
 