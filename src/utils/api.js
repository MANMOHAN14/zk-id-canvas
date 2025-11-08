import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const registerUser = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, data);
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

export const verifyProof = async (uid, type) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/verify`, { uid, type });
    return response.data;
  } catch (error) {
    console.error("Error verifying proof:", error);
    throw error;
  }
};

export const generateProof = async (uid, type) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/generateProof`, { uid, type });
    return response.data;
  } catch (error) {
    console.error("Error generating proof:", error);
    throw error;
  }
};

export const getUserData = async (uid) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user/${uid}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};
