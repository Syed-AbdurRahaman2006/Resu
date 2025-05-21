import React, {use, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../../components/inputs/Input';
import { validateEmail } from '../../utils/helper';
import { login } from '../../api/auth';
import toast from 'react-hot-toast';
import { useContext } from 'react';
import { UserContext } from '../../context/userContext';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';

const Login = ({setCurrentPage}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const {updateUser} = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    if (!password) {
      setError("Please enter the password");
      setLoading(false);
      return;
    }

    setError("");

    //Login api call
   try {
    const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
      email,
      password,
    });

    const { token } = response.data;

    if (token) {
      localStorage.setItem("token", token);
      updateUser(response.data);
      navigate("/dashboard");
    }
   } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.")
      }
   }
  };

  return (
    <div className="w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center">
      <h3 className="text-lg font-semibold text-black">Welcome Back</h3>
      <p className="text-xs text-slate-700 mt-[5px] mb-6">
        Please enter your details to log in 
      </p> 

      <form onSubmit={handleLogin}>
        <Input 
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          label="Email Address"
          placeholder="user@example.com"
          type="text"
        />

        <Input 
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          label="Password"
          placeholder="Min 8 Characters"
          type="password"
        />

        {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

        <button 
          type="submit" 
          className="btn-primary"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'LOGIN'}
        </button>

        <p className="text-[13px] text-slate-800 mt-3">
          Don't have an account?{" "}
          <button
            type="button"
            className="font-medium text-primary underline cursor-pointer"
            onClick={() => {
              setCurrentPage("signup");
            }}
          >
            SignUp 
          </button>
        </p>
      </form> 
    </div>
  );
};

export default Login;