import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import MyMenu from "./components/MyMenu";
import Adoption from "./pages/Common/Adoption.jsx";
import Home from "./Home.jsx";
import Lovehome from "./pages/Common/Lovehome.jsx";
import Lovemom from "./pages/Lovemom/Lovemom.jsx";
import Catlist from "./pages/Lovemom/Cat_list.jsx";
import Login from "./pages/User/Login.jsx";
import AdoptionRequest from "./pages/Common/AdoptionRequest.jsx";
import SignUp from "./pages/User/Sign_up.jsx";
import Donation from "./pages/Common/Donation.jsx";
import User from "./pages/User/User.jsx";
import Manager from "./pages/Manager/Manager.jsx";
import AllCatlist from "./pages/Manager/AllCatlist.jsx";
import LRequestList from "./pages/Lovemom/LRequest_list.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { login, logout } from "./services/authService.js";

const { Header, Content, Footer } = Layout;

const App = () => {
  const [role, setRole] = useState("");

  useEffect(() => {
    // 假設用戶資料存在localStorage
    const userDto = JSON.parse(localStorage.getItem("userDto"));
    if (userDto) {
      setRole(userDto.role); // 取得role
    }
  }, [])

  const handleLogin = async (account, password) => {
    try {
      const data = await login(account, password); // 使用登入服務方法

      if (data.message === "登入成功") {
        alert("登入成功");
        localStorage.setItem("userDto",JSON.stringify(data.data));
        setRole(data.data.role);
        window.location.href = "/";
      } else {
        alert("登入失敗");
      }
    } catch (error) {
      console.error("登入錯誤:", error);
    }
  };

  const handleLogout = async () => {
    try {
      const apiResponse = await logout(); // 使用登出服務方法
      alert(apiResponse.data || "已成功登出！");
      localStorage.removeItem("userDto"); // 清除登入資訊
      setRole(""); // 重置角色
      window.location.href = "/";
    } catch (error) {
      console.error("登出錯誤:", error);
    }
  };

  return (
    <Router>
      <Layout
        style={{
          minHeight: "100vh",
          width: "100vw",
        }}
      >
        <Header
          style={{
            background: "#ffffff",
            position: "sticky",
            top: 0,
            zIndex: 1,
            width: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <MyMenu role={role} onLogout={handleLogout}/>
        </Header>
        <Content
          style={{
            padding: "48px",
            minHeight: "400px",
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/adoption" element={<Adoption />} />
            <Route path="/adoption_request" element={<AdoptionRequest />} />
            <Route path="/common/lovehome_list" element={<Lovehome />} />
            <Route path="/lovemom" element={<Lovemom />} />
            <Route path="/lovemom/cat_list" element={<Catlist />} />
            <Route path="/lovemom/request_list" element={<LRequestList />} />
            <Route path="/user" element={<User />} />
            <Route path="/manager" element={<Manager />} />
            <Route path="/manager/all_cat" element={<AllCatlist />} />
            <Route path="/auth/login" element={<Login onLogin={handleLogin}/>} />
            <Route path="/auth/sign_up" element={<SignUp />} />
            <Route path="/donation" element={<Donation />} />
          </Routes>
        </Content>
        <Footer
          style={{
            textAlign: "center",
            background: "#dedede",
          }}
        >
          Stary Animal Matching ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Router>
  );
};

export default App;
