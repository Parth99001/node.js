import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard"; 
import Register from "./components/Register";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <Router>
      <div style={styles.container}>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register/>}/>
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
};

// Basic styles
const styles = {
  container: { textAlign: "center", marginTop: "20px" },
};

export default App;
