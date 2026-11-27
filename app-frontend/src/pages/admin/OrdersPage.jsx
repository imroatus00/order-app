import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search } from "lucide-react";
import OrderTable from "@/components/admin-orders/OrderTable.jsx";
import Spinner from "@/components/ui/Spinner.jsx";
import { getOrders } from "@/services/adminApi";
import { ORDER_SOURCE, ORDER_TABS } from "@/utils/constants.js";

const POLLING_MS = 15000;

export default function OrdersPage() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [tab, setTab] = useState("semua");
  const [keyword, setKeyword] = useState("");

  const loadOrders = useCallback(async () => {
    try {
      setOrders(await getOrders());
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadOrders();
    const timer = setInterval(loadOrders, POLLING_MS);
    return () => clearInterval(timer);
  }, [loadOrders]);

  // Jumlah pesanan di setiap tab
  const counts = useMemo(
    () => ({
      semua: orders.length,
      online: orders.filter((o) => o.source === ORDER_SOURCE.ONLINE).length,
      offline: orders.filter((o) => o.source === ORDER_SOURCE.OFFLINE).length,
    }),
    [orders]
  );

  // Filter berdasarkan tab dan kata kunci pencarian
  const filtered = useMemo(() => {
    const q = keyword.trim().toLowerCase();
    return orders.filter(
      (o) =>
        (tab === "semua" || o.source === tab) &&
        (q === "" || o.code.toLowerCase().includes(q))
    );
  }, [orders, tab, keyword]);

  return (
    <div className="mx-auto max-w-3xl">
      <header className="sticky top-0 z-10 flex items-center gap-3 bg-white px-5 py-4 shadow-[0_2px_6px_rgba(0,0,0,0.12)]">
        <button
            type="button"
            onClick={() => {
                setTab("semua");
                setKeyword("");
                loadOrders();
            }}
            aria-label="Kembali ke tampilan awal"
            className="rounded p-1 hover:bg-gray-100"
        >
          <ArrowLeft size={28} strokeWidth={1.8} />
        </button>
        <h1 className="text-lg font-semibold">Daftar Pesanan</h1>
      </header>

      <section className="px-5 pb-8 pt-5">
        <div role="tablist" className="flex justify-between gap-2 px-1">
          {ORDER_TABS.map(({ key, label }) => {
            const active = tab === key;
            return (
              <button
                key={key}
                role="tab"
                aria-selected={active}
                onClick={() => setTab(key)}
                className={`border-b-2 pb-1 text-xs font-semibold ${
                  active
                    ? "border-abata-orange text-abata-orange"
                    : "border-transparent text-abata-ink"
                }`}
              >
                {label} ({counts[key]})
              </button>
            );
          })}
        </div>

        <label className="mt-4 flex items-center gap-3 rounded-full border border-gray-700 px-4 py-2 focus-within:border-abata-orange">
          <Search size={22} strokeWidth={1.8} className="shrink-0 text-gray-600" />
          <input
            type="search"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Cari kode pesanan..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-gray-500"
          />
        </label>

        <div className="mt-5">
          {loading ? (
            <div className="flex justify-center py-12">
              <Spinner />
            </div>
          ) : error ? (
            <p className="py-12 text-center text-sm text-red-600">{error}</p>
          ) : (
            <OrderTable
              orders={filtered}
              onSelect={(order) => navigate(`/admin/orders/${order.id}`)}
            />
          )}
        </div>
      </section>
    </div>
  );
}