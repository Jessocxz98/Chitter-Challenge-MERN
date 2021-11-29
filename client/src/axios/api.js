import axios from "axios";

export const api = axios.create({
  baseURL: 'http://localhost:5000'
})

const PostData = async (address, data) => {
  try {
    const res = await api.post(`${address}`, data);
    return res;
  }
  catch (err) {
    console.log(err.response)
    return err;
  }
}

export default PostData;