// services/authService.js

const API_BASE_URL = "http://localhost:8081";

/**
 * 查看會員資料
 * @returns {Promise<Object>} 包含結果的 API
 */
export const userData = async () => {
  const response = await fetch(`${API_BASE_URL}/user`, {
    method: "GET",
    credentials: "include",
  })

  if (!response.ok) {
    const errorDetails = await response.text();
    throw new Error(`無法取得會員資料: ${errorDetails}`);
  }

  return response.json();
};

/**
 * 修改密碼
 * @param {string} oldPassword 舊密碼
 * @param {string} newPassword 新密碼
 * @returns {Promise<Object>} 包含修改結果的 API 回應
 */
export const Update_password = async (oldPassword, newPassword) => {
  // 將資料轉換成表單格式
  const formData = new URLSearchParams();
  formData.append("oldPassword", oldPassword);
  formData.append("newPassword", newPassword);

  const response = await fetch(`${API_BASE_URL}/user/password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    credentials: "include",
    body: formData.toString(), // 傳送表單格式的資料
  });

  if (!response.ok) {
    const errorDetails = await response.text();
    throw new Error(`"修改失敗: ${errorDetails}`);
  }

  return response.json();
};

/**
 * 查看領養申請追蹤
 * @returns {Promise<Object>} 包含結果的 API
 */
export const userRequest = async () => {
  const response = await fetch(`${API_BASE_URL}/user/request`, {
    method: "GET",
    credentials: "include",
  })

  if (!response.ok) {
    const errorDetails = await response.text();
    throw new Error(`無法取得領養申請: ${errorDetails}`);
  }

  return response.json();
};