import axios from "axios";
import { api } from "../config/apiEndpoint";


export default axios.create({
  baseURL: api.BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

