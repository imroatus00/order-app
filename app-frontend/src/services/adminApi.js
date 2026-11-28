import { api } from "./api";
import { ORDER_STATUS, UPDATE_STEPS } from "@/utils/constants.js";

// true = pakai data contoh (backend belum jadi). Atur lewat file .env
const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// ===== DATA CONTOH (hanya dipakai saat USE_MOCK = true) =====
const MOCK_DETAILS = [
  {
    id: 1,
    code: "TAO01026",
    source: "offline",
    status: "selesai",
    paymentStatus: "dibayar",
    createdAt: "2026-11-09T09:10:00",
    customer: { name: "Supiyah", phone: "0987 6543 2112 345" },
    items: [
      { id: 1, name: "Paket nasi kebuli Dada", qty: 1, price: 23000 },
      { id: 2, name: "Paket nasi putih Paha", qty: 1, price: 16000 },
      { id: 3, name: "Paket nasi putih Kulit", qty: 1, price: 10000 },
    ],
  },
  {
    id: 2,
    code: "TAO02027",
    source: "offline",
    status: "diproses",
    paymentStatus: "dibayar",
    createdAt: "2026-11-09T09:30:00",
    customer: { name: "Budi Santoso", phone: "0812 3456 7890" },
    items: [
      { id: 1, name: "Paket nasi kebuli Dada", qty: 2, price: 23000 },
      { id: 2, name: "Es teh manis", qty: 2, price: 5000 },
    ],
  },
  {
    id: 3,
    code: "ONA05020",
    source: "online",
    status: "diproses",
    paymentStatus: "dibayar",
    createdAt: "2026-11-09T09:39:00",
    customer: { name: "Rina Wulandari", phone: "0857 1122 3344" },
    items: [
      { id: 1, name: "Paket nasi putih Paha", qty: 3, price: 16000 },
    ],
  },
  {
    id: 4,
    code: "OND03028",
    source: "online",
    status: "dibayar",
    paymentStatus: "dibayar",
    createdAt: "2026-11-09T09:50:00",
    customer: { name: "Agus Prasetyo", phone: "0821 9988 7766" },
    items: [
      { id: 1, name: "Paket nasi kebuli Dada", qty: 1, price: 23000 },
      { id: 3, name: "Paket nasi putih Kulit", qty: 2, price: 10000 },
    ],
  },
  {
    id: 5,
    code: "OND04029",
    source: "online",
    status: "siap_kirim",
    paymentStatus: "dibayar",
    createdAt: "2026-11-09T10:16:00",
    customer: { name: "Dewi Lestari", phone: "0878 5544 3322" },
    items: [
      { id: 2, name: "Paket nasi putih Paha", qty: 2, price: 16000 },
      { id: 4, name: "Es jeruk", qty: 1, price: 6000 },
    ],
  },
  {
    id: 6,
    code: "OND06030",
    source: "online",
    status: "menunggu_pembayaran",
    paymentStatus: "belum_dibayar",
    createdAt: "2026-11-09T10:30:00",
    customer: { name: "Hendra Gunawan", phone: "0813 2200 1144" },
    items: [
      { id: 1, name: "Paket nasi kebuli Dada", qty: 2, price: 23000 },
    ],
  },
];

const hitungTotal = (items) =>
  items.reduce((sum, item) => sum + item.price * item.qty, 0);

const findMock = (id) => {
  const order = MOCK_DETAILS.find((o) => String(o.id) === String(id));
  if (!order) throw new Error("Pesanan tidak ditemukan.");
  return order;
};

const salinDetail = (order) => ({
  ...structuredClone(order),
  total: hitungTotal(order.items),
});

export async function login({ username, password }) {
  if (USE_MOCK) {
    await wait(500);
    // Akun contoh (hanya untuk mode mock): admin / admin123
    if (username.trim() === "admin" && password === "admin123") {
      return { token: "mock-token" };
    }
    throw new Error("Username atau password salah.");
  }

  return api.post("/admin/login", { username, password }, { auth: false });
}

export async function getOrders() {
  if (USE_MOCK) {
    await wait(400);
    return MOCK_DETAILS.map(({ id, code, source, status, createdAt }) => ({
      id,
      code,
      source,
      status,
      createdAt,
    }));
  }

  const data = await api.get("/admin/orders");
  return data.orders ?? data;
}

export async function getOrderDetail(id) {
  if (USE_MOCK) {
    await wait(400);
    return salinDetail(findMock(id));
  }

  const data = await api.get(`/admin/orders/${id}`);
  return data.order ?? data;
}

export async function confirmPayment(id) {
  if (USE_MOCK) {
    await wait(400);
    const order = findMock(id);
    order.paymentStatus = "dibayar";
    if (order.status === "menunggu_pembayaran") order.status = "dibayar";
    return salinDetail(order);
  }

  const data = await api.patch(`/admin/orders/${id}/payment`, {});
  return data.order ?? data;
}

export async function updateOrderStatus(id, status) {
  if (USE_MOCK) {
    await wait(400);
    const order = findMock(id);

    const statusDikenal =
      status === ORDER_STATUS.DIBATALKAN ||
      UPDATE_STEPS.some((step) => step.key === status);

    if (!statusDikenal) {
      throw new Error("Status tidak dikenal.");
    }
    if (order.status === ORDER_STATUS.DIBATALKAN) {
      throw new Error("Pesanan yang sudah dibatalkan tidak bisa diubah.");
    }
    if (order.status === status) {
      throw new Error("Status pesanan sudah sama.");
    }
    if (status !== ORDER_STATUS.DIBATALKAN && order.paymentStatus !== "dibayar") {
      throw new Error("Konfirmasi pembayaran dulu sebelum mengubah status.");
    }

    order.status = status;
    return salinDetail(order);
  }

  const data = await api.patch(`/admin/orders/${id}/status`, { status });
  return data.order ?? data;
}

// Nanti ditambah untuk A7:
// export const createOfflineOrder = (data) => ...