import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const searchRecipes = async (query) => {
  try {
    const response = await api.get(`/recipes/search`, { params: { query } });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default api;
