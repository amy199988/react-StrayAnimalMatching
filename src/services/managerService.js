
const API_BASE_URL = "http://localhost:8081";

/**
 * 查看所有會員資料
 * @returns {Promise<Object>} 包含結果的 API
 */
export const allUserData = async () => {
  const response = await fetch(`${API_BASE_URL}/manager/all_user`, {
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
 * 修改會員資料
 * @param {number} updateUserId
 * @param {Object} updateUserData 更新會員的資料
 * @returns {Promise<Object>} 包含新增結果的 API
 */
export const updateUser = async (updateUserData, updateUserId) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/manager/all_user/${updateUserId}`,
      {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateUserData),
      }
    );

    if (!response.ok) {
      const errorDetails = await response.text();
      throw new Error(`更新會員失敗: ${errorDetails}`);
    }

    return response.json();
  } catch (error) {
    console.error("API錯誤:", error);
    throw error;
  }
};


/**
 * 查看所有中途資料
 * @returns {Promise<Object>} 包含結果的 API
 */
export const allLovehomeData = async () => {
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
 * 修改中途資料
 * @param {number} updateLovehomeId
 * @param {Object} updateLovehomeData 更新中途的資料
 * @returns {Promise<Object>} 包含新增結果的 API
 */
export const updateLovehome = async (updateLovehomeData, updateLovehomeId) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/manager/all_lovehome/${updateLovehomeId}`,
      {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateLovehomeData),
      }
    );

    if (!response.ok) {
      const errorDetails = await response.text();
      throw new Error(`更新中途失敗: ${errorDetails}`);
    }

    return response.json();
  } catch (error) {
    console.error("API錯誤:", error);
    throw error;
  }
};

/**
 * 刪除會員資料
 * @param {number} userId
 * @returns {Promise<Object>} 包含新增結果的 API
 */
export const deleteUser = async (userId) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/manager/all_user/${userId}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );

    if (!response.ok) {
      const errorDetails = await response.text();
      throw new Error(`刪除中途失敗: ${errorDetails}`);
    }

    return response.json();
  } catch (error) {
    console.error("API錯誤:", error);
    throw error;
  }
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