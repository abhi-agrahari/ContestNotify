import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import Navbar from "./Navbar";

export default function Contests() {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchData = async () => {
      try {
        const contestRes = await API.get("/contests", {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });

        if (token) {
          const userRes = await API.get("/user/me", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUsername(userRes.data);
        }

        let allContests = contestRes.data;

        allContests = allContests.filter(
          (c) => new Date(c.startTime) > new Date()
        );

        if (token) {
          const prefRes = await API.get("/user/preferences", {
            headers: { Authorization: `Bearer ${token}` },
          });

          const userPlatforms = prefRes.data.platforms || [];

          allContests = allContests.filter((c) =>
            userPlatforms.includes(c.platform)
          );
        }

        allContests.sort((a, b) => new Date(a.startTime) - new Date(b.startTime));
        setContests(allContests);
      } catch (err) {
        console.error(err);
        setError("Failed to load contests");
        if (err.response?.status === 403 || err.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="p-6">Loading contests...</div>;

  return (
    <>
      <Navbar />
      <div className="px-4 sm:px-6 lg:px-8 py-6 min-h-screen bg-gray-100">
        {username && (
          <div className="text-gray-700 text-left text-base sm:text-lg font-semibold mb-3 sm:mb-5">
            Welcome, {username}
          </div>
        )}

        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center text-gray-800">
          Upcoming Contests
        </h1>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {contests.map((contest, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-5 sm:p-6 border border-gray-200"
            >
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1 sm:mb-2 break-words">
                {contest.name}
              </h2>

              <span className="inline-block bg-blue-100 text-blue-800 text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full mb-3">
                {contest.platform}
              </span>

              <p className="text-gray-600 text-sm sm:text-base mb-1">
                <strong className="text-gray-700">Start:</strong>{" "}
                {new Date(contest.startTime).toLocaleString()}
              </p>

              <p className="text-gray-600 text-sm sm:text-base mb-1">
                <strong className="text-gray-700">End:</strong>{" "}
                {new Date(contest.endTime).toLocaleString()}
              </p>

              <p className="text-gray-600 text-sm sm:text-base mb-4">
                <strong className="text-gray-700">Duration:</strong>{" "}
                {Math.floor(Math.round(contest.duration / 60) / 60) > 0
                  ? `${Math.floor(Math.round(contest.duration / 60) / 60)} hr `
                  : ""}
                {Math.round(contest.duration / 60) % 60} mins
              </p>

              <a
                href={contest.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-white bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-md text-xs sm:text-sm font-medium transition"
              >
                Go to Contest →
              </a>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
