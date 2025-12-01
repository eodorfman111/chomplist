import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5001/api";

export const api = axios.create({
  baseURL: API_BASE_URL
});

// example helpers
export const getHealth = () => api.get("/health");
export const getRecipes = () => api.get("/recipes");
export const getRecipe = (id) => api.get(`/recipes/${id}`);
export const searchRecipes = (ingredients) =>
  api.post("/recipes/search", { ingredients });
