import React from "react";
import { Carousel, Row, Col } from "antd";
import Carousel1 from "./components/Images/Carousel-1.jpg";
import Carousel2 from "./components/Images/Carousel-2.jpg";

const Home = () => (
  <Row justify="center" align="middle">
    <Col xs={22} sm={22} md={18} lg={14}>
      <Carousel
        style={{
          background: "#fff",
          maxWidth: "100%",
          display: "block",
          margin: "auto",
        }}
        arrows
        autoplay
      >
        <div>
          <img
            src={Carousel1}
            alt="Carousel-1"
            style={{
              maxWidth: "50%", // 圖片最大寬度為容器寬度
              maxHeight: "40%", // 圖片最大高度為容器高度
              objectFit: "contain",
              margin: "auto",
              display: "block",
            }}
          />
        </div>
        <div>
          <img
            src={Carousel2}
            alt="Carousel-2"
            style={{
              maxWidth: "100%", // 圖片最大寬度為容器寬度
              maxHeight: "100%", // 圖片最大高度為容器高度
              objectFit: "contain",
              margin: "auto",
              display: "block",
            }}
          />
        </div>
        <div></div>
        <div></div>
      </Carousel>
    </Col>
  </Row>
);

export default Home
