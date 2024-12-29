import React, { useEffect, useState } from "react";
import { Button, Card, Row, Col, message, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { adoptioncat_list } from "../../services/commonService";
import { checkSession } from "../../services/authService";

const { Meta } = Card;

const Adoption = () => {
  const navigate = useNavigate();
  const [adoptionCats, setAdoptionCats] = useState([]);


  useEffect(() => {
    const loadCats = async () => {
      try {
        const apiResponse = await adoptioncat_list();
        setAdoptionCats(apiResponse.data);
      } catch (error) {
        console.error("Error fetching catlists", error);
      }
    };

    loadCats();
  }, []);

  // 檢查登入狀態及 Session 狀態
  const checkLoginAndSession = async () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    if (!isLoggedIn) {
      Modal.info({
        title: "請先登入後繼續。",
        okText: "前往登入", // 設定按鈕的文字
        onOk: () => {
          window.location.href = "/auth/login"; // 跳轉到登入頁面
        },
      });
      return false; // 沒有登入
    }

    // 檢查 Session 狀態
    try {
      const isSessionValid = await checkSession();
      if (!isSessionValid) {
        message.error("Session 已過期，請重新登入");
        localStorage.setItem("isLoggedIn", "false"); // 清除本地登入狀態
        setTimeout(() => {
          navigate("/auth/login"); // 跳轉到登入頁面
        }, 1000);
        return false; // Session 無效
      }

      return true; // 登入且 Session 有效
    } catch (error) {
      console.error("Session 檢查失敗:", error);
      message.error("無法確認 Session 狀態，請稍後再試");
      return false; // 無法檢查 Session
    }
  };

  const handleAdopt = async (catId) => {
    // 檢查登入和 Session 狀態
    const isValid = await checkLoginAndSession();
    if (!isValid) {
      return; // 如果檢查失敗，直接返回
    }

    // 已登入，執行領養動作
    navigate(`/common/adoption_request?catId=${catId}`);
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", // 卡片自動適應寬度
        justifyContent: "center", // 卡片置中
        gap: "20px",              // 卡片之間的固定間距
        padding: "20px",          // 父容器內部的間距
        maxWidth: "1080px", // 限制容器最大寬度
        margin: "0 auto", // 居中容器
      }}
    >
      {adoptionCats && adoptionCats.length > 0 ? (
        adoptionCats.map((cat) => (
          <Card
            key={cat.catId}
            style={{
              width: 250, // 卡片寬度跟隨父容器
              height: 480,
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
            cover={
              <div
                style={{
                  width: "100%",
                  height: "200px",
                  background: "#f0f0f0", // 預設背景色
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  alt={cat.catId}
                  src={cat.catImage_Base64}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover", // 確保圖片填滿卡片區域
                  }}
                />
              </div>
            }
            actions={[
              <Button type="primary" onClick={() => handleAdopt(cat.catId)}>
                領養
              </Button>,
            ]}
          >
            <Meta
              title={cat.catName}
              description={
                <>
                  貓咪花紋：{cat.breed}
                  <br />
                  貓咪年齡(月份)：{cat.age}
                  <br />
                  特殊狀況：{cat.healthStatus}
                  <br />
                  詳細描述：{cat.description}
                  <br />
                  屬於中途：{cat.lovehomeName}
                  <br />
                </>
              }
            />
          </Card>

        ))
      ) : (
        <div>暫無資料</div>
      )}
    </div>
  );
};

export default Adoption;