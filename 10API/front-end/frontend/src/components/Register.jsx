import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    try {
      await axios.post("http://localhost:9090/users/register", formData);
      setSuccess(true);
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "#f4f4f4" }}>
      <div style={{ background: "white", padding: "30px", borderRadius: "10px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", width: "350px", textAlign: "center" }}>
        <h2 style={{ marginBottom: "20px", color: "#333" }}>Register</h2>
        
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>Registration successful! Redirecting...</p>}
        
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
          <input
            type="text"
            name="name"
            placeholder="Enter full name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{ margin: "10px 0", padding: "10px", border: "1px solid #ccc", borderRadius: "5px", fontSize: "16px" }}
          />
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ margin: "10px 0", padding: "10px", border: "1px solid #ccc", borderRadius: "5px", fontSize: "16px" }}
          />
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{ margin: "10px 0", padding: "10px", border: "1px solid #ccc", borderRadius: "5px", fontSize: "16px" }}
          />
          <button type="submit" style={{ padding: "12px", background: "#007bff", color: "white", border: "none", borderRadius: "5px", fontSize: "16px", cursor: "pointer", marginTop: "10px" }}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
