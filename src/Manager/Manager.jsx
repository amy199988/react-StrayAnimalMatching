import React from "react";
import { Button, Space } from "antd";
import { useNavigate } from "react-router-dom";

const Manager = () => {
  const navigate = useNavigate();

  const handleNavigation = (key) => {
    if (key === "all_cat") {
      navigate("/manager/all_cat");
    } else if (key === "all_lovehome") {
      navigate("/manager/all_lovehome");
    } else if (key === "all_request") {
      navigate("/manager/all_lovehome");
    } else if (key === "all_report") {
    }
  };

  return (
    <Space wrap>
      <Button onClick={() => handleNavigation("all_cat")}>貓咪列表</Button>
      <Button onClick={() => handleNavigation("all_lovehome")}>
        中途之家列表
      </Button>
      <Button onClick={() => handleNavigation("all_request")}>
        申請領養列表
      </Button>
      <Button onClick={() => handleNavigation("all_report")}>
        通報救援列表
      </Button>
    </Space>
  );
};

export default Manager;
