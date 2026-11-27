
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  UserRound,
  LockKeyhole,
  Eye,
  EyeOff,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!username.trim() || !password) {
      setError("Username dan password harus diisi.");
      return;
    }

    try {
      setLoading(true);

      await login({ username, password });

      navigate("/admin/orders");
    } catch (err) {
      setError(
        err.message || "Login gagal. Periksa kembali akun kamu."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-page">
      <section className="login-card">

        {/* KONTEN LOGIN */}
        <div className="login-content">

          {/* BRAND ABATA */}
          <div className="brand">

            <img
              src="/images/logo/logo-abata.png"
              alt="Logo Abata Saudi Fried Chicken"
              className="brand-logo"
            />

            <h3>Surabaya</h3>

            <p>
              Jl. Medokan Asri Barat IX, Kec. Rungkut
            </p>

          </div>

          <div className="login-heading">
            <h1>Login Admin</h1>

            <p>
              Masuk untuk mengakses dashboard admin
            </p>
          </div>

          {/* FORM LOGIN */}
          <form
            onSubmit={handleSubmit}
            className="login-form"
          >

            <div className="form-group">
              <label htmlFor="username">
                Username
              </label>

              <div className="input-wrapper">
                <UserRound size={21} />

                <input
                  id="username"
                  type="text"
                  placeholder="Masukkan username"
                  value={username}
                  onChange={(e) =>
                    setUsername(e.target.value)
                  }
                  autoComplete="username"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">
                Password
              </label>

              <div className="input-wrapper">
                <LockKeyhole size={21} />

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Masukkan password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  autoComplete="current-password"
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  aria-label={
                    showPassword
                      ? "Sembunyikan password"
                      : "Lihat password"
                  }
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>

            {/* PESAN ERROR */}
            {error && (
              <div className="login-error" role="alert">
                {error}
              </div>
            )}

            {/* TOMBOL LOGIN */}
            <button
              type="submit"
              className="login-button"
              disabled={loading}
            >
              {loading ? "Memproses..." : "Login"}
            </button>

          </form>
        </div>

        <div className="login-decoration">

          <div className="orange-wave"></div>

          <img
            src="/images/logo/ayam-nasi.png"
            alt="Nasi putih dengan ayam goreng Abata"
            className="food-image"
          />

        </div>

      </section>
    </main>
  );
}

export default LoginPage;
