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
    <Row gutter={16}>
      {lovehomes && lovehomes.length > 0 ? (
        lovehomes.map((lovehome) => (
          <Col span={6} key={lovehome.lovehomeId}>
            <Card
              style={{ width: 250 }}
              cover={<img alt={lovehome.lovehomeId} src={lovehome.lovehomeImage_Base64} />}
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
    </Row>
  );
};

export default Lovehome;
