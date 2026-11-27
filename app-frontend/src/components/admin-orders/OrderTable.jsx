import StatusBadge from "@/components/ui/StatusBadge.jsx";
import { formatTanggalJam } from "@/utils/format.js";

export default function OrderTable({ orders, onSelect }) {
  if (orders.length === 0) {
    return (
      <p className="py-12 text-center text-sm text-gray-500">
        Tidak ada pesanan yang cocok.
      </p>
    );
  }

  return (
    <ul className="space-y-4">
      {orders.map((order) => (
        <li key={order.id}>
          <button
            type="button"
            onClick={() => onSelect?.(order)}
            className="flex w-full items-center justify-between rounded-xl bg-white px-4 py-4 text-left shadow-[0_2px_8px_rgba(0,0,0,0.15)] focus-visible:outline-2 focus-visible:outline-abata-orange"
          >
            <div>
              <p className="text-[15px] font-bold">{order.code}</p>
              <p className="mt-0.5 text-[11px] font-medium text-gray-800">
                {formatTanggalJam(order.createdAt)}
              </p>
            </div>
            <StatusBadge status={order.status} />
          </button>
        </li>
      ))}
    </ul>
  );
}