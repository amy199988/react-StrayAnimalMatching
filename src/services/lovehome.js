// services/authService.js

const API_BASE_URL = "http://localhost:8081";

/**
 * 查看愛媽資料和中途資料
 * @returns {Promise<Object>} 包含結果的 API
 */
export const lovemomData = async () => {
  const response = await fetch(`${API_BASE_URL}/lovehome`, {
    method: "GET",
    credentials: "include",
  })

  if (!response.ok) {
    throw new Error("無法取得愛媽與中途資料");
  }

  return response.json();
}