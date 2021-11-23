import axios from "axios";

const api = axios.create({
  baseURL: 'http://localhost:5000'
})

export const PostData = async (address, data) => {
  try {
    return api.post(`${address}`, data);
  }
  catch (err) {
    return err;
  }
}

export default PostData;