import StatCard from "@/components/dashboard/StatCard";
import RecentAppointments from "@/components/dashboard/RecentAppointments";
import DoctorAvailability from "@/components/dashboard/DoctorAvailability";
import AppointmentsChart from "@/components/dashboard/AppointmentsChart";

import { Users } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">

      {/* TOP STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          title="Patients"
          value={120}
          icon={Users}
        />

        <StatCard
          title="Appointments"
          value={45}
          icon={Users}
          trend="+12%"
        />

        <StatCard
          title="Doctors"
          value={8}
          icon={Users}
        />
      </div>

      {/* CHART + SIDE WIDGETS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        <div className="lg:col-span-2">
          <AppointmentsChart />
        </div>

        <div className="space-y-4">
          <DoctorAvailability />
        </div>

      </div>

      {/* RECENT APPOINTMENTS */}
      <RecentAppointments />

    </div>
  );
}