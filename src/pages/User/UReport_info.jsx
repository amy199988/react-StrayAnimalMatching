import React, { useEffect, useState } from "react";
import { Descriptions, Button } from "antd";
import { useSearchParams } from "react-router-dom";
import { Reports } from "../../services/lovehomeService";

const UReportInfo = () => {
  const [status, setStatus] = useState("");
  const [reportData, setreportData] = useState(null);
  const [searchParams] = useSearchParams();
  const report_number = searchParams.get("report_number");

  const handleGoBack = () => {
    window.history.back(); // 或者 window.history.go(-1);
  };

  useEffect(() => {
    const loadReportData = async () => {
      try {
        const apiResponse = await Reports(report_number);
        console.log("API Response:", apiResponse);
        setreportData(apiResponse.data);
        setStatus(apiResponse.data.reportStatus);
      } catch (error) {
        console.error("Error fetching report data:", error);
      }
    };
    loadReportData();
  }, [report_number]);

  const statusMap = {
    pending: "待辦中",
    in_progress: "進行中",
    resolved: "已完成",
  };

  const formatDate = (date) => {
    if (!date) return "加載中...";
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0"); // 月份從0開始，因此加1
    const day = String(d.getDate()).padStart(2, "0");
    const hours = String(d.getHours()).padStart(2, "0");
    const minutes = String(d.getMinutes()).padStart(2, "0");
    const seconds = String(d.getSeconds()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const items = [
    {
      key: "reporter_account",
      label: "通報救援者帳號",
      children: reportData ? reportData.userDto.account : "加載中...",
    },
    {
      key: "reporter_name",
      label: "通報救援者姓名",
      children: reportData ? reportData.userDto.userName : "加載中...",
    },
    {
      key: "reporter_contact",
      label: "聯絡方式",
      children: reportData ? (
        <>
          電話：{reportData.userDto.phone}
          <br />
          信箱：{reportData.userDto.email}
        </>
      ) : (
        "加載中..."
      ),
    },
    {
      key: "reportAddress",
      label: "通報地址",
      children: reportData
        ? `${reportData.reportCity}${reportData.reportDistrict}${reportData.reportAddress}`
        : "加載中...",
    },
    {
      key: "description",
      label: "狀況描述",
      children: reportData ? reportData.description : "加載中...",
    },
    {
      key: "reportDate",
      label: "通報日期",
      children: reportData ? formatDate(reportData.reportDate) : "加載中...",
    },
    {
      key: "photo_Base64",
      label: "通報照片",
      children:
        reportData && reportData.photoBase64 ? (
          <img
            src={reportData.photoBase64}
            alt="通報照片"
            style={{ maxWidth: "200px", maxHeight: "200px" }}
          />
        ) : (
          "加載中..."
        ),
    },
    {
      key: "reportStatus",
      label: "通報狀況",
      span: 2,
      children: reportData ? statusMap[status] : "加載中...",
    },
  ];

  return (
    <>
      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
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

        <Descriptions
          title="通報救援表單"
          layout="vertical"
          bordered
          items={items}
        />
      </div>
    </>
  );
};
export default UReportInfo;
