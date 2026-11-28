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
    <main className="flex min-h-dvh w-full justify-center bg-white">
      <section className="relative flex min-h-dvh w-full flex-col overflow-hidden bg-white">

        {/* KONTEN LOGIN */}
        <div className="relative z-[3] mx-auto w-full max-w-[560px] px-5 pb-5 pt-[35px] min-[361px]:px-[26px] min-[481px]:max-w-[520px] min-[481px]:px-10 min-[481px]:pt-[30px] min-[1024px]:max-w-[560px] min-[1024px]:px-[45px] min-[1024px]:pb-[25px] min-[1024px]:pt-[35px] short:pt-[18px]">

          {/* BRAND ABATA */}
          <div className="flex flex-col items-center text-center">

            <img
              src="/images/logo/logo-abata.png"
              alt="Logo Abata Saudi Fried Chicken"
              className="mx-auto block h-[110px] w-[110px] object-contain min-[361px]:h-[120px] min-[361px]:w-[120px] min-[481px]:h-[125px] min-[481px]:w-[125px] min-[1024px]:h-[135px] min-[1024px]:w-[135px] short:h-[115px] short:w-[115px]"
            />

            <h3 className="mt-[10px] text-[15px] font-bold text-[#ff790f] min-[481px]:text-base">
              Surabaya
            </h3>

            <p className="mt-[9px] text-[10px] leading-[1.5] text-[#f07824] min-[481px]:text-[11px]">
              Jl. Medokan Asri Barat IX, Kec. Rungkut
            </p>

          </div>

          <div className="mt-7 text-center min-[481px]:mt-[27px] min-[1024px]:mt-8 short:mt-[18px]">
            <h1 className="text-[21px] font-bold text-[#202020] min-[361px]:text-[23px] min-[481px]:text-[25px] min-[1024px]:text-[28px]">
              Login Admin
            </h1>

            <p className="mt-[9px] text-[11px] leading-[1.5] text-[#888888] min-[361px]:text-xs min-[481px]:text-[13px] min-[1024px]:text-sm">
              Masuk untuk mengakses dashboard admin
            </p>
          </div>

          {/* FORM LOGIN */}
          <form
            onSubmit={handleSubmit}
            className="mt-[26px] w-full min-[1024px]:mt-[34px] short:mt-[18px]"
          >

            <div className="mb-4 short:mb-[10px]">
              <label
                htmlFor="username"
                className="mb-[9px] block text-[13px] font-semibold text-[#252525]"
              >
                Username
              </label>

              <div className="flex h-[49px] w-full items-center gap-3 rounded-[30px] border border-[#d4d4d4] px-4 text-[#999999] transition-[border-color,box-shadow] duration-200 focus-within:border-[#ff790f] focus-within:shadow-[0_0_0_3px_rgba(255,121,15,0.12)] min-[481px]:h-[52px] min-[1024px]:h-[54px] short:h-[45px]">
                <UserRound size={21} className="shrink-0" />

                <input
                  id="username"
                  type="text"
                  placeholder="Masukkan username"
                  value={username}
                  onChange={(e) =>
                    setUsername(e.target.value)
                  }
                  autoComplete="username"
                  className="w-full min-w-0 border-0 bg-transparent text-[13px] text-[#333333] outline-none placeholder:text-[#999999]"
                />
              </div>
            </div>

            <div className="mb-4 short:mb-[10px]">
              <label
                htmlFor="password"
                className="mb-[9px] block text-[13px] font-semibold text-[#252525]"
              >
                Password
              </label>

              <div className="flex h-[49px] w-full items-center gap-3 rounded-[30px] border border-[#d4d4d4] px-4 text-[#999999] transition-[border-color,box-shadow] duration-200 focus-within:border-[#ff790f] focus-within:shadow-[0_0_0_3px_rgba(255,121,15,0.12)] min-[481px]:h-[52px] min-[1024px]:h-[54px] short:h-[45px]">
                <LockKeyhole size={21} className="shrink-0" />

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Masukkan password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  autoComplete="current-password"
                  className="w-full min-w-0 border-0 bg-transparent text-[13px] text-[#333333] outline-none placeholder:text-[#999999]"
                />

                <button
                  type="button"
                  className="flex shrink-0 cursor-pointer items-center justify-center border-0 bg-transparent p-1 text-[#999999] transition-colors duration-200 hover:text-[#ff790f]"
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
              <div
                className="mb-3 rounded-lg bg-[#fff0ef] px-[13px] py-[11px] text-xs text-[#d93025]"
                role="alert"
              >
                {error}
              </div>
            )}

            {/* TOMBOL LOGIN */}
            <button
              type="submit"
              className="mt-[10px] h-[50px] w-full cursor-pointer rounded-[9px] border-0 bg-[#ff790f] text-[15px] font-bold text-white transition duration-200 enabled:hover:-translate-y-px enabled:hover:bg-[#e96900] enabled:active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
              disabled={loading}
            >
              {loading ? "Memproses..." : "Login"}
            </button>

          </form>
        </div>

        <div className="relative mt-auto min-h-[155px] w-full flex-1 overflow-hidden min-[481px]:min-h-[165px] min-[1024px]:min-h-[185px] short:min-h-[130px]">

          <div className="absolute bottom-0 left-0 h-full w-full bg-[#ff790f] [clip-path:ellipse(95%_65%_at_50%_100%)]"></div>

          <img
            src="/images/logo/ayam-nasi.png"
            alt="Nasi putih dengan ayam goreng Abata"
            className="pointer-events-none absolute bottom-[5px] right-2.5 z-[2] h-auto max-h-full w-[85%] max-w-[90%] object-contain object-bottom min-[361px]:w-[78%] min-[481px]:right-[3%] min-[481px]:w-[clamp(220px,38vw,340px)] min-[1024px]:right-[clamp(10px,5vw,80px)] min-[1024px]:w-[clamp(240px,30vw,400px)] short:max-h-[90%]"
          />

        </div>

      </section>
    </main>
  );
}

export default LoginPage;