import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_VERCEL_ENDPOINT}/${
    import.meta.env.VITE_PROJ_ID
  }`,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
  },
});

export default axiosInstance;
