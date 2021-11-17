import axios from "axios";

const api = axios.create({
  baseURL: 'http://localhost:5000'
})

const PostData = async (address, data) => {
  try {
    const res = await api.post(`${address}`, data)
    return res.data
  }
  catch (err) {
    return err
  }
}

export default PostData;