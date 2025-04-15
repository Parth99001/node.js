import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import EditData from "./components/EditData";
import AddProduct from "./components/AddProduct";

const App = () => {
  return (
    <Router>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/editdata/:id" element={<EditData />} />
          <Route path="/addproduct/:id" element={<AddProduct />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
