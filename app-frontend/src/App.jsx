import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/admin/LoginPage";
import { useAuth } from "./context/AuthContext";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  return isAuthenticated
    ? children
    : <Navigate to="/admin/login" replace />;
}

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to="/admin/login" replace />}
      />

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
  );
}

export default App;
