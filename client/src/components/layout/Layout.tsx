import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import MobileNav from "./MobileNav";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen bg-surface">
      {/* Sidebar — right side in RTL flex */}
      <Sidebar />

      {/* Main content */}
      <main className="flex-1 min-w-0 flex flex-col">
        <div className="flex-1 p-4 md:p-8 pb-20 md:pb-8">
          {children}
        </div>
        {/* Mobile bottom nav */}
        <MobileNav />
      </main>
    </div>
  );
}
