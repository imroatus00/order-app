import { Link } from 'react-router-dom';
import { formatRupiah } from '../../utils/format';

const MenuCard = ({ menu }) => {
    return (
        <Link
            to={`/menu/${menu.id}`}
            className="block h-full overflow-hidden rounded-xl bg-white shadow-md transition duration-200 hover:-translate-y-1 hover:shadow-lg"
        >
            <div className="relative aspect-[4/3] overflow-hidden">
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
                <p className="mt-1 text-xs font-bold text-[#F36F21] md:text-sm">
                    {formatRupiah(menu.price)}
                </p>
            </div>
        </Link>
    );
};

export default MenuCard;