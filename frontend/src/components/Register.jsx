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
        <div>
            <h2> Register </h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    name='name'
                    placeholder='Enter Name'
                    onChange={handleChange}
                /><br/>
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
                <button type='submit'> Register </button>
            </form>
        </div>
    )
}