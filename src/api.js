import axios from 'axios';

const api = axios.create({
  baseURL: 'https://3851-2001-fd8-179f-86b4-10b-c76a-312-6c26.ngrok-free.app//the_coche-events', // fixed double slash
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'ngrok-skip-browser-warning': 'true'
  }
});

export default api;