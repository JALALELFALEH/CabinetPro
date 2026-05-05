import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import db from "@/lib/db";
import AppointmentsChartClient from "./AppointmentsChartClient";

interface DataPoint {
  day: string;
  total: number;
  completed: number;
  scheduled: number;
}

type Appointment = {
  date: Date;
  status: "COMPLETED" | "SCHEDULED" | string;
};

export default async function AppointmentsChart() {
  const now = new Date();
  const startDate = new Date(now);
  startDate.setDate(now.getDate() - 6);
  startDate.setHours(0, 0, 0, 0);

  // ✔️ fetch once
  const appointments: Appointment[] = await db.appointment.findMany({
    where: {
      date: {
        gte: startDate,
      },
    },
    select: {
      date: true,
      status: true,
    },
  });

  // ✔️ build chart data
  const data: DataPoint[] = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(startDate);
    d.setDate(startDate.getDate() + i);

    const year = d.getFullYear();
    const month = d.getMonth();
    const dayOfMonth = d.getDate();

    const dayAppts = appointments.filter((a) => {
      const aDate = new Date(a.date);
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