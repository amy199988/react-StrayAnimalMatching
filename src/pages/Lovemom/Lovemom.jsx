import React, { useEffect, useState } from "react";
import { Button, Space, Form, Input, DatePicker, Radio, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { lovemomData } from "../../services/lovehomeService";

const Lovemom = () => {
  const navigate = useNavigate();
  const [componentDisabled] = useState(true);
  const [form] = Form.useForm();

  useEffect(() => {
    const loadData = async () => {
      try {
        const apiResponse = await lovemomData();

        form.setFieldsValue({
          username: apiResponse.data.userName,
          account: apiResponse.data.account,
          phone: apiResponse.data.phone,
          birthdate: apiResponse.data.birthdate
            ? moment(apiResponse.data.birthdate)
            : null,
          email: apiResponse.data.email,
          role: apiResponse.data.role,
          lovehomeName: apiResponse.data.lovehomeDto.lovehomeName,
          lovehomeCity: apiResponse.data.lovehomeDto.lovehomeCity,
          lovehomeDistrict: apiResponse.data.lovehomeDto.lovehomeDistrict,
          lovehomeAddress: apiResponse.data.lovehomeDto.lovehomeAddress,
          contactInfo: apiResponse.data.lovehomeDto.contactInfo,
          capacity: apiResponse.data.lovehomeDto.capacity,
          hasPhoto: apiResponse.data.lovehomeDto.lovehome_Url
            ? "目前有照片"
            : "目前無照片",
        });
      } catch (error) {
        console.error("Error fetching lovemom:", error);
      }
    };
    loadData();
  }, [form]);

  const handleNavigation = (key) => {
    if (key === "catlist") {
      navigate("/lovehome/cat_list");
    } else if (key === "requestlist") {
      navigate("/lovehome/request_list");
    } else if (key === "reportlist") {
      navigate("/lovehome/report_list");
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
        <Button>修改會員資料</Button>
        <Button href="/lovemom/password">修改密碼</Button>
        <Button>修改中途資料</Button>
        <Button onClick={() => handleNavigation("catlist")}>
          貓咪清單管理
        </Button>
        <Button onClick={() => handleNavigation("requestlist")}>
          申請領養清單管理
        </Button>
        <Button onClick={() => handleNavigation("reportlist")}>
          通報救援清單管理
        </Button>
      </Space>
      <Row
        gutter={16}
        style={{ width: "100%", maxWidth: "1200px", justifyContent: "center" }}
      >
        <Col span={10}>
          <Form
            form={form}
            labelCol={{ span: 4 }}
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

            <Form.Item name="role" label="申請會員">
              <Radio.Group>
                <Radio value="role_user">普通帳號</Radio>
                <Radio value="role_lovemom">愛媽帳號</Radio>
              </Radio.Group>
            </Form.Item>
          </Form>
        </Col>

        <Col span={10}>
          <Form
            form={form}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            disabled={componentDisabled}
            style={{ maxWidth: 600 }}
          >
            <Form.Item name="lovehomeName" label="中途之家名稱">
              <Input />
            </Form.Item>

            <Form.Item name="lovehomeCity" label="中途之家城市">
              <Input />
            </Form.Item>

            <Form.Item name="lovehomeDistrict" label="中途之家區域">
              <Input />
            </Form.Item>

            <Form.Item name="lovehomeAddress" label="詳細地址">
              <Input.TextArea showCount maxLength={100} />
            </Form.Item>

            <Form.Item name="contactInfo" label="聯絡方式">
              <Input.TextArea showCount maxLength={100} />
            </Form.Item>

            <Form.Item name="capacity" label="可收容量">
              <Input />
            </Form.Item>

            <Form.Item name="hasPhoto" label="照片">
              <Input disabled />
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default Lovemom;
