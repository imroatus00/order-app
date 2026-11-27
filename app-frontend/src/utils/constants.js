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