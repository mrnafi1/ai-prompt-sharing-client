import axios from "axios";

// No cookies attached — use this for endpoints that don't require login
// (home feed, all-prompts listing, public prompt cards, etc.)
const axiosPublic = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
