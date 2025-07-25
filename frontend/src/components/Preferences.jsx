import React, { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Preferences() {
  const [selected, setSelected] = useState([]);
  const [emailEnabled, setEmailEnabled] = useState(false);
  const [notifyBefore, setNotifyBefore] = useState(10);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const prefRes = await API.get("/user/preferences", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setSelected(prefRes.data.platforms || []);
        setEmailEnabled(prefRes.data.emailEnabled || false);
        setNotifyBefore(prefRes.data.notifyBeforeMinutes || 10);
      } catch (err) {
        console.error(err);
        setMessage("Failed to load preferences");
      }
    };

    fetchPreferences();
  }, []);

  const handlePlatformChange = (platform) => {
    setSelected((prev) =>
      prev.includes(platform)
        ? prev.filter((p) => p !== platform)
        : [...prev, platform]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post(
        "/user/preferences",
        {
          platforms: selected,
          emailEnabled,
          notifyBeforeMinutes: notifyBefore,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("Preferences updated successfully!");
      navigate("/");
    } catch (err) {
      console.error(err);
      setMessage("Failed to update preferences");
    }
  };

  const allPlatforms = [
    "Codeforces",
    "LeetCode",
    "Atcoder",
    "CodeChef",
    "HackerEarth",
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-2xl rounded-xl p-6 sm:p-8 w-full max-w-lg">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-800">
          Preferences
        </h2>

        {message && (
          <div className="mb-4 text-center text-sm text-blue-600 font-medium">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
        
          <div className="font-semibold">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Select Platforms
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {allPlatforms.map((platform) => (
                <label
                  key={platform}
                  className="flex items-center gap-2 text-gray-800"
                >
                  <input
                    type="checkbox"
                    checked={selected.includes(platform)}
                    onChange={() => handlePlatformChange(platform)}
                    className="accent-blue-600 w-4 h-4"
                  />
                  <span className="text-sm">{platform}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-800 font-medium">
              Email Notifications
            </span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={emailEnabled}
                onChange={(e) => setEmailEnabled(e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-600 transition duration-300"></div>
              <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow peer-checked:translate-x-5 transition-transform duration-300"></div>
            </label>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Notify Before (minutes)
            </label>
            <input
              type="number"
              min={1}
              value={notifyBefore}
              onChange={(e) =>
                setNotifyBefore(Math.max(1, parseInt(e.target.value) || 1))
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="e.g., 10"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-300"
          >
            Save Preferences
          </button>
        </form>
      </div>
    </div>
  );
}
