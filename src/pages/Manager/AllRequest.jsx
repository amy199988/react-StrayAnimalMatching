import React, { useEffect, useState } from "react";
import { Space, message, Popconfirm, Table, Badge , Button } from "antd";
import { useNavigate } from "react-router-dom";
import { deleteRequest } from "../../services/lovehomeService";
import { allRequestData } from "../../services/managerService";

const AllRequestlist = () => {
  const [dataSource, setDataSource] = useState([]);
  const navigate = useNavigate();
  const [LovehomeFilters, setLovehomeFilters] = useState([]);

  const handleGoBack = () => {
    window.location.href = "/manager";
  };

  const confirm = async (request_number) => {
    try {
      await deleteRequest(request_number);
      setDataSource((prevDataSource) =>
        prevDataSource.filter(
          (request) => request.request_number !== request_number
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

  const fetchRequestList = async () => {
    try {
      const apiResponse = await allRequestData();
      console.log("API Response:", apiResponse);

      const requests = apiResponse.data.map((request, index) => ({
        request_number: request.requestNumber || `request-${index}`,
        applicant: request.userDto.userName,
        adoptedcat: request.catDto.catName,
        request_date: new Date(request.requstDate).toLocaleDateString("zh-TW"),
        request_status: request.requestStatus,
        lovehome: request.catDto.lovehomeName,
      }));
      setDataSource(requests);
    } catch (error) {
      console.error("Error fetching requestlist:", error);
    }
  };

  useEffect(() => {
    fetchRequestList();
  }, []);

  useEffect(() => {
    const uniqueLovehomes = Array.from(
      new Set(dataSource.map((request) => request.lovehome))
    ).map((lovehome) => ({
      text: lovehome,
      value: lovehome,
    }));
    setLovehomeFilters(uniqueLovehomes);
  }, [dataSource]);

  const onClick = (request_number) => {
    navigate(`/manager/all_request/info?request_number=${request_number}`);
  };

  const statusBadge = (status) => {
    switch (status) {
      case "pending":
        return <Badge status="processing" text="待辦中" />;
      case "rejected":
        return <Badge status="error" text="未通過" />;
      case "approved":
        return <Badge status="success" text="已通過" />;
      default:
        return <Badge status="default" text="未知狀態" />;
    }
  };

  const columns = [
    {
      title: "領養表單編號",
      dataIndex: "request_number",
      align: "center",
    },
    {
      title: "申請領養者名稱",
      dataIndex: "applicant",
      align: "center",
    },
    {
      title: "貓咪名稱",
      dataIndex: "adoptedcat",
      align: "center",
    },
    {
      title: "申請日期",
      dataIndex: "request_date",
      align: "center",
    },
    {
      title: "申請狀況",
      align: "center",
      dataIndex: "request_status",
      render: (status) => statusBadge(status),
      filters: [
        {
          text: "待辦中",
          value: "pending",
        },
        {
          text: "未通過",
          value: "rejected",
        },
        {
          text: "已通過",
          value: "approved",
        },
      ],
      onFilter: (value, record) => record.request_status.startsWith(value),
    },
    {
      title: "屬於中途之家",
      align: "center",
      dataIndex: "lovehome",
      filters: LovehomeFilters,
      onFilter: (value, record) => record.lovehome.startsWith(value),
    },
    {
      title: "操作",
      align: "center",
      valueType: "option",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => onClick(record.request_number)}>查看</a>
          <Popconfirm
            title="刪除"
            description="確定要刪除此筆清單嗎?"
            onConfirm={() => confirm(record.request_number)}
            onCancel={cancel}
            okText="確定"
            cancelText="取消"
          >
            <a>刪除</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
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
    </>
  );
};
export default AllRequestlist;
