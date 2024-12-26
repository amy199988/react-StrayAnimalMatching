import React, { useEffect, useState } from "react";
import { Space, message, Popconfirm, Table, Badge, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { deleteReport } from "../../services/lovehomeService";
import { allReportData } from "../../services/managerService";
import { lovehome_list } from "../../services/commonService";

const AllReportlist = () => {
  const [dataSource, setDataSource] = useState([]);
  const navigate = useNavigate();
  const [lovehomes, setlovehomes] = useState([]);
  const [LovehomeFilters, setLovehomeFilters] = useState([]);

  const handleGoBack = () => {
    window.history.back(); // 或者 window.history.go(-1);
  };

  const fetchReportList = async () => {
    try {
      const [reportResponse, lovehomeResponse] = await Promise.all([
        allReportData(),
        lovehome_list(),
      ]);

      // 建立 lovehomeId 與 lovehomeName 的映射表
      const lovehomeMap = lovehomeResponse.data.reduce((map, home) => {
        map[home.lovehomeId] = home.lovehomeName;
        return map;
      }, {});

      const reports = reportResponse.data.map((report, index) => ({
        report_number: report.reportNumber || `report-${index}`,
        reporter: report.userDto.userName,
        reportDistrict: report.reportDistrict,
        reportDate: new Date(report.reportDate).toLocaleDateString("zh-TW"),
        reportStatus: report.reportStatus,
        lovehome: lovehomeMap[report.lovehomeId] || "未知",
      }));
      setDataSource(reports);

      // 設定篩選器資料
      const uniqueLovehomes = Array.from(
        new Set(lovehomeResponse.data.map((home) => home.lovehomeName))
      ).map((name) => ({
        text: name,
        value: name,
      }));
      setLovehomeFilters(uniqueLovehomes);
    } catch (error) {
      console.error("Error fetching reportlist:", error);
    }
  };

  useEffect(() => {
    fetchReportList();
  }, []);

  const confirm = async (report_number) => {
    try {
      await deleteReport(report_number);
      setDataSource((prevDataSource) =>
        prevDataSource.filter(
          (report) => report.report_number !== report_number
        )
      );
      message.success("刪除成功！");
    } catch (error) {
      console.error("Error delete request:", error);
      message.error("刪除失敗，請稍後再試。");
    }
  };
  const cancel = () => {
    message.error("已取消刪除");
  };

  const onClick = (report_number) => {
    navigate(`/manager/all_report/info?report_number=${report_number}`);
  };

  const statusBadge = (status) => {
    switch (status) {
      case "pending":
        return <Badge status="default" text="待辦中" />;
      case "in_progress":
        return <Badge status="processing" text="進行中" />;
      case "resolved":
        return <Badge status="success" text="已完成" />;
      default:
        return <Badge status="default" text="未知狀態" />;
    }
  };

  const columns = [
    {
      title: "通報救援編號",
      dataIndex: "report_number",
    },
    {
      title: "通報救援者名稱",
      dataIndex: "reporter",
    },
    {
      title: "通報區域",
      dataIndex: "reportDistrict",
    },
    {
      title: "通報日期",
      dataIndex: "reportDate",
    },
    {
      title: "通報狀況",
      dataIndex: "reportStatus",
      render: (status) => statusBadge(status),
      filters: [
        {
          text: "待辦中",
          value: "pending",
        },
        {
          text: "進行中",
          value: "in_progress",
        },
        {
          text: "已完成",
          value: "resolved",
        },
      ],
      onFilter: (value, record) => record.reportStatus.startsWith(value),
    },
    {
      title: "屬於中途之家",
      dataIndex: "lovehome",
      filters: LovehomeFilters,
      onFilter: (value, record) => record.lovehome.startsWith(value),
    },
    {
      title: "操作",
      valueType: "option",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => onClick(record.report_number)}>查看</a>
          <Popconfirm
            title="刪除"
            description="確定要刪除此筆清單嗎?"
            onConfirm={() => confirm(record.report_number)}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <a>刪除</a>
          </Popconfirm>
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
        <Table columns={columns} dataSource={dataSource} />
      </Space>
    </div>
  );
};
export default AllReportlist;