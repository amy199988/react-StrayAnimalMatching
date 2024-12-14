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
    const errorDetails = await response.text();
    throw new Error(`無法取得中途之家資料: ${errorDetails}`);
  }

  return response.json();
};

/**
 * 查看所有可領養貓咪
 * @returns {Promise<Object>} 包含結果的 API
 */
export const adoptioncat_list = async () => {
  const response = await fetch(`${API_BASE_URL}/common/adoption`, {
    method: "GET",
  });

  if (!response.ok) {
    const errorDetails = await response.text();
    throw new Error(`無法取得可領養貓咪列表: ${errorDetails}`);
  }

  return response.json();
};

/**
 * 新增申請領養貓咪清單
 * @param {Object} newRequest 新申請領養清單的資料
 * @param {Number} catId
 * @returns {Promise<Object>} 包含新增結果的 API
 */
export const request = async (newRequest, catId) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/common/adoption_request/${catId}`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRequest),
      }
    );

    if (!response.ok) {
      const errorDetails = await response.text();
      throw new Error(`新增領養清單失敗: ${errorDetails}`);
    }

    return response.json();
  } catch (error) {
    console.error("API錯誤:", error);
    throw error;
  }
};

/**
 * 新增通報救援清單
 * @param {Object} newReport 新申請領養清單的資料
 * @param {Number} lovehomeId 選擇通報的中途之家
 * @returns {Promise<Object>} 包含新增結果的 API
 */
export const report = async (newReport, lovehomeId) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/common/report/${lovehomeId}`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newReport),
      }
    );

    if (!response.ok) {
      const errorDetails = await response.text();
      throw new Error(`新增通報清單失敗: ${errorDetails}`);
    }

    return response.json();
  } catch (error) {
    console.error("API錯誤:", error);
    throw error;
  }
};
