import React, { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [form, setForm] = useState({email: '', password: ''});
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = e => {
        setForm({...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();

        localStorage.removeItem('token');
        
        try{
            const res = await API.post('/auth/login', form);
            localStorage.setItem('token', res.data.token);
            setMessage('login successful');
            navigate('/');
        } catch(err) {
            setMessage('login failed');
        }
    };

    return(
        <div className='min-h-screen bg-gray-100 flex items-center justify-center'>
            <div className='bg-white p-8 rounded shadow-md w-full max-w-md'>
            <h2 className='text-2xl font-bold mb-6 text-center'> Login </h2>
            {message && <p className='text-sm text-center mb-4 text-red-500'>{message}</p>}
            <form onSubmit={handleSubmit} className='space-y-4'>
                <input 
                    name='email'
                    placeholder='Enter Email'
                    onChange={handleChange} 
                    className='w-full px-4 py-2 border border-gray-300 rounded'
                /><br/>
                <input 
                    name='password'
                    type='password'
                    placeholder='Enter Password'
                    onChange={handleChange} 
                    className='w-full px-4 py-2 border border-gray-300 rounded'
                /><br/>
                <button type='submit' className='w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded'> Login </button>
            </form>
            </div>
        </div>
    )
}