import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

export const signup = async (userData) => {
  const res = await axios.post(`${API_URL}/register`, userData);
  if (res.data.token) {
    localStorage.setItem('token', res.data.token);
  }
  return res.data;
};

export const login = async (email, password) => {
  const res = await axios.post('http://localhost:5000/api/auth/login', {
    email,
    password,
  });

  localStorage.setItem('token', res.data.token); // Save token for later
  return res.data; // Return response for usage in component
};

export const getProfile = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(`${API_URL}/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const logout = () => {
  localStorage.removeItem('token');
};
