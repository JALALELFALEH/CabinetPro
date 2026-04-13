import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import db from "@/lib/db";
import AppointmentsChartClient from "./AppointmentsChartClient";

export default async function AppointmentsChart() {
  const now = new Date();
  const startDate = new Date(now);
  startDate.setDate(now.getDate() - 6);
  startDate.setHours(0, 0, 0, 0);

  const appointments = await db.appointment.findMany({
    where: { 
      // Fix 1: Changed 'date' to 'appointment_date'
      appointment_date: { gte: startDate } 
    },
    // Fix 2: Changed 'date' to 'appointment_date'
    select: { appointment_date: true, status: true },
  });

  const data = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(startDate);
    d.setDate(startDate.getDate() + i);
    
    const year = d.getFullYear();
    const month = d.getMonth();
    const dayOfMonth = d.getDate();

    const dayAppts = appointments.filter((a) => {
      // Fix 3: Access 'appointment_date' instead of 'date'
      const aDate = new Date(a.appointment_date);
      return (
        aDate.getFullYear() === year &&
        aDate.getMonth() === month &&
        aDate.getDate() === dayOfMonth
      );
    });

    return {
      day: d.toLocaleDateString("en-US", { weekday: "short" }),
      total: dayAppts.length,
      completed: dayAppts.filter((a) => a.status === "COMPLETED").length,
      scheduled: dayAppts.filter((a) => a.status === "SCHEDULED").length,
    };
  });

  return (
    <Card className="shadow-sm border-0">
      <CardHeader>
        <CardTitle className="text-base font-semibold">
          Weekly Appointments
        </CardTitle>
      </CardHeader>
      <CardContent>
        <AppointmentsChartClient data={data} />
      </CardContent>
    </Card>
  );
}