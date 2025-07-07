import axios from 'axios';

const api = axios.create({
  baseURL: 'https://65f1-1-37-83-4.ngrok-free.app//the_coche-events', // fixed double slash
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'ngrok-skip-browser-warning': 'true'
  }
});

export default api;
