import React from "react";
import { Button, Space } from "antd";
import { useNavigate } from "react-router-dom";

const Lovemom = () => {
  const navigate = useNavigate();

  const handleNavigation = (key) => {
    if (key === "catlist") {
      navigate("/cat_list");
    }
  };

  return (
    <Space wrap>
      <Button>修改會員資料</Button>
      <Button>修改密碼</Button>
      <Button onClick={() => handleNavigation("catlist")}>
        貓咪清單管理
      </Button>
      <Button>申請領養清單管理</Button>
      <Button>通報清單管理</Button>
    </Space>
  );
};

export default Lovemom;
