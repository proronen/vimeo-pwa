import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    //  'Content-Type': 'application/json;charset=UTF-8',
    //  "Access-Control-Allow-Origin": "*",
  }
});

export default instance;