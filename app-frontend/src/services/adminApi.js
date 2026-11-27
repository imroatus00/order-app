import { api } from "./api";

// true = pakai data contoh (backend belum jadi). Atur lewat file .env
const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";
console.log("VITE_USE_MOCK =", import.meta.env.VITE_USE_MOCK);

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// ===== DATA CONTOH (hanya dipakai saat USE_MOCK = true) =====
const MOCK_ORDERS = [
  { id: 1, code: "TAO01026", source: "offline", status: "selesai", createdAt: "2026-11-09T09:10:00" },
  { id: 2, code: "TAO02027", source: "offline", status: "diproses", createdAt: "2026-11-09T09:30:00" },
  { id: 3, code: "ONA05020", source: "online", status: "diproses", createdAt: "2026-11-09T09:39:00" },
  { id: 4, code: "OND03028", source: "online", status: "dibayar", createdAt: "2026-11-09T09:50:00" },
  { id: 5, code: "OND04029", source: "online", status: "siap_kirim", createdAt: "2026-11-09T10:16:00" },
];

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
    return MOCK_ORDERS;
  }

  const data = await api.get("/admin/orders");
  return data.orders ?? data;
}

// Nanti ditambah untuk A3-A7:
// export const getOrderDetail = (id) => ...
// export const confirmPayment = (id) => ...
// export const updateOrderStatus = (id, status) => ...
// export const createOfflineOrder = (data) => ...