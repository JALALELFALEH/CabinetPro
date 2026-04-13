"use server";
import db from "@/lib/db";

export async function getAdminStats() {
  const [totalPatients, totalDoctors, appointmentsToday, activeStaff] =
    await Promise.all([
      db.patient.count(),
      db.doctor.count(),
      db.appointment.count({
        where: { 
          date: { gte: new Date(new Date().setHours(0, 0, 0, 0)) } 
        },
      }),
      db.staff.count({ 
        where: { isActive: true } 
      }),
    ]);

  return {
    totalPatients,
    totalDoctors,
    appointmentsToday,
    activeStaff,
    // Add these back if your frontend expects them
    patientsTrend: "+12%",
    doctorsTrend: "+2%",
    appointmentsTrend: "+8%",
    staffTrend: "0%",
  };
}

export async function getRecentAppointments(limit = 10) {
  return db.appointment.findMany({
    take: limit,
    orderBy: { date : "desc" },
    include: { 
      patient: true, 
      doctor: true 
    },
  });
}