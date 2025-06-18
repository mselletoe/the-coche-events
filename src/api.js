import axios from 'axios';

const api = axios.create({
  baseURL: 'https://2e28-2001-fd8-485-e97e-3dd6-441c-1f5-6938.ngrok-free.app/the_coche-events', // fixed double slash
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'ngrok-skip-browser-warning': 'true'
  }
});

export default api;
