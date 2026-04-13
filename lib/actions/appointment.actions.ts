"use server";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import db from "@/lib/db";
import { z } from "zod";

const appointmentSchema = z.object({
  doctorId: z.string().min(1),
  date: z.string().min(1),
  time: z.string().min(1),
  reason: z.string().min(3).max(500),
  type: z.string().min(1), // Changed to string to match your schema's type field
});

export type AppointmentFormData = z.infer<typeof appointmentSchema>;

export async function createAppointment(data: AppointmentFormData) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const validated = appointmentSchema.parse(data);

  // Fix 1: Error ts(2353) - check your schema, it might be externalId or id
  // Based on common Clerk integrations, I'll use 'id' or your specific field
  const patient = await db.patient.findUnique({ 
    where: { id: userId } // Assuming patient.id matches Clerk's userId
  });
  
  if (!patient) throw new Error("Patient not found");

  // Fix 2: Field names must use underscores (patient_id, appointment_date)
  const appointment = await db.appointment.create({
    data: {
      patient_id: patient.id,
      doctor_id: validated.doctorId,
      appointment_date: new Date(`${validated.date}T${validated.time}`),
      reason: validated.reason,
      type: validated.type,
      status: "SCHEDULED",
      time: validated.time, // Your schema has a specific 'time' string field
    },
  });

  revalidatePath("/patient/appointments");
  revalidatePath("/doctor/appointments");
  return appointment;
}

export async function cancelAppointment(id: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  // Fix 3: Error ts(2322) - Convert string ID from URL to Number
  await db.appointment.update({
    where: { id: Number(id) }, 
    data: { status: "CANCELLED" },
  });

  revalidatePath("/patient/appointments");
  revalidatePath("/doctor/appointments");
  revalidatePath("/admin/appointments");
}