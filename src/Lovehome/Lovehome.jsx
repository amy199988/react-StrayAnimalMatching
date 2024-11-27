import React from "react";
import { theme, Card } from "antd";
import Cat1 from "../components/Images/cat01.jpg"

const { Meta } = Card;

const Lovehome = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Card
      style={{ width: 250 }}
      cover={<img alt="中途之家1" src={Cat1} />}
    >
      <Meta
        title="中途之家名稱"
        description={
          <>
            地址：
            <br />
            聯絡方式：
            <br />
          </>
        }
      />
    </Card>
  );
};

export default Lovehome;
