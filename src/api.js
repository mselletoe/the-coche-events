import axios from 'axios';

const api = axios.create({
  baseURL: 'https://c1ae-2001-fd8-1791-4286-3055-9b36-30d6-15bd.ngrok-free.app/the_coche-events', // fixed double slash
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'ngrok-skip-browser-warning': 'true'
  }
});

export default api;