import React, { useEffect } from "react";
import { Button, Form, Input, DatePicker, Radio, Row, Col, message } from "antd";
import moment from "moment";
import { userData, updateUser } from "../../services/userService";


const UserUpdate = () => {
  const [form] = Form.useForm();

  const onFinish = async (fieldsValue) => {
    console.log("表單資料：", fieldsValue);

    const updateUserDate = {
      userId: fieldsValue.userId,
      userName: fieldsValue.username,
      account: fieldsValue.account,
      phone: fieldsValue.phone,
      birthdate: fieldsValue.birthdate
        ? fieldsValue.birthdate.format("YYYY-MM-DD")
        : null,
      email: fieldsValue.email,
      active: fieldsValue.active,
      role: fieldsValue.role,
    };

    console.log("提交的 User Date：", updateUserDate)

    try {
      const UpdateUserResponse = await updateUser(updateUserDate);
      if (UpdateUserResponse.message === "更新成功") {
        message.success("修改成功");
        setTimeout(() => {
          window.location.href = "/user";
        }, 1000);
      } else {
        message.error("修改失敗");
      }
    } catch (error) {
      console.error("修改失敗：", error);
    }
  }


  useEffect(() => {
    const loadData = async () => {
      try {
        const apiResponse = await userData();

        form.setFieldsValue({
          userId: apiResponse.data.userId,
          username: apiResponse.data.userName,
          account: apiResponse.data.account,
          phone: apiResponse.data.phone,
          birthdate: apiResponse.data.birthdate
            ? moment(apiResponse.data.birthdate)
            : null,
          email: apiResponse.data.email,
          active: apiResponse.data.active,
          role: apiResponse.data.role,
        });
        console.log(apiResponse);
      } catch (error) {
        console.error("Error fetching lovemom:", error);
      }
    };
    loadData();
  }, [form]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingBottom: "40px",
      }}
    >
      <Row
        gutter={16}
        style={{ width: "100%", maxWidth: "1200px", justifyContent: "center" }}
      >
        <Col span={12}>
          <Form
            form={form}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            onFinish={onFinish}
            style={{
              maxWidth: 600,
            }}
          >
            <Form.Item
              name="userId" label="ID" hidden>
              <Input />
            </Form.Item>

            <Form.Item
              name="username" label="姓名"
              rules={[
                {
                  required: true,
                  message: "請輸入姓名",
                },
              ]}>
              <Input />
            </Form.Item>

            <Form.Item name="account" label="帳號">
              <Input disabled />
            </Form.Item>

            <Form.Item name="phone" label="電話"
              rules={[
                {
                  required: true,
                  message: "請輸入電話號碼",
                },
                {
                  len: 10,
                  message: "電話號碼必須是 10 位數字",
                },
              ]}>
              <Input />
            </Form.Item>

            <Form.Item name="birthdate" label="生日">
              <DatePicker format="YYYY-MM-DD" disabled />
            </Form.Item>

            <Form.Item name="email" label="信箱"
              rules={[
                {
                  required: true,
                  message: "請輸入信箱",
                },
                {
                  type: "email",
                  message: "信箱格式不正確",
                }]}>
              <Input />
            </Form.Item>

            <Form.Item name="active" label="帳號狀態" hidden>
              <Radio.Group>
                <Radio value={true} >已驗證</Radio>
                <Radio value={false} >未驗證</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item name="role" label="申請會員">
              <Radio.Group disabled>
                <Radio value="role_user">普通帳號</Radio>
                <Radio value="role_lovemom">愛媽帳號</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              wrapperCol={{ span: 24 }}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Button type="primary" htmlType="submit" style={{ marginRight: "8px" }}>
                確認修改
              </Button>
              <Button href="/user">取消</Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default UserUpdate;
