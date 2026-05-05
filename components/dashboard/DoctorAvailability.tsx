import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import db from "@/lib/db";
import { Badge } from "@/components/ui/badge";

type Doctor = {
  id: string;
  name: string;
  specialization: string;
  availability_status: string;
};

export default async function DoctorAvailability() {
  const doctors: Doctor[] = await db.doctor.findMany({
    take: 6,
    orderBy: { createdAt: "desc" }, 
    select: {
      id: true,
      name: true,
      specialization: true,
      availability_status: true,
    },
  });

  return (
    <Card className="shadow-sm border-0 h-full">
      <CardHeader>
        <CardTitle className="text-base font-semibold">
          Doctor Status
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        {doctors.map((doc) => {
          const isAvailable = doc.availability_status === "Available";

          return (
            <div
              key={doc.id}
              className="flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="size-8 rounded-full bg-linear-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                  {doc.name.charAt(0)}
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {doc.name}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {doc.specialization}
                  </p>
                </div>
              </div>

              <Badge
                variant={isAvailable ? "default" : "secondary"}
                className={
                  isAvailable
                    ? "bg-green-100 text-green-700 hover:bg-green-100"
                    : ""
                }
              >
                {doc.availability_status || "Unknown"}
              </Badge>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}