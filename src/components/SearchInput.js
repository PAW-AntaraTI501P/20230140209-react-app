import "../App.css";
import { FiSearch, FiX } from "react-icons/fi";

const SearchInput = ({ searchTerm, setSearchTerm }) => {
  return (
    <div style={{ margin: "20px 0", position: "relative" }}>
      <FiSearch
        className="text-gray-400"
        style={{
          position: "absolute",
          top: "50%",
          left: "10px",
          transform: "translateY(-50%)",
          pointerEvents: "none", // biar icon ga ganggu klik input
        }}
      />
      <input
        type="text"
        placeholder="Cari tugas..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
        style={{
          width: "100%",
          padding: "10px 10px 10px 35px",
          borderRadius: "4px",
          border: "1px solid #ddd",
          boxSizing: "border-box",
          background: "#FFEAEA",
        }}
      />
    </div>
  );
};

export default SearchInput;
