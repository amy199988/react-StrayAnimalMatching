import React from "react";
import { LockOutlined, UserOutlined, UserAddOutlined } from "@ant-design/icons";
import {
  LoginForm,
  ProConfigProvider,
  ProFormCheckbox,
  ProFormText,
} from "@ant-design/pro-components";
import { theme, Button, Space } from "antd";
import Cat from "../components/icons/cat-space.png";

const Login = () => {
  const { token } = theme.useToken();

  return (
    <ProConfigProvider hashed={false}>
      <div style={{ backgroundColor: token.colorBgContainer }}>
        <LoginForm
          logo={Cat}
          title="浪浪相親網站"
          subTitle="Stray Animal Matching"
          submitter={{
            searchConfig: {
              submitText: "登入", // 修改按鈕文字
            },
          }}
          actions={
            <Space>
              <Button href="/sign_up" icon={<UserAddOutlined />}>註冊會員</Button>
            </Space>
          }
        >
          <ProFormText
            name="username"
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
            <ProFormCheckbox noStyle name="autoLogin">
              自動登入
            </ProFormCheckbox>
            <a
              style={{
                float: "right",
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
