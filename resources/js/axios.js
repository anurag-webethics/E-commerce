import axios from "axios";

const http = axios.create({
    baseURL: "https://product-api-103-181-222-27.loca.lt/api/",
    headers: { "X-Custom-Header": "foobar" },
});

let token = localStorage.getItem("authToken")
    ? localStorage.getItem("authToken")
    : "";

http.defaults.headers.common["Authorization"] = `Bearer ${token}`;

export default http;
