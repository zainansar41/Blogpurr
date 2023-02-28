import axios from "axios"
import ENV from '../config'


axios.defaults.baseURL = ENV.LINK



export async function verifyPassword(credentials) {
  try {
    const response = await axios.post(`/login`, credentials);
    console.log(response.data.token);
    localStorage.setItem('YourToken', response.data.token)
    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error);
  }
}


export async function registerUser(credentials) {
  try {
    const response = await axios.post(`/register`, credentials)
    localStorage.setItem('YourToken', response.data.token)
    return Promise.resolve(response.data)

  } catch (error) {
    return Promise.reject(error)
  }
}

export async function updateProfile(credentials) {
  try {
    console.log(credentials);
    const token = localStorage.getItem('YourToken')
    const { msg } = await axios.put('/updateUser', credentials, { headers: { "authorization": `Bearer ${token}` } })
    return Promise.resolve(msg)
  } catch (error) {
    return Promise.reject(error)
  }
}


export async function uploadBlog(credentials) {
  try {
    console.log(credentials);

    const token = localStorage.getItem('YourToken')
    const response = await axios.post('/addBlog', credentials, { headers: { "authorization": `Bearer ${token}` } })
    return Promise.resolve(response.data)


  } catch (error) {
    return Promise.reject(error)
  }
}

export async function fetchBlog() {
  try {
    const token = localStorage.getItem('YourToken')
    const response = await axios.get('/Blog', { headers: { "authorization": `Bearer ${token}` } })
    return Promise.resolve(response.data)
  } catch (error) {
    return Promise.reject(error)
  }
}