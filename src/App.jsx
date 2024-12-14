import React, { useEffect, useState } from "react";
import { Layout, message } from "antd";
import MyMenu from "./components/MyMenu";
import Adoption from "./pages/Common/Adoption.jsx";
import Home from "./Home.jsx";
import Lovehome from "./pages/Common/Lovehome.jsx";
import Lovemom from "./pages/Lovemom/Lovemom.jsx";
import Catlist from "./pages/Lovemom/Cat_list.jsx";
import Login from "./pages/User/Login.jsx";
import UpdatePassword from "./pages/User/UPassword_update.jsx";
import LovemomUpdatePassword from "./pages/Lovemom/LPassword_update.jsx";
import AdoptionRequest from "./pages/Common/AdoptionRequest.jsx";
import SignUp from "./pages/User/Sign_up.jsx";
import Donation from "./pages/Common/Donation.jsx";
import User from "./pages/User/User.jsx";
import Manager from "./pages/Manager/Manager.jsx";
import AllCatlist from "./pages/Manager/AllCatlist.jsx";
import LRequestList from "./pages/Lovemom/LRequest_list.jsx";
import LRequestInfo from "./pages/Lovemom/LRequest_info.jsx";
import Report from "./pages/Common/Report.jsx";
import LReportList from "./pages/Lovemom/LReport_list.jsx";
import LReportInfo from "./pages/Lovemom/LReport_info.jsx";
import URequestList from "./pages/User/URequest_list.jsx";
import URequestInfo from "./pages/User/URequest_info.jsx";
import UReportList from "./pages/User/UReport_list.jsx";
import UReportInfo from "./pages/User/UReport_info.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { login, logout } from "./services/authService.js";

const { Header, Content, Footer } = Layout;

const App = () => {
  const [role, setRole] = useState("");
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    // 假設用戶資料存在localStorage
    const userDto = JSON.parse(localStorage.getItem("userDto"));
    if (userDto) {
      setRole(userDto.role); // 取得role
    }
  }, []);

  const handleLogin = async (account, password) => {
    try {
      const data = await login(account, password); // 使用登入服務方法

      if (data.message === "登入成功") {
        messageApi.success("登入成功");
        localStorage.setItem("userDto", JSON.stringify(data.data));
        setRole(data.data.role);
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      } else {
        messageApi.warning("登入失敗，請重新登入。");
      }
    } catch (error) {
      if (error.message.includes("無此使用者")) {
        console.error("無此使用者:", error);
        messageApi.error("無此使用者，請重新輸入。");
      } else if (error.message.includes("密碼錯誤")) {
        console.error("密碼錯誤", error);
        messageApi.error("密碼錯誤，請重新輸入。");
      } else {
        console.error("登入錯誤:", error);
        messageApi.error("系統錯誤，請稍後再試。");
      }
    }
  };

  const handleLogout = async () => {
    try {
      const apiResponse = await logout(); // 使用登出服務方法
      messageApi.success(apiResponse.data || "登出成功");
      localStorage.removeItem("userDto"); // 清除登入資訊
      setRole(""); // 重置角色
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    } catch (error) {
      console.error("登出錯誤:", error);
    }
  };

  return (
    <>
      {contextHolder}
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
            <MyMenu role={role} onLogout={handleLogout} />
          </Header>
          <Content
            style={{
              background: "#efefef",
              padding: "48px",
              minHeight: "400px",
            }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/common/report" element={<Report />} />
              <Route path="/common/adoption" element={<Adoption />} />
              <Route path="/common/adoption_request" element={<AdoptionRequest />} />
              <Route path="/common/lovehome_list" element={<Lovehome />} />
              <Route path="/lovehome" element={<Lovemom />} />
              <Route path="/lovemom/password" element={<LovemomUpdatePassword />} />
              <Route path="/lovehome/cat_list" element={<Catlist />} />
              <Route path="/lovehome/request_list" element={<LRequestList />} />
              <Route path="/lovehome/request_list/info" element={<LRequestInfo />} />
              <Route path="/lovehome/report_list" element={<LReportList />} />
              <Route path="/lovehome/report_list/info" element={<LReportInfo />} />
              <Route path="/user" element={<User />} />
              <Route path="/user/password" element={<UpdatePassword />} />
              <Route path="/user/request_list" element={<URequestList />} />
              <Route path="/user/request_list/info" element={<URequestInfo />} />
              <Route path="/user/report_list" element={<UReportList />} />
              <Route path="/user/report_list/info" element={<UReportInfo />} />
              <Route path="/manager" element={<Manager />} />
              <Route path="/manager/all_cat" element={<AllCatlist />} />
              <Route
                path="/auth/login"
                element={<Login onLogin={handleLogin} />}
              />
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
    </>
  );
};

export default App;
