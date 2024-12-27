import React, { useState } from "react";
import { Button, Form, Input, DatePicker, Radio, Upload, message, Modal } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { sign_up } from "../../services/authService";
import moment from "moment";
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
  const [lovehomeImageBase64, setlovehomeImageBase64] = useState("");
  const [messageApi, contextHolder] = message.useMessage();

  const handleGoBack = () => {
    window.history.back(); // 或者 window.history.go(-1);
  };

  const disabledDate = (current) => {
    return current && current > moment().endOf("day"); // 禁用今天之後的日期
  };

  const onFinish = async (fieldsValue) => {
    console.log("表單資料：", fieldsValue);

    // 檢查有無定義 userData 或確保正確變數名稱
    const userData = {
      userName: fieldsValue.username,
      account: fieldsValue.account,
      password: fieldsValue.password,
      phone: fieldsValue.phone,
      birthdate: fieldsValue.birthdate.format("YYYY-MM-DD"),
      email: fieldsValue.email,
      active: 0,
      LINEId: null,
      resetToken: null,
      role: fieldsValue.role,
      lovehomeDto:
        fieldsValue.role === "role_lovemom"
          ? {
            lovehomeName: fieldsValue.lovehomeName,
            lovehomeCity: fieldsValue.lovehomeCity,
            lovehomeDistrict: fieldsValue.lovehomeDistrict,
            lovehomeAddress: fieldsValue.lovehomeAddress,
            contactInfo: fieldsValue.contactInfo,
            capacity: fieldsValue.capacity,
            lovehomeImage_Base64: lovehomeImageBase64,
          }
          : null,
    };

    console.log("提交的 User Data：", userData);

    try {
      const signup = await sign_up(userData);
      if (signup.message === "註冊成功") {
        console.log("註冊成功", userData);
        Modal.info({
          title: "註冊成功！請至E-mail確認信件後才可登入。",
          okText: "確定", // 設定按鈕的文字
          onOk: () => {
            window.location.href = "/";
          },
        });
      }
    } catch (error) {
      if (error.message.includes("已存在")) {
        messageApi.error("帳號已存在，請重新輸入註冊。");
      } else if (error.message.includes("Email已被使用")) {
        messageApi.error("Email已被使用，請重新輸入註冊。")
      } else {
        messageApi.error("註冊失敗，請重新輸入註冊。");
      }
      console.error("註冊錯誤:", error);
    }
  };

  const handleRoleChange = (e) => {
    const selectedRole = e.target.value;
    console.log("選擇權限：", selectedRole);
    setLovehomeForm(selectedRole === "role_lovemom");
  };

  const handleImageUpload = (info) => {
    console.log(info);
    const file = info.file;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        console.log("圖片 Base64：" + reader.result);
        setlovehomeImageBase64(reader.result);
      };
      reader.onerror = (error) => {
        console.log("圖片讀取錯誤：", error);
      };
      // readAsDataURL 方法會將指定的檔案讀取為Data URL 格式，也就是 Base64 編碼形式的字串
      // 執行 reader.readAsDataURL(file) 後，當檔案讀取操作完成時，FileReader 物件的 onloadend 事件會被觸發。
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      {contextHolder}

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
            {
              len: 10,
              message: "電話號碼必須是 10 位數字",
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
          <DatePicker disabledDate={disabledDate} />
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

            <Form.Item
              {...tailFormItemLayout}
              name="lovehomePhoto"
              valuePropName="fileList"
              getValueFromEvent={(e) => e?.fileList}
              rules={[{ required: true, message: "請上傳照片" }]}
            >
              <Upload
                accept=".png, .jpg, .jpeg"
                listType="picture"
                beforeUpload={() => false} // 禁用自動上傳
                onChange={handleImageUpload}
              >
                <Button icon={<UploadOutlined />}>上傳照片</Button>
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
    </>
  );
};
export default SignUp;
