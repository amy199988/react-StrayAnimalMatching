import React, { useEffect, useState } from "react";
import { Button, Space, Form, Input, DatePicker, Radio, Row, Col } from "antd";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { userData } from "../../services/userService";

const Manager = () => {
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
    if (key === "all_cat") {
      navigate("/manager/all_cat");
    } else if (key === "all_lovehome") {
      navigate("/manager/all_lovehome");
    } else if (key === "all_request") {
      navigate("/manager/all_request");
    } else if (key === "all_report") {
      navigate("/manager/all_report");
    } else if (key === "all_user") {
      navigate("/manager/all_user");
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

      <Space wrap style={{ marginBottom: "48px" }} >
        <Button onClick={() => handleNavigation("all_user")}>會員列表</Button>
        <Button onClick={() => handleNavigation("all_lovehome")}>中途之家列表</Button>
        <Button onClick={() => handleNavigation("all_cat")}>貓咪列表</Button>
        <Button onClick={() => handleNavigation("all_request")}>申請領養列表</Button>
        <Button onClick={() => handleNavigation("all_report")}>通報救援列表</Button>
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

            <Form.Item name="hasLine" label="LINE">
              <Radio.Group>
                <Radio value="link">已綁定</Radio>
                <Radio value="notLink">未綁定</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item name="role" label="申請會員">
              <Radio.Group>
                <Radio value="role_manager">管理員帳號</Radio>
              </Radio.Group>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default Manager;
