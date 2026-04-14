import axios from "axios";
export const api = axios.create({
  baseURL: "/api",
});
export const getCards = async () => {
  try {
    const res = await api.get("/card");
    console.log("HOOK DATA:", res.data);
    return res.data;
  } catch (error) {
    console.log("Error:", error);
    return [];
  }
};