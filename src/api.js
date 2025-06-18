import axios from 'axios';

const api = axios.create({
  baseURL: 'https://c78e-112-202-101-107.ngrok-free.app/the_coche-events', // fixed double slash
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'ngrok-skip-browser-warning': 'true'
  }
});

export default api;