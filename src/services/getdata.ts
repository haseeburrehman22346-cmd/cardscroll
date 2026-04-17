import axios from "axios";
export const api = axios.create({
  baseURL: "/api",
});
export const getCards = async (start: number = 0, limit: number = 21) => {
  try {
    const res = await api.get(`/card?start=${start}&limit=${limit}`);
    console.log(`FETCHED DATA (start: ${start}):`, res.data);
    return res.data;
  } catch (error) {
    console.log("Error:", error);
    return [];
  }
};