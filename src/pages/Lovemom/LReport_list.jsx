import React, { useEffect } from "react";
import { EditableProTable } from "@ant-design/pro-components";
import { Space } from "antd";
import { useState } from "react";

const LReportList = () => {
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    const initialData = [
      {
        report_number: "1",
        reporter: "大八",
        report_district: "小八",
        report_date: "123",
        report_status: "pending",
      },
    ];
    setDataSource(initialData);
  }, []);

  const columns = [
    {
      title: "通報救援編號",
      dataIndex: "report_number",
      readonly: true,
    },
    {
      title: "通報救援者名稱",
      dataIndex: "reporter",
      readonly: true,
    },
    {
      title: "通報區域",
      dataIndex: "report_district",
      readonly: true,
    },
    {
      title: "通報日期",
      dataIndex: "report_date",
      valueType: "date",
      readonly: true,
    },
    {
      title: "通報狀況",
      dataIndex: "report_status",
      valueType: "select",
      valueEnum: {
        pending: { text: "待辦中", status: "default" },
        in_progress: {
          text: "進行中",
          status: "Processing",
        },
        resolved: {
          text: "已完成",
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
            window.location.href = "/lovehome/report_list/info";
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
        headerTitle="通報救援清單"
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
export default LReportList;