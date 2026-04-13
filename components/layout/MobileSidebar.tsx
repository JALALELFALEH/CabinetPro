"use client";
import { useState } from "react";
import { Menu, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Users, UserRound, CalendarCheck, Stethoscope, Activity } from "lucide-react";

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

export default function MobileSidebar({ role }: { role: string }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const items = navItems[role as keyof typeof navItems] ?? navItems.patient;

  return (
    <>
      <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setOpen(true)}>
        <Menu className="size-5" />
      </Button>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64 p-0">
          <SheetHeader className="px-6 py-5 border-b">
            <SheetTitle className="flex items-center gap-2">
              <Heart className="size-5 text-red-500" /> Kinda HMS
            </SheetTitle>
          </SheetHeader>
          <nav className="px-3 py-4 space-y-1">
            {items.map(({ href, label, icon: Icon }) => (
              <Link key={href} href={href} onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  pathname === href ? "bg-primary text-primary-foreground" : "text-gray-600 hover:bg-gray-100"
                )}
              >
                <Icon className="size-4" /> {label}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </>
  );
}