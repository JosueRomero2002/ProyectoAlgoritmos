import React, { useState } from "react";
import { Layout, Button, Input, Typography, Flex } from "antd";
import { objectsArray, knapsackRecursion, knapsackDynamic } from "./algoritmos";
const { Header, Footer, Sider, Content } = Layout;
const { Title } = Typography;

const MochilaMochila = () => {
  const [numElements, setNumElements] = useState("");
  const [knapsackWeight, setKnapsackWeight] = useState("");
  const [time1, setTime1] = useState(null);
  const [time2, setTime2] = useState(null);
  const [profit1, setProfit1] = useState("");
  const [profit2, setProfit2] = useState("");
  const [dynamicImages, setDynamicImages] = useState([]);

  const knapsackButt = () => {
    const items = objectsArray(numElements);
    const start2 = performance.now();
    const ksD = knapsackDynamic(knapsackWeight, items);
    const end2 = performance.now();
    setTime1(end2 - start2);
    console.log(end2 - start2);
    setProfit1(ksD);
    setDynamicImages(ksR.items);
    const start = performance.now();
    const ksR = knapsackRecursion(knapsackWeight, items, numElements);
    const end = performance.now();
    setTime2(end - start);
    console.log(end - start);
    setProfit2(ksR.profit);
  };
  return (
    <Layout style={{ height: "100vh", width: "100vw" }}>
      <Header
        style={{
          background: "#640D5F",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          width: "100%",
          height: "80px",
        }}>
        <img
          src="../src/assets/Mono.png"
          alt="Knapsack Logo"
          style={{
            height: "50px",
            width: "auto",
            display: "block",
          }}
        />
        <Title
          level={2}
          style={{ color: "white", margin: 0, textAlign: "center" }}>
          KNAPSACK
        </Title>
      </Header>

      <Layout style={{ flex: 1 }}>
        <Sider
          width="25%"
          style={{
            background: "#8EB486",
            padding: "16px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            gap: "10px",
          }}>
          <Flex gap={50} vertical>
            <img
              src="../src/assets/Dora.png"
              alt="Knapsack Logo"
              style={{
                height: "200px",
                width: "auto",
                display: "block",
                margin: "0 auto",
              }}
            />
            <div style={{ marginBottom: "16px" }}>
              <label>Numero de Objetos:</label>
              <Input
                placeholder="Ingresar numero de objetos..."
                value={numElements}
                onChange={(e) => setNumElements(e.target.value)}
                style={{ marginTop: "8px" }}
              />
            </div>
            <div>
              <label>Peso de la Mochila Mochila:</label>
              <Input
                placeholder="Mochila Mochila"
                value={knapsackWeight}
                onChange={(e) => setKnapsackWeight(e.target.value)}
                style={{ marginTop: "8px" }}
              />
            </div>
            <Button onClick={knapsackButt}>¡KNAPSACK!</Button>
          </Flex>
        </Sider>

        <Content
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            padding: "16px",
          }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Flex vertical>
              <Title level={4}>Zorro Experto</Title>
              <img
                src="../src/assets/zorro.png"
                alt="Knapsack Logo"
                style={{ height: "100px", width: "auto" }}
              />

              <div>
                <Title level={5}>Tiempo: {time1}ms</Title>
                <Title level={5}>Ganancia: ${profit1}</Title>
              </div>
            </Flex>
            <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
              <div
                style={{
                  border: "1px solid #d9d9d9",
                  padding: "16px",
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "8px",
                }}>
                {dynamicImages.map((item, index) => (
                  <img
                    key={index}
                    src={item[0]}
                    alt={`Dynamic Image ${index}`}
                    style={{ height: "60px", width: "auto" }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Flex vertical>
              <Title level={4}>Zorro Novato</Title>
              <img
                src="../src/assets/zorro.png"
                alt="Knapsack Logo"
                style={{ height: "100px", width: "auto" }} // Image on the left
              />

              <div>
                <Title level={5}>Tiempo: {time2}ms</Title>
                <Title level={5}>Ganancia: ${profit2}</Title>
              </div>
            </Flex>
            <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
              <div
                style={{
                  border: "1px solid #d9d9d9",
                  padding: "16px",
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "8px",
                }}>
                {dynamicImages.map((item, index) => (
                  <img
                    key={index}
                    src={item[0]}
                    alt={`Dynamic Image ${index}`}
                    style={{ height: "60px", width: "auto" }}
                  />
                ))}
              </div>
            </div>
          </div>
        </Content>
      </Layout>

      <Footer
        style={{
          color: "#FFFFFF",
          textAlign: "center",
          background: "#FFB200",
          lineHeight: "10px",
          width: "100%",
        }}>
        All Rights Reserved (C) 2024 Dora{" "}
      </Footer>
    </Layout>
  );
};

export default MochilaMochila;
