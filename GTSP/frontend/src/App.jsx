import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import { Menu } from "antd";
import "antd/dist/reset.css"; // Asegúrate de usar esta importación si usas Ant Design v5

import TSPSimulator from "../pages/TSPSimulator";
import Knapsack from "../pages/Knapsack";
import SubsetSumApp from "../pages/Subset/SubsetSumApp";

const Navbar = () => {
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        textAlign: "center",
        zIndex: 1000,
      }}
      onMouseEnter={() => setMenuVisible(true)}
      onMouseLeave={() => setMenuVisible(false)}>
      <Menu
        mode="horizontal"
        style={{
          justifyContent: "center",
          transition: "max-height 0.3s ease-in-out",
          maxHeight: menuVisible ? "200px" : "50px",
          overflow: "hidden",
        }}>
        <Menu.Item key="1">
          <Link to="/tspsimulator">TSP Simulator</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/knapsack">Knapsack</Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to="/subsetsumapp">Subset Sum</Link>
        </Menu.Item>
      </Menu>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ paddingTop: "50px" }} />
      <Routes>
        <Route path="/tspsimulator" element={<TSPSimulator />} />
        <Route path="/knapsack" element={<Knapsack />} />
        <Route path="/subsetsumapp" element={<SubsetSumApp />} />
      </Routes>
    </Router>
  );
}

export default App;
