import { formatRupiah } from '../../utils/format';
import { useCart } from '../../context/CartContext';

const MenuCard = ({ menu }) => {
    const { addItem } = useCart();
    return (
        <div className="overflow-hidden rounded-xl bg-white shadow-md transition duration-200 hover:-translate-y-1 hover:shadow-lg">
            <div className="relative aspect-[6/4] overflow-hidden">
                <img
                    src={menu.image}
                    alt={menu.name}
                    className="h-full w-full object-cover"
                />

                {!menu.isAvailable && (
                    <span className="absolute right-2 top-2 rounded-full bg-red-500 px-2 py-1 text-xs font-medium text-white">
                        Habis
                    </span>
                )}
            </div>

            <div className="p-2 md:p-3">
                <h3 className="truncate text-xs font-bold text-[#3D251C] md:text-sm">
                    {menu.name}
                </h3>
                <p className="mt-1 text-sm font-bold text-[#F36F21] md:text-sm">
                    {formatRupiah(menu.price)}
                </p>
                <button
                onClick={() => addItem(menu)}
                disabled={!menu.isAvailable}
                className="mt-2 w-full rounded-lg bg-[#F36F21] py-1.5 text-xs font-semibold text-white disabled:cursor-not-allowed disabled:bg-gray-300"
                >
                    + Tambah
                </button>
            </div>
        </div>
    );
};

export default MenuCard;