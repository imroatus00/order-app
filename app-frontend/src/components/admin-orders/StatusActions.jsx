import { useState } from "react";
import { Check } from "lucide-react";
import { confirmPayment, updateOrderStatus } from "@/services/adminApi";
import {
  NEXT_STATUS,
  ORDER_STATUS,
  PAYMENT_STATUS,
  UPDATE_STEPS,
} from "@/utils/constants.js";
import { formatTanggalJam } from "@/utils/format.js";

const ORANGE = "#F47B20";
const RED = "#DC2626";
const GRAY = "#C9C9C9";
const GRAY_TEXT = "#BDBDBD";
const FONT = '"Poppins", system-ui, sans-serif';

const CIRCLE = 28;
const LINE_HEIGHT = 40;

const buttonStyle = (loading) => ({
  width: "100%",
  height: "48px",
  border: "none",
  borderRadius: "12px",
  backgroundColor: ORANGE,
  color: "#FFFFFF",
  fontFamily: FONT,
  fontSize: "14px",
  fontWeight: 600,
  cursor: loading ? "not-allowed" : "pointer",
  opacity: loading ? 0.7 : 1,
  boxShadow: "0 3px 8px rgba(0,0,0,0.2)",
});

const cancelButtonStyle = (loading) => ({
  width: "100%",
  height: "48px",
  borderRadius: "12px",
  border: `1.5px solid ${RED}`,
  backgroundColor: "#FFFFFF",
  color: RED,
  fontFamily: FONT,
  fontSize: "14px",
  fontWeight: 600,
  cursor: loading ? "not-allowed" : "pointer",
  opacity: loading ? 0.7 : 1,
});

function ErrorMessage({ message }) {
  if (!message) return null;
  return (
    <p role="alert" className="mb-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
      {message}
    </p>
  );
}

