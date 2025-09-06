import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/auth/login", { email, password });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      alert("Login berhasil!");
      navigate("/home");
    } catch (error) {
      console.error("Login gagal: ", error.response?.data || error.message);
      alert("Login gagal. Periksa kembali email dan password anda.");
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
    textAlign: "center",
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

        <h2 style={{ marginBottom: "1rem" }}>Login</h2>

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
        <button style={buttonStyle} type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
