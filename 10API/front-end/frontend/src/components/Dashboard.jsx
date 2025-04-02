import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:9090/users/data");
        setUsers(res.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:9090/users/${id}`);
      setUsers(users.filter(user => user._id !== id));
    } catch (err) {
      alert("Error deleting user");
      console.error("Error deleting user:", err);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif", backgroundColor: "#f4f4f4" }}>
      <h2 style={{ textAlign: "center", color: "#333" }}>Dashboard</h2>
      <h3 style={{ textAlign: "center", color: "#333", marginTop: "20px" }}>Registered Users</h3>

      <table style={{ width: "80%", margin: "20px auto", borderCollapse: "collapse", backgroundColor: "white", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}>
        <thead>
          <tr style={{ backgroundColor: "#007bff", color: "white", textAlign: "center" }}>
            <th style={{ padding: "12px" }}>User Name</th>
            <th style={{ padding: "12px" }}>Email</th>
            <th style={{ padding: "12px" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user._id} style={{ textAlign: "center" }}>
                <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{user.name}</td>
                <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{user.email}</td>
                <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                  <button 
                    onClick={() => handleDelete(user._id)}
                    style={{ backgroundColor: "red", color: "white", borderRadius: "5px", padding: "5px 10px", cursor: "pointer", marginRight: "5px", border: "none" }}
                  >
                    Delete
                  </button>
                  <button 
                    onClick={() => navigate(`/EditData/${user._id}`)}
                    style={{ backgroundColor: "blue", color: "white", borderRadius: "5px", padding: "5px 10px", cursor: "pointer", border: "none" }}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" style={{ padding: "10px", textAlign: "center" }}>No users registered yet.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;