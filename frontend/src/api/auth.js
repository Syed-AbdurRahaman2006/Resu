import axios from 'axios';

export const login = async (email, password) => {
  const res = await axios.post('http://localhost:5000/api/auth/login', {
    email,
    password,
  });

  localStorage.setItem('token', res.data.token); // Save token for later
  return res.data; // Return response for usage in component
};
