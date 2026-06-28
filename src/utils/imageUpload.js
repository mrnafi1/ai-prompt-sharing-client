import axios from "axios";

// Uploads a File object to imgbb and returns the hosted image URL.
// No backend storage needed — server only ever stores this URL string.
const uploadImage = async (imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);

  const res = await axios.post(
    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
    formData
  );

  return res.data.data.url;
};

export default uploadImage;
