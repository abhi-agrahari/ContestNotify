import React, { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

export default function Register() {

    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' }); // Clear error on input change
    };

    const handleSubmit = async e => {
        e.preventDefault();

        const newErrors = {};
        if (!form.name.trim()) {
            newErrors.name = 'Name is required';
        }
        if (!form.password || form.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            navigate('/verify-email');
            await API.post('/auth/register', form);
            setMessage('Registration successful');
        } catch (err) {
            setMessage('Registration failed');
        }
    };

    return (
        <div className='min-h-screen bg-gray-100 flex items-center justify-center'>
            <div className='bg-white p-8 rounded shadow-md w-full max-w-md'>
                <h2 className='text-2xl font-bold mb-6 text-center'>Register</h2>
                {message && <p className='text-sm text-center mb-4 text-red-500'>{message}</p>}
                <form onSubmit={handleSubmit} className='space-y-4'>
                    <div>
                        <input
                            name='name'
                            placeholder='Enter Name'
                            onChange={handleChange}
                            className='w-full px-4 py-2 border border-gray-300 rounded'
                        />
                        {errors.name && <p className='text-sm text-red-500'>{errors.name}</p>}
                    </div>

                    <div>
                        <input
                            name='email'
                            placeholder='Enter Email'
                            onChange={handleChange}
                            className='w-full px-4 py-2 border border-gray-300 rounded'
                        />
                    </div>

                    <div>
                        <input
                            name='password'
                            type='password'
                            placeholder='Enter Password'
                            onChange={handleChange}
                            className='w-full px-4 py-2 border border-gray-300 rounded'
                        />
                        {errors.password && <p className='text-sm text-red-500'>{errors.password}</p>}
                    </div>

                    <button type='submit' className='w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded'>
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}