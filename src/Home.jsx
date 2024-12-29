import React from "react";
import { Carousel, Row, Col, Button } from "antd";
import Carousel2 from "./components/Images/Carousel-2.jpg";
import Carousel4 from "./components/Images/Carousel-4.jpg";
import Carousel5 from "./components/Images/Carousel-5.jpg";
import {
  CatIcon,
  ReportIcon,
  DonationIcon,
  HomeIcon,
  UserIcon,
  LoginIcon,
} from "./components/icons/IndexIcon";

const Home = () => (
  <Row justify="center" align="middle">
    <Col xs={24} sm={22} md={18} lg={14}>
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
        <div>
          <img
            src={Carousel4}
            alt="Carousel-4"
            style={{
              maxWidth: "100%", // 圖片最大寬度為容器寬度
              maxHeight: "100%", // 圖片最大高度為容器高度
              objectFit: "contain",
              margin: "auto",
              display: "block",
            }}
          />

        </div>
        <div>
          <img
            src={Carousel5}
            alt="Carousel-5"
            style={{
              maxWidth: "100%", // 圖片最大寬度為容器寬度
              maxHeight: "100%", // 圖片最大高度為容器高度
              objectFit: "contain",
              margin: "auto",
              display: "block",
            }}
          />

        </div>
      </Carousel>
      {/* 新增按鈕 */}
      <div className="mobile-buttons" style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginTop: "12px", justifyContent: "center" }}>
        <Row justify="center" align="middle">
          <Col xs={24} sm={24} md={24} lg={0}> {/* 在 lg 以上隱藏 */}

            <Button type="default" href="/common/report" size="large" block style={{
              height: "50px", marginTop: "10px"
            }}>
              <ReportIcon style={{ fontSize: "24px" }} />
              <span style={{ fontWeight: "bold" }} >通報浪浪</span>
            </Button>
            <Button type="default" href="/common/adoption" size="large" block style={{
              height: "50px", marginTop: "10px"
            }}>
              <CatIcon style={{ fontSize: "24px" }} />
              <span style={{ fontWeight: "bold" }}>領養浪浪</span>
            </Button>
            <Button type="default" href="/common/lovehome_list" size="large" block style={{
              height: "50px", marginTop: "10px"
            }}>
              <HomeIcon style={{ fontSize: "24px" }} />
              <span style={{ fontWeight: "bold" }}>合作中途之家</span>
            </Button>

            <Button type="default" href="/auth/login" size="large" block style={{
              height: "50px", marginTop: "10px"
            }}>
              <LoginIcon style={{ fontSize: "24px" }} />
              <span style={{ fontWeight: "bold" }}>登入會員</span>
            </Button>
          </Col>
        </Row>

      </div>
    </Col>
  </Row>
);

export default Home
