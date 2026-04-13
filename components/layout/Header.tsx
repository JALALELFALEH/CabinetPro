import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import MobileSidebar from "@/components/layout/MobileSidebar";

export default async function Header({ role }: { role: string }) {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0">
      <div className="flex items-center gap-4">
        <MobileSidebar role={role} />
        <div className="hidden md:block">
          <p className="text-sm text-gray-500 capitalize">{role} Portal</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="size-4" />
          <span className="absolute top-2 right-2 size-1.5 rounded-full bg-red-500" />
        </Button>
        <UserButton afterSignOutUrl="/" />
      </div>
    </header>
  );
}