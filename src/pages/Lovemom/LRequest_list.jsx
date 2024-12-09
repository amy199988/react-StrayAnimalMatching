import React, { useEffect } from "react";
import { EditableProTable } from "@ant-design/pro-components";
import { Space } from "antd";
import { useState } from "react";

const LRequestList = () => {
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    const initialData = [
      {
        request_number: "1",
        applicant: "大八",
        adoptedcat: "小八",
        request_date: "123",
        request_status: "all",
      },
    ];
    setDataSource(initialData);
  }, []);

  const columns = [
    {
      title: "領養表單編號",
      dataIndex: "request_number",
      readonly: true,
    },
    {
      title: "申請領養者名稱",
      dataIndex: "applicant",
      readonly: true,
    },
    {
      title: "貓咪編號",
      dataIndex: "adoptedcat",
      readonly: true,
    },
    {
      title: "申請日期",
      dataIndex: "request_date",
      valueType: "date",
      readonly: true,
    },
    {
      title: "申請狀況",
      dataIndex: "request_status",
      valueType: "select",
      valueEnum: {
        all: { text: "待辦中", status: "Default" },
        open: {
          text: "未通過",
          status: "Error",
        },
        closed: {
          text: "已通過",
          status: "Success",
        },
      },
    },
    {
      title: "操作",
      valueType: "option",
      render: (_, record) => (
        <a
          onClick={() => {
            setSelectedRecord(record); // 設定當前記錄
          }}
        >
          查看
        </a>
      ),
    },
  ];

  const handleChange = (newData) => {
    console.log("資料已變更:", newData);
    setDataSource(newData);
  };

  return (
    <Space
      direction="vertical"
      size="middle"
      style={{
        display: "flex",
      }}
    >
      <EditableProTable
        headerTitle="申請領養清單"
        columns={columns}
        rowKey="request_number"
        scroll={{
          x: 960,
        }}
        value={dataSource}
        onChange={handleChange}
        recordCreatorProps={false}
        editable={{
          type: "single",
        }}
      />
    </Space>
  );
};
export default LRequestList;
