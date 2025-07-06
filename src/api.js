import axios from 'axios';

const api = axios.create({
  baseURL: 'https://1467-2001-fd8-1eaf-fa54-6cc4-b1ae-9583-61ab.ngrok-free.app//the_coche-events', // fixed double slash
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'ngrok-skip-browser-warning': 'true'
  }
});

export default api;
