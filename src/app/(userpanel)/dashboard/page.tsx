"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/zustand/useAuth";
import {
  useAdminStats,
  useDoctorAppointments,
  useUserAppointments,
} from "@/hooks/appoinment";
import { useAllDoctors } from "@/hooks/doctor.details";
import { useRazorpay } from "@/hooks/useRazorpay";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  Stethoscope,
  Users,
  CalendarDays,
  LogIn,
  ShieldCheck,
  Heart,
} from "lucide-react";
import AdminView from "@/app/(adminpanel)/admin/dashboard/page";



// ── Shared primitives ──────────────────────────────────────────────────────────

export const Loading = () => (
  <div className="flex h-[400px] w-full items-center justify-center">
    <Loader2 className="h-8 w-8 animate-spin text-cyan-500" />
  </div>
);

const HeroStrip = ({
  Icon,
  title,
  subtitle,
  gradient = "from-blue-900 via-blue-800 to-blue-700",
}: {
  Icon: any;
  title: string;
  subtitle?: string;
  gradient?: string;
}) => (
  <div className={`relative bg-gradient-to-r ${gradient} text-white overflow-hidden mb-8`}>
    {/* decorative dot grid */}
    <div
      className="absolute inset-0 opacity-10"
      style={{
        backgroundImage:
          "radial-gradient(circle, #ffffff 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    />
    <div className="relative max-w-6xl mx-auto px-8 py-12 flex items-center gap-5">
      <div className="h-14 w-14 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
        <Icon className="h-7 w-7 text-white" />
      </div>
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>
        {subtitle && <p className="text-blue-200 mt-1 text-sm">{subtitle}</p>}
      </div>
    </div>
    {/* bottom wave */}
    <svg className="w-full h-8 -mb-1" viewBox="0 0 1440 32" preserveAspectRatio="none">
      <path d="M0,32 L1440,0 L1440,32 Z" fill="white" />
    </svg>
  </div>
);

export  const StatCard = ({
  title,
  value,
  Icon,
  accent,
}: {
  title: string;
  value: number;
  Icon: any;
  accent: string;
}) => (
  <Card className="shadow-sm hover:shadow-md transition-shadow">
    <CardHeader className="pb-2 flex flex-row items-center justify-between">
      <CardTitle className="text-sm font-medium text-slate-500">{title}</CardTitle>
      <div className={`h-9 w-9 rounded-full flex items-center justify-center ${accent}`}>
        <Icon className="h-5 w-5" />
      </div>
    </CardHeader>
    <CardContent>
      <p className="text-4xl font-bold text-slate-800">{value}</p>
    </CardContent>
  </Card>
);

export const ApptTable = ({
  rows,
  cols,
  emptyMsg,
}: {
  rows: any[];
  cols: { key: string; label: string; render?: (row: any) => React.ReactNode }[];
  emptyMsg: string;
}) =>
  rows.length === 0 ? (
    <div className="text-center py-12 text-slate-400">
      <CalendarDays className="h-10 w-10 mx-auto mb-3 opacity-40" />
      <p>{emptyMsg}</p>
    </div>
  ) : (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-200">
            {cols.map((c) => (
              <th key={c.key} className="p-3 text-left text-xs uppercase tracking-wider text-slate-500 font-semibold">
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={r.id ?? i} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
              {cols.map((c) => (
                <td key={c.key} className="p-3 text-slate-700">
                  {c.render ? c.render(r) : r[c.key] ?? "-"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

const StatusBadge = ({ status }: { status: string }) => {
  const map: Record<string, string> = {
    paid: "bg-green-100 text-green-700",
    pending: "bg-yellow-100 text-yellow-700",
    cancelled: "bg-red-100 text-red-700",
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold capitalize ${map[status] ?? "bg-slate-100 text-slate-600"}`}>
      {status ?? "pending"}
    </span>
  );
};

export const fmtDate = (v: string) => {
  if (!v) return "-";
  const d = new Date(v);
  return (
    <div className="flex items-center gap-2">
      <div className="bg-blue-50 text-blue-700 rounded px-2 py-1 text-center min-w-[52px]">
        <div className="text-lg font-bold leading-none">{d.getDate()}</div>
        <div className="text-xs font-medium">{d.toLocaleString("default", { month: "short" })}</div>
      </div>
      <span className="text-slate-500 text-xs">{d.getFullYear()}</span>
    </div>
  );
};

// ── Role views ─────────────────────────────────────────────────────────────────

// const AdminView = () => {
//   const { data, isLoading } = useAdminStats();
//   const { data: doctors, isLoading: doctorsLoading } = useAllDoctors();
//   const router = useRouter();

//   if (isLoading || doctorsLoading) return <Loading />;

//   return (
//     <div className="max-w-6xl mx-auto px-4 pb-12">
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
//         <div onClick={() => router.push("/doctors")} className="cursor-pointer">
//           <StatCard title="Total Doctors" value={data?.doctors ?? 0} Icon={Stethoscope} accent="bg-cyan-100 text-cyan-600" />
//         </div>
//         <StatCard title="Total Patients" value={data?.patients ?? 0} Icon={Users} accent="bg-blue-100 text-blue-600" />
//         <StatCard title="Total Appointments" value={data?.appointments ?? 0} Icon={CalendarDays} accent="bg-green-100 text-green-600" />
//       </div>

//       {/* Doctors list */}
//       <Card className="shadow-sm mb-6">
//         <CardHeader className="border-b border-slate-100">
//           <CardTitle className="text-lg">Doctors</CardTitle>
//         </CardHeader>
//         <CardContent className="p-4">
//           {doctors && doctors.length > 0 ? (
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
//               {doctors.map((doc: any) => (
//                 <div
//                   key={doc.id}
//                   onClick={() => router.push(`/doctors`)}
//                   className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:border-cyan-200 hover:bg-cyan-50 cursor-pointer transition-all"
//                 >
//                   <div className="h-10 w-10 rounded-full bg-cyan-100 flex items-center justify-center shrink-0">
//                     <Stethoscope className="h-5 w-5 text-cyan-600" />
//                   </div>
//                   <div className="min-w-0">
//                     <p className="font-semibold text-sm text-blue-900 truncate">{doc.name}</p>
//                     <p className="text-xs text-slate-500 truncate">{doc.designation || "—"}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <p className="text-slate-400 text-sm text-center py-4">No doctors registered yet.</p>
//           )}
//         </CardContent>
//       </Card>

//       <Card className="shadow-sm">
//         <CardHeader className="border-b border-slate-100">
//           <CardTitle className="text-lg">Recent Appointments</CardTitle>
//         </CardHeader>
//         <CardContent className="p-0">
//           <ApptTable
//             rows={data?.recent ?? []}
//             emptyMsg="No appointments yet."
//             cols={[
//               { key: "name", label: "Patient" },
//               { key: "doctor", label: "Doctor" },
//               { key: "treatment", label: "Treatment" },
//               { key: "date", label: "Date", render: (r) => fmtDate(r.date) },
//               { key: "phone", label: "Phone" },
//               { key: "email", label: "Email" },
//             ]}
//           />
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

const DoctorView = () => {
  const { data, isLoading } = useDoctorAppointments();

  const uniquePatients = useMemo(() => {
    if (!data) return 0;
    const s = new Set<string>();
    data.forEach((a: any) => s.add(a.auth_id || a.email || a.phone || a.name));
    return s.size;
  }, [data]);

  const upcoming = data?.filter((a: any) => new Date(a.date) >= new Date()).length ?? 0;

  if (isLoading) return <Loading />;

  return (
    <div className="max-w-6xl mx-auto px-4 pb-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <StatCard title="Total Patients" value={uniquePatients} Icon={Users} accent="bg-cyan-100 text-cyan-600" />
        <StatCard title="Total Appointments" value={data?.length ?? 0} Icon={CalendarDays} accent="bg-blue-100 text-blue-600" />
        <StatCard title="Upcoming" value={upcoming} Icon={CalendarDays} accent="bg-green-100 text-green-600" />
      </div>

      <Card className="shadow-sm">
        <CardHeader className="border-b border-slate-100">
          <CardTitle className="text-lg">My Patients</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ApptTable
            rows={data ?? []}
            emptyMsg="No patients booked yet."
            cols={[
              { key: "name", label: "Patient" },
              { key: "email", label: "Email" },
              { key: "phone", label: "Phone" },
              { key: "treatment", label: "Treatment" },
              { key: "date", label: "Date", render: (r) => fmtDate(r.date) },
              { key: "status", label: "Payment", render: (r) => <StatusBadge status={r.status} /> },
              { key: "message", label: "Note" },
            ]}
          />
        </CardContent>
      </Card>
    </div>
  );
};

const PatientView = () => {
  const { data, isLoading, refetch } = useUserAppointments();
  const { data: doctors } = useAllDoctors();
  const { initiatePayment, loading: paymentLoading } = useRazorpay();
  const upcoming = data?.filter((a: any) => new Date(a.date) >= new Date()).length ?? 0;

  const handleRetryPayment = (appt: any) => {
    const doctor = doctors?.find((d: any) => d.name === appt.doctor);
    const fees = doctor?.fees ?? 500;
    initiatePayment({
      appointmentId: appt.id,
      amount: fees,
      name: appt.name,
      email: appt.email,
      phone: appt.phone,
      description: `Appointment with ${appt.doctor}`,
      onSuccess: () => {
        toast.success("Payment successful!");
        refetch();
      },
      onFailure: (err) => toast.error(`Payment failed: ${err}`),
    });
  };

  if (isLoading) return <Loading />;

  return (
    <div className="max-w-6xl mx-auto px-4 pb-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <StatCard title="My Appointments" value={data?.length ?? 0} Icon={CalendarDays} accent="bg-cyan-100 text-cyan-600" />
        <StatCard title="Upcoming" value={upcoming} Icon={CalendarDays} accent="bg-blue-100 text-blue-600" />
      </div>

      <Card className="shadow-sm">
        <CardHeader className="border-b border-slate-100">
          <CardTitle className="text-lg">My Appointments</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ApptTable
            rows={data ?? []}
            emptyMsg="No appointments booked yet."
            cols={[
              { key: "doctor", label: "Doctor" },
              { key: "treatment", label: "Treatment" },
              { key: "date", label: "Date", render: (r) => fmtDate(r.date) },
              { key: "status", label: "Payment", render: (r) => <StatusBadge status={r.status} /> },
              { key: "message", label: "Note" },
              {
                key: "action", label: "", render: (r) =>
                  r.status !== "paid" ? (
                    <Button
                      size="sm"
                      disabled={paymentLoading}
                      className="bg-cyan-500 hover:bg-cyan-600 text-white text-xs rounded-full px-3 h-7"
                      onClick={() => handleRetryPayment(r)}
                    >
                      {paymentLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : "Pay Now"}
                    </Button>
                  ) : null,
              },
            ]}
          />
        </CardContent>
      </Card>
    </div>
  );
};

// ── Page ───────────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const { role, user } = useAuthStore();
  const router = useRouter();

  if (!role || !user) {
    return (
      <div>
        <HeroStrip
          Icon={LogIn}
          title="Access Your Dashboard"
          subtitle="Sign in to view your personalised health portal"
        />
        <div className="max-w-md mx-auto px-4 pb-16 text-center">
          <p className="text-slate-500 mb-6">You need to be logged in to access the dashboard.</p>
          <Button
            className="bg-cyan-500 hover:bg-cyan-600 text-white rounded-full px-8 shadow-md shadow-cyan-200"
            onClick={() => router.push("/login")}
          >
            Sign In
          </Button>
        </div>
      </div>
    );
  }

  if (role === "admin") {
    return (
      <div>
        <HeroStrip
          Icon={ShieldCheck}
          title="Admin Dashboard"
          subtitle="Overview of clinic operations — doctors, patients and appointments"
          gradient="from-blue-900 via-blue-800 to-blue-700"
        />
        <AdminView />
      </div>
    );
  }

  if (role === "doctor") {
    return (
      <div>
        <HeroStrip
          Icon={Stethoscope}
          title={`Welcome, Dr. ${user.name ?? ""}`}
          subtitle="Your patient appointments and schedule at a glance"
          gradient="from-cyan-700 via-cyan-600 to-blue-700"
        />
        <DoctorView />
      </div>
    );
  }

  // patient
  return (
    <div>
      <HeroStrip
        Icon={Heart}
        title="My Health Portal"
        subtitle={`Welcome back, ${user.name ?? ""}. Track your appointments here.`}
        gradient="from-blue-900 via-blue-800 to-cyan-700"
      />
      <PatientView />
    </div>
  );
}
