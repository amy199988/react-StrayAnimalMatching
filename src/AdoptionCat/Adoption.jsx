import React from "react";
import { theme, Button, Card } from "antd";
import Cat1 from "../components/Images/cat01.jpg"

const { Meta } = Card;

const Adoption = () => {
  return (
    <Card
      style={{ width: 250 }}
      cover={<img alt="小八" src={Cat1} />}
      actions={[<Button type="primary">領養</Button>]}
    >
      <Meta
        title="小八"
        description={
          <>
            貓咪花紋：
            <br />
            貓咪年齡：
            <br />
            特殊狀況：
            <br />
            詳細描述：
            <br />
            屬於中途：
            <br />
          </>
        }
      />
    </Card>
  );
};

export default Adoption;
