// services/authService.js

const API_BASE_URL = "http://localhost:8081";

/**
 * 查看所有中途
 * @returns {Promise<Object>} 包含結果的 API
 */
export const lovehome_list = async () => {
  const response = await fetch(`${API_BASE_URL}/common/lovehome_list`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("無法取得中途之家資料");
  }

  return response.json();
};

/**
 * 查看所有可領養貓咪
 * @returns {Promise<Object>} 包含結果的 API
 */
export const adoptioncat_list = async () => {
  const response = await fetch(`${API_BASE_URL}/common/cat_alladoption`, {
    method: "GET",
  });

  if (!response.ok) {
    const errorDetails = await response.text();
    throw new Error(`無法取得可領養貓咪列表: ${errorDetails}`);
  }

  return response.json();
}
