
const API_BASE_URL = "http://localhost:8081";

/**
 * 驗證LINE&獲取會員資料
 * @param {Object} line
 * @returns {Promise<Object>} 包含結果的 API
 */
export const lineData = async (line) => {
  const response = await fetch(`${API_BASE_URL}/callback`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(line),
  })

  if (!response.ok) {
    const errorDetails = await response.text();
    throw new Error(`無法取得Line資料: ${errorDetails}`);
  }

  return response.json();
};