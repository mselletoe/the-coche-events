import axios from 'axios';

const api = axios.create({
  baseURL: 'https://bba4-2001-fd8-1f31-692c-9ca6-d60f-4336-7ab7.ngrok-free.app//the_coche-events', // fixed double slash
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'ngrok-skip-browser-warning': 'true'
  }
});

export default api;
