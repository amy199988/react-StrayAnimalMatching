import React, { useEffect, useState } from "react";
import { Button, Space, Form, Input, DatePicker, Radio, Row, Col } from "antd";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { userData } from "../../services/userService";
import BindLineButton from "../Util/BindLineButton";

const User = () => {
  const navigate = useNavigate();
  const [componentDisabled] = useState(true);
  const [form] = Form.useForm();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const apiResponse = await userData();

        form.setFieldsValue({
          username: apiResponse.data.userName,
          account: apiResponse.data.account,
          phone: apiResponse.data.phone,
          birthdate: apiResponse.data.birthdate
            ? moment(apiResponse.data.birthdate)
            : null,
          email: apiResponse.data.email,
          active: apiResponse.data.active,
          hasLine: apiResponse.data.lineid ?
            "link" : "notLink",
          role: apiResponse.data.role,
        });

        setUserId(apiResponse.data.userId);
        console.log(apiResponse);
      } catch (error) {
        console.error("Error fetching lovemom:", error);
      }
    };
    loadData();
  }, [form]);

  const handleNavigation = (key) => {
    if (key === "Urequest_list") {
      navigate("/user/request_list");
    } else if (key === "Ureport_list") {
      navigate("/user/report_list");
    } else if (key === "User_update") {
      navigate("/user/update");
    } else if (key === "Password_update") {
      navigate("/user/password");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingBottom: "40px",
      }}
    >
      <Space wrap style={{ marginBottom: "48px" }}>
        <Button onClick={() => handleNavigation("User_update")}>修改會員資料</Button>
        <Button onClick={() => handleNavigation("Password_update")}>修改密碼</Button>
        <Button onClick={() => handleNavigation("Urequest_list")}>申請領養清單</Button>
        <Button onClick={() => handleNavigation("Ureport_list")}>通報救援清單</Button>
        {userId && <BindLineButton userId={userId} />}
      </Space>
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
            disabled={componentDisabled}
            style={{
              maxWidth: 600,
            }}
          >
            <Form.Item name="username" label="姓名">
              <Input />
            </Form.Item>

            <Form.Item name="account" label="帳號">
              <Input />
            </Form.Item>

            <Form.Item name="phone" label="電話">
              <Input />
            </Form.Item>

            <Form.Item name="birthdate" label="生日">
              <DatePicker format="YYYY-MM-DD" />
            </Form.Item>

            <Form.Item name="email" label="信箱">
              <Input />
            </Form.Item>

            <Form.Item name="active" label="帳號狀態">
              <Radio.Group>
                <Radio value={true} >已驗證</Radio>
                <Radio value={false} >未驗證</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item name="hasLine" label="LINE">
              <Radio.Group>
                <Radio value="link">已綁定</Radio>
                <Radio value="notLink">未綁定</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item name="role" label="申請會員">
              <Radio.Group>
                <Radio value="role_user">普通帳號</Radio>
                <Radio value="role_lovemom">愛媽帳號</Radio>
              </Radio.Group>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default User;
