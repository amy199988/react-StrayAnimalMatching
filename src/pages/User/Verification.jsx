import React, { useEffect } from "react";
import { Modal } from "antd";
import { Verification } from "../../services/authService";

const VerificationPage = () => {
  useEffect(() => {
    const verifyAccountAsync = async () => {
      try {
        await Verification(); // 呼叫 API 驗證帳號
        Modal.info({
          title: "驗證成功！",
          content: "您已可前往登入！",
          okText: "前往登入",
          onOk: () => {
            window.location.href = "/auth/login"; // 跳轉到登入頁面
          },
        });
      } catch (error) {
        Modal.error({
          title: "驗證失敗",
          content: error.message || "發生未知錯誤，請稍後再試。",
          okText: "關閉",
        });
      }
    };

    verifyAccountAsync();
  }, []); // 確保 useEffect 只在組件初始化時執行一次

  return null; // 此處返回 null 表示此組件不需要渲染任何內容
};

export default VerificationPage;