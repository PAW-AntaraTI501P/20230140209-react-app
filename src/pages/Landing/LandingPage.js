import { Link } from "react-router-dom";

const LandingPage = () => {
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
      <p>Kelola semua tugas Anda dengan mudah dan efisien.</p>
      <Link to="/login" style={buttonStyle}>
        Lihat Daftar Todo
      </Link>
      <Link to="/register" style={buttonStyle}>
        Register
      </Link>
      <Link to="/login" style={buttonStyle}>
        Login
      </Link>
    </div>
  );
};

export default LandingPage;