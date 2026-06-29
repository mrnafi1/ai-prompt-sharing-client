import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Attaches the JWT (stored in localStorage after login) as a Bearer header.
// We use localStorage + a header instead of an httpOnly cookie because the
// client and server live on different domains (Vercel + Render) — browsers
// increasingly block cross-site cookies by default, which silently broke
// session persistence. A header has no such restriction.
const useAxiosSecure = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate();

  axiosSecure.interceptors.request.use((config) => {
    const token = localStorage.getItem("access-token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  axiosSecure.interceptors.response.use(
    (response) => response,
    async (error) => {
      const status = error?.response?.status;
      // token missing/expired/invalid — log the user out and send them to login
      if (status === 401 || status === 403) {
        localStorage.removeItem("access-token");
        await logOut();
        navigate("/login");
      }
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
