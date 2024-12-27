import React, { useState, useEffect } from "react";
import { Menu, message } from "antd";
import { useNavigate } from "react-router-dom";
import {
  CatIcon,
  ReportIcon,
  DonationIcon,
  HomeIcon,
  UserIcon,
  LoginIcon,
} from "./icons/IndexIcon";

const MyMenu = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");

  // 讀取登入狀態和用戶資料
  useEffect(() => {
    const userDtoString = localStorage.getItem("userDto");
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    if (isLoggedIn && userDtoString) {
      const userDto = JSON.parse(userDtoString);
      setIsLoggedIn(true);
      setRole(userDto.role); // 設置用戶角色
    }
  }, []);

  const items = [
    {
      label: <a href="/">回到首頁</a>,
      key: "index",
    },
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
    // 根據登入狀態顯示登入或登出按鈕
    {
      label: isLoggedIn ? "登出會員" : "登入會員",
      key: isLoggedIn ? "logout" : "login",
      icon: <LoginIcon style={{ fontSize: "24px" }} />,
    },

  ];

  const filteredItems = items.filter((item) => item.visible !== false);

  const onClick = (e) => {
    if (e.key === "report") {
      navigate("/common/report");
    } else if (e.key === "adoption") {
      navigate("/common/adoption");
    } else if (e.key === "lovehome") {
      navigate("/common/lovehome_list");
    } else if (e.key === "lovemom") {
      navigate("/lovehome");
    } else if (e.key === "user") {
      navigate("/user");
    } else if (e.key === "manager") {
      navigate("/manager");
    } else if (e.key === "login") {
      navigate("/auth/login");
    } else if (e.key === "logout") {
      handleLogout();
    }
  };

  const handleLogout = () => {
    // 清除 localStorage 和狀態
    localStorage.removeItem("userDto");
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false); // 設置為未登入狀態

    // 登出後導向首頁

    message.success("登出成功");
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
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