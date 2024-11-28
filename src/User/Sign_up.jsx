import React, { useState } from "react";
import { Button, Form, Input, DatePicker, Radio, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
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
  const [showLovehomeForm, setLovehomeForm] = useState(false);
  const onFinish = (fieldsValue) => {
    const values = {
      birthdate: fieldsValue["birthdate"].format("YYYY-MM-DD"),
    };
    console.log("Received values of form: ", values);
  };

  const handleRoleChange = (e) => {
    const selectedRole = e.target.value;
    setLovehomeForm(selectedRole === "role_lovemom");
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
        <Radio.Group onChange={handleRoleChange}>
          <Radio value="role_user">普通帳號申請</Radio>
          <Radio value="role_lovemom">愛媽帳號申請</Radio>
        </Radio.Group>
      </Form.Item>

      {showLovehomeForm && (
        <>
          <Form.Item
            name="lovehomeName"
            label="中途之家名稱"
            rules={[{ required: true, message: "請輸入中途之家名稱" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="lovehomeCity"
            label="中途之家城市"
            rules={[{ required: true, message: "請輸入中途之家城市" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="lovehomeDistrict"
            label="中途之家區域"
            rules={[{ required: true, message: "請輸入中途之家區域" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="lovehomeAddress"
            label="詳細地址"
            rules={[{ required: true, message: "請輸入詳細地址" }]}
          >
            <Input.TextArea showCount maxLength={100} />
          </Form.Item>

          <Form.Item
            name="contactInfo"
            label="聯絡方式"
            rules={[{ required: true, message: "請輸入聯絡方式" }]}
          >
            <Input.TextArea showCount maxLength={100} />
          </Form.Item>

          <Form.Item
            name="capacity"
            label="可收容量"
            rules={[{ required: true, message: "請輸入數量" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item {...tailFormItemLayout}
            name="lovehomePhoto"
            valuePropName="fileList"
            getValueFromEvent={(e) => e?.fileList}
          >
            <Upload accept=".png, .jpg, .jpeg" listType="picture">
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>
        </>
      )}

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          註冊
        </Button>
      </Form.Item>
    </Form>
  );
};
export default SignUp;
