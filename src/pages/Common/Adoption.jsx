import React, { useEffect, useState } from "react";
import { Button, Card, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";
import { adoptioncat_list } from "../../services/commonService";

const { Meta } = Card;

const Adoption = () => {
  const navigate = useNavigate();
  const [adoptionCats, setadoptionCats] = useState([]);

  useEffect(() => {
    const loadCats = async () => {
      try {
        const apiResponse = await adoptioncat_list();
        setadoptionCats(apiResponse.data);
      } catch (error) {
        console.error("Error fetching catlists", error);
      }
    };

    loadCats();
  }, []);

  const handleAdopt = (catId) => {
    navigate(`/common/adoption_request?catId=${catId}`);
  };

  return (
    <Row gutter={16}>
      {adoptionCats && adoptionCats.length > 0 ? (
        adoptionCats.map((cat) => (
          <Col span={6} key={cat.catId}>
            <Card
              style={{ width: 250 }}
              cover={<img alt={cat.catId} src={cat.catImage_Base64} />}
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
                    貓咪年齡：{cat.age}
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
          </Col>
        ))
      ) : (
        <div>暫無資料</div>
      )}
    </Row>
  );
};

export default Adoption;
