import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  trend?: string;
  colorClass?: string;
  iconColor?: string;
}

export default function StatCard({
  title, value, icon: Icon, trend, colorClass = "", iconColor = "text-primary",
}: StatCardProps) {
  const isPositive = trend?.startsWith("+");
  return (
    <Card className={cn("border-0 shadow-sm", colorClass)}>
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
            {trend && (
              <p className={cn("text-xs mt-1 font-medium",
                isPositive ? "text-green-600" : trend === "0%" ? "text-gray-500" : "text-red-500"
              )}>
                {trend} from last month
              </p>
            )}
          </div>
          <div className={cn("p-3 rounded-xl bg-white/60", iconColor)}>
            <Icon className="size-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}