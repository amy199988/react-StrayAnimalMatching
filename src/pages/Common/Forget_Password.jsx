import React, { useEffect, useState } from "react";
import { Button, Form, Input, Space, message } from "antd";
import { forgetPassword } from "../../services/authService"; // 假設 API 函式存放在 api.js

const SubmitButton = ({ form, children }) => {
  const [submittable, setSubmittable] = useState(false);

  const values = Form.useWatch([], form);
  useEffect(() => {
    form
      .validateFields({
        validateOnly: true,
      })
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false));
  }, [form, values]);
  return (
    <Button type="primary" htmlType="submit" disabled={!submittable}>
      {children}
    </Button>
  );
};

const ForgetPassword = () => {
  const [form] = Form.useForm();

  const handleGoBack = () => {
    window.history.back(); // 或者 window.history.go(-1);
  };

  // 提交表單的處理函式
  const handleFinish = async (values) => {
    const { account, email } = values;

    try {
      // 調用 API 函式
      const apiResponse = await forgetPassword(account, email);
      message.success("寄送郵件成功，請至Email收信");
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
      console.log(apiResponse); // 可以處理回應資料
    } catch (error) {
      console.error("申請失敗:", error);
      message.error("忘記密碼申請失敗，請確認資料輸入是否正確");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* 返回上一頁按鈕 */}
      <Button
        onClick={handleGoBack}
        style={{
          position: "absolute", // 使用絕對定位
          top: "70px", // 距離頂部20px
          left: "50px", // 距離左邊20px
          zIndex: 10, // 確保按鈕顯示在頁面最前面
        }}
      >
        返回上一頁
      </Button>


      <Form
        form={form}
        name="forgetPassword"
        layout="vertical"
        autoComplete="off"
        onFinish={handleFinish} // 表單提交時執行 handleFinish
      >
        <Form.Item
          name="account"
          label="帳號"
          rules={[
            {
              required: true,
              message: "請輸入帳號！",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="信箱"
          rules={[
            {
              required: true,
              message: "請輸入信箱！",
            },
          ]}
        >
          <Input />
        </Form.Item>


        <Form.Item>
          <Space>
            <SubmitButton form={form}>送出</SubmitButton>
            <Button htmlType="reset" onClick={() => form.resetFields()}>
              重設
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ForgetPassword;
