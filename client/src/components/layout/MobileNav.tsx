import { NavLink } from "react-router-dom";
import type { NavItem } from "../../types";

const navItems: NavItem[] = [
  { label: "דשבורד", path: "/dashboard", icon: "◈" },
  { label: "ילדים", path: "/children", icon: "🧒" },
  { label: "כספים", path: "/finance", icon: "₪" },
  { label: "עובדים", path: "/employees", icon: "👤" },
  { label: "תובנות", path: "/insights", icon: "✦" },
];

export default function MobileNav() {
  return (
    <nav className="fixed bottom-0 inset-x-0 bg-white border-t border-gray-200 z-50 h-16 md:hidden">
      <div className="flex justify-around items-stretch h-full">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center flex-1 transition-colors duration-150 ${
                isActive ? "text-gold" : "text-gray-400 hover:text-primary"
              }`
            }
          >
            <span className="text-xl leading-none">{item.icon}</span>
            <span className="text-[10px] mt-1 font-medium">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
