import React, { useEffect, useState } from "react";
import {
  DrawerForm,
  ProForm,
  ProFormText,
  ProFormTextArea,
  ProFormUploadButton,
} from "@ant-design/pro-components";
import { Table, Space, message, Form , Button } from "antd";
import moment from "moment";
import { allUserData } from "../../services/managerService";
import { updateUser } from "../../services/managerService";

const AllUserlist = () => {
  const [drawerVisit, setDrawerVisit] = useState(false);
  const [userlistData, setuserlistData] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [selecteduser, setSelecteduser] = useState(null);
  const [lovehomeImagebase64, setLovehomeImageBase64] = useState(null);
  const [form] = Form.useForm();
  //  const [RoleFilters, setRoleFilters] = useState([]);

  const handleGoBack = () => {
    window.history.back(); // 或者 window.history.go(-1);
  };

  // 處理下拉選單值改變
  const handleStatusChange = (value) => {
    console.log("選擇的狀態:", value);
    setStatus(value);
  };


  const fetchUserList = async () => {
    try {
      const apiResponse = await allUserData();
      const users = apiResponse.data.map((user, index) => ({
        key: user.userId || `user-${index}`,
        userId: user.userId,
        userName: user.userName,
        account: user.account,
        phone: user.phone,
        birthdate: user.birthdate
          ? moment(user.birthdate).format("YYYY-MM-DD")
          : null,
        email: user.email,
        active: user.active,
        role: user.role,
        lovehomeDto: user.lovehomeDto,
        // lovehomeDto:
        //   user.role === "role_lovemom"
        //     ? {
        //       lovehomeId: user.lovehomeId,
        //       lovehomeName: user.lovehomeName,
        //       lovehomeCity: user.lovehomeCity,
        //       lovehomeDistrict: user.lovehomeDistrict,
        //       lovehomeAddress: user.lovehomeAddress,
        //       contactInfo: user.contactInfo,
        //       capacity: user.capacity,
        //       lovehomeImage_Base64: user.lovehomeImageBase64,
        //     }
        //     : null,
      }));
      console.log(users);
      setuserlistData(users);
    } catch (error) {
      console.error("Error fetching lovehomelist:", error);
    }
  };

  useEffect(() => {
    fetchUserList();
  }, []);

  // useEffect(() => {
  //   const uniqueRole = Array.from(
  //     new Set(userlistData.map((user) => user.role))
  //   ).map((role) => ({
  //     text: role,
  //     value: role,

  //   }));
  //   setRoleFilters(uniqueRole);
  // }, [userlistData]);

  const UpdateonFinish = async (fieldsValue) => {
    console.log("表單資料：", fieldsValue);
    const updateUserId = fieldsValue.userId;
    if (!updateUserId) {
      messageApi.error("會員 ID 缺失，無法更新！");
      return false;
    }

    const updateUserData = {
      userId: fieldsValue.userId,
      userName: fieldsValue.userName,
      account: fieldsValue.account,
      phone: fieldsValue.phone,
      birthdate: fieldsValue.birthdate
        ? fieldsValue.birthdate.format("YYYY-MM-DD")
        : null,
      email: fieldsValue.email,
      active: fieldsValue.active,
      role: fieldsValue.role,
      LINEId: fieldsValue.LINEId,
      lovehomeDto: fieldsValue.lovehomeDto,
      // fieldsValue.role === "role_lovemom"
      //   ? {
      //     lovehomeId: fieldsValue.lovehomeId,
      //     lovehomeName: fieldsValue.lovehomeName,
      //     lovehomeCity: fieldsValue.lovehomeCity,
      //     lovehomeDistrict: fieldsValue.lovehomeDistrict,
      //     lovehomeAddress: fieldsValue.lovehomeAddress,
      //     contactInfo: fieldsValue.contactInfo,
      //     capacity: fieldsValue.capacity,
      //     lovehomeImage_Base64: fieldsValue.lovehomeImageBase64,
      //   }
      //  : null,
    };

    console.log("提交的更新 User Date：", updateUserData);

    try {
      const updateUserResponse = await updateUser(updateUserData, updateUserId);
      if (updateUserResponse.message === "更新成功") {
        messageApi.success("更新成功");
        console.log("更新成功", updateUserData);
        fetchUserList();
        return true;
      } else {
        messageApi.error("更新失敗");
        console.error("更新失敗:", updateUserData);
        return false;
      }
    } catch (error) {
      messageApi.error("更新失敗");
      console.error("更新錯誤:", error);
      return false;
    }
  };

  // const handleImageUpload = ({ file, fileList }) => {
  //   setFileList([...fileList]);

  //   const originFile = file.originFileObj || file;
  //   if (originFile) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       console.log("圖片 Base64：" + reader.result);
  //       setLovehomeImageBase64(reader.result);
  //     };
  //     reader.onerror = (error) => {
  //       console.log("圖片讀取錯誤：", error);
  //     };

  //     reader.readAsDataURL(originFile);
  //   }
  // };

  const handleNavigation = (key, user) => {
    if (key === "userupdate") {
      setSelecteduser(user);
      form.setFieldsValue({
        userId: user.userId,
        userName: user.userName,
        account: user.account,
        phone: user.phone,
        birthdate: user.birthdate
          ? moment(user.birthdate).format("YYYY-MM-DD")
          : null,
        email: user.email,
        active: user.active,
        role: user.role,
        lovehomeDto: user.lovehomeDto,
        // lovehomeDto:
        //   user.role === "role_lovemom"
        //     ? {
        //       lovehomeName: user.lovehomeName,
        //       lovehomeCity: user.lovehomeCity,
        //       lovehomeDistrict: user.lovehomeDistrict,
        //       lovehomeAddress: user.lovehomeAddress,
        //       contactInfo: user.contactInfo,
        //       capacity: user.capacity,
        //       lovehomeImage_Base64: user.lovehomeImageBase64,
        //     }
        //     : null,
      });
      setFileList(
        user.lovehomeImage_Base64
          ? [
            {
              uid: "-1",
              name: "lovehome_image",
              status: "done",
              url: user.lovehomeImage_Base64,
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
      dataIndex: "userId",
    },
    {
      title: "名稱",
      dataIndex: "userName",
    },
    // {
    //   title: "城市",
    //   dataIndex: "lovehomeCity",
    //   filters: CityFilters,
    //   onFilter: (value, record) => record.lovehomeCity.startsWith(value),
    // },
    {
      title: "帳號",
      dataIndex: "account",
    },
    {
      title: "會員類別",
      dataIndex: "role",
      render: (record) => {
        if (record === "role_user") {
          return "一般會員";
        } else if (record === "role_lovemom") {
          return "愛媽會員";
        } else {
          return "管理員";
        }
      },
      filters: [
        {
          text: "一般會員",
          value: "role_user",
        },
        {
          text: "愛媽會員",
          value: "role_lovemom",
        },
        {
          text: "管理員",
          value: "role_manager",
        },
      ],
      onFilter: (value, record) => record.role.startsWith(value),
    },
    {
      title: "電話",
      dataIndex: "phone",
    },
    {
      title: "生日",
      dataIndex: "birthdate",
    },
    {
      title: "電子郵件",
      dataIndex: "email",
    },
    {
      title: "帳號驗證",
      dataIndex: "active",
      render: (active) => {
        return active === true ? "已驗證" : "未驗證";
      },
      filters: [
        {
          text: "已驗證",
          value: true,
        },
        {
          text: "未驗證",
          value: false,
        },
      ],

      onFilter: (value, record) => {
        return record.active === value;
      },
    },
    {
      title: "操作",
      dataIndex: "action",
      width: "10%",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleNavigation("userupdate", record)}>更新</a>
          <a>刪除</a>
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
      {contextHolder}
      <Space
        direction="vertical"
        size="middle"
        style={{
          display: "flex",
        }}
      >
        <Table columns={columns} dataSource={userlistData} />
      </Space>
      <DrawerForm
        title="會員修改"
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
        <ProFormText readonly name="userId" label="會員編號" />
        <ProForm.Group>
          <ProFormText
            rules={[
              {
                required: true,
              },
            ]}
            name="userName"
            label="會員名稱"
            placeholder="請輸入名稱"
          />
          <ProFormText
            readonly
            name="account"
            label="會員帳號"
          />

          <ProFormText
            readonly
            name="role"
            label="會員類別"
          />

          <ProFormText
            rules={[
              {
                required: true,
              },
            ]}
            name="phone"
            label="電話"
          />

          <ProFormText
            readonly
            name="birthdate"
            label="生日"
          />
          <ProFormText
            rules={[
              {
                required: true,
              },
            ]}
            name="email"
            label="信箱"
          />

          <ProFormText
            rules={[
              {
                required: true,
              },
            ]}
            name="active"
            label="帳號狀態"
            onChange={handleStatusChange}
            options={[
              { value: "true", label: "已驗證" },
              { value: "false", label: "未驗證" },
            ]}
          />






          <ProFormText readonly name="currentOccupancy" label="目前佔用率" />
        </ProForm.Group>
        {/* <ProFormUploadButton
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
        /> */}

        {/* <ProFormText readonly name="lovehomeId" label="中途編號" />
<ProFormText readonly name="lovehomeName" label="中途名稱" />
<ProFormText readonly name="lovehomeCity" label="城市" />
<ProFormText readonly name="lovehomeDistrict" label="地區" />
<ProFormText readonly name="lovehomeAddress" label="地址" />
<ProFormText readonly name="contactInfo" label="聯絡方式" />
<ProFormText readonly name="capacity" label="可收容量" />
<ProFormText readonly name="currentOccupancy" label="目前佔用率" />
<ProFormText readonly name="lovehomeImage_Base64" label="照片" /> */}


      </DrawerForm>
    </>
  );
};
export default AllUserlist;
