import axios from 'axios';

const api = axios.create({
  baseURL: 'https://aa28-2001-fd8-1788-352a-5d8d-2915-e2c2-5e0d.ngrok-free.app/the_coche-events', // fixed double slash
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'ngrok-skip-browser-warning': 'true'
  }
});

export default api;
