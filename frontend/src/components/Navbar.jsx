import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

export default function Navbar() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/');
    }

    return (
        <nav className="bg-gray-800 text-white p-4 flex justify-between items-center shadow-md">
            <div className="text-xl font-bold">
                <Link to="/"> ContestNotify </Link>
            </div>
            <div className="space-x-4">
                <Link to="/" className="hover:underline"> Contests </Link>
                <Link to="/preferences" className="hover:underline"> Preferences </Link>
             
                    {isLoggedIn ? (
                        <button onClick={handleLogout} className="bg-red-500 px-4 py-1 rounded">
                            Logout
                        </button>
                    ) : (
                        <button onClick={() => navigate('/login')} className="bg-green-500 px-4 py-1 rounded">
                            Login
                        </button>
                    )}
            </div>    
        </nav>
    )
}