import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    ArrowLeft,
    Check,
    X,
    Minus,
    Plus,
    ShoppingBasket,
    Utensils,
} from 'lucide-react';
import { getMenu } from '../../services/customerApi';
import { useCart } from '../../context/CartContext';
import { formatRupiah } from '../../utils/format';

const MenuDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addItem } = useCart();

    const [menu, setMenu] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [qty, setQty] = useState(1);

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                setLoading(true);
                const data = await getMenu();
                const found = data.find((m) => String(m.id) === id);

                if (!found) {
                    setError('Menu tidak ditemukan.');
                } else {
                    setMenu(found);
                }
            } catch (err) {
                setError('Gagal mengambil data menu. Silakan coba kembali.');
                console.error('Error mengambil menu:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchMenu();
    }, [id]);

    const handleAdd = () => {
        addItem(menu, qty);
        navigate('/');
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#FFF0DF]">
                <p className="text-sm font-medium text-gray-500">Memuat menu...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-[#FFF0DF] px-4">
                <p className="text-center text-sm text-red-500">{error}</p>
                <button
                    onClick={() => navigate('/')}
                    className="rounded-lg bg-[#F36F21] px-4 py-2 text-sm font-semibold text-white"
                >
                    Kembali ke menu
                </button>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-[#FFF0DF]">
            <div className="mx-auto w-full max-w-md">
                <section className="relative ml-[calc(50%-50vw)] w-screen rounded-b-[2rem] bg-[#F97316] px-6 pb-6 pt-16 md:rounded-b-[3rem] md:pb-8 md:pt-20">
                    <button
                        onClick={() => navigate(-1)}
                        aria-label="Kembali"
                        className="absolute left-4 top-4 p-2 text-[#3D251C] md:left-8 md:top-6 lg:left-12"
                    >
                        <ArrowLeft className="h-7 w-7 md:h-9 md:w-9 lg:h-10 lg:w-10" />
                    </button>

                    <img
                        src={menu.image}
                        alt={menu.name}
                        className="mx-auto rounded-2xl object-contain"
                        style={{ width: '100%', maxWidth: '320px' }}
                    />
                </section>

                <section className="px-6 py-4">
                    <h1 className="text-2xl font-bold text-black">{menu.name}</h1>
                    <p className="text-2xl font-bold text-[#F36F21]">
                        {formatRupiah(menu.price)}
                    </p>

                    <p className="mt-3 text-sm text-[#3D251C]">
                        {menu.description || 'Belum ada deskripsi untuk menu ini.'}
                    </p>

                    <div className="mt-5 flex items-center justify-center gap-3">
                        <button
                            onClick={() => setQty((q) => Math.max(1, q - 1))}
                            aria-label="Kurangi"
                            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F1D9C0] text-[#3D251C]"
                        >
                            <Minus size={20} />
                        </button>

                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F1D9C0] text-sm font-semibold text-[#3D251C]">
                            {qty}
                        </span>

                        <button
                            onClick={() => setQty((q) => q + 1)}
                            aria-label="Tambah"
                            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F1D9C0] text-[#3D251C]"
                        >
                            <Plus size={20} />
                        </button>
                    </div>

                    <button
                        onClick={handleAdd}
                        disabled={!menu.isAvailable}
                        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#F97316] py-3 text-base font-bold text-white disabled:cursor-not-allowed disabled:bg-gray-300"
                    >
                        <ShoppingBasket size={24} />
                        {menu.isAvailable ? 'Tambah ke Keranjang' : 'Stok Habis'}
                    </button>

                    <h2 className="mt-6 text-base font-bold text-black">
                        Informasi Lainnya
                    </h2>

                    <div className="mt-3 space-y-3">
                        <div className="flex items-center gap-3">
                            <span
                                className={`flex h-8 w-8 items-center justify-center rounded-full text-white ${
                                    menu.isAvailable ? 'bg-green-500' : 'bg-red-500'
                                }`}
                            >
                                {menu.isAvailable ? <Check size={18} /> : <X size={18} />}
                            </span>
                            <span className="text-sm text-[#3D251C]">
                                {menu.isAvailable ? 'Tersedia' : 'Habis'}
                            </span>
                        </div>

                        <div className="flex items-center gap-3">
                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white">
                                <Utensils size={18} />
                            </span>
                            <span className="text-sm text-[#3D251C]">
                                Ambil Sendiri / Delivery
                            </span>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
};

export default MenuDetailPage;