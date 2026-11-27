import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  ClipboardCheck,
  LogOut,
  ShoppingBasket,
  UtensilsCrossed,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const BROWN = "#6B3416";
const ORANGE = "#F47B20";
const FONT = '"Poppins", system-ui, sans-serif';

const NAV = [
  { to: "/admin/orders", label: "Pesanan", icon: ShoppingBasket, end: true },
  { to: "/admin/orders/offline", label: "Input pesanan offline", icon: ClipboardCheck },
  { to: "/admin/menu", label: "Kelola menu", icon: UtensilsCrossed },
];

const baseItemStyle = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  width: "100%",
  height: "56px",
  padding: "0 16px",
  boxSizing: "border-box",
  border: "none",
  borderRadius: 0,
  margin: 0,
  textAlign: "left",
  textDecoration: "none",
  cursor: "pointer",
  color: "#FFFFFF",
  fontFamily: FONT,
  fontSize: "13px",
  fontWeight: 500,
  lineHeight: 1.2,
};

const itemStyle = (active) => ({
  ...baseItemStyle,
  backgroundColor: active ? ORANGE : "transparent",
});

const iconBoxStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "24px",
  height: "24px",
  flexShrink: 0,
};

function Brand() {
  const [logoError, setLogoError] = useState(false);

  return (
    <div style={{ padding: "32px 12px 20px", textAlign: "center" }}>
      {logoError ? (
        <div
          style={{
            width: "80px",
            height: "80px",
            margin: "0 auto",
            borderRadius: "9999px",
            backgroundColor: ORANGE,
            color: "#FFFFFF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: FONT,
            fontWeight: 700,
          }}
        >
          äbata
        </div>
      ) : (
        <img
          src="/images/logo/logo-abata.png"
          alt="Abata Saudi Fried Chicken"
          style={{
            width: "80px",
            height: "80px",
            margin: "0 auto",
            borderRadius: "9999px",
            objectFit: "cover",
            display: "block",
          }}
          onError={() => setLogoError(true)}
        />
      )}
      <p
        style={{
          margin: "12px 0 0",
          fontFamily: FONT,
          fontSize: "11px",
          fontWeight: 600,
          color: ORANGE,
        }}
      >
        Surabaya
      </p>
      <p
        style={{
          margin: "2px 0 0",
          fontFamily: FONT,
          fontSize: "10px",
          lineHeight: 1.4,
          color: ORANGE,
        }}
      >
        Jl. Medokan Asri Bar. IV, Kec. Rungkut
      </p>
    </div>
  );
}

export default function AdminLayout() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100%",
        overflow: "hidden",
        backgroundColor: "#FFFFFF",
        fontFamily: FONT,
      }}
    >
      <aside
        style={{
          width: "224px",
          flexShrink: 0,
          height: "100vh",
          backgroundColor: BROWN,
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
        }}
      >
        <Brand />

        <nav style={{ display: "flex", flexDirection: "column", marginTop: "8px" }}>
          {NAV.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              style={({ isActive }) => itemStyle(isActive)}
            >
              <span style={iconBoxStyle}>
                <Icon size={22} strokeWidth={1.8} />
              </span>
              <span>{label}</span>
            </NavLink>
          ))}

          <button type="button" onClick={handleLogout} style={itemStyle(false)}>
            <span style={iconBoxStyle}>
              <LogOut size={22} strokeWidth={1.8} />
            </span>
            <span>Keluar</span>
          </button>
        </nav>
      </aside>

      <main
        style={{
          flex: 1,
          minWidth: 0,
          height: "100vh",
          overflowY: "auto",
          backgroundColor: "#FFFFFF",
        }}
      >
        <Outlet />
      </main>
    </div>
  );
}