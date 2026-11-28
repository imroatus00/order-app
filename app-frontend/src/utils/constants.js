export const ORDER_STATUS = {
  MENUNGGU_PEMBAYARAN: "menunggu_pembayaran",
  DIBAYAR: "dibayar",
  DIPROSES: "diproses",
  SIAP_KIRIM: "siap_kirim",
  SELESAI: "selesai",
  DIBATALKAN: "dibatalkan",
};

export const STATUS_LABEL = {
  menunggu_pembayaran: "Menunggu",
  belum_dibayar: "Belum dibayar",
  dibayar: "Dibayar",
  diproses: "Diproses",
  siap_kirim: "Siap Kirim",
  selesai: "Selesai",
  dibatalkan: "Dibatalkan",
};

export const STATUS_FLOW = [
  "menunggu_pembayaran",
  "dibayar",
  "diproses",
  "siap_kirim",
  "selesai",
];

export const ORDER_SOURCE = {
  ONLINE: "online",
  OFFLINE: "offline",
};

export const ORDER_TABS = [
  { key: "semua", label: "Semua" },
  { key: "online", label: "Online" },
  { key: "offline", label: "Offline" },
];

export const PAYMENT_STATUS = {
  BELUM_DIBAYAR: "belum_dibayar",
  DIBAYAR: "dibayar",
};

export const NEXT_STATUS = {
  dibayar: "diproses",
  diproses: "siap_kirim",
  siap_kirim: "selesai",
};