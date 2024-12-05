import React from "react";
import { Button, Space } from "antd";
import { useNavigate } from "react-router-dom";

const User = () => {
  const navigate = useNavigate();

  const handleNavigation = (key) => {
    if (key === "Urequest_list") {
      navigate("/user/request_list");
    } else if (key === "Ureport_list") {
      navigate("/user/report_list");
    }
  };

  return (
    <Space wrap>
      <Button>修改會員資料</Button>
      <Button>修改密碼</Button>
      <Button onClick={() => handleNavigation("Urequest_list")}>
        申請領養清單
      </Button>
      <Button onClick={() => handleNavigation("Ureport_list")}>
        通報救援清單
      </Button>
    </Space>
  );
};

export default User;
