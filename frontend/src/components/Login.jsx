import React, { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

export default function Login() {
    const [form, setForm] = useState({ email: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setIsLoading(true);
        localStorage.removeItem('token');

        try {
            const res = await API.post('/auth/login', form);
            localStorage.setItem('token', res.data.token);
            toast.success('Login successful!');
            navigate('/');
        } catch (err) {
            toast.error('Login failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='min-h-screen bg-gray-100 flex items-center justify-center'>
            <Toaster 
                position="top-center"
                toastOptions={{
                    duration: 4000,
                    style: {
                        background: '#363636',
                        color: '#fff',
                    },
                }}
            />
            
            <div className='bg-white p-8 rounded shadow-md w-full max-w-md'>
                <h2 className='text-2xl font-bold mb-6 text-center'>Login</h2>

                <form onSubmit={handleSubmit} className='space-y-4'>
                    <input
                        name='email'
                        type='email'
                        placeholder='Enter Email'
                        value={form.email}
                        onChange={handleChange}
                        className='w-full px-4 py-2 border border-gray-300 rounded'
                        required
                    />
                    <input
                        name='password'
                        type='password'
                        placeholder='Enter Password'
                        value={form.password}
                        onChange={handleChange}
                        className='w-full px-4 py-2 border border-gray-300 rounded'
                        required
                    />
                    <button
                        type='submit'
                        disabled={isLoading}
                        className={`w-full py-2 rounded text-white ${isLoading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'}`}
                    >
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                <p className='mt-4 text-sm text-center text-gray-600'>
                    Don't have an account?{' '}
                    <Link to="/register" className="text-blue-600 hover:underline">
                        Register here
                    </Link>
                </p>
            </div>
        </div>
    )
}