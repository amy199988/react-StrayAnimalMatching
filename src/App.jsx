import React from "react";
import { Layout } from "antd";
import MyMenu from "./components/MyMenu";
import Adoption from "./AdoptionCat/Adoption.jsx";
import Home from "./Home.jsx"
import Lovehome from "./Lovehome/Lovehome.jsx";
import Lovemom from "./Lovemom/Lovemom.jsx";
import Catlist from "./Lovemom/Cat_list.jsx";
import Login from "./User/Login.jsx";
import AdoptionRequest from "./AdoptionCat/AdoptionRequest.jsx";
import SignUp from "./User/Sign_up.jsx";
import Donation from "./Donation/Donation.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const { Header, Content, Footer } = Layout;

const App = () => {

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
          <MyMenu />
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
            <Route path="/lovehome" element={<Lovehome />} />
            <Route path="/lovemom" element={<Lovemom />} />
            <Route path="/cat_list" element={<Catlist />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sign_up" element={<SignUp />} />
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
