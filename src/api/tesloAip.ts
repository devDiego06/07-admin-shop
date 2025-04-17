import axios from 'axios';

const tesloApi = axios.create({
  baseURL: import.meta.env.VITE_TESLO_API_URL,
});

//Interceptos of Axios
// all we petitions send the token if we have it
tesloApi.interceptors.request.use((config) => {

  const token = localStorage.getItem('token');
  if(token){
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
})

//Interceptors

export { tesloApi };
