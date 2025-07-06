import React, { useState } from 'react';
import API from '../api';

export default function Register() {

    const [form, setForm] = useState({name: '', email: '', password: ''});
    const [message, setMessage] = useState('');

    const handleChange = e => {
        setForm({...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try{
            await API.post('/auth/register', form);
            setMessage('Registration successful');
        } catch(err) {
            setMessage('Registration failed');
        }
    };

    return(
        <div className='min-h-screen bg-gray-100 flex items-center justify-center'>
            <div className='bg-white p-8 rounded shadow-md w-full max-w-md'>
            <h2 className='text-2xl font-bold mb-6 text-center'> Register </h2>
            {message && <p className='text-sm text-center mb-4 text-red-500'>{message}</p>}
            <form onSubmit={handleSubmit} className='space-y-4'>
                <input
                    name='name'
                    placeholder='Enter Name'
                    onChange={handleChange}
                    className='w-full px-4 py-2 border border-gray-300 rounded'
                /><br/>
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
                <button type='submit' className='w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded'> Register </button>
            </form>
            </div>
        </div>
    )
}