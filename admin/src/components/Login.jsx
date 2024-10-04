import { backendUrl } from '../App';
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = ({setToken}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(`${backendUrl}/api/user/admin`, { email, password });
     // console.log(response);
     if(response.data.success){
      setToken(response.data.token)

     }else{
       
      toast.error(response.data.message)
     }
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else if (err.request) {
        console.log('No response received');
      } else {
        console.log('Error', err.message);
      }
      console.log(err.config);
    }
  };

  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <div className='bg-white shadow-md rounded-lg px-8 py-6 max-w-md'>
        <h1 className='text-2xl font-bold mb-4'>Admin Panel</h1>
        <form action="" onSubmit={onSubmitHandler}>
          <div className='mb-3 min-w-72'>
            <p className='text-sm font-medium text-gray-700 mb-2'>Email Address</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none'
              type="email"
              placeholder='your@email.com'
              required
            />
          </div>

          <div className='mb-3 min-w-72'>
            <p className='text-sm font-medium text-gray-700 mb-2'>Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none'
              type="password"
              placeholder='Enter Password'
              required
            />
          </div>

          <button
            className='bg-gray-600 w-full text-white px-5 py-2 sm:px-7 sm:py-2 rounded-md text-xs sm:text-sm'
            type='submit'
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;