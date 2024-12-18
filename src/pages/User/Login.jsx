import React, { useState } from "react";
import { LockOutlined, UserOutlined, UserAddOutlined } from "@ant-design/icons";
import {
  LoginForm,
  ProConfigProvider,
  ProFormText,
} from "@ant-design/pro-components";
import { theme, Button, Space } from "antd";
import Cat from "../../components/icons/cat-space.png";

const Login = ({onLogin}) => {
  const { token } = theme.useToken();
  const [account, setAccount] = useState();
  const [password, setPassword] = useState();

  const handleFinish = () => {
    onLogin(account, password); // 呼叫 onLogin 進行登入驗證
  };

  return (
    <ProConfigProvider hashed={false}>
      <div style={{ backgroundColor: token.colorBgContainer }}>
        <LoginForm
          logo={Cat}
          title="浪浪配對網站"
          subTitle="Stray Animal Matching"
          onFinish={handleFinish}
          submitter={{
            searchConfig: {
              submitText: "登入", // 修改按鈕文字
            },
          }}
          actions={
            <Space>
              <Button href="/auth/sign_up" icon={<UserAddOutlined />}>註冊會員</Button>
            </Space>
          }
        >
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
              marginBlockEnd: 24,
            }}
          >
            <a
              style={{
                float: "right",
                marginBottom: "12px",
              }}
            >
              忘記密碼
            </a>
          </div>
        </LoginForm>
      </div>
    </ProConfigProvider>
  );
};
export default Login;
