import React, { useEffect, useState } from "react";
import { Button, Form, Input, Row, Col, message } from "antd";
import { lovemomData, updatelovehome } from "../../services/lovehomeService";
import { ProFormUploadButton } from "@ant-design/pro-components";


const LUser_update = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [LovemomImagebase64, setLovemomImageBase64] = useState(null);
  const [selectedLovemom, setSelectedLovemom] = useState(null);

  const handleGoBack = () => {
    window.location.href = "/lovehome";
  };

  const onFinish = async (fieldsValue) => {
    console.log("表單資料：", fieldsValue);

    const updateLovehomeDate = {
      lovehomeId: fieldsValue.lovehomeId,
      lovehomeName: fieldsValue.lovehomeName,
      lovehomeCity: fieldsValue.lovehomeCity,
      lovehomeDistrict: fieldsValue.lovehomeDistrict,
      lovehomeAddress: fieldsValue.lovehomeAddress,
      contactInfo: fieldsValue.contactInfo,
      capacity: fieldsValue.capacity,
      lovehomeImage_Base64: LovemomImagebase64 || selectedLovemom.LovemomImagebase64,
    };

    console.log("提交的 Lovehome Date：", updateLovehomeDate)

    try {
      const UpdateUserResponse = await updatelovehome(updateLovehomeDate);
      if (UpdateUserResponse.message === "更新成功") {
        message.success("修改成功");
        setTimeout(() => {
          window.location.href = "/lovehome";
        }, 1000);
      } else {
        message.error("修改失敗");
      }
    } catch (error) {
      console.error("修改失敗：", error);
    }
  };

  const handleImageUpload = ({ file, fileList }) => {
    // 當新增圖片時，只保留最新的圖片
    if (fileList.length > 1) {
      fileList = [fileList[fileList.length - 1]];
    }

    // 如果文件列表為空且只剩一張圖片，阻止刪除
    if (fileList.length === 0) {
      message.warning("必需有一張照片！若修改請直接上傳新照片！");
      return;
    }

    setFileList([...fileList]);

    // 如果有新文件，轉為 Base64
    const originFile = file.originFileObj || file;
    if (originFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLovemomImageBase64(reader.result); // 更新 Base64
      };
      reader.onerror = (error) => {
        console.error("圖片讀取錯誤：", error);
      };

      reader.readAsDataURL(originFile);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const apiResponse = await lovemomData();

        const lovehomeImage_Base64 = apiResponse.data.lovehomeDto.lovehomeImage_Base64;

        // 將表單數據設置到表單中
        form.setFieldsValue({
          lovehomeId: apiResponse.data.lovehomeDto.lovehomeId,
          lovehomeName: apiResponse.data.lovehomeDto.lovehomeName,
          lovehomeCity: apiResponse.data.lovehomeDto.lovehomeCity,
          lovehomeDistrict: apiResponse.data.lovehomeDto.lovehomeDistrict,
          lovehomeAddress: apiResponse.data.lovehomeDto.lovehomeAddress,
          contactInfo: apiResponse.data.lovehomeDto.contactInfo,
          capacity: apiResponse.data.lovehomeDto.capacity,
          currentOccupancy: apiResponse.data.lovehomeDto.currentOccupancy,
        });

        // 如果有圖片，設置 fileList
        if (lovehomeImage_Base64) {
          setFileList([
            {
              uid: "-1", // 唯一 ID
              name: "lovehome_Image", // 文件名
              status: "done", // 表示上傳完成
              url: lovehomeImage_Base64, // 照片的 Base64 路徑
            },
          ]);
          setSelectedLovemom({ LovemomImagebase64: lovehomeImage_Base64 }); // 保留原始數據
        }

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

      <Row
        gutter={16}
        style={{ width: "100%", maxWidth: "1200px", justifyContent: "center" }}
      >
        <Col span={10}>
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

            <Form.Item name="lovehomeId" label="中途之家編號" hidden>
              <Input />
            </Form.Item>

            <Form.Item name="lovehomeName" label="中途之家名稱"
              rules={[
                {
                  required: true,
                  message: "請輸入中途之家名稱",
                },
              ]}>
              <Input />
            </Form.Item>

            <Form.Item name="lovehomeCity" label="中途之家城市"
              rules={[
                {
                  required: true,
                  message: "請輸入中途之家城市",
                },
              ]}>
              <Input />
            </Form.Item>

            <Form.Item name="lovehomeDistrict" label="中途之家區域"
              rules={[
                {
                  required: true,
                  message: "請輸入中途之家區域",
                },
              ]}>
              <Input />
            </Form.Item>

            <Form.Item name="lovehomeAddress" label="詳細地址"
              rules={[
                {
                  required: true,
                  message: "請輸入詳細地址",
                },
              ]}>
              <Input.TextArea showCount maxLength={100} />
            </Form.Item>

            <Form.Item name="contactInfo" label="聯絡方式"
              rules={[
                {
                  required: true,
                  message: "請輸入聯絡方式",
                },
              ]}>
              <Input.TextArea showCount maxLength={100} />
            </Form.Item>

            <Form.Item name="capacity" label="可收容量"
              rules={[
                {
                  required: true,
                  message: "請輸入可收容量",
                },
              ]}>
              <Input />
            </Form.Item>

            <Form.Item name="currentOccupancy" label="目前佔用率" >
              <Input disabled />
            </Form.Item>

            <ProFormUploadButton
              label="中途之家照片"
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

            <Form.Item
              wrapperCol={{ span: 24 }}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Button href="/lovehome" style={{ marginRight: "8px" }}>取消</Button>
              <Button type="primary" htmlType="submit" >
                確認修改
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default LUser_update;
