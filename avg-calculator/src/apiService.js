import axios from 'axios';

const BASE_URL = 'http://20.244.56.144/test';
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzI0MTYxNzQ1LCJpYXQiOjE3MjQxNjE0NDUsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjZhODFlMDVjLTkwNWMtNGFiZC05Mzg4LWM0NGVkOGFmYzNhOSIsInN1YiI6IjE3MjAwMnZpamF5YWRpa2FyaUBiYmRuaXRtLmFjLmluIn0sImNvbXBhbnlOYW1lIjoidmpNYXJ0IiwiY2xpZW50SUQiOiI2YTgxZTA1Yy05MDVjLTRhYmQtOTM4OC1jNDRlZDhhZmMzYTkiLCJjbGllbnRTZWNyZXQiOiJjYXJMU0FSTklDdVlydm5HIiwib3duZXJOYW1lIjoiVmlqYXkgQWRoaWFrcmkiLCJvd25lckVtYWlsIjoiMTcyMDAydmlqYXlhZGlrYXJpQGJiZG5pdG0uYWMuaW4iLCJyb2xsTm8iOiIyMTAwNTQxNTMwMDU0In0.t1yc1MobeF0ZDj-YmNYPwB3JkZqEels-bMIaB_mAUE8'; // Make sure it's a string

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
  timeout: 500, // 500 ms timeout
});

export const fetchNumbers = async (id) => {
  try {
    const response = await api.get(`/numbers/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};
