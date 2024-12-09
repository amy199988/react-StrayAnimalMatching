// services/authService.js

const API_BASE_URL = "http://localhost:8081";

/**
 * 註冊
 * @param {Object} newUser 新用戶的資料
 * @returns {Promise<Object>} 包含註冊結果的 API
 */
export const sign_up = async (newUser) => {
  const response = await fetch(`${API_BASE_URL}/auth/sign_up`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`新增用戶失敗: ${errorText}`);
  }

  return response.json();
};

/**
 * 登入
 * @param {string} account 用戶名
 * @param {string} password 密碼
 * @returns {Promise<Object>} 包含登入結果的 API 回應
 */
export const login = async (account, password) => {
  // 將資料轉換成表單格式
  const formData = new URLSearchParams();
  formData.append("account", account);
  formData.append("password", password);

  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    credentials: "include",
    body: formData.toString(), // 傳送表單格式的資料
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`登入失敗: ${errorText}`);
  }

  return response.json();
};

/**
 * 登出
 * @returns {Promise<Object>} 包含登出結果的 API 回應
 */
export const logout = async () => {
  const response = await fetch(`${API_BASE_URL}/auth/logout`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("登出失敗");
  }

  return response.json();
};
