import React from "react";
import { Menu } from "antd";
import {
  AppstoreOutlined,
  UnorderedListOutlined,
  ExperimentOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import "antd/dist/reset.css";
import "./Navbar.css";
const Navbar = ({ children }) => {
  const menuItems = [
    {
      key: "/tspsimulator",
      icon: <ExperimentOutlined />,
      label: <Link to="/tspsimulator">TSP Simulator</Link>,
    },
    {
      key: "/knapsack",
      icon: <UnorderedListOutlined />,
      label: <Link to="/knapsack">Knapsack</Link>,
    },
    {
      key: "/subsetsumapp",
      icon: <AppstoreOutlined />,
      label: <Link to="/subsetsumapp">Subset Sum</Link>,
    },
  ];

  return (
    <>
      <Menu
        mode="horizontal"
        theme="dark"
        items={menuItems}
        style={{
          justifyContent: "center",
          position: "fixed",
          top: 0,
          width: "100%",
          zIndex: 1000,
        }}
      />
      <div paddingTop="200px">
        <div style={{ paddingTop: "40px" }}></div>
        <div paddingTop="200px"></div>
        {children}
      </div>
    </>
  );
};

export default Navbar;
