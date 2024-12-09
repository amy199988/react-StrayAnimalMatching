import React, { useState } from "react";
import {
  ProForm,
  ProFormDigit,
  ProFormUploadButton,
  ProFormTextArea,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-components";

const Report = () => {
  const [fileList, setFileList] = useState([]);

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

  return (
    <ProForm onFinish={(values) => console.log(values)} autoFocusFirstInput>
      <ProForm.Group>
        <ProFormText name="1" label="通報人帳號" value="123" readonly />
        <ProFormTextArea
          name="2"
          label="通報地址"
          placeholder="請輸入地址"
          rules={[{ required: true, message: "請輸入地址" }]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormSelect
          name="3"
          label="通報救援中途"
          placeholder="請選擇中途"
          rules={[{ required: true, message: "請選擇中途" }]}
        />
        <ProFormDigit name="3" label="中途之家地址" value="123" readonly />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormTextArea
          name="4"
          label="狀況描述"
          placeholder="請輸入..."
          rules={[{ required: true, message: "請輸入狀況" }]}
        />
        <ProFormUploadButton
          label="照片上傳"
          name="5"
          title="上傳照片"
          maxCount={1}
          fieldProps={{
            beforeUpload: () => false,
            accept: ".png, .jpg, .jpeg",
            listType: "picture",
            onChange: handleImageUpload,
          }}
          fileList={fileList}
          rules={[{ required: true, message: "請上傳照片" }]}
        />
      </ProForm.Group>
    </ProForm>
  );
};
export default Report;
