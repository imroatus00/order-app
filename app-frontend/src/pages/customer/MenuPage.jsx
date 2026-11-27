import { useEffect, useState } from "react";
import MenuCard from '../../components/customer/MenuCard';
import { getMenu } from '../../services/customerApi';

const categories = [
    'Paket Nasi Kebuli',
    'Paket Nasi Putih',
    'Add On',
];

const MenuPage = () => {
    const [menus, setMenus] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                setLoading(true);
                const data = await getMenu();
                setMenus(data);
            } catch (err) {
                setError('Gagal mengambil data menu. Silakan coba kembali.');
                console.error('Error mengambil menu:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchMenu();
    }, []);

    if (loading) {
        return (
            <div className="flex min-h-60 items-center justify-center">
                <p className="text-sm font-medium text-gray-500">
                    Memuat menu...
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex min-h-60 items-center justify-center px-4">
                <p className="text-center text-sm text-red-500">
                    {error}
                </p>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-[#FFF0DF]">
            <section 
            className="relative flex min-h-48 items-center overflow-hidden bg-cover bg-center px-5 py-10 text-white md:min-h-80 lg:min-h-96"
            style={{backgroundImage: "linear-gradient(to right, rgba(0,0,0,0.55), rgba(0,0,0,0.05)), url('/images/banner/abata-banner.png')"}}
            >
                <div className="relative z-10 max-w-md">
                    <h1 className="text-2xl font-bold leading-snug md:text-4xl lg:text-5xl">
                         Nikmatnya Abata Fried Chicken
                    </h1>
                    <p className="mt-1 text-base md:text-xl lg:text-2xl">
                            di Setiap Gigitannya
                    </p>
                </div>
            </section>

            <section className="px-4 py-6 md:px-6">
                {categories.map((category) => {
                    const categoryMenus = menus.filter(
                        (menu) => menu.category === category
                    );

                    if (categoryMenus.length === 0) {
                        return null;
                    }

                    return (
                        <div key={category} className="mb-8">
                            <h2 className="mb-3 text-lg font-bold text-orange-600 md:text-xl">
                                {category}
                            </h2>

                            <div div className="grid grid-cols-3 gap-3 md:gap-4 sm:grid-cols-[repeat(auto-fit,minmax(180px,1fr))]">
                                {categoryMenus.map((menu) => (
                                    <MenuCard
                                        key={menu.id}
                                        menu={menu}
                                    />
                                ))}
                            </div>
                        </div>
                    );
                })}
            </section>
        </main>
    );
};

export default MenuPage;