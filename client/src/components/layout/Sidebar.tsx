import { NavLink, useNavigate } from "react-router-dom";
import type { NavItem } from "../../types";
import { useAuth } from "../../context/useAuth";

const navItems: NavItem[] = [
  { label: "דשבורד", path: "/dashboard", icon: "◈" },
  { label: "ילדים", path: "/children", icon: "🧒" },
  { label: "כספים", path: "/finance", icon: "₪" },
  { label: "עובדים", path: "/employees", icon: "👤" },
  { label: "תובנות", path: "/insights", icon: "✦" },
];

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="hidden md:flex flex-col w-64 min-h-screen bg-primary shrink-0">
      {/* Brand */}
      <div className="flex flex-col items-center px-4 py-6 border-b border-primary-light">
        <img
          src="/brand_logo.jpg"
          alt="הארוחים של אילנית"
          className="w-20 h-20 rounded-2xl object-cover shadow-lg mb-3"
        />
        <p className="text-white font-bold text-sm text-center leading-tight">
          הארוחים של אילנית
        </p>
        <p className="text-primary-100 text-xs mt-1">מערכת ניהול</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-150 text-sm font-medium ${
                isActive
                  ? "bg-white/15 text-gold font-semibold"
                  : "text-primary-100 hover:bg-white/10 hover:text-white"
              }`
            }
          >
            <span className="text-lg w-6 text-center">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* User & Logout */}
      <div className="px-4 py-5 border-t border-primary-light">
        <div className="mb-3">
          <p className="text-white text-sm font-medium truncate">{user?.name}</p>
          <p className="text-primary-100 text-xs truncate">{user?.email}</p>
        </div>
        <button
          onClick={handleLogout}
          className="w-full text-right text-gold text-sm font-medium hover:text-gold-light transition-colors duration-150 flex items-center gap-2"
        >
          <span>יציאה</span>
          <span className="text-base">→</span>
        </button>
      </div>
    </aside>
  );
}
