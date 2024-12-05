import React from "react";
import { Layout, Button, Statistic, Divider } from "antd";
import { Typography, InputNumber } from "antd";
import { useState } from "react";
const { Sider } = Layout;

const SidebarTSP = ({
  onCalculate,
  onCalculateExact,
  onClear,
  onGenerateRandom,
  stats,
  isCalculating,
}) => {
  const [randomCount, setRandomCount] = useState(20);

  const handleGenerateClick = () => {
    if (randomCount > 0 && randomCount <= 1000) {
      onGenerateRandom(randomCount);
    } else {
      alert("Por favor ingresa un valor entre 1 y 100.");
    }
  };

  return (
    <Sider width={300} style={{ background: "#fff", padding: "16px" }}>
      <Typography.Title level={4}>TSP Simulator</Typography.Title>
      <Divider />
      <Typography.Paragraph>
        <strong>Distancia total:</strong> {stats.distancia} km
      </Typography.Paragraph>
      <Typography.Paragraph>
        <strong>Localizaciones:</strong> {stats.totalLocalizaciones}
      </Typography.Paragraph>
      <Typography.Paragraph>
        <strong>Tiempo de ejecución:</strong> {stats.tiempo} ms
      </Typography.Paragraph>
      <Divider />
      <Button
        type="primary"
        onClick={onCalculate}
        disabled={isCalculating}
        style={{ marginBottom: 10, width: "100%" }}>
        Calcular TSP
      </Button>

      <Button
        type="primary"
        onClick={onCalculateExact}
        disabled={isCalculating}
        style={{ marginBottom: 10, width: "100%" }}>
        Calcular TSP Exacto
      </Button>
      <Button
        danger
        onClick={onClear}
        style={{ marginBottom: 10, width: "100%" }}>
        Limpiar
      </Button>
      <div style={{ display: "flex", alignItems: "center" }}>
        <InputNumber
          min={1}
          max={1000}
          value={randomCount}
          onChange={(value) => setRandomCount(value || 1)}
          style={{ width: "50%", flex: 2 }}
        />
        <Button onClick={handleGenerateClick} style={{ width: "50%", flex: 1 }}>
          Generar
        </Button>
      </div>
    </Sider>
  );
};

export default SidebarTSP;
