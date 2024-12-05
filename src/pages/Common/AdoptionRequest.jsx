import {
  ProForm,
  ProFormDigit,
  ProFormText,
  ProFormCheckbox,
} from "@ant-design/pro-components";
import { useRef } from "react";

export default function AdoptionRequest() {
  const formRef = useRef();

  return (
    <ProForm
      onFinish={(values) => console.log(values)}
      formRef={formRef}
      autoFocusFirstInput
    >
      <ProForm.Group>
        <ProFormText
          name="1"
          label="名稱"
          placeholder="請輸入名稱"
          rules={[{ required: true, message: "這是必填項" }]}
        />
        <ProFormText
          name="2"
          label="帳號"
          placeholder="請輸入帳號"
          rules={[{ required: true, message: "這是必填項" }]}
        />
        <ProFormDigit
          name="3"
          label="年齡"
          placeholder="請輸入年齡"
          rules={[{ required: true, message: "這是必填項" }]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          name="4"
          label="電話"
          placeholder="請輸入電話"
          rules={[{ required: true, message: "這是必填項" }]}
        />
        <ProFormText
          name="5"
          label="信箱"
          placeholder="請輸入信箱"
          rules={[{ required: true, message: "這是必填項" }]}
        />
      </ProForm.Group>
      <ProFormCheckbox.Group
        name="6"
        layout="vertical"
        label="同意事項"
        options={["同意貓咪植入晶片、施打疫苗。", "同意貓咪進行結紮手術。"]}
        rules={[
          {
            validator: (_, value) =>
              value
                ? Promise.resolve()
                : Promise.reject(new Error("必須同意事項")),
          },
        ]}
      />
    </ProForm>
  );
}
