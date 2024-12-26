import React, { useEffect, useState } from "react";
import {
  DrawerForm,
  ProForm,
  ProFormText,
  ProFormTextArea,
  ProFormUploadButton,
} from "@ant-design/pro-components";
import { Table, Space, message, Form, Button } from "antd";
import { allLovehomeData } from "../../services/managerService";
import { updateLovehome } from "../../services/managerService";

const AllLovehomelist = () => {
  const [drawerVisit, setDrawerVisit] = useState(false);
  const [lovehomelistData, setlovehomelistData] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [lovehomeImagebase64, setLovehomeImageBase64] = useState(null);
  const [selectedLovehome, setSelectedlovehome] = useState(null);
  const [form] = Form.useForm();
  const [CityFilters, setCityFilters] = useState([]);
  const handleGoBack = () => {
    window.history.back(); // 或者 window.history.go(-1);
  };

  const fetchLovehomeList = async () => {
    try {
      const apiResponse = await allLovehomeData();
      const lovehomes = apiResponse.data.map((lovehome, index) => ({
        key: lovehome.lovehomeId || `lovehome-${index}`,
        lovehomeId: lovehome.lovehomeId,
        lovehomeName: lovehome.lovehomeName,
        lovehomeCity: lovehome.lovehomeCity,
        lovehomeDistrict: lovehome.lovehomeDistrict,
        lovehomeAddress: lovehome.lovehomeAddress,
        contactInfo: lovehome.contactInfo,
        capacity: lovehome.capacity,
        currentOccupancy: lovehome.currentOccupancy,
        lovehomeImage_Base64: lovehome.lovehomeImage_Base64,
      }));
      setlovehomelistData(lovehomes);
    } catch (error) {
      console.error("Error fetching lovehomelist:", error);
    }
  };

  useEffect(() => {
    fetchLovehomeList();
  }, []);

  useEffect(() => {
    const uniqueCitys = Array.from(
      new Set(lovehomelistData.map((lovehome) => lovehome.lovehomeCity))
    ).map((lovehomeCity) => ({
      text: lovehomeCity,
      value: lovehomeCity,
    }));
    setCityFilters(uniqueCitys);
  }, [lovehomelistData]);

  const UpdateonFinish = async (fieldsValue) => {
    console.log("表單資料：", fieldsValue);
    const updateLovehomeId = fieldsValue.lovehomeId;
    if (!updateLovehomeId) {
      messageApi.error("中途之家 ID 缺失，無法更新！");
      return false;
    }

    const updateLovehomeData = {
      lovehomeId: fieldsValue.lovehomeId,
      lovehomeName: fieldsValue.lovehomeName,
      lovehomeCity: fieldsValue.lovehomeCity,
      lovehomeDistrict: fieldsValue.lovehomeDistrict,
      lovehomeAddress: fieldsValue.lovehomeAddress,
      contactInfo: fieldsValue.contactInfo,
      capacity: fieldsValue.capacity,
      currentOccupancy: fieldsValue.currentOccupancy,
      lovehomeImage_Base64:
        lovehomeImagebase64 || selectedLovehome.lovehomeImage_Base64,
    };

    console.log("提交的更新 lovehome Data：", updateLovehomeData);

    try {
      const updateLovehomeResponse = await updateLovehome(updateLovehomeData, updateLovehomeId);
      if (updateLovehomeResponse.message === "更新成功") {
        messageApi.success("更新成功");
        console.log("更新成功", updateLovehomeData);
        fetchLovehomeList();
        return true;
      } else {
        messageApi.error("更新失敗");
        console.error("更新失敗:", updateLovehomeData);
        return false;
      }
    } catch (error) {
      messageApi.error("更新失敗");
      console.error("更新錯誤:", error);
      return false;
    }
  };

  const handleImageUpload = ({ file, fileList }) => {
    setFileList([...fileList]);

    const originFile = file.originFileObj || file;
    if (originFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        console.log("圖片 Base64：" + reader.result);
        setLovehomeImageBase64(reader.result);
      };
      reader.onerror = (error) => {
        console.log("圖片讀取錯誤：", error);
      };

      reader.readAsDataURL(originFile);
    }
  };

  const handleNavigation = (key, lovehome) => {
    if (key === "lovehomeupdate") {
      setSelectedlovehome(lovehome);
      form.setFieldsValue({
        lovehomeId: lovehome.lovehomeId,
        lovehomeName: lovehome.lovehomeName,
        lovehomeCity: lovehome.lovehomeCity,
        lovehomeDistrict: lovehome.lovehomeDistrict,
        lovehomeAddress: lovehome.lovehomeAddress,
        contactInfo: lovehome.contactInfo,
        capacity: lovehome.capacity,
        currentOccupancy: lovehome.currentOccupancy,
        lovehomeImage_Base64: lovehome.lovehomeImage_Base64,
      });
      setFileList(
        lovehome.lovehomeImage_Base64
          ? [
            {
              uid: "-1",
              name: "lovehome_image",
              status: "done",
              url: lovehome.lovehomeImage_Base64,
            },
          ]
          : []
      );
      setDrawerVisit(true);
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "lovehomeId",
    },
    {
      title: "名稱",
      dataIndex: "lovehomeName",
    },
    {
      title: "城市",
      dataIndex: "lovehomeCity",
      filters: CityFilters,
      onFilter: (value, record) => record.lovehomeCity.startsWith(value),
    },
    {
      title: "地區",
      dataIndex: "lovehomeDistrict",
    },
    {
      title: "地址",
      dataIndex: "lovehomeAddress",
    },
    {
      title: "聯絡方式",
      dataIndex: "contactInfo",
    },
    {
      title: "可收容量",
      dataIndex: "capacity",
    },
    {
      title: "目前佔用率",
      dataIndex: "currentOccupancy",
    },
    {
      title: "照片",
      dataIndex: "lovehomeImage_Base64",
      render: (text, record) => {
        return record.lovehomeImage_Base64 ? "目前有照片" : "目前無照片";
      },
    },
    {
      title: "操作",
      dataIndex: "action",
      width: "10%",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleNavigation("lovehomeupdate", record)}>更新</a>
          <a>刪除</a>
        </Space>
      ),
    },
  ];

  return (
    <>
      {contextHolder}
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
        <Table columns={columns} dataSource={lovehomelistData} />
      </Space>
      <DrawerForm
        title="中途之家 修改"
        open={drawerVisit}
        form={form}
        width="500px"
        submitter={{
          searchConfig: {
            submitText: "修改",
            resetText: "取消",
          },
        }}
        onFinish={UpdateonFinish}
        onOpenChange={(open) => {
          if (!open) {
            form.resetFields(); // 關閉時重置表單
          }
          setDrawerVisit(open);
        }}
      >
        <ProFormText readonly name="lovehomeId" label="中途之家編號" />
        <ProForm.Group>
          <ProFormText
            rules={[
              {
                required: true,
              },
            ]}
            name="lovehomeName"
            label="中途之家名稱"
            placeholder="請輸入名稱"
          />
          <ProFormText
            rules={[
              {
                required: true,
              },
            ]}
            name="lovehomeCity"
            label="中途之家城市"
            placeholder="請輸入城市"
          />
          <ProFormText
            rules={[
              {
                required: true,
              },
            ]}
            name="lovehomeDistrict"
            label="中途之家區域"
            placeholder="請輸入區域"
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormTextArea
            rules={[
              {
                required: true,
              },
            ]}
            name="lovehomeAddress"
            label="中途之家地址"
            placeholder="請輸入地址"
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText
            rules={[
              {
                required: true,
              },
            ]}
            name="contactInfo"
            label="聯絡方式"
            placeholder="請輸入聯絡方式"
          />
          <ProFormText
            rules={[
              {
                required: true,
              },
            ]}
            name="capacity"
            label="可收容容量"
            placeholder="請輸入"
          />
          <ProFormText readonly name="currentOccupancy" label="目前佔用率" />
        </ProForm.Group>
        <ProFormUploadButton
          label="照片上傳"
          name="lovehomeImage_Base64"
          title="上傳照片"
          maxCount={1}
          fieldProps={{
            beforeUpload: () => false,
            accept: ".png, .jpg, .jpeg",
            listType: "picture",
            onChange: handleImageUpload,
          }}
          fileList={fileList}
        />
      </DrawerForm>
    </>
  );
};
export default AllLovehomelist;
