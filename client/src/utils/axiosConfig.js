import axios from 'axios';

const axiosConfig = axios.create({
  baseURL: "https://blog-space-r1kd.onrender.com",
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosConfig;
