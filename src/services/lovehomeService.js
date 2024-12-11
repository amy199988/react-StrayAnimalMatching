// services/lovehomeService.js

const API_BASE_URL = "http://localhost:8081";

/**
 * 查看愛媽資料和中途資料
 * @returns {Promise<Object>} 包含結果的 API
 */
export const lovemomData = async () => {
  const response = await fetch(`${API_BASE_URL}/lovehome`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    const errorDetails = await response.text();
    throw new Error(`無法取得愛媽與中途資料: ${errorDetails}`);
  }

  return response.json();
};

/**
 * 查看中途擁有貓咪資料
 * @returns {Promise<Object>} 包含結果的 API
 */
export const catlist = async () => {
  const response = await fetch(`${API_BASE_URL}/lovehome/cat_list`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    const errorDetails = await response.text();
    throw new Error(`無法取得貓咪資料: ${errorDetails}`);
  }

  return response.json();
};

/**
 * 查看個別貓咪資料
 * @param {number} catId
 * @returns {Promise<Object>} 包含結果的 API
 */
export const cat = async (catId) => {
  const response = await fetch(`${API_BASE_URL}/lovehome/cat_list/${catId}`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    const errorDetails = await response.text();
    throw new Error(`無法取得貓咪資料: ${errorDetails}`);
  }

  return response.json();
};

/**
 * 新增貓咪資料
 * @param {Object} newCat 新貓咪的資料
 * @returns {Promise<Object>} 包含新增結果的 API
 */
export const addCat = async (newCat) => {
  try {
    const response = await fetch(`${API_BASE_URL}/lovehome/cat_list`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCat),
    });

    if (!response.ok) {
      const errorDetails = await response.text();
      throw new Error(`新增貓咪失敗: ${errorDetails}`);
    }

    return response.json();
  } catch (error) {
    console.error("API錯誤:", error);
    throw error;
  }
};

/**
 * 修改貓咪資料
 * @param {number} updateCatId
 * @param {Object} updateCatData 更新貓咪的資料
 * @returns {Promise<Object>} 包含新增結果的 API
 */
export const updateCat = async (updateCatData, updateCatId) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/lovehome/cat_list/${updateCatId}`,
      {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateCatData),
      }
    );

    if (!response.ok) {
      const errorDetails = await response.text();
      throw new Error(`更新貓咪失敗: ${errorDetails}`);
    }

    return response.json();
  } catch (error) {
    console.error("API錯誤:", error);
    throw error;
  }
};

/**
 * 查看申請領養的表單
 * @returns {Promise<Object>} 包含結果的 API
 */
export const lovehomeRequest = async () => {
  const response = await fetch(`${API_BASE_URL}/lovehome/request`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    const errorDetails = await response.text();
    throw new Error(`無法取得申請領養清單: ${errorDetails}`);
  }

  return response.json();
};

/**
 * 獲取個別申請領養的表單
 * @param {number} requestNumber
 * @returns {Promise<Object>}
 */
export const Requests = async (requestNumber) => {
  const response = await fetch(
    `${API_BASE_URL}/lovehome/request/${requestNumber}`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  if (!response.ok) {
    const errorDetails = await response.text();
    throw new Error(`無法取得個別申請領養: ${errorDetails}`);
  }

  return response.json();
};

/**
 * 修改申請領養清單資料
 * @param {number} requestNumber
 * @param {Object} updateRequestData 更新貓咪的資料
 * @returns {Promise<Object>} 包含新增結果的 API
 */
export const updateRequest = async (updateRequestData, requestNumber) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/lovehome/request/${requestNumber}`,
      {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateRequestData),
      }
    );

    if (!response.ok) {
      const errorDetails = await response.text();
      throw new Error(`更新領養清單失敗: ${errorDetails}`);
    }

    return response.json();
  } catch (error) {
    console.error("API錯誤:", error);
    throw error;
  }
};

/**
 * 刪除申請領養清單資料
 * @param {number} requestNumber
 * @returns {Promise<Object>} 包含新增結果的 API
 */
export const deleteRequest = async (requestNumber) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/lovehome/request/${requestNumber}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );

    if (!response.ok) {
      const errorDetails = await response.text();
      throw new Error(`刪除領養清單失敗: ${errorDetails}`);
    }

    return response.json();
  } catch (error) {
    console.error("API錯誤:", error);
    throw error;
  }
};
