const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-backend-name.onrender.com/api'
  : 'http://localhost:3000/api';

export default API_URL;