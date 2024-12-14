import React, { useEffect, useState } from "react";
import { EditableProTable } from "@ant-design/pro-components";
import { Space } from "antd";
import { useNavigate } from "react-router-dom";
import { userReport } from "../../services/userService";

const UReportList = () => {
  const [dataSource, setDataSource] = useState([]);
  const navigate = useNavigate();

  const fetchReportList = async () => {
    try {
      const apiResponse = await userReport();
      console.log("API Response:", apiResponse);

      const requests = apiResponse.data.map((report, index) => ({
        report_number: report.reportNumber || `report-${index}`,
        reporter: report.userDto.userName,
        reportDistrict: report.reportDistrict,
        reportDate: report.reportDate,
        reportStatus: report.reportStatus,
      }));
      setDataSource(requests);
    } catch (error) {
      console.error("Error fetching requestlist:", error);
    }
  };

  useEffect(() => {
    fetchReportList();
  }, []);

  const onClick = (report_number) => {
    navigate(`/user/report_list/info?report_number=${report_number}`);
  };

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
      dataIndex: "reportDistrict",
      readonly: true,
    },
    {
      title: "通報日期",
      dataIndex: "reportDate",
      valueType: "date",
      readonly: true,
    },
    {
      title: "通報狀況",
      dataIndex: "reportStatus",
      valueType: "select",
      valueEnum: {
        pending: {
          text: "待辦中",
          status: "default",
        },
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
        <Space size="middle">
          <a onClick={() => onClick(record.report_number)}>查看</a>
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
        headerTitle="通報救援清單"
        columns={columns}
        rowKey="report_number"
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
export default UReportList;