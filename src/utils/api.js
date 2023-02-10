import { API_BASE_URL } from "./config";

export const fetchPOST = async (url, params) => {
  try {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(params),
    });
    return response.json();
  } catch (error) {
    throw error;
  }
};
