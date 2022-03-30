import axios from "axios";
export default axios.create({
  baseURL: "https://api.circadiaries.com",
  headers: {
    "Content-type": "application/json"
  }
});
