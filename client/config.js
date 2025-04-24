const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://geo-nius-lafosse-alpha-project.onrender.com/api'
  : 'http://localhost:3000/api';

export default API_URL;