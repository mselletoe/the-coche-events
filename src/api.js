import axios from 'axios';

const api = axios.create({
  baseURL: 'https://1456-2001-fd8-1a28-878f-c4ba-94d6-f287-e1ad.ngrok-free.app/the_coche-events', // fixed double slash
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'ngrok-skip-browser-warning': 'true'
  }
});

export default api;
