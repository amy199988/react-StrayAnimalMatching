import React, { useState, useEffect } from "react";
import { Menu, Drawer, Button, message } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import {
  CatIcon,
  ReportIcon,
  DonationIcon,
  HomeIcon,
  UserIcon,
  LoginIcon,
} from "./icons/IndexIcon";
import StrayAnimalMatching from "../components/icons/StrayAnimalMatching.png";

const MyMenu = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // 判斷是否為小螢幕
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  // 偵測視窗大小
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
      label: (
        <span style={{ fontWeight: "bold" }}>通報浪浪</span>
      ),
      key: "report",
      icon: <ReportIcon style={{ fontSize: "24px" }} />,
    },
    {
      label: (
        <span style={{ fontWeight: "bold" }}>領養浪浪</span>
      ),
      key: "adoption",
      icon: <CatIcon style={{ fontSize: "24px" }} />,
    },
    {
      label: (
        <span style={{ fontWeight: "bold" }}>合作中途之家</span>
      ),
      key: "lovehome",
      icon: <HomeIcon style={{ fontSize: "24px" }} />,
    },
    ...(role === "role_user"
      ? [
        {
          label: (
            <span style={{ fontWeight: "bold" }}>普通會員中心</span>
          ),
          key: "user",
          icon: <UserIcon style={{ fontSize: "24px" }} />,
        },
      ]
      : []),
    ...(role === "role_lovemom"
      ? [
        {
          label: (
            <span style={{ fontWeight: "bold" }}>愛媽會員中心</span>
          ),
          key: "lovemom",
          icon: <UserIcon style={{ fontSize: "24px" }} />,
        },
      ]
      : []),
    ...(role === "role_manager"
      ? [
        {
          label: (
            <span style={{ fontWeight: "bold" }}>管理員頁面</span>
          ),
          key: "manager",
          icon: <UserIcon style={{ fontSize: "24px" }} />,
        },
      ]
      : []),
    {
      label: isLoggedIn ? (
        <span style={{ fontWeight: "bold" }}>登出會員</span>
      ) : (
        <span style={{ fontWeight: "bold" }}>登入會員</span>
      ),
      key: isLoggedIn ? "logout" : "login",
      icon: <LoginIcon style={{ fontSize: "24px" }} />,
    },
  ];

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
    localStorage.removeItem("userDto");
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);

    message.success("登出成功");
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center", // 水平置中
        alignItems: "center",     // 垂直置中（如果需要）
        width: "100%",            // 確保容器占滿寬度
        height: "auto",           // 自適應高度
        padding: "16px 0",        // 增加上下間距
      }}
    >
      {/* Logo 置中 */}
      <div style={{ display: "flex",justifyContent: "center", alignItems: "center", }}>
        <a href="/">
          <img
            src={StrayAnimalMatching}
            alt="Logo"
            style={{
              width: "150px",
               height: "auto", // 高度自適應，保持比例
           marginTop: "3vh"
              }}
          />
        </a>
      </div>

      {/* 小螢幕顯示漢堡選單 */}
      {isMobile && (
        <div style={{ position: "absolute", right: "16px" }}>
          <Button
            icon={<MenuOutlined />}
            onClick={() => setIsDrawerVisible(true)}
          />
        </div>
      )}

      {/* 大螢幕顯示選單 */}
      {!isMobile && (
        <Menu
          theme="light"
          mode="horizontal"
          items={items}
          onClick={onClick}
          style={{
            maxWidth: "100%",   // 設定最大寬度
            display: "flex", // 確保 Menu 僅佔用內容寬度
            justifyContent: "center", // 內容集中於 Menu
            width: "auto",              // 設定寬度為自適應
            padding: "0",               // 移除內邊距
            gap: "10px",        // 調整按鈕之間的間距
          }}
        />
      )}

      <Drawer
        title="選單"
        placement="right"
        onClose={() => setIsDrawerVisible(false)}
        open={isDrawerVisible}
      >
        <Menu
          mode="vertical"
          items={items}
          onClick={(e) => {
            setIsDrawerVisible(false); // 關閉 Drawer
            onClick(e);
          }}
        />
      </Drawer>
    </div>
  );
};

export default MyMenu;