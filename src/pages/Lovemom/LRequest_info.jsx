import React, { useEffect, useState } from "react";
import { Descriptions, Button, Space, Select, message } from "antd";
import { useSearchParams } from "react-router-dom";
import { Requests, updateRequest } from "../../services/lovehomeService";

const LRequestInfo = () => {
  // 狀態管理，用來保存 "申請狀況" 的選擇值
  const [status, setStatus] = useState("");
  const [requestData, setrequestData] = useState(null);
  const [searchParams] = useSearchParams();
  const request_number = searchParams.get("request_number");
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    const loadRequestData = async () => {
      try {
        const apiResponse = await Requests(request_number);
        console.log("API Response:", apiResponse);
        setrequestData(apiResponse.data);
        setStatus(apiResponse.data.requestStatus);
      } catch (error) {
        console.error("Error fetching request data:", error);
      }
    };
    loadRequestData();
  }, [request_number]);

  const onFinish = async () => {
    const updateRequestNumber = request_number;
    if (!updateRequestNumber) {
      messageApi.error("領養清單 ID 缺失，無法更新！");
      return false;
    }

    const updateRequestData = {
      requestNumber: request_number,
      userDto: requestData.userDto,
      catDto: requestData.catDto,
      requstDate: requestData.requstDate,
      requestStatus: status,
    };

    console.log("提交的更新 Request Data：", updateRequestData);

    try {
      const updateRequestResponse = await updateRequest(
        updateRequestData,
        request_number
      );
      if (updateRequestResponse.message === "修改成功") {
        messageApi.success("修改成功");
        console.log("修改成功", updateRequestData);
        setTimeout(() => {
          window.location.href = "/lovehome/request_list";
        }, 1000);
      } else {
        messageApi.error("修改失敗");
        console.error("修改失敗:", updateRequestData);
        return false;
      }
    } catch (error) {
      messageApi.error("修改失敗");
      console.error("修改錯誤:", error);
      return false;
    }
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

  const formatDate = (date) => {
    if (!date) return "加載中...";
    const d = new Date(date);
    return d.toLocaleDateString("en-CA");
  };

  // 處理下拉選單值改變
  const handleStatusChange = (value) => {
    setStatus(value);
  };

  const items = [
    {
      key: "applicant_name",
      label: "申請領養者姓名",
      children: requestData ? requestData.userDto.userName : "加載中...",
    },
    {
      key: "applicant_age",
      label: "申請領養者年齡",
      children: requestData
        ? calculateAge(requestData.userDto.birthdate)
        : "加載中...",
    },
    {
      key: "applicant_contact",
      label: "聯絡方式",
      children: requestData ? (
        <>
          電話：{requestData.userDto.phone}
          <br />
          信箱：{requestData.userDto.email}
        </>
      ) : (
        "加載中..."
      ),
    },
    {
      key: "adoptedcat_name",
      label: "貓咪名稱",
      children: requestData ? requestData.catDto.catName : "加載中...",
    },
    {
      key: "adoptedcat_age",
      label: "貓咪年齡",
      children: requestData ? requestData.catDto.age : "加載中...",
    },
    {
      key: "adoptedcat_healthStatus",
      label: "特殊狀況",
      children: requestData ? requestData.catDto.healthStatus : "加載中...",
    },
    {
      key: "requstDate",
      label: "申請日期",
      children: requestData ? formatDate(requestData.requstDate) : "加載中...",
    },
    {
      key: "requestStatus",
      label: "申請狀況",
      span: 2,
      children: (
        <Select
          value={status}
          onChange={handleStatusChange}
          options={[
            { value: "pending", label: "待辦中" },
            { value: "approved", label: "已通過" },
            { value: "rejected", label: "已拒絕" },
          ]}
        />
      ),
    },
  ];

  return (
    <>
      {contextHolder}
      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Descriptions
          title="申請領養表單"
          layout="vertical"
          bordered
          items={items}
        />
        <div
          style={{
            marginTop: "20px", // 增加表格與按鈕的距離
            textAlign: "right", // 將按鈕靠右對齊
          }}
        >
          <Space wrap>
            <Button
              onClick={() => (window.location.href = "/lovehome/request_list")}
            >
              取消
            </Button>
            <Button type="primary" onClick={onFinish}>
              修改
            </Button>
          </Space>
        </div>
      </div>
    </>
  );
};
export default LRequestInfo;
