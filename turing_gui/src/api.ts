import axios from "axios";

import cors from 'cors';

let api = axios.create({
    baseURL: "http://localhost:8000/api/"
})


export default api;
