import axios from 'axios';

const Api = axios.create({
  baseURL: 'http://localhost:3000', // ajuste se necessário
});

export default Api;
