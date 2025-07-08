import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function Contests() {
    const [contests, setContests] = useState([]);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }
      
        API.get('/contests', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(res => setContests(res.data))
        .catch(err => {
          console.error(err);
          setError('Failed to load contests');
          if (err.response?.status === 403 || err.response?.status === 401) {
            localStorage.removeItem('token');
            navigate('/login');
          }
        });
      }, []);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4"> Upcoming Contests </h1>
            {error && <p className="text-red-500">{error}</p>}
            <div className="grid gap-4">
                {contests.map((contest, idx) => (
                    <div key={idx} className="p-4 bg-white rounded shadow">
                        <h2 className="text-lg font-semibold">{contest.name}</h2>
                        <p><strong>Platform:</strong> {contest.platform}</p>
                        <p><strong>Start Time:</strong> {new Date(contest.startTime).toLocaleString()}</p>
                        <p><strong>Duration:</strong> {contest.duration} mins</p>
                        <a
                            href={contest.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline"
                        >
                            Go to Contest
                        </a>
                    </div>
                ))}
            </div>
        </div>
    )
}