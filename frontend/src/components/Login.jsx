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
        <div>
            <h2> Login </h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <input 
                    name='email'
                    placeholder='Enter Email'
                    onChange={handleChange} 
                /><br/>
                <input 
                    name='password'
                    type='password'
                    placeholder='Enter Password'
                    onChange={handleChange} 
                /><br/>
                <button type='submit'> Login </button>
            </form>
        </div>
    )
}