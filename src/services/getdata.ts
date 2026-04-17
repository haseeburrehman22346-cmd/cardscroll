import axios from "axios";
export const api = axios.create({
  baseURL: "/api",
});
export const getCards = async (start: number = 0, limit: number = 21) => {
  try {
    const res = await api.get(`/card?start=${start}&limit=${limit}`);
    return res.data;
  } catch (error) {
    return error;
  }
};