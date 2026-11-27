import { Routes, Route, Navigate } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { useAuth } from "./context/AuthContext";
import CustomerLayout from "./components/layout/CustomerLayout";
import AdminLayout from "./components/layout/AdminLayout";
import MenuPage from "./pages/customer/MenuPage";
import MenuDetailPage from './pages/customer/MenuDetailPage';
import LoginPage from "./pages/admin/LoginPage";
import OrdersPage from "./pages/admin/OrdersPage";

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