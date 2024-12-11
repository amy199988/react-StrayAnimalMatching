import React, { useEffect, useState } from "react";
import { EditableProTable } from "@ant-design/pro-components";
import { Space } from "antd";
import { useNavigate } from "react-router-dom";
import { userRequest } from "../../services/userService";

const URequestList = () => {
  const [dataSource, setDataSource] = useState([]);
  const navigate = useNavigate();

  const fetchRequestList = async () => {
    try {
      const apiResponse = await userRequest();
      console.log("API Response:", apiResponse);

      const requests = apiResponse.data.map((request, index) => ({
        request_number: request.requestNumber || `request-${index}`,
        applicant: request.userDto.userName,
        adoptedcat: request.catDto.catName,
        request_date: request.requstDate,
        request_status: request.requestStatus,
      }));
      setDataSource(requests);
    } catch (error) {
      console.error("Error fetching requestlist:", error);
    }
  };

  useEffect(() => {
    fetchRequestList();
  }, []);

  const onClick = (request_number) => {
    navigate(`/user/request_list/info?request_number=${request_number}`);
  };

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
      title: "貓咪名稱",
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
        pending: {
          text: "待辦中",
          status: "Processing",
        },
        rejected: {
          text: "未通過",
          status: "Error",
        },
        approved: {
          text: "已通過",
          status: "Success",
        },
      },
    },
    {
      title: "操作",
      valueType: "option",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => onClick(record.request_number)}>查看</a>
        </Space>
      ),
    },
  ];

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
        recordCreatorProps={false}
        editable={{
          type: "single",
        }}
      />
    </Space>
  );
};
export default URequestList;