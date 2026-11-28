import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, UserRound } from "lucide-react";
import StatusActions from "@/components/admin-orders/StatusActions.jsx";
import StatusBadge from "@/components/ui/StatusBadge.jsx";
import Spinner from "@/components/ui/Spinner.jsx";
import { getOrderDetail } from "@/services/adminApi";
import { formatRupiah, formatTanggalJam } from "@/utils/format.js";

const CREAM = "#FFF1E5";

// Desain memakai "Rp23.000"
const rupiah = (value) => formatRupiah(value).replace(/\s/g, "");

export default function OrderDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        setLoading(true);
        const data = await getOrderDetail(id);
        if (!ignore) {
          setOrder(data);
          setError("");
        }
      } catch (err) {
        if (!ignore) setError(err.message || "Gagal memuat pesanan.");
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    load();
    return () => {
      ignore = true;
    };
  }, [id]);

  const total =
    order?.total ??
    order?.items?.reduce((sum, item) => sum + item.price * item.qty, 0) ??
    0;

  return (
    <div style={{ minHeight: "100%", backgroundColor: CREAM }}>
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white shadow-[0_2px_6px_rgba(0,0,0,0.12)]">
        <div className="mx-auto flex max-w-3xl items-center gap-3 px-5 py-4">
          <button
            type="button"
            onClick={() => navigate("/admin/orders")}
            aria-label="Kembali ke daftar pesanan"
            className="rounded p-1 hover:bg-gray-100"
          >
            <ArrowLeft size={28} strokeWidth={1.8} />
          </button>
          <h1 className="text-lg font-semibold">Daftar Pesanan</h1>
        </div>
      </header>

      <div className="mx-auto max-w-xl px-5 pb-10 pt-5">
        {loading ? (
          <div className="flex justify-center py-16">
            <Spinner />
          </div>
        ) : error ? (
          <div className="py-16 text-center">
            <p className="text-sm text-red-600">{error}</p>
            <button
              type="button"
              onClick={() => navigate("/admin/orders")}
              className="mt-4 text-sm font-semibold underline"
              style={{ color: "#F47B20" }}
            >
              Kembali ke daftar pesanan
            </button>
          </div>
        ) : (
          <>
            {/* Kartu kode pesanan */}
            <div className="flex items-center justify-between rounded-xl bg-white px-4 py-4 shadow-[0_2px_8px_rgba(0,0,0,0.15)]">
              <div>
                <div className="text-[15px] font-bold">{order.code}</div>
                <div className="mt-0.5 text-[11px] font-medium text-gray-800">
                  {formatTanggalJam(order.createdAt)}
                </div>
              </div>
              <StatusBadge status={order.status} />
            </div>

            {/* Informasi pelanggan */}
            <h2 className="mb-3 mt-7 text-base font-semibold">Informasi pelanggan</h2>
            <div
              className="flex items-stretch rounded-xl bg-white"
              style={{ border: "1.5px solid #111111" }}
            >
              <div
                className="flex items-center justify-center px-4 py-3"
                style={{ borderRight: "1.5px solid #111111" }}
              >
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-full"
                  style={{ backgroundColor: "#111111", color: "#FFFFFF" }}
                >
                  <UserRound size={20} />
                </div>
              </div>
              <div className="flex flex-col justify-center px-4 py-3">
                <div className="text-sm font-semibold">{order.customer?.name ?? "-"}</div>
                <div className="mt-0.5 text-[10px] text-gray-800">
                  {order.customer?.phone ?? "-"}
                </div>
              </div>
            </div>

            {/* Pesanan */}
            <h2 className="mb-3 mt-7 text-base font-semibold">Pesanan</h2>
            <div
              className="rounded-xl bg-white px-4 py-4"
              style={{ border: "1px solid #9CA3AF" }}
            >
              <ul className="space-y-2.5">
                {order.items.map((item) => (
                  <li key={item.id} className="flex items-center justify-between gap-3 text-[13px]">
                    <span>
                      {item.name} x{item.qty}
                    </span>
                    <span className="shrink-0">{rupiah(item.price * item.qty)}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Total */}
            <div className="mt-6 flex items-center justify-between">
              <span className="text-base font-semibold">Total</span>
              <span className="text-base font-bold">{rupiah(total)}</span>
            </div>

            {/* Status pembayaran */}
            <div className="mt-4 flex items-center justify-between">
              <span className="text-base font-semibold">Status pembayaran</span>
              <StatusBadge status={order.paymentStatus} />
            </div>

            {/* Tombol aksi */}
            <div className="mt-10">
              <StatusActions order={order} onUpdated={setOrder} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}