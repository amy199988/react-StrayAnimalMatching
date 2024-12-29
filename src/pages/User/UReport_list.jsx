import React, { useEffect, useState } from "react";
import { EditableProTable } from "@ant-design/pro-components";
import { Space, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { userReport } from "../../services/userService";

const UReportList = () => {
  const [dataSource, setDataSource] = useState([]);
  const navigate = useNavigate();

  const handleGoBack = () => {
    window.location.href = "/user";
  };

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
      align: "center",
      dataIndex: "report_number",
      readonly: true,
    },
    {
      title: "通報救援者名稱",
      align: "center",
      dataIndex: "reporter",
      readonly: true,
    },
    {
      title: "通報區域",
      align: "center",
      dataIndex: "reportDistrict",
      readonly: true,
    },
    {
      title: "通報日期",
      align: "center",
      dataIndex: "reportDate",
      valueType: "date",
      readonly: true,
    },
    {
      title: "通報狀況",
      align: "center",
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
      align: "center",
      valueType: "option",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => onClick(record.report_number)}>查看</a>
        </Space>
      ),
    },
  ];

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
    </div>
  );
};
export default UReportList;