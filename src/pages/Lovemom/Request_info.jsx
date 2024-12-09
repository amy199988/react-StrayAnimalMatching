import React, { useState } from "react";
import { Badge, Descriptions, Button, Space, Select } from "antd";

const RequestInfo = () => {
  // 狀態管理，用來保存 "申請狀況" 的選擇值
  const [status, setStatus] = useState("processing");

  // 處理下拉選單值改變
  const handleStatusChange = (value) => {
    setStatus(value);
  };

  const items = [
    {
      key: "1",
      label: "申請領養者姓名",
      children: "Cloud Database",
    },
    {
      key: "2",
      label: "申請領養者年齡",
      children: "Prepaid",
    },
    {
      key: "3",
      label: "聯絡方式",
      children: (
        <>
          電話：
          <br />
          信箱：
        </>
      ),
    },
    {
      key: "4",
      label: "貓咪名稱",
      children: "2018-04-24 18:00:00",
    },
    {
      key: "5",
      label: "貓咪年齡",
      children: "2019-04-24 18:00:00",
    },
    {
      key: "6",
      label: "特殊狀況",
      children: "2019-04-24 18:00:00",
    },
    {
      key: "7",
      label: "申請日期",
      children: "$80.00",
    },
    {
      key: "8",
      label: "申請狀況",
      span: 2,
      children: (
        <Select
          value={status}
          onChange={handleStatusChange}
          options={[
            { value: "processing", label: "待辦中" },
            { value: "approved", label: "已通過" },
            { value: "rejected", label: "已拒絕" },
          ]}
        />
      ),
    },
  ];

  return (
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
          <Button>取消</Button>
          <Button type="primary">修改</Button>
        </Space>
      </div>
    </div>
  );
};
export default RequestInfo;
