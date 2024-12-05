import React, { useEffect } from "react";
import { EditableProTable } from "@ant-design/pro-components";
import { Space } from "antd";
import { useState } from "react";

const LRequestList = () => {
  const [dataSource, setDataSource] = useState([]);
  const [editableKeys, setEditableRowKeys] = useState([]);

  useEffect(() => {
    const initialData = [
      {
        request_number: "1",
        applicant_id: "1",
        adoptedcat_id: "小八",
        request_date: "123",
        request_status: "open",
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
      title: "申請領養者編號",
      dataIndex: "applicant_id",
      readonly: true,
    },
    {
      title: "被領養貓咪編號",
      dataIndex: "adoptedcat_id",
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
        all: { text: "全部", status: "Default" },
        open: {
          text: "未解决",
          status: "Error",
        },
        closed: {
          text: "已解决",
          status: "Success",
        },
      },
    },
  ];

  const data = [
    {
      request_number: "1",
      applicant_id: "1",
      adoptedcat_id: "小八",
      request_date: "123",
      request_status: "closed",
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
        headerTitle="可编辑表格"
        columns={columns}
        rowKey="request_number"
        scroll={{
          x: 960,
        }}
        value={dataSource}
        onChange={handleChange}
        recordCreatorProps={false}
        editable={{
          type: "multiple",
          editableKeys,
          actionRender: (row, config, defaultDoms) => {
            return [defaultDoms.delete];
          },
          onValuesChange: (record, recordList) => {
            setDataSource(recordList);
          },
          onChange: setEditableRowKeys,
        }}
      />
    </Space>
  );
};
export default LRequestList;
