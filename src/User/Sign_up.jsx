import React from "react";
import { Button, Form, Input, DatePicker, Radio } from "antd";
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
const SignUp = () => {
  const [form] = Form.useForm();
  const onFinish = (fieldsValue) => {
    const values = {
      birthdate: fieldsValue["birthdate"].format("YYYY-MM-DD"),
    };
    console.log("Received values of form: ", values);
  };

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      style={{
        maxWidth: 600,
      }}
      scrollToFirstError
    >
      <Form.Item
        name="username"
        label="姓名"
        rules={[
          {
            required: true,
            message: "請輸入姓名",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="account"
        label="帳號"
        rules={[
          {
            required: true,
            message: "請輸入帳號",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="密碼"
        rules={[
          {
            required: true,
            message: "請輸入密碼",
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="確認密碼"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "再次確認密碼",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("密碼輸入不正確"));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="phone"
        label="電話"
        rules={[
          {
            required: true,
            message: "請輸入電話",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="birthdate"
        label="生日"
        rules={[
          {
            type: "object",
            required: true,
            message: "請選擇生日",
          },
        ]}
      >
        <DatePicker />
      </Form.Item>

      <Form.Item
        name="email"
        label="信箱"
        rules={[
          {
            type: "email",
            message: "信箱格式不正確",
          },
          {
            required: true,
            message: "請輸入信箱",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="role"
        label="申請會員"
        rules={[
          {
            required: true,
            message: "請選擇身分",
          },
        ]}
      >
        <Radio.Group>
          <Radio value="role_user">普通帳號申請</Radio>
          <Radio value="role_lovemom">愛媽帳號申請</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          註冊
        </Button>
      </Form.Item>
    </Form>
  );
};
export default SignUp;
