import axios from "axios";


let api = axios.create({
    baseURL: "http://localhost:8000/api/"
})


export default api;
