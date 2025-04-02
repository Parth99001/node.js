import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:9090/users/login", formData);
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        navigate("/dashboard");
      }
      
    } catch (err) {
      console.log(err);
      
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "#f4f4f4" }}>
      <div style={{ background: "white", padding: "30px", borderRadius: "10px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", width: "350px", textAlign: "center" }}>
        <h2 style={{ marginBottom: "20px", color: "#333" }}>Login</h2>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
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
          <button  type="submit" style={{ padding: "12px", background: "#007bff", color: "white", border: "none", borderRadius: "5px", fontSize: "16px", cursor: "pointer", marginTop: "10px" }}>Login</button>
        </form>
        <button onClick={() => navigate("/register")} style={{ width:"100%", padding: "12px", background: "#007bff", color: "white", border: "none", borderRadius: "5px", fontSize: "16px", cursor: "pointer", marginTop: "10px"}}>Sign Up</button>
      </div>
    </div>
  );
};

export default Login;
