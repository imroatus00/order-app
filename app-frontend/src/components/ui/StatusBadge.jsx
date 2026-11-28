import { STATUS_LABEL } from "@/utils/constants.js";

const STYLE = {
  menunggu_pembayaran: "bg-slate-300 text-slate-700",
  belum_dibayar: "bg-rose-500 text-white",
  dibayar: "bg-green-500 text-white",
  diproses: "bg-amber-400 text-white",
  siap_kirim: "bg-blue-500 text-white",
  selesai: "bg-gray-400 text-white",
  dibatalkan: "bg-red-500 text-white",
};

export default function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex min-w-22 items-center justify-center whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${
        STYLE[status] ?? "bg-gray-300 text-gray-700"
      }`}
    >
      {STATUS_LABEL[status] ?? status}
    </span>
  );
}