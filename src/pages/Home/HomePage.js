import { Link, useNavigate } from "react-router-dom";
import "../../App.css";

const HomePage = () => {
  const navigate = useNavigate();

  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch (error) {
    console.error("Gagal mengambil data user:", error);
  }
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    textAlign: "center",
    background:
      "linear-gradient(0deg, rgba(243,226,212,1) 29%, rgba(197,176,205,1) 100%)",
    color: "#B33791",
    fontFamily: "Urbanist",
  };

  const welcomeMessageStyle = {
    margin: "10px 0 20px 0",
    fontSize: "1.5em",
    color: "#9B177E",
  };

  const buttonStyle = {
    padding: "10px 20px",
    fontSize: "1.2em",
    marginTop: "20px",
    backgroundColor: "#9B177E",
    color: "#ffffff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    textDecoration: "none",
  };

  return (
    <div style={containerStyle}>
      <h1>Selamat Datang di Aplikasi Todo List</h1>
      {user && <h2 style={welcomeMessageStyle}>Halo, {user.name}!</h2>}
      <p>Kelola semua tugas Anda dengan mudah dan efisien.</p>
      <Link to="/todos" style={buttonStyle}>
        Lihat Daftar Todo
      </Link>
      <button onClick={handleLogout} style={buttonStyle}>
        Logout
      </button>
    </div>
  );
};

export default HomePage;
