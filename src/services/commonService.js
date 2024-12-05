// services/authService.js

const API_BASE_URL = "http://localhost:8081";

/**
 * 查看所有中途
 * @returns {Promise<Object>} 包含中途結果的 API
 */
export const lovehome_list = async () => {
  const response = await fetch(`${API_BASE_URL}/common/lovehome_list`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("無法取得中途之家資料");
  }

  return response.json();
};
