import axios from "axios";

const Api = axios.create({
  baseURL: (process.env.NODE_ENV === 'production') ? `${process.env.PUBLIC_API_URL}` : 'http://localhost:5000'
})

export { Api };