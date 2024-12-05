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
    throw new Error("無法取得會員資料");
  }

  return response.json();
}