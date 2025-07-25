import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
  const [message, setMessage] = useState("");
  useEffect(() => {
    fetch("http://localhost:3001")
      .then((response) => response.json())
      .then((data) => setMessage(data.message))
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div>
      <h1>Selamat Datang di Aplikasi React</h1>
      <p>Ini adalah komponen React sederhana.</p>
    </div>
  );
}

export default App;
