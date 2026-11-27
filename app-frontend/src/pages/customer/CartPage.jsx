import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Trash2, X } from 'lucide-react';
import CartItem from '../../components/customer/CartItem';
import { useCart } from '../../context/CartContext';
import { formatRupiah } from '../../utils/format';

//ini menu kerangjang

const CartPage = () => {
    const navigate = useNavigate();
    const { items, addItem, decreaseItem, removeItem, totalPrice } = useCart();

    const [selectMode, setSelectMode] = useState(false);
    const [selected, setSelected] = useState([]);
    const [confirm, setConfirm] = useState(false);

    const allSelected = items.length > 0 && selected.length === items.length;

    const toggle = (id) =>
        setSelected((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );

    const exitSelectMode = () => {
        setSelectMode(false);
        setSelected([]);
        setConfirm(false);
    };

    const handleDelete = () => {
        selected.forEach((id) => removeItem(id));
        exitSelectMode();
    };

    return (
        <main className="flex min-h-screen flex-col bg-[#FFF0DF]">
            <header className="sticky top-0 z-10 flex items-center gap-3 bg-white px-4 py-3 shadow-sm">
                <button
                    onClick={selectMode ? exitSelectMode : () => navigate('/')}
                    aria-label={selectMode ? 'Batal pilih' : 'Kembali'}
                    className="p-1"
                >
                    {selectMode ? <X size={26} /> : <ArrowLeft size={26} />}
                </button>

                <h1 className="flex-1 text-lg font-bold">
                    {selectMode ? 'Pilih menu' : 'Keranjang'}
                </h1>

                {selectMode ? (
                    <label className="flex items-center gap-2 text-sm">
                        <input
                            type="checkbox"
                            checked={allSelected}
                            onChange={() => setSelected(allSelected ? [] : items.map((i) => i.id))}
                            className="h-5 w-5 accent-[#F97316]"
                        />
                        Semua
                    </label>
                ) : (
                    items.length > 0 && (
                        <button onClick={() => setSelectMode(true)} aria-label="Hapus menu" className="p-1">
                            <Trash2 size={26} />
                        </button>
                    )
                )}
            </header>

            <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col px-4 pb-6 md:max-w-3xl md:px-6 lg:max-w-5xl">
                {items.length === 0 ? (
                    <p className="py-16 text-center text-sm text-gray-500">Keranjang masih kosong.</p>
                ) : (
                    <>
                        {items.map((item) => (
                            <CartItem
                                key={item.id}
                                item={item}
                                selectMode={selectMode}
                                selected={selected.includes(item.id)}
                                onSelect={() => toggle(item.id)}
                                onPlus={() => addItem(item, 1)}
                                onMinus={() => decreaseItem(item.id)}
                            />
                        ))}

                        <div className="mt-auto pt-8">
                            <div className="flex justify-between rounded-xl bg-[#FBCFA8] p-4 font-bold md:p-5 md:text-xl lg:p-6 lg:text-2xl">
                                <span>Total</span>
                                <span>{formatRupiah(totalPrice)}</span>
                            </div>

                            {selectMode ? (
                                <button
                                    onClick={() => setConfirm(true)}
                                    disabled={selected.length === 0}
                                    className="mt-4 w-full rounded-xl bg-red-600 py-3 font-bold text-white disabled:bg-gray-300 md:py-4 md:text-lg lg:text-xl"
                                >
                                    Hapus ({selected.length})
                                </button>
                            ) : (
                                <button
                                    onClick={() => navigate('/checkout')}
                                    className="mt-4 flex w-full items-center justify-center gap-3 rounded-xl bg-[#F97316] py-3 font-bold text-white md:py-4 md:text-lg lg:text-xl"
                                >
                                    <span className="text-lg font-bold md:text-2xl lg:text-3xl">
                                        Lanjutkan Pemesanan
                                    </span>
                                    <ArrowRight className="h-6 w-6 md:h-7 md:w-7 lg:h-8 lg:w-8" />
                                </button>
                            )}
                        </div>
                    </>
                )}
            </div>

            {confirm && (
                <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/50 px-6">
                    <div className="w-full max-w-xs rounded-2xl bg-white p-5 text-center">
                        <p className="font-semibold">Hapus {selected.length} menu dari keranjang?</p>
                        <div className="mt-4 flex gap-3">
                            <button onClick={() => setConfirm(false)} className="flex-1 rounded-lg border py-2">
                                Batal
                            </button>
                            <button onClick={handleDelete} className="flex-1 rounded-lg bg-red-600 py-2 font-semibold text-white">
                                Ya, hapus
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
};

export default CartPage;