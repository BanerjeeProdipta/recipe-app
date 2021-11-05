import axios from 'axios';

export const API_ENDPOINT = 'http://localhost:8000/api/';
export const RecipeAppApi = axios.create({
  baseURL: API_ENDPOINT,
  headers: {
    'Content-type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});
