import React from "react";
import { Button, Form, Input, Space, message } from "antd";
import { UpdatePassword as UpdatePasswordAPI } from "../../services/lovehomeService"; // 假設 API 函式存放在 api.js

const SubmitButton = ({ form, children }) => {
  const [submittable, setSubmittable] = React.useState(false);

  const values = Form.useWatch([], form);
  React.useEffect(() => {
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

const UpdatePassword = () => {
  const [form] = Form.useForm();

  const handleGoBack = () => {
    window.history.back(); // 或者 window.history.go(-1);
  };


  // 提交表單的處理函式
  const handleFinish = async (values) => {
    const { oldPassword, newPassword } = values;

    try {
      // 調用 API 函式
      const apiResponse = await UpdatePasswordAPI(oldPassword, newPassword);
      message.success("密碼修改成功");
      setTimeout(() => {
        window.location.href = "/lovehome";
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
        name="updatePassword"
        layout="vertical"
        autoComplete="off"
        onFinish={handleFinish} // 表單提交時執行 handleFinish
      >
        <Form.Item
          name="oldPassword"
          label="原密碼"
          rules={[
            {
              required: true,
              message: "請輸入原密碼！",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
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
            <Button htmlType="reset" onClick={() => form.resetFields()}>
              重設
            </Button>
            <SubmitButton form={form}>送出更改</SubmitButton>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdatePassword;
