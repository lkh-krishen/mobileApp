import axios from "axios";

export const BASE_URL = "http://192.168.8.149:3000/";
export default axios.create({ baseURL: "http://192.168.8.149:3000/" });
