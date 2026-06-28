import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

// withCredentials lets the browser send/receive the httpOnly JWT cookie
// set by POST /jwt on the server.
const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

const useAxiosSecure = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate();

  axiosSecure.interceptors.response.use(
    (response) => response,
    async (error) => {
      const status = error?.response?.status;
      // token missing/expired/invalid — log the user out and send them to login
      if (status === 401 || status === 403) {
        await logOut();
        navigate("/login");
      }
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
