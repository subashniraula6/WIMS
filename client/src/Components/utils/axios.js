import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://127.0.0.1:8000/',
  });
instance.defaults.headers.post['Content-Type'] = 'application/json';

// const token = localStorage.getItem('token');

// if(token){
//   instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
// }

export default instance;