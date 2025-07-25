import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect} from "react";

function App() {
  const [message, setMessage] = useState('');
  
  return (
    <div>
      <h1>Selamat Datang di Aplikasi React</h1>
      <p>Ini adalah komponen React sederhana.</p>
    </div>
  );
}

export default App;
