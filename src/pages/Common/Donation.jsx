import {
  ProForm,
  ProFormRadio,
  ProFormTextArea,
} from "@ant-design/pro-components";
import { useRef } from "react";

const Donation = () => {
  const formRef = useRef();

  return (
    <ProForm
      onFinish={(values) => console.log(values)}
      formRef={formRef}
      autoFocusFirstInput
    >
      <ProFormRadio.Group
        name="radio_type"
        label="捐贈類型"
        rules={[{ required: true, message: "請選擇類型" }]}
        options={[
          {
            label: "錢",
            value: "money",
          },
          {
            label: "物品",
            value: "items",
          },
        ]}
      />
      <ProForm.Group>
        <ProFormTextArea
          name="2"
          label="捐贈描述"
          placeholder="請輸入..."
          rules={[{ required: true, message: "請輸入細項" }]}
        />
      </ProForm.Group>
    </ProForm>
  );
};
export default Donation;
