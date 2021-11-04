import axios from "axios";

export const API_ENDPOINT = 'http://127.0.0.1:8000/api/';
export const RecipeAppApi = axios.create({
  baseURL: API_ENDPOINT,
  headers: {
    'Content-type': 'application/json',
  },
});