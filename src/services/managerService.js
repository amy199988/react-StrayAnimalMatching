// services/authService.js

const API_BASE_URL = "http://localhost:8081";

/**
 * 查看所有會員資料
 * @returns {Promise<Object>} 包含結果的 API
 */
export const allUserData = async () => {
  const response = await fetch(`${API_BASE_URL}/manager`, {
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
 * 查看所有中途資料
 * @returns {Promise<Object>} 包含結果的 API
 */
export const allLLovehomeData = async () => {
  const response = await fetch(`${API_BASE_URL}/manager/all_lovehome`, {
    method: "GET",
    credentials: "include",
  })

  if (!response.ok) {
    const errorDetails = await response.text();
    throw new Error(`無法取得中途資料: ${errorDetails}`);
  }

  return response.json();
};

/**
 * 查看所有貓咪資料
 * @returns {Promise<Object>} 包含結果的 API
 */
export const allCatData = async () => {
  const response = await fetch(`${API_BASE_URL}/manager/all_cat`, {
    method: "GET",
    credentials: "include",
  })

  if (!response.ok) {
    const errorDetails = await response.text();
    throw new Error(`無法取得貓咪資料: ${errorDetails}`);
  }

  return response.json();
};

/**
 * 查看所有申請資料
 * @returns {Promise<Object>} 包含結果的 API
 */
export const allRequestData = async () => {
  const response = await fetch(`${API_BASE_URL}/manager/all_request`, {
    method: "GET",
    credentials: "include",
  })

  if (!response.ok) {
    const errorDetails = await response.text();
    throw new Error(`無法取得申請資料: ${errorDetails}`);
  }

  return response.json();
};

/**
 * 查看所有通報資料
 * @returns {Promise<Object>} 包含結果的 API
 */
export const allReportData = async () => {
  const response = await fetch(`${API_BASE_URL}/manager/all_report`, {
    method: "GET",
    credentials: "include",
  })

  if (!response.ok) {
    const errorDetails = await response.text();
    throw new Error(`無法取得通報資料: ${errorDetails}`);
  }

  return response.json();
};