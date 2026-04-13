"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard, Users, UserRound, CalendarCheck,
  Stethoscope, Activity, Settings, Heart,
} from "lucide-react";

const navItems = {
  admin: [
    { href: "/admin/dashboard",    label: "Dashboard",    icon: LayoutDashboard },
    { href: "/admin/patients",     label: "Patients",     icon: Users },
    { href: "/admin/doctors",      label: "Doctors",      icon: UserRound },
    { href: "/admin/nurses",       label: "Nurses",       icon: Activity },
    { href: "/admin/appointments", label: "Appointments", icon: CalendarCheck },
    { href: "/admin/staff",        label: "Staff",        icon: Stethoscope },
  ],
  doctor: [
    { href: "/doctor/dashboard",    label: "Dashboard",    icon: LayoutDashboard },
    { href: "/doctor/appointments", label: "Appointments", icon: CalendarCheck },
    { href: "/doctor/patients",     label: "My Patients",  icon: Users },
  ],
  patient: [
    { href: "/patient/dashboard",    label: "Dashboard",   icon: LayoutDashboard },
    { href: "/patient/appointments", label: "Appointments",icon: CalendarCheck },
    { href: "/patient/doctors",      label: "Find Doctors",icon: UserRound },
  ],
};

export default function Sidebar({ role }: { role: string }) {
  const pathname = usePathname();
  const items = navItems[role as keyof typeof navItems] ?? navItems.patient;

  return (
    <aside className="hidden md:flex w-64 flex-col bg-white border-r border-gray-200">
      <div className="flex items-center gap-2 px-6 py-5 border-b border-gray-100">
        <Heart className="size-6 text-red-500" />
        <span className="text-lg font-bold text-gray-900">Kinda HMS</span>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1">
        {items.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
              pathname === href || pathname.startsWith(href + "/")
                ? "bg-primary text-primary-foreground"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            )}
          >
            <Icon className="size-4 shrink-0" />
            {label}
          </Link>
        ))}
      </nav>
      <div className="px-3 py-4 border-t border-gray-100">
        <Link
          href="/settings"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
        >
          <Settings className="size-4" />
          Settings
        </Link>
      </div>
    </aside>
  );
}