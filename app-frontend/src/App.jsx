import { Routes, Route, Navigate } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { useAuth } from "./context/AuthContext";
import CustomerLayout from "./components/layout/CustomerLayout";
import AdminLayout from "./components/layout/AdminLayout";
import MenuPage from "./pages/customer/MenuPage";
import MenuDetailPage from './pages/customer/MenuDetailPage';
import CartPage from './pages/customer/CartPage';
import LoginPage from "./pages/admin/LoginPage";
import OrdersPage from "./pages/admin/OrdersPage";
import OrderDetailPage from "./pages/admin/OrderDetailPage";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  return isAuthenticated
    ? children
    : <Navigate to="/admin/login" replace />;
}

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <CartProvider>
      <Routes>
        <Route element={<CustomerLayout />}>
          <Route path="/" element={<MenuPage />} />
        </Route>
        <Route path="/menu/:id" element={<MenuDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<div>Halaman data pemesanan akan dibuat.</div>} />

        <Route
          path="/admin/login"
          element={
            isAuthenticated
              ? <Navigate to="/admin/orders" replace />
              : <LoginPage />
          }
        />

        {/* Semua halaman admin di bawah ini wajib login */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="orders" replace />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="orders/:id" element={<OrderDetailPage />} />
          <Route
            path="orders/offline"
            element={<div className="p-6 text-sm text-gray-600">Input pesanan offline akan dibuat.</div>}
          />
          <Route
            path="menu"
            element={<div className="p-6 text-sm text-gray-600">Kelola menu akan dibuat.</div>}
          />
        </Route>
      </Routes>
    </CartProvider>
  );
}

export default App;