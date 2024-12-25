
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


/**
 * 確認Session
 * @returns {Promise<boolean>} 返回 Session 是否有效的布林值
 */
export const checkSession = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/check`, {
      method: "GET",
      credentials: "include", // 確保 Cookie 被攜帶
    });

    if (!response.ok) {
      // 若 HTTP 狀態碼非 200，處理異常
      throw new Error("無效Session");
    }

    const data = await response.json();

    // 假設後端返回格式為 { message: "Session有效", data: true }
    return data.data === true; // 驗證 `data` 是否為 true
  } catch (error) {
    console.error("Session 驗證失敗:", error.message);
    return false; // 發生異常時，視為無效 Session
  }
};

/**
 * 忘記密碼
 * @param {string} account 用戶名
 * @param {string} email 信箱
 * @returns {Promise<Object>} 包含登入結果的 API 回應
 */
export const forgetPassword = async (account, email) => {
  // 將資料轉換成表單格式
  const formData = new URLSearchParams();
  formData.append("account", account);
  formData.append("email", email);

  const response = await fetch(`${API_BASE_URL}/auth/forget_password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    credentials: "include",
    body: formData.toString(), // 傳送表單格式的資料
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`申請失敗: ${errorText}`);
  }

  return response.json();
};

/**
 * 忘記密碼修改
 * @param {string} newPassword 新密碼
 * @returns {Promise<Object>} 包含結果的 API
 */
export const resetPassword = async (newPassword) => {

  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");
  if (!token) {
    throw new Error("無效的重設連結，缺少 token");
  }

  // 將資料轉換成表單格式
  const formData = new URLSearchParams();
  formData.append("token", token);
  formData.append("newPassword", newPassword);

  // 發送請求至後端 API
  const response = await fetch(`${API_BASE_URL}/auth/reset_password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    credentials: "include",
    body: formData.toString(), // 傳送表單格式的資料
  });

  // 處理 API 回應
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`重設密碼失敗: ${errorText}`);
  }

  return response.json();
};

/**
 * 帳號驗證確認
 * @returns {Promise<Object>} 包含結果的 API
 */
export const Verification = async () => {
  // 從網址抓取 account 參數
  const urlParams = new URLSearchParams(window.location.search);
  const account = urlParams.get("account");
  if (!account) {
    throw new Error("無效的驗證連結，缺少 account");
  }

  // 發送請求至後端 API
  const response = await fetch(`${API_BASE_URL}/auth/verify?account=${encodeURIComponent(account)}`, {
    method: "GET",
    credentials: "include",
  });

  // 處理 API 回應
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`驗證失敗: ${errorText}`);
  }

  return response.json();
};