
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

/**
 * 查看通報救援追蹤
 * @returns {Promise<Object>} 包含結果的 API
 */
export const userReport = async () => {
  const response = await fetch(`${API_BASE_URL}/user/report`, {
    method: "GET",
    credentials: "include",
  })

  if (!response.ok) {
    const errorDetails = await response.text();
    throw new Error(`無法取得通報救援: ${errorDetails}`);
  }

  return response.json();
};

/**
 * 修改會員資料
 * @param {Object} updateUserDate 更新會員資料
 * @returns {Promise<Object>} 包含修改結果的 API 回應
 */
export const updateUser = async (updateUserDate) => {
    const response = await fetch(`${API_BASE_URL}/user/update`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateUserDate),
    });
    if (!response.ok) {
      const errorDetails = await response.text();
      throw new Error(`"更新資料失敗: ${errorDetails}`);
    }
    return response.json();
};