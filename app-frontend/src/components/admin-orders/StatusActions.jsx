import { useState } from "react";
import { confirmPayment, updateOrderStatus } from "@/services/adminApi";
import { NEXT_STATUS, PAYMENT_STATUS, STATUS_LABEL } from "@/utils/constants.js";

// Tombol aksi di halaman detail pesanan
export default function StatusActions({ order, onUpdated }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const belumDibayar = order.paymentStatus === PAYMENT_STATUS.BELUM_DIBAYAR;
  const nextStatus = NEXT_STATUS[order.status];

  // Pesanan sudah selesai/dibatalkan: tidak ada aksi lagi
  if (!belumDibayar && !nextStatus) return null;

  const label = belumDibayar ? "Konfirmasi Pembayaran" : "Update Status";

  const handleClick = async () => {
    const pesan = belumDibayar
      ? "Tandai pesanan ini sudah dibayar?"
      : `Ubah status pesanan menjadi "${STATUS_LABEL[nextStatus]}"?`;

    if (!window.confirm(pesan)) return;

    try {
      setLoading(true);
      setError("");

      const updated = belumDibayar
        ? await confirmPayment(order.id)
        : await updateOrderStatus(order.id, nextStatus);

      onUpdated(updated);
    } catch (err) {
      setError(err.message || "Gagal memperbarui pesanan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {error && (
        <p role="alert" className="mb-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
          {error}
        </p>
      )}

      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        style={{
          width: "100%",
          height: "48px",
          border: "none",
          borderRadius: "12px",
          backgroundColor: "#F47B20",
          color: "#FFFFFF",
          fontFamily: '"Poppins", system-ui, sans-serif',
          fontSize: "14px",
          fontWeight: 600,
          cursor: loading ? "not-allowed" : "pointer",
          opacity: loading ? 0.7 : 1,
          boxShadow: "0 3px 8px rgba(0,0,0,0.2)",
        }}
      >
        {loading ? "Memproses..." : label}
      </button>
    </div>
  );
}