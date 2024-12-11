import React, { useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
  ModalForm,
  DrawerForm,
  ProForm,
  ProFormRadio,
  ProFormText,
  ProFormTextArea,
  ProFormUploadButton,
} from "@ant-design/pro-components";
import { Table, Space, Button, message, Form } from "antd";
import { useState } from "react";
import { addCat, catlist, updateCat } from "../../services/lovehomeService";

const Catlist = () => {
  const [modalVisit, setModalVisit] = useState(false);
  const [drawerVisit, setDrawerVisit] = useState(false);
  const [catlistData, setcatlistData] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [catImagebase64, setCatImageBase64] = useState(null);
  const [selectedCat, setSelectedCat] = useState(null);
  const [form] = Form.useForm();

  const fetchCatList = async () => {
    try {
      const apiResponse = await catlist();
      const cats = apiResponse.data.map((cat, index) => ({
        key: cat.catId || `cat-${index}`,
        catid: cat.catId,
        catname: cat.catName,
        breed: cat.breed,
        age: cat.age,
        healthstatus: cat.healthStatus,
        description: cat.description,
        catImage_Base64: cat.catImage_Base64,
        isApply: cat.isApply ? "true" : "false",
      }));
      setcatlistData(cats);
    } catch (error) {
      console.error("Error fetching catlist:", error);
    }
  };

  useEffect(() => {
    fetchCatList();
  }, []);

  const onFinsih = async (fieldsValue) => {
    console.log("表單資料：", fieldsValue);

    const catData = {
      catName: fieldsValue.catName,
      breed: fieldsValue.breed,
      age: fieldsValue.age,
      healthStatus: fieldsValue.healthStatus,
      description: fieldsValue.description,
      catImage_Base64: catImagebase64,
      isApply: fieldsValue.isApply === "可申請領養",
    };

    console.log("提交的 Cat Data：", catData);

    try {
      const addCatResponse = await addCat(catData);
      if (addCatResponse.message === "新增成功") {
        messageApi.success("新增成功");
        console.log("新增成功", catData);
        fetchCatList();
        return true;
      } else {
        messageApi.error("新增失敗");
        console.error("新增失敗:", addCatResponse);
        return false;
      }
    } catch (error) {
      messageApi.error("新增失敗");
      console.error("新增錯誤:", error);
      return false;
    }
  };

  const UpdateonFinish = async (fieldsValue) => {
    console.log("表單資料：", fieldsValue);
    const updateCatId = fieldsValue.catId;
    if (!updateCatId) {
      messageApi.error("貓咪 ID 缺失，無法更新！");
      return false;
    }

    const updateCatData = {
      catId: fieldsValue.catId,
      catName: fieldsValue.catName,
      breed: fieldsValue.breed,
      age: fieldsValue.age,
      healthStatus: fieldsValue.healthStatus,
      description: fieldsValue.description,
      catImage_Base64: catImagebase64 || selectedCat.catImage_Base64,
      isApply: fieldsValue.isApply === "可申請領養",
    };

    console.log("提交的更新 Cat Data：", updateCatData);

    try {
      const updateCatResponse = await updateCat(updateCatData, updateCatId);
      if (updateCatResponse.message === "更新成功") {
        messageApi.success("更新成功");
        console.log("更新成功", updateCatData);
        fetchCatList();
        return true;
      } else {
        messageApi.error("更新失敗");
        console.error("更新失敗:", updateCatResponse);
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
        setCatImageBase64(reader.result);
      };
      reader.onerror = (error) => {
        console.log("圖片讀取錯誤：", error);
      };

      reader.readAsDataURL(originFile);
    }
  };

  const handleNavigation = (key, cat) => {
    if (key === "catupdate") {
      setSelectedCat(cat);
      form.setFieldsValue({
        catId: cat.catid,
        catName: cat.catname,
        breed: cat.breed,
        age: cat.age,
        healthStatus: cat.healthstatus,
        description: cat.description,
        isApply: cat.isApply === "true" ? "可申請領養" : "不可申請領養",
      });
      setFileList(
        cat.catImage_Base64
          ? [
              {
                uid: "-1",
                name: "cat_image",
                status: "done",
                url: cat.catImage_Base64,
              },
            ]
          : []
      );
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
      render: (text, record) => {
        return record.catImage_Base64 ? "目前有照片" : "目前無照片";
      },
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
      title: "操作",
      dataIndex: "action",
      width: "12%",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleNavigation("catupdate", record)}>更新</a>
          <a>刪除</a>
        </Space>
      ),
    },
  ];

  return (
    <>
      {contextHolder}
      <Space
        direction="vertical"
        size="middle"
        style={{
          display: "flex",
        }}
      >
        <Button type="primary" onClick={() => handleNavigation("catadd")}>
          <PlusOutlined />
          新增領養貓咪
        </Button>
        <ModalForm
          title="領養貓咪 新增"
          open={modalVisit}
          width="500px"
          submitter={{
            searchConfig: {
              submitText: "新增",
              resetText: "取消",
            },
          }}
          onFinish={onFinsih}
          onOpenChange={setModalVisit}
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
              label="特殊狀況"
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
            name="catImage_Base64"
            title="上傳照片"
            maxCount={1}
            fieldProps={{
              beforeUpload: () => false,
              accept: ".png, .jpg, .jpeg",
              listType: "picture",
              onChange: handleImageUpload,
            }}
            fileList={fileList}
            rules={[{ required: true, message: "請上傳照片"}]}
          />
        </ModalForm>

        <DrawerForm
          title="領養貓咪 修改"
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
          <ProFormText readonly name="catId" label="貓咪編號" />
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
              label="特殊狀況"
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
            name="catImage_Base64"
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
        <Table columns={columns} dataSource={catlistData} />
      </Space>
    </>
  );
};
export default Catlist;
