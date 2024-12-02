import React from "react";
import {
  DrawerForm,
  ProForm,
  ProFormRadio,
  ProFormText,
  ProFormTextArea,
  ProFormUploadButton,
} from "@ant-design/pro-components";
import { Table, Space, message } from "antd";
import { useState } from "react";

const AllCatlist = () => {
  const [drawerVisit, setDrawerVisit] = useState(false);

  const handleNavigation = (key) => {
    if (key === "catupdate") {
      setDrawerVisit(true);
    } else if (key === "catadd") {
      setModalVisit(true);
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "catid",
    },
    {
      title: "名稱",
      dataIndex: "catname",
    },
    {
      title: "花紋",
      dataIndex: "breed",
    },
    {
      title: "年齡",
      dataIndex: "age",
    },
    {
      title: "健康狀況",
      dataIndex: "healthstatus",
    },
    {
      title: "描述",
      dataIndex: "description",
    },
    {
      title: "照片",
      dataIndex: "catphotoUrl",
    },
    {
      title: "可領養狀態",
      dataIndex: "isApply",
      filters: [
        {
          text: "true",
          value: "true",
        },
        {
          text: "false",
          value: "false",
        },
      ],
      onFilter: (value, record) => record.isApply.startsWith(value),
      width: "10%",
    },
    {
      title: "所屬中途之家",
      dataIndex: "lovehome_id",
      filters: [
        {
          text: "流浪動物之家",
          value: "流浪動物之家",
        },
        {
          text: "浪浪友愛",
          value: "浪浪友愛",
        },
      ],
      onFilter: (value, record) => record.lovehome_id.startsWith(value),
    },
    {
      title: "",
      dataIndex: "action",
      width: "12%",
      render: () => (
        <Space size="middle">
          <a onClick={() => handleNavigation("catupdate")}>Update</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      catid: "1",
      catname: "小八",
      breed: "123",
      age: "1",
      healthstatus: "12",
      description: "111",
      catphotoUrl: "112",
      isApply: "true",
      lovehome_id: "流浪動物之家"
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
      <DrawerForm
        title="領養貓咪 修改"
        open={drawerVisit}
        width="500px"
        submitter={{
          searchConfig: {
            submitText: "修改",
            resetText: "取消",
          },
        }}
        onFinish={async () => {
          message.success("修改成功");
          return true;
        }}
        onOpenChange={setDrawerVisit}
      >
        <ProForm.Group>
          <ProFormText
            rules={[
              {
                required: true,
              },
            ]}
            name="catName"
            label="貓咪名稱"
            placeholder="請輸入名稱"
          />
          <ProFormText
            rules={[
              {
                required: true,
              },
            ]}
            name="breed"
            label="貓咪花紋"
            placeholder="請輸入花紋"
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText
            rules={[
              {
                required: true,
              },
            ]}
            name="age"
            label="貓咪年齡"
            placeholder="請輸入年齡"
          />
          <ProFormText
            rules={[
              {
                required: true,
              },
            ]}
            name="healthStatus"
            label="健康狀況"
            placeholder="請輸入狀況"
          />
        </ProForm.Group>
        <ProFormTextArea
          colProps={{ span: 24 }}
          name="description"
          label="詳細描述"
          placeholder="請輸入..."
        />
        <ProForm.Group>
          <ProFormRadio.Group
            label="目前狀態"
            name="isApply"
            initialValue="可申請領養"
            options={["可申請領養", "不可申請領養"]}
          />
        </ProForm.Group>
        <ProFormUploadButton
          label="貓咪照片上傳"
          name="catPhoto"
          title="上傳照片"
        />
      </DrawerForm>
      <Table columns={columns} dataSource={data} />
    </Space>
  );
};
export default AllCatlist;
