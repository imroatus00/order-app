import { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { Home, ShoppingBasket, ClipboardList, MessageCircle, Menu, UserRound } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const CustomerLayout = () => {
    const { totalQty } = useCart();
    const [menuOpen, setMenuOpen] = useState(false);

    const navClass = ({ isActive }) =>
        `relative p-2 ${isActive ? 'text-[#F36F21]' : 'text-[#3D251C]/60'}`;

    return (
        <div className="min-h-screen bg-[#FFF0DF]">
            {/* HEADER */}
            <header className="sticky top-0 z-20 flex items-center justify-between bg-[#FFF0DF] px-4 py-3 shadow-sm">
                <Link to="/" className="flex items-center gap-2">
                    <img
                        src="/images/logo/logo-abata.png"
                        alt="Abata"
                        className="h-9 w-9 object-contain"
                    />
                    <span className="text-sm font-bold text-[#F36F21]">
                        Surabaya
                    </span>
                </Link>

                {/* Tombol menu: masuk ke login admin */}
                <Link
                    to="/admin/login"
                    aria-label="Login admin"
                    onClick={(e) => { 
                        e.preventDefault();
                        setMenuOpen(true);
                    }}
                    className="p-2 text-[#3D251C]"
                >
                    <Menu size={26} />
                </Link>
            </header>

            {/* ISI HALAMAN */}
            <div className="pb-20">
                <Outlet />
            </div>

            {/* OVERLAY GELAP (ketuk untuk menutup panel menu) */}
            <div
                aria-hidden="true"
                onClick={() => setMenuOpen(false)}
                className={`fixed inset-0 z-30 bg-black/50 transition-opacity duration-300 ${
                    menuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
                }`}
            />

            {/* PANEL MENU */}
            <div
                role="dialog"
                aria-modal="true"
                aria-label="Menu"
                aria-hidden={!menuOpen}
                className={`fixed right-0 top-0 z-40 h-full w-[57%] max-w-xs bg-[#FFF0DF] shadow-xl transition-transform duration-300 ${
                    menuOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <Link
                    to="/admin/login"
                    tabIndex={menuOpen ? 0 : -1}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 bg-[#FFF0DF] px-5 py-4 shadow-sm"
                >
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#7A3B1D] text-white">
                        <UserRound size={20} />
                    </span>
                    <span className="text-base font-medium text-[#111111]">
                        Login admin
                    </span>
                </Link>
            </div>

            {/* BOTTOM NAV */}
            <nav className="fixed bottom-0 left-0 right-0 z-20 flex justify-around border-t bg-white py-2">
                <NavLink to="/" end aria-label="Home" className={navClass}>
                    <Home size={26} />
                </NavLink>

                <NavLink to="/cart" aria-label="Keranjang" className={navClass}>
                    <ShoppingBasket size={26} />
                    {totalQty > 0 && (
                        <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#F36F21] px-1 text-[10px] font-bold text-white">
                            {totalQty}
                        </span>
                    )}
                </NavLink>

                <NavLink to="/track" aria-label="Pesanan" className={navClass}>
                    <ClipboardList size={26} />
                </NavLink>

                {/* Tombol tanya AI (belum ada fungsinya) */}
                <button
                    type="button"
                    aria-label="Tanya AI"
                    className="p-2 text-[#3D251C]/60"
                >
                    <MessageCircle size={26} />
                </button>
            </nav>
        </div>
    );
};

export default CustomerLayout;