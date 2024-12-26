import React, { useEffect, useState } from "react";
import {
  ProForm,
  ProFormDigit,
  ProFormText,
  ProFormCheckbox,
} from "@ant-design/pro-components";
import { userData } from "../../services/userService";
import { request } from "../../services/commonService";
import { useSearchParams } from "react-router-dom";
import { Form, message , Button } from "antd";
import { cat } from "../../services/lovehomeService";

export default function AdoptionRequest() {
  const [form] = Form.useForm();
  const [searchParams] = useSearchParams();
  const catId = searchParams.get("catId");
  const [messageApi, contextHolder] = message.useMessage();
  const [applicantData, setApplicantData] = useState(null);
  const [adoptedcatData, setAdoptedcatData] = useState(null);

  const handleGoBack = () => {
    window.history.back(); // 或者 window.history.go(-1);
  };

  const calculateAge = (birthdate) => {
    const birthDate = new Date(birthdate);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    // 如果當前日期在生日之前，年齡減一
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const apiResponse = await userData();
        setApplicantData(apiResponse.data);

        const catResponse = await cat(catId);
        setAdoptedcatData(catResponse.data);

        form.setFieldsValue({
          userId: apiResponse.data.userId,
          username: apiResponse.data.userName,
          account: apiResponse.data.account,
          age: calculateAge(apiResponse.data.birthdate),
          phone: apiResponse.data.phone,
          email: apiResponse.data.email,
        });
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    loadUserData();
  }, [form]);

  const onFinish = async (fieldsValue) => {
    console.log("表單資料：", fieldsValue);

    const requestData = {
      userDto: applicantData,
      catDto: adoptedcatData,
      requstDate: new Date(),
      requestStatus: "pending",
    };

    console.log("提交的表單 Data：", requestData);
    try {
      const requestResponse = await request(requestData,catId);
      if (requestResponse.message === "申請成功") {
        messageApi.success("申請成功");
        console.log("申請成功", requestData);
        setTimeout(() => {
          window.location.href = "/common/adoption";
        }, 1000);
      }
    } catch (error) {
      messageApi.error("申請失敗，請重新申請。");
    }
  };

  return (
    <>
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

      {contextHolder}
      <ProForm
        form={form}
        initialValues={{
          username: "",
          account: "",
          age: 0,
          phone: "",
          email: "",
        }}
        onFinish={onFinish}
        autoFocusFirstInput
      >
        <ProForm.Group>
          <ProFormText name="userId" hidden />
          <ProFormText
            name="username"
            label="名稱"
            placeholder="請輸入名稱"
            rules={[{ required: true, message: "這是必填項" }]}
          />
          <ProFormText
            name="account"
            label="帳號"
            placeholder="請輸入帳號"
            rules={[{ required: true, message: "這是必填項" }]}
          />
          <ProFormDigit
            name="age"
            label="年齡"
            placeholder="請輸入年齡"
            rules={[{ required: true, message: "這是必填項" }]}
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText
            name="phone"
            label="電話"
            placeholder="請輸入電話"
            rules={[{ required: true, message: "這是必填項" }]}
          />
          <ProFormText
            name="email"
            label="信箱"
            placeholder="請輸入信箱"
            rules={[{ required: true, message: "這是必填項" }]}
          />
        </ProForm.Group>
        <ProFormCheckbox.Group
          name="agreements"
          layout="vertical"
          label="同意事項"
          options={["同意貓咪植入晶片、施打疫苗。", "同意貓咪進行結紮手術。"]}
          rules={[
            {
              validator: (_, value) => {
                if (value && value.length === 2) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("必須同意所有事項才能提交"));
              },
            },
          ]}
        />
      </ProForm>
    </>
  );
}