// Tahapan status
function StatusStepper({ currentStatus, selectedStatus, onSelect, disabled }) {
  const currentIndex = UPDATE_STEPS.findIndex((s) => s.key === currentStatus);
  const selectedIndex = UPDATE_STEPS.findIndex((s) => s.key === selectedStatus);

  return (
    <ol style={{ listStyle: "none", margin: 0, padding: 0 }}>
      {UPDATE_STEPS.map((step, index) => {
        
        const done =
          index < selectedIndex || (index === selectedIndex && index === currentIndex);
        const target = index === selectedIndex && index !== currentIndex;
        const reached = index <= selectedIndex;
        const isLast = index === UPDATE_STEPS.length - 1;

        return (
          <li
            key={step.key}
            role="button"
            tabIndex={disabled ? -1 : 0}
            aria-pressed={index === selectedIndex}
            aria-disabled={disabled}
            onClick={() => !disabled && onSelect(step.key)}
            onKeyDown={(e) => {
              if (!disabled && (e.key === "Enter" || e.key === " ")) {
                e.preventDefault();
                onSelect(step.key);
              }
            }}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "16px",
              cursor: disabled ? "default" : "pointer",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: `${CIRCLE}px`,
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  width: `${CIRCLE}px`,
                  height: `${CIRCLE}px`,
                  boxSizing: "border-box",
                  borderRadius: "9999px",
                  border: `3px solid ${done || target ? ORANGE : GRAY}`,
                  backgroundColor: done ? ORANGE : "#FFFFFF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#FFFFFF",
                }}
              >
                {done && <Check size={16} strokeWidth={3} />}
              </div>

              {!isLast && (
                <div
                  style={{
                    width: "3px",
                    height: `${LINE_HEIGHT}px`,
                    backgroundColor: index < selectedIndex ? ORANGE : GRAY,
                  }}
                />
              )}
            </div>

            <span
              style={{
                lineHeight: `${CIRCLE}px`,
                fontFamily: FONT,
                fontSize: "16px",
                fontWeight: 600,
                color: reached ? "#111111" : GRAY_TEXT,
              }}
            >
              {step.label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

// Tampilan "Update Status Pesanan"
export function StatusUpdateForm({ order, onSaved }) {
  
  const [selected, setSelected] = useState(NEXT_STATUS[order.status] ?? order.status);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const sudahDibayar = order.paymentStatus === PAYMENT_STATUS.DIBAYAR;
  const tidakBerubah = selected === order.status;

  const handleSave = async () => {
    if (tidakBerubah) return;

    try {
      setLoading(true);
      setError("");
      const updated = await updateOrderStatus(order.id, selected);
      onSaved(updated);
    } catch (err) {
      setError(err.message || "Gagal memperbarui status.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: "36px" }}>
        <div
          style={{
            fontFamily: FONT,
            fontSize: "28px",
            fontWeight: 700,
            color: ORANGE,
          }}
        >
          {order.code}
        </div>
        <div
          style={{
            marginTop: "2px",
            fontFamily: FONT,
            fontSize: "10px",
            color: "#111111",
          }}
        >
          {formatTanggalJam(order.createdAt)}
        </div>
      </div>

      <div style={{ padding: "0 12px" }}>
        <StatusStepper
          currentStatus={order.status}
          selectedStatus={selected}
          onSelect={setSelected}
          disabled={!sudahDibayar || loading}
        />
      </div>

      <p
        style={{
          margin: "20px 0 0",
          textAlign: "center",
          fontFamily: FONT,
          fontSize: "11px",
          color: "#8A8A8A",
        }}
      >
        Ketuk salah satu tahap untuk memilih status.
      </p>

      <div style={{ marginTop: "24px" }}>
        <ErrorMessage message={error} />
        <button
          type="button"
          onClick={handleSave}
          disabled={loading || tidakBerubah}
          style={buttonStyle(loading || tidakBerubah)}
        >
          {loading ? "Menyimpan..." : "Simpan Perubahan"}
        </button>
      </div>
    </div>
  );
}

// Tombol aksi di halaman detail
export default function StatusActions({ order, onUpdated, onOpenUpdate }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const dibatalkan = order.status === ORDER_STATUS.DIBATALKAN;
  const selesai = order.status === ORDER_STATUS.SELESAI;
  const belumDibayar = order.paymentStatus === PAYMENT_STATUS.BELUM_DIBAYAR;

  // Pesanan dibatalkan bersifat final: tidak ada aksi lagi
  if (dibatalkan) return null;

  const jalankan = async (aksi, pesanKonfirmasi, pesanGagal) => {
    if (!window.confirm(pesanKonfirmasi)) return;

    try {
      setLoading(true);
      setError("");
      onUpdated(await aksi());
    } catch (err) {
      setError(err.message || pesanGagal);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmPayment = () =>
    jalankan(
      () => confirmPayment(order.id),
      "Tandai pesanan ini sudah dibayar?",
      "Gagal mengonfirmasi pembayaran."
    );

  const handleCancel = () =>
    jalankan(
      () => updateOrderStatus(order.id, ORDER_STATUS.DIBATALKAN),
      "Batalkan pesanan ini? Pesanan yang dibatalkan tidak bisa dikembalikan.",
      "Gagal membatalkan pesanan."
    );

  return (
    <div>
      <ErrorMessage message={error} />

      <button
        type="button"
        onClick={belumDibayar ? handleConfirmPayment : onOpenUpdate}
        disabled={loading}
        style={buttonStyle(loading)}
      >
        {loading ? "Memproses..." : belumDibayar ? "Konfirmasi Pembayaran" : "Update Status"}
      </button>

      {/* Pesanan yang sudah selesai tidak bisa dibatalkan */}
      {!selesai && (
        <button
          type="button"
          onClick={handleCancel}
          disabled={loading}
          style={{ ...cancelButtonStyle(loading), marginTop: "12px" }}
        >
          Batalkan Pesanan
        </button>
      )}
    </div>
  );
}