import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import db from "@/lib/db";
import { Badge } from "@/components/ui/badge";

export default async function RecentAppointments() {
  const appointments = await db.appointment.findMany({
    take: 5,
    // Fix: Using correct schema field name
    orderBy: { appointment_date: "desc" },
    include: {
      patient: true,
      doctor: true,
    },
  });

  return (
    <Card className="shadow-sm border-0">
      <CardHeader>
        <CardTitle className="text-base font-semibold">Recent Appointments</CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-6 py-3 font-medium">Patient</th>
                <th className="px-6 py-3 font-medium">Doctor</th>
                <th className="px-6 py-3 font-medium">Date</th>
                <th className="px-6 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appt) => (
                <tr key={appt.id} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {/* Fix: Concatenating first and last name from your schema */}
                    {appt.patient 
                      ? `${appt.patient.first_name} ${appt.patient.last_name}` 
                      : "Unknown Patient"}
                  </td>
                  <td className="px-6 py-4">
                    Dr. {appt.doctor?.name || "Unknown"}
                  </td>
                  <td className="px-6 py-4">
                    {/* Fix: Using appointment_date */}
                    {new Date(appt.appointment_date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric"
                    })}
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={appt.status === "COMPLETED" ? "default" : "secondary"}>
                      {appt.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}