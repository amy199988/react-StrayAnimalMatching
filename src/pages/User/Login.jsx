import React, { useState } from "react";
import { LockOutlined, UserOutlined, UserAddOutlined } from "@ant-design/icons";
import {
  LoginForm,
  ProConfigProvider,
  ProFormText,
} from "@ant-design/pro-components";
import { theme, Button, Space, Row, Col } from "antd";
import Cat from "../../components/icons/cat-space.png";
import StrayAnimalMatching from "../../components/icons/StrayAnimalMatching.png";

const Login = ({ onLogin }) => {
  const { token } = theme.useToken();
  const [account, setAccount] = useState();
  const [password, setPassword] = useState();

  const handleFinish = () => {
    onLogin(account, password); // 呼叫 onLogin 進行登入驗證
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "16px", // 手機頁面保證間距
        width: "100%",
        backgroundColor: token.colorBgContainer,
      }}
    >
      <ProConfigProvider hashed={false}>
        <Row
          justify="center"
          style={{
            maxWidth: "400px", // 最大寬度限制，適合桌面和平板
            width: "100%", // 在小螢幕時占滿寬度
            height: "100%",
            boxShadow: "4px 4px 4px 4px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            background: "white",
          }}
        >

          <Col span={24}>
            <LoginForm
              onFinish={handleFinish}
              submitter={{
                searchConfig: {
                  submitText: "登入", // 修改按鈕文字
                },
              }}
              actions={
                <Space>
                  <Button href="/auth/sign_up" icon={<UserAddOutlined />}
                    style={{ width: "100%" }}>註冊會員</Button>
                </Space>
              }
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: "16px",
                }}
              >
                <img
                  src={StrayAnimalMatching}
                  alt="Logo"
                  style={{
                    maxWidth: "100%",
                    width: "300px", // 設定圖片寬度
                    height: "auto", // 確保按比例縮放
                  }}
                />
              </div>

              <ProFormText
                name="account"
                value={account}
                onChange={(e) => setAccount(e.target.value)}
                fieldProps={{
                  size: "large",
                  prefix: <UserOutlined className={"prefixIcon"} />,
                }}
                placeholder={"帳號：account"}
                rules={[
                  {
                    required: true,
                    message: "請輸入帳號！",
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fieldProps={{
                  size: "large",
                  prefix: <LockOutlined className={"prefixIcon"} />,
                }}
                placeholder={"密碼：password"}
                rules={[
                  {
                    required: true,
                    message: "請輸入密碼！",
                  },
                ]}
              />
              <div
                style={{
                  float: "right",
                  marginBottom: "12px",
                }}
              >
                <a href="/auth/forget_password"

                >
                  忘記密碼
                </a>
              </div>
            </LoginForm>
          </Col>
        </Row>
      </ProConfigProvider>
    </div>
  );
};
export default Login;
