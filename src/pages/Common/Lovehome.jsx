import React, { useEffect, useState } from "react";
import { Card, Row, Col } from "antd";
import { lovehome_list } from "../../services/commonService";

const { Meta } = Card;

const Lovehome = () => {
  const [lovehomes, setLovehomes] = useState([]);

  useEffect(() => {
    const loadLovehomes = async () => {
      try {
        const apiResponse = await lovehome_list(); // 使用查詢所有中途方法
        setLovehomes(apiResponse.data);
      } catch (error) {
        console.error("Error fetching lovehome_list:", error);
      }
    };

    loadLovehomes();
  }, []);

  return (
    <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", // 卡片自動適應寬度
      justifyContent: "center", // 卡片置中
      gap: "20px",              // 卡片之間的固定間距
      padding: "20px",          // 父容器內部的間距
      maxWidth: "1080px", // 限制容器最大寬度
      margin: "0 auto", // 居中容器
    }}
    >
      {lovehomes && lovehomes.length > 0 ? (
        lovehomes.map((lovehome) => (
          <Col span={6} key={lovehome.lovehomeId}>
            <Card
              style={{ 
                width: 300,
                height: 350,
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
                  alt={lovehome.lovehomeId}
                  src={lovehome.lovehomeImage_Base64}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover", // 圖片自動調整以適應區域
                  }}
                />
                </div>
              }
            >
              <Meta
                title={lovehome.lovehomeName}
                description={
                  <>
                    地址：{lovehome.lovehomeCity}
                    {lovehome.lovehomeDistrict}
                    {lovehome.lovehomeAddress}
                    <br />
                    聯絡方式：{lovehome.contactInfo}
                    <br />
                  </>
                }
              />
            </Card>
          </Col>
        ))
      ) : (
        <div>暫無資料</div>
      )}

</div>
  );
};

export default Lovehome;
