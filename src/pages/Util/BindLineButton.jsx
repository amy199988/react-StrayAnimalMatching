import React from "react";
import { Button } from "antd";

const BindLineButton = ({ userId }) => {
  const handleBindLine = () => {
    const clientId = "2006672068"; // 替換為你的 LINE Channel ID
    const redirectUri = encodeURIComponent(
      `https://db38-2402-7500-486-9058-bd8a-28ec-1628-e0ea.ngrok-free.app/callback`
    ); // 將會員 ID 帶到回調 URL
    const state = generateRandomState(); // 防篡改的隨機字串
    const scope = encodeURIComponent("openid profile");

    const lineLoginUrl = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}&scope=${scope}&prompt=consent&bot_prompt=normal`;

    // 將 state 和 userId 存儲到 sessionStorage
    sessionStorage.setItem("lineLoginState", JSON.stringify({ state, userId }));

    window.location.href = lineLoginUrl;
  };

  const generateRandomState = () => {
    return Array.from(crypto.getRandomValues(new Uint8Array(16)))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  };

  return <Button onClick={handleBindLine}>綁定 LINE 帳號</Button>;
};
export default BindLineButton;