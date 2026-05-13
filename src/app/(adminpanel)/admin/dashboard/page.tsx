"use client";
import { useAdminStats } from "@/hooks/appoinment";
import { useAllDoctors } from "@/hooks/doctor.details";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ApptTable,
  fmtDate,
  Loading,
  StatCard,
} from "@/app/(userpanel)/dashboard/page";
import {
  Loader2,
  Stethoscope,
  Users,
  CalendarDays,
  LogIn,
  ShieldCheck,
  Heart,
} from "lucide-react";
import { useRouter } from "next/navigation";

const AdminView = () => {
  const { data, isLoading } = useAdminStats();
  const { data: doctors, isLoading: doctorsLoading } = useAllDoctors();
  const router = useRouter();

  if (isLoading || doctorsLoading) return <Loading />;

  return (
    <div className="max-w-6xl mx-auto px-4 pb-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div onClick={() => router.push("/doctors")} className="cursor-pointer">
          <StatCard
            title="Total Doctors"
            value={data?.doctors ?? 0}
            Icon={Stethoscope}
            accent="bg-cyan-100 text-cyan-600"
          />
        </div>
        <StatCard
          title="Total Patients"
          value={data?.patients ?? 0}
          Icon={Users}
          accent="bg-blue-100 text-blue-600"
        />
        <StatCard
          title="Total Appointments"
          value={data?.appointments ?? 0}
          Icon={CalendarDays}
          accent="bg-green-100 text-green-600"
        />
      </div>

      {/* Doctors list */}
      <Card className="shadow-sm mb-6">
        <CardHeader className="border-b border-slate-100">
          <CardTitle className="text-lg">Doctors</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          {doctors && doctors.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {doctors.map((doc: any) => (
                <div
                  key={doc.id}
                  onClick={() => router.push(`/doctors`)}
                  className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:border-cyan-200 hover:bg-cyan-50 cursor-pointer transition-all"
                >
                  <div className="h-10 w-10 rounded-full bg-cyan-100 flex items-center justify-center shrink-0">
                    <Stethoscope className="h-5 w-5 text-cyan-600" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-sm text-blue-900 truncate">
                      {doc.name}
                    </p>
                    <p className="text-xs text-slate-500 truncate">
                      {doc.designation || "—"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-400 text-sm text-center py-4">
              No doctors registered yet.
            </p>
          )}
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader className="border-b border-slate-100">
          <CardTitle className="text-lg">Recent Appointments</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ApptTable
            rows={data?.recent ?? []}
            emptyMsg="No appointments yet."
            cols={[
              { key: "name", label: "Patient" },
              { key: "doctor", label: "Doctor" },
              { key: "treatment", label: "Treatment" },
              { key: "date", label: "Date", render: (r) => fmtDate(r.date) },
              { key: "phone", label: "Phone" },
              { key: "email", label: "Email" },
            ]}
          />
        </CardContent>
      </Card>
    </div>
  );
};
export default AdminView;
