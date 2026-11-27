import { Minus, Plus } from 'lucide-react';
import { formatRupiah } from '../../utils/format';

const CartItem = ({ item, selectMode, selected, onSelect, onPlus, onMinus }) => (
    <div className="flex items-center gap-3 border-b-2 border-[#FBCFA8] py-4 md:gap-5 md:py-5 lg:gap-6 lg:py-6">
        {selectMode && (
            <input
                type="checkbox"
                checked={selected}
                onChange={onSelect}
                aria-label={`Pilih ${item.name}`}
                className="h-5 w-5 shrink-0 accent-[#F97316] lg:h-6 lg:w-6"
            />
        )}

        <img
            src={item.image}
            alt={item.name}
            className="h-20 w-24 shrink-0 rounded-lg object-contain md:h-28 md:w-36 lg:h-36 lg:w-48"
        />

        <div className="min-w-0 flex-1">
            <p className="font-semibold text-black md:text-xl lg:text-2xl">{item.name}</p>
            <p className="text-sm text-gray-500 md:text-base lg:text-xl">{formatRupiah(item.price)}</p>
        </div>

        {selectMode ? (
            <span className="text-sm text-[#3D251C] md:text-lg lg:text-xl">{item.qty}x</span>
        ) : (
            <div className="flex shrink-0 items-center rounded-md bg-[#FBCFA8]">
                <button
                    onClick={onMinus}
                    disabled={item.qty <= 1}
                    aria-label="Kurangi"
                    className="p-1.5 disabled:opacity-40 md:p-2.5 lg:p-3"
                >
                    <Minus className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6" />
                </button>
                <span className="min-w-8 bg-white py-1 text-center text-sm font-semibold md:min-w-12 md:py-2 md:text-lg lg:min-w-14 lg:py-2.5 lg:text-xl">
                    {item.qty}
                </span>
                <button onClick={onPlus} aria-label="Tambah" className="p-1.5 md:p-2.5 lg:p-3">
                    <Plus className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6" />
                </button>
            </div>
        )}
    </div>
);

export default CartItem;