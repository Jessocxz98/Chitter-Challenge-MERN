import axios from "axios";

const api = axios.create({
  baseURL: 'http://localhost:5000'
})

const PostData = async (address, data) => {
  try {
    const res = await api.post(`${address}`, data)
    console.log(res)
    return res
  }
  catch (err) {
    console.log(err)
  }
}

export default PostData;