import React from "react";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import {
  CatIcon,
  ReportIcon,
  DonationIcon,
  HomeIcon,
  UserIcon,
  LoginIcon,
} from "./icons/IndexIcon";

const MyMenu = ({ role, onLogout }) => {
  const navigate = useNavigate();

  const items = [
    {
      label: "通報浪浪",
      key: "report",
      icon: <ReportIcon style={{ fontSize: "24px" }} />,
    },
    {
      label: "領養浪浪",
      key: "adoption",
      icon: <CatIcon style={{ fontSize: "24px" }} />,
    },
    {
      label: "合作中途之家",
      key: "lovehome",
      icon: <HomeIcon style={{ fontSize: "24px" }} />,
    },
    {
      label: "捐獻物資",
      key: "donation",
      icon: <DonationIcon style={{ fontSize: "24px" }} />,
    },
    ...(role === "role_user"
      ? [
          {
            label: "普通會員中心",
            key: "user",
            icon: <UserIcon style={{ fontSize: "24px" }} />,
          },
        ]
      : []),
    ...(role === "role_lovemom"
      ? [
          {
            label: "愛媽會員中心",
            key: "lovemom",
            icon: <UserIcon style={{ fontSize: "24px" }} />,
          },
        ]
      : []),
    ...(role === "role_manager"
      ? [
          {
            label: "管理員頁面",
            key: "manager",
            icon: <UserIcon style={{ fontSize: "24px" }} />,
          },
        ]
      : []),
    {
      label: "登入會員",
      key: "login",
      icon: <LoginIcon style={{ fontSize: "24px" }} />,
    },
    {
      label: "登出會員",
      key: "logout",
      icon: <LoginIcon style={{ fontSize: "24px" }} />,
    },
    {
      label: <a href="/">回到首頁</a>,
      key: "index",
    },
  ];

  const filteredItems = items.filter((item) => item.visible !== false);

  const onClick = (e) => {
    if (e.key === "adoption") {
      navigate("/adoption");
    } else if (e.key === "lovehome") {
      navigate("/common/lovehome_list");
    } else if (e.key === "lovemom") {
      navigate("/lovemom");
    } else if (e.key === "user") {
      navigate("/user");
    } else if (e.key === "manager") {
      navigate("/manager");
    } else if (e.key === "login") {
      navigate("/auth/login");
    } else if (e.key === "logout") {
      onLogout();
    } else if (e.key === "donation") {
      navigate("/donation");
    }
  };

  return (
    <Menu
      theme="light"
      mode="horizontal"
      items={filteredItems}
      onClick={onClick}
      style={{
        flex: 1,
        minWidth: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    />
  );
};

export default MyMenu;
