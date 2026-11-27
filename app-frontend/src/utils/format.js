export const formatRupiah = (value) =>
    value === null || value === undefined ? 'Harga belum tersedia': new Intl.NumberFormat('id-ID', 
        {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(value);

const BULAN = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
const pad = (n) => String(n).padStart(2, "0");

//"09 Nov 2026, 09.10"
export function formatTanggalJam(iso) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "-";
  return `${pad(d.getDate())} ${BULAN[d.getMonth()]} ${d.getFullYear()}, ${pad(d.getHours())}.${pad(d.getMinutes())}`;
}