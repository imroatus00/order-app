import { Routes, Route, Navigate } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { useAuth } from "./context/AuthContext";
import CustomerLayout from "./components/layout/CustomerLayout";
import MenuPage from "./pages/customer/MenuPage";
import MenuDetailPage from './pages/customer/MenuDetailPage';
import LoginPage from "./pages/admin/LoginPage";

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

        <Route
          path="/admin/orders"
          element={
            <ProtectedRoute>
              <div>Dashboard Admin akan dibuat.</div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </CartProvider>
  );
}

export default App;