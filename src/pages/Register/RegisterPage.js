import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setError("Password harus memiliki minimal 6 karakter.");
      return;
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      setError("Format email tidak valid. Harap periksa kembali.");
      return;
    }
    setError("");

    try {
      await axios.post("/api/auth/register", { name, email, password });
      alert("Registrasi berhasil!");
      setIsRedirecting(true);
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      const errorMessage =
        error.response?.data?.msg || "Terjadi kesalahan. Silakan coba lagi.";
      console.error("Registrasi gagal:", errorMessage);
      setError(errorMessage);
    }
  };

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background:
      "linear-gradient(0deg, rgba(243,226,212,1) 29%, rgba(197,176,205,1) 100%)",
  };

  const formStyle = {
    backgroundColor: "#F7CFD8",
    padding: "2rem",
    borderRadius: "12px",
    boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
    color: "#7C4585",
    width: "320px",
    fontFamily: "Urbanist",
  };

  const backButtonStyle = {
    backgroundColor: "#9B177E",
    color: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "14px",
    fontWeight: "bold",
    marginBottom: "1rem",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",
  };

  const buttonStyle = {
    backgroundColor: "#9B177E",
    color: "white",
    border: "none",
    padding: "10px",
    width: "100%",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    marginTop: "10px",
  };

  const linkStyle = {
    marginTop: "20px",
    color: "#7C4585",
    textDecoration: "none",
    fontWeight: "bold",
  };

  const errorStyle = {
    color: "#ff4d4d",
    marginTop: "10px",
    marginBottom: "10px",
    fontWeight: "bold",
  };

  if (isRedirecting) {
    return (
      <div style={containerStyle}>
        <div style={formStyle}>
          <h2>Registrasi Berhasil</h2>
          <p>Anda akan diarahkan ke halaman login dalam 1.5 detik...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <form style={formStyle} onSubmit={handleSubmit}>
        <div style={{ textAlign: "left" }}>
          <button
            style={backButtonStyle}
            type="button"
            onClick={() => navigate("/")}
          >
            ← Back
          </button>
        </div>

        <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>
          Registrasi Akun Baru
        </h2>

        <div>
          <label>Nama:</label>
          <input
            style={inputStyle}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            style={inputStyle}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            style={inputStyle}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p style={errorStyle}>{error}</p>}

        <button style={buttonStyle} type="submit">
          Register
        </button>

        <p>
          <Link to="/login" style={linkStyle}>
            Sudah punya akun? Login di sini
          </Link>
        </p>
      </form>
    </div>
  );
}

export default RegisterPage;
