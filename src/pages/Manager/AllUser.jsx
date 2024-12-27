import React, { useEffect, useState } from "react";
import {
  DrawerForm,
  ProForm,
  ProFormText,
} from "@ant-design/pro-components";
import { Table, Space, message, Form, Button ,Popconfirm } from "antd";
import moment from "moment";
import { allUserData, updateUser, deleteUser } from "../../services/managerService";

const AllUserlist = () => {
  const [drawerVisit, setDrawerVisit] = useState(false);
  const [userlistData, setuserlistData] = useState([]);
  //  const [fileList, setFileList] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [selecteduser, setSelecteduser] = useState(null);
  const [form] = Form.useForm();
  //  const [RoleFilters, setRoleFilters] = useState([]);

  const handleGoBack = () => {
    window.location.href = "/manager";
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
      }));
      console.log(users);
      setuserlistData(users);
    } catch (error) {
      console.error("Error fetching userlist:", error);
    }
  };

  useEffect(() => {
    fetchUserList();
  }, []);

  const confirm = async (key) => {
    try {
      await deleteUser(key);
      fetchUserList((prevDataSource) =>
        prevDataSource.filter(
          (cat) => cat.key !== key
        )
      );
      message.success("刪除成功！");
    } catch (error) {
      console.error("Error delete request:", error);
      message.error("刪除失敗，請稍後再試。");
    }
  };
  const cancel = (e) => {
    console.log(e);
    message.error("已取消刪除");
  };

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
        ? fieldsValue.birthdate
        : null,
      email: fieldsValue.email,
      active: fieldsValue.active,
      role: fieldsValue.role,
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
      });
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
          <Popconfirm
            title="刪除"
            description="將連同會員的中途之家資料一同刪除，確定要刪除此筆清單嗎?"
            onConfirm={() => confirm(record.key)}
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
    {contextHolder}
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

        </ProForm.Group>

      </DrawerForm>
    </>
  );
};
export default AllUserlist;
