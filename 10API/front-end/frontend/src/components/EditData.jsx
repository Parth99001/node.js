import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditData = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    // Fetch the current data of the user
    axios.get(`http://localhost:9090/users/${id}`)
      .then((res) => {
        setFormData({
          name: res.data.name,
          email: res.data.email,
          password: "", // Do not pre-fill the password field
        });
      })
      .catch((err) => console.error("Error fetching user:", err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send the updated data to the server
      await axios.put(`http://localhost:9090/users/${id}`, formData);
      alert("User updated successfully!");
      navigate("/dashboard");
    } catch (error) {
      alert("Failed to update user");
      console.error("Update error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "500px", margin: "auto" }}>
      <h2 className="mb-4">Edit User</h2>
      <div className="form-group mb-3">
        <label>Name</label>
        <input
          type="text"
          className="form-control"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group mb-3">
        <label>Email</label>
        <input
          type="email"
          className="form-control"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group mb-3">
        <label>New Password</label>
        <input
          type="password"
          className="form-control"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <small className="form-text text-muted">
          Leave blank to keep the current password.
        </small>
      </div>
      <button type="submit" className="btn btn-primary">Update</button>
    </form>
  );
};

export default EditData;
