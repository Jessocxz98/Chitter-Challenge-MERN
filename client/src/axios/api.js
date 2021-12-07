import axios from "axios";

const Api = axios.create({
  baseURL: `${process.env.CLIENT_URL}` || 'http://localhost:5000'
})

const PostData = async (address, data) => {
  try {
    const res = await Api.post(`${address}`, data);
    return res;
  }
  catch (err) {
    console.log(err.response)
    return err;
  }
}

const GetData = async (address) => {
  try {
    const res = await Api.get(`${address}`);
    return res;
  }
  catch (err) {
    console.log(err.response)
  }
}

export { PostData, GetData, Api };