import React, { useEffect, useState, useRef } from "react";
import {
  ProForm,
  ProFormUploadButton,
  ProFormTextArea,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-components";
import { Form, message, Modal , Button } from "antd";
import { userData } from "../../services/userService";
import { report, lovehome_list } from "../../services/commonService";
import { checkSession } from "../../services/authService";

const Report = () => {
  const [fileList, setFileList] = useState([]);
  const [reported, setreported] = useState(null);
  const [Imagebase64, setImageBase64] = useState(null);
  const [lovehomes, setlovehomes] = useState([]);
  const [selectedLovehomeId, setSelectedLovehomeId] = useState(null);
  const [selectedLovehomeAddress, setSelectedLovehomeAddress] = useState("");
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const alertTriggeredRef = useRef(false); // 用於追蹤 alert 是否已被觸發

  const handleGoBack = () => {
    window.history.back(); // 或者 window.history.go(-1);
  };

  useEffect(() => {
    const verifyLoginStatus = async () => {
      // 檢查是否已登入
      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
      let isSessionValid = false;

      try {
        // 檢查後端 Session 狀態
        isSessionValid = await checkSession();
      } catch (error) {
        console.error("Session 檢查失敗:", error.message);
      }

      // 當用戶未登入或 session 無效且 Modal 未觸發過時，才觸發 Modal
      if ((!isLoggedIn || !isSessionValid) && !alertTriggeredRef.current) {
        alertTriggeredRef.current = true; // 設置為 true，避免重複執行
        localStorage.setItem("isLoggedIn", "false");
        setTimeout(() => {
          Modal.info({
            title: "請先登入後繼續。",
            okText: "前往登入", // 設定按鈕的文字
            onOk: () => {
              window.location.href = "/auth/login"; // 跳轉到登入頁面
            },
          });
        }, 1000);
      }
    };

    // 只會在組件第一次渲染時觸發
    verifyLoginStatus();


    const loadLovehome = async () => {
      try {
        const apiResponse = await userData();
        setreported(apiResponse);

        const lovehomeResponse = await lovehome_list();
        const lovehomeOptions = lovehomeResponse.data.map((home) => ({
          label: home.lovehomeName,
          value: home.lovehomeId,
          address: `${home.lovehomeCity}${home.lovehomeDistrict}${home.lovehomeAddress}`, // 組合完整地址
        }));
        setlovehomes(lovehomeOptions);

        form.setFieldsValue({
          reported_account: apiResponse.data.account,
        });
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    loadLovehome();
  }, [form]);

  const onFinish = async (fieldsValue) => {
    console.log("表單資料：", fieldsValue);

    const reportData = {
      userDto: reported,
      lovehomeId: selectedLovehomeId,
      reportCity: fieldsValue.reportCity,
      reportDistrict: fieldsValue.reportDistrict,
      reportAddress: fieldsValue.reportAddress,
      photoBase64: Imagebase64,
      description: fieldsValue.description,
      reportDate: new Date(),
      reportStatus: "pending",
    };

    console.log("提交的 reportData:", reportData);

    try {
      const response = await report(reportData, selectedLovehomeId);
      if (response.message === "通報成功","申請成功") {
        messageApi.success("通報成功！");
        console.log("通報成功", reportData);
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      } else {
        messageApi.error("通報失敗！");
        console.error("通報失敗:", reportData);
      }
    } catch (error) {
      console.error("Error submitting report:", error);
      messageApi.error("提交失敗，請稍後再試！");
    }
  };

  const handleLovehomeChange = (value) => {
    setSelectedLovehomeId(value);
    // 根據選擇的 lovehomeId 找到對應的組合地址
    const selectedHome = lovehomes.find((home) => home.value === value);
    setSelectedLovehomeAddress(selectedHome?.address || "無地址資料");
  };

  const handleImageUpload = ({ file, fileList }) => {
    setFileList([...fileList]);

    const originFile = file.originFileObj || file;
    if (originFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        console.log("圖片 Base64：" + reader.result);
        setImageBase64(reader.result);
      };
      reader.onerror = (error) => {
        console.log("圖片讀取錯誤：", error);
      };

      reader.readAsDataURL(originFile);
    }
  };

  return (
    <div>
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
    
    <ProForm form={form} onFinish={onFinish} autoFocusFirstInput>
      {contextHolder}
      <ProFormText name="reported_account" label="通報人帳號" readonly />
      <ProForm.Group>
        <ProFormText
          name="reportCity"
          label="通報城市"
          placeholder="請輸入城市"
          rules={[{ required: true, message: "請輸入城市" }]}
        />
        <ProFormText
          name="reportDistrict"
          label="通報區域"
          placeholder="請輸入區域"
          rules={[{ required: true, message: "請輸入區域" }]}
        />
        <ProFormTextArea
          name="reportAddress"
          label="通報地址"
          placeholder="請輸入地址"
          rules={[{ required: true, message: "請輸入地址" }]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormSelect
          name="lovehomeId"
          label="通報救援中途"
          placeholder="請選擇中途"
          rules={[{ required: true, message: "請選擇中途" }]}
          options={lovehomes}
          onChange={handleLovehomeChange}
        />
        <ProFormText
          name="lovehomeAddress"
          label="中途之家地址"
          fieldProps={{
            value: selectedLovehomeAddress,
          }}
          readonly
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormTextArea
          name="description"
          label="狀況描述"
          placeholder="請輸入..."
          rules={[{ required: true, message: "請輸入狀況" }]}
        />
        <ProFormUploadButton
          label="照片上傳"
          name="photo_Base64"
          title="上傳照片"
          maxCount={1}
          fieldProps={{
            beforeUpload: () => false,
            accept: ".png, .jpg, .jpeg",
            listType: "picture",
            onChange: handleImageUpload,
          }}
          fileList={fileList}
          rules={[{ required: true, message: "請上傳照片" }]}
        />
      </ProForm.Group>
    </ProForm>
    </div>
  );
};
export default Report;
