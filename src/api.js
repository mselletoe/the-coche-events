import axios from 'axios';

const api = axios.create({
  baseURL: 'https://ea96-2001-fd8-179e-94a4-45b8-addb-4714-70c3.ngrok-free.app/the_coche-events', // fixed double slash
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'ngrok-skip-browser-warning': 'true'
  }
});

export default api;
