import React, { useEffect, useState } from "react";
import { Button, Form, Input, Space, message } from "antd";
import { resetPassword } from "../../services/authService"; // 假設 API 函式存放在 api.js

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

const ResetPassword = () => {
  const [form] = Form.useForm();

  // 提交表單的處理函式
  const handleFinish = async (values) => {
    const { newPassword } = values;

    try {
      // 調用 API 函式
      const apiResponse = await resetPassword(newPassword);
      message.success("密碼修改成功，請用新密碼登入");
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
      console.log(apiResponse); // 可以處理回應資料
    } catch (error) {
      console.error("密碼修改失敗:", error);
      message.error("密碼修改失敗，請確認輸入是否正確");
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
      <Form
        form={form}
        name="ResetPassword"
        layout="vertical"
        autoComplete="off"
        onFinish={handleFinish} // 表單提交時執行 handleFinish
      >
        <Form.Item
          name="newPassword"
          label="新密碼"
          rules={[
            {
              required: true,
              message: "請輸入新密碼！",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="確認新密碼"
          dependencies={["newPassword"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "再次確認新密碼",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("密碼輸入不相同"));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Space>
            <SubmitButton form={form}>送出更改</SubmitButton>
            <Button htmlType="reset" onClick={() => form.resetFields()}>
              重設
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ResetPassword;
